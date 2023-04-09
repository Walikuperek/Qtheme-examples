import reactLogo from './assets/react.svg'
import './App.css'
import {Qtheme, Theme} from '@quak.lib/qtheme';
import {darkTheme, lightTheme} from './themes';

function App() {
    let isDarkMode = true
    const setLightTheme = () => {
        Qtheme.setTheme(lightTheme)
        const { lightButton, darkButton } = getLightDarkButtons()
        darkButton!.classList.remove('text-primary')
        lightButton!.classList.add('text-primary')
    }
    const setDarkTheme = () => {
        Qtheme.setTheme(darkTheme)
        const { lightButton, darkButton } = getLightDarkButtons()
        lightButton!.classList.remove('text-primary')
        darkButton!.classList.add('text-primary')
    }

    const savedTheme: Theme | null = Qtheme.getTheme()
    if (savedTheme) {
        Qtheme.setTheme(savedTheme)
        isDarkMode = savedTheme.name === 'dark'
    } else {
        Qtheme.setTheme(darkTheme)
    }

    const lightButtonCss = `text-color ${!isDarkMode ? 'text-primary' : ''}`
    const darkButtonCss = `text-color ${isDarkMode ? 'text-primary' : ''}`

    return (
        <div className="App">
            <div>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>

            <h1 className="text-primary">Hello world!</h1>
            <p className="text-color">This is regular text color</p>

            <hr/>

            <button onClick={() => setLightTheme()} id="light_btn" className={lightButtonCss}>Set light theme</button>
            <button onClick={() => setDarkTheme()} id="dark_btn" className={darkButtonCss}>Set dark theme</button>
        </div>
    )
}

export default App

function getLightDarkButtons() {
    const lightButton = document.getElementById('light_btn')
    const darkButton = document.getElementById('dark_btn')
    return {lightButton, darkButton}
}
