import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { TrackFormComponent } from './components/track-form/track-form.component';
import { TrackListComponent } from './components/track-list/track-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsideMenuComponent,
    TrackFormComponent,
    TrackListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'melody-stream';
}
