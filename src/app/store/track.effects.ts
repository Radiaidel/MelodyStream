import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TrackService } from '../services/track.service';
import { addTrack, addTrackSuccess, addTrackFailure, loadTracks, loadTracksSuccess, loadTracksFailure, updateTrack, updateTrackSuccess, updateTrackFailure, deleteTrack, deleteTrackSuccess, deleteTrackFailure } from './track.actions';

@Injectable()
export class TrackEffects {
  constructor(
    private actions$: Actions,
    private trackService: TrackService
  ) {}

  addTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTrack),
      mergeMap(action =>
        this.trackService.addTrack(action.track).pipe(
          map(track => addTrackSuccess({ track })),
          catchError(error => of(addTrackFailure({ error })))
        )
      )
    )
  );

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTracks),
      mergeMap(() =>
        this.trackService.getTracks().pipe(
          map(tracks => loadTracksSuccess({ tracks })),
          catchError(error => of(loadTracksFailure({ error })))
        )
      )
    )
  );

  updateTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTrack),
      mergeMap(action =>
        this.trackService.updateTrack(action.track).pipe(
          map(track => updateTrackSuccess({ track })),
          catchError(error => of(updateTrackFailure({ error })))
        )
      )
    )
  );

  deleteTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTrack),
      mergeMap(action =>
        this.trackService.deleteTrack(action.id).pipe(
          map(() => deleteTrackSuccess({ id: action.id })),
          catchError(error => of(deleteTrackFailure({ error })))
        )
      )
    )
  );
}