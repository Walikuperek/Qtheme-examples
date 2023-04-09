<script lang="ts">
    import svelteLogo from './assets/svelte.svg'
    import {Qtheme, Theme} from '@quak.lib/qtheme'
    import {lightTheme, darkTheme} from './themes'

    let isDarkTheme = true
    const savedTheme: Theme | null = Qtheme.getTheme()
    if (savedTheme) {
        Qtheme.setTheme(savedTheme)
        isDarkTheme = savedTheme.name === 'dark'
    } else {
        Qtheme.setTheme(darkTheme)
    }

    const setLightTheme = () => {
        Qtheme.setTheme(lightTheme)
        isDarkTheme = false
    }
    const setDarkTheme = () => {
        Qtheme.setTheme(darkTheme)
        isDarkTheme = true
    }
</script>

<main>
    <div>
        <a href="https://svelte.dev" target="_blank" rel="noreferrer">
            <img src={svelteLogo} class="logo svelte" alt="Svelte Logo"/>
        </a>
    </div>

    <h1 class="text-primary">Hello world!</h1>
    <p class="text-color">This is regular text color</p>

    <hr/>

    <button on:click={setLightTheme} class:text-primary={!isDarkTheme} class="text-color">Set light theme</button>
    <button on:click={setDarkTheme} class:text-primary={isDarkTheme}  class="text-color">Set dark theme</button>

</main>

<style>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }

    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em var(--primary));
    }
</style>
