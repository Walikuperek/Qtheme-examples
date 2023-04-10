import {Component} from '@angular/core';
import {Qtheme} from '@quak.lib/qtheme';
import {darkTheme, lightTheme} from '../themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  isDarkMode = true;

  constructor() {
    Qtheme.setTheme(darkTheme);
  }

  setLightTheme(): void {
    Qtheme.setTheme(lightTheme);
    this.isDarkMode = false;
  }

  setDarkTheme(): void {
    Qtheme.setTheme(darkTheme);
    this.isDarkMode = true;
  }
}
