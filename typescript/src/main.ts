import { Qtheme } from '@quak.lib/qtheme'
import {lightTheme, darkTheme} from './themes'

import './style.css'

// Initialize theme
Qtheme.setTheme(darkTheme)

// Listen to btn clicks
const lightThemeBtn = document.querySelector('#light_theme_btn')
const darkThemeBtn = document.querySelector('#dark_theme_btn')
lightThemeBtn!.addEventListener('click', () => {
    Qtheme.setTheme(lightTheme)
    const darkThemeBtn = document.querySelector('#dark_theme_btn')
    const lightThemeBtn = document.querySelector('#light_theme_btn')
    darkThemeBtn!.classList.remove('text-primary')
    lightThemeBtn!.classList.add('text-primary')
})
darkThemeBtn!.addEventListener('click', () => {
    Qtheme.setTheme(darkTheme)
    const darkThemeBtn = document.querySelector('#dark_theme_btn')
    const lightThemeBtn = document.querySelector('#light_theme_btn')
    lightThemeBtn!.classList.remove('text-primary')
    darkThemeBtn!.classList.add('text-primary')
})
