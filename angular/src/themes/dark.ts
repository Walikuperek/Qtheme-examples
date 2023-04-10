import type {Theme} from '@quak.lib/qtheme';

export const darkTheme: Theme = {
  name: 'dark',
  atoms: [
      ['bg-color', 'background-color:#000'],
      ['bg-inner', 'background-color:#1a1a1a'],
      ['text-color', 'color:#fff'],
      ['primary', 'rgb(195,0,47)'],
      ['bg-primary', 'background-color:var(--primary)'],
      ['text-primary', 'color:var(--primary)']
  ]
};