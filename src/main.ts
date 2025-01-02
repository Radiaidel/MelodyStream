import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { trackReducer } from './app/store/track.reducer';
import { TrackEffects } from './app/store/track.effects';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ tracks: trackReducer }),
    provideEffects([TrackEffects]),
  ],
}).catch((err) => console.error(err));
