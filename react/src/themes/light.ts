import type {Theme} from '@quak.lib/qtheme';

export const lightTheme: Theme = {
    name: 'light',
    atoms: [
        ['bg-color', 'background-color:#fff'],
        ['bg-inner', 'background-color:#f5f5f5'],
        ['text-color', 'color:#000'],
        ['primary', 'rgb(0,216,255)'],
        ['bg-primary', 'background-color:var(--primary)'],
        ['text-primary', 'color:var(--primary)']
    ]
}
