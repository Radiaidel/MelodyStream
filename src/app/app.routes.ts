import { Routes } from '@angular/router';
import { TrackFormComponent } from './components/track-form/track-form.component';
import { TrackListComponent } from './components/track-list/track-list.component';

export const routes: Routes = [
  { path: 'addTrack', component: TrackFormComponent },
  { path: 'tracks', component: TrackListComponent },
  { path: '', redirectTo: '/tracks', pathMatch: 'full' }
];
