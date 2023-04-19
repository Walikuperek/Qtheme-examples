import { ThemeAtom } from './theme.interface';

export interface SetRootAtomsOptions {
  generateCSS: boolean;
  token: string;
  commonToken: string;
}

export interface InitRootAtomsOptions extends SetRootAtomsOptions {
  commonAtoms: ThemeAtom[];
}
