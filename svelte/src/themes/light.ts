import type {Theme} from '@quak.lib/qtheme';

export const lightTheme: Theme = {
    name: 'light',
    atoms: [
        ['bg-color', 'background-color:#fff'],
        ['bg-inner', 'background-color:#f5f5f5'],
        ['text-color', 'color:#000'],
        ['primary', '#FF3E00'],
        ['bg-primary', 'background-color:var(--primary)'],
        ['text-primary', 'color:var(--primary)']
    ]
}
