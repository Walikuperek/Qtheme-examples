import { mapToKebabCase } from './helpers';
import { ThemeAtom, SetRootAtomsOptions } from './interfaces';
import { DEFAULT_OPTIONS } from './config';

export const setRootAtoms = (atoms: ThemeAtom[], options?: Partial<SetRootAtomsOptions>): void => {
  const opts: SetRootAtomsOptions = options ? { ...DEFAULT_OPTIONS, ...options } : DEFAULT_OPTIONS; // to ensure that all options are set
  let cssCode = "";

  for (const themeAtom of atoms) {
    const atom = Atom(themeAtom);

    if (!opts.generateCSS) {
      atom.setRootVar();
      continue;
    }

    if (atom.isAtomCompound) {
      cssCode += atom.getCompoundClass();
      continue;
    }

    if (!atom.isValueCSSRule) {
      atom.setRootVar();
      continue;
    }

    const [cssProperty, value]: string[] = atom.splitAtomValue();
    if (cssProperty.length) {
      cssCode += CSSVarClassRow(atom.rootVariableName, cssProperty);
    }
    atom.setRootVar(atom.rootVariableName, value);
  }

  if (opts.generateCSS && opts.token) {
    removeStyleTag(opts.token);
    attachStyleTag(cssCode, opts.token);
  }
};

function Atom(atom: ThemeAtom) {
  const [atomName, atomValue] = atom;
  const isAtomCompound = typeof atomValue === "object";
  const isNameCSSRule = atomName.indexOf(":") !== -1;
  const isValueCSSRule = typeof atomValue === "string" && atomValue.indexOf(":") !== -1;
  const splitAtomName = () => atomName.split(/:(.*)/s); // split at the first occurrence of ':' and keep the rest
  const splitAtomValue = () => typeof atomValue === "string" ? atomValue.split(":") : ["", ""];
  const getCompoundClass = () => {
    let styledClass = isNameCSSRule ? `.${atomNameValue}:${atomNameCSSRule} {` : `.${atomName} {`;
    for (const [cssProperty, value] of Object.entries(atomValue)) {
      styledClass += `${mapToKebabCase(cssProperty)}: ${value};`;
    }
    styledClass += "}\n";
    return styledClass;
  }

  let atomNameValue = atomName;
  let atomNameCSSRule = atomValue;

  if (isNameCSSRule) {
    const [cssKey, rule] = splitAtomName(); // ['bg', 'hover']
    atomNameCSSRule = rule; // 'hover'
    atomNameValue = mapToKebabCase(cssKey); // 'bg'
  }
  const rootVar = isNameCSSRule ? atomNameValue : mapToKebabCase(atomName);

  return {
    rootVariableName: rootVar,
    name: atomName,
    value: atomValue,
    atomNameValue,
    atomNameCSSRule,
    isAtomCompound,
    isNameCSSRule,
    isValueCSSRule,
    splitAtomName,
    splitAtomValue,
    getCompoundClass,
    setRootVar: (property = rootVar, value = atomValue) => {
      typeof value === "string"
        ? document.documentElement.style.setProperty(`--${property}`, value)
        : void 0;
    }
  };
}

const attachStyleTag = (cssCode: string, id = DEFAULT_OPTIONS.token) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerHTML = cssCode;
  document.head.appendChild(style);
};
const removeStyleTag = (id: string) => {
  const style = document.getElementById(id);
  if (style) {
    document.head.removeChild(style);
  }
};
const CSSVarClassRow = (varName: string, property: string) => `.${varName} { ${property}: var(--${varName}) }\n`;
