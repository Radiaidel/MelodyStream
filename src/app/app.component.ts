import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,AsideMenuComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'melody-stream';
}
