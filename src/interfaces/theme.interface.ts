/**
 * @description Base css :root variable [key, value] or [key, { [key: string]: string }]
 * */
export type AtomName = string;
export type AtomValue = string | { [key: string]: string };
export type ThemeAtom = [AtomName, AtomValue];

/**
 * @description Theme interface, base on it your theme or extend this interface with your own properties.
 */
export interface Theme {
  name: string;
  atoms: ThemeAtom[];
}
