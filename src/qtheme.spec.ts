import { Qtheme } from './qtheme';
import { Theme, ThemeAtom } from './interfaces';

const lightTheme = {
  name: 'light',
  atoms: [
    ['bgColor', '#fff'],
    ['color', 'color:#000'],
    ['bg-color-inner', 'var(--bg-color)'],
  ],
} as Theme;

const darkTheme = {
  name: 'dark',
  atoms: [
    ['bg-color', '#000'],
    ['color', 'color:#fff'],
    ['bg-color-inner', 'var(--bg-color)'],
    ['btn', {
      'background-color': 'var(--bg-color-inner)',
      'outline': '1px solid var(--color)',
    }],
    ['btn:hover', {
      'background-color': 'black',
      'outline': '1px solid black',
      'color': 'white'
    }]
  ],
} as Theme;

const commonAtoms = [
  ['font-family', 'sans-serif'],
  ['font-size', 'font-size:16px'],
  ['font-size:hover', 'font-size:20px'],
] as ThemeAtom[];

describe('Qtheme', () => {
  it('should return null if theme was not set already', () => {
    const theme = Qtheme.getTheme();
    expect(theme).toBeNull();
  });

  it('should init properly', () => {
    Qtheme.init(darkTheme, {commonAtoms});
    const cssBgRootVar = document.documentElement.style.getPropertyValue('--bg-color');
    const cssFontFamilyRootVar = document.documentElement.style.getPropertyValue('--font-family');
    expect(cssBgRootVar).toEqual('#000');
    expect(cssFontFamilyRootVar).toEqual('sans-serif');
  });

  it('should set light theme properly', () => {
    Qtheme.setTheme(lightTheme);
    const cssBgRootVar = document.documentElement.style.getPropertyValue('--bg-color');
    expect(cssBgRootVar).toEqual('#fff');
  });

  it('should get light theme properly', () => {
    Qtheme.setTheme(lightTheme);
    const theme = Qtheme.getTheme();
    expect(theme).toEqual(lightTheme);
    expect(theme?.name).toEqual('light');
  });

  it('should set dark theme properly', () => {
    Qtheme.setTheme(darkTheme);
    const cssBgRootVar = document.documentElement.style.getPropertyValue('--bg-color');
    expect(cssBgRootVar).toEqual('#000');
  });

  it('should get dark theme properly', () => {
    Qtheme.setTheme(darkTheme);
    const theme = Qtheme.getTheme();
    expect(theme).toEqual(darkTheme);
    expect(theme?.name).toEqual('dark');
  });

  it('should set common atoms properly', () => {
    Qtheme.setCommonAtoms(commonAtoms);
    const cssFontFamilyRootVar = document.documentElement.style.getPropertyValue('--font-family');
    expect(cssFontFamilyRootVar).toEqual('sans-serif');
  });

  it('should get common atoms properly', () => {
    Qtheme.setCommonAtoms(commonAtoms);
    const atoms = Qtheme.getCommonAtoms();
    expect(atoms).toEqual(commonAtoms);
  });
});
