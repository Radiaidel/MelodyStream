import { createReducer, on } from '@ngrx/store';
import { addTrackSuccess, loadTracksSuccess, updateTrackSuccess, deleteTrackSuccess } from './track.actions';
import { Track } from '../services/track.service';

export interface TrackState {
  tracks: Track[];
  error: any;
}

export const initialState: TrackState = {
  tracks: [],
  error: null
};

export const trackReducer = createReducer(
  initialState,
  on(addTrackSuccess, (state, { track }) => ({
    ...state,
    tracks: [...state.tracks, track]
  })),
  on(loadTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks: [...tracks]
  })),
  on(updateTrackSuccess, (state, { track }) => ({
    ...state,
    tracks: state.tracks.map(t => t.id === track.id ? track : t)
  })),
  on(deleteTrackSuccess, (state, { id }) => ({
    ...state,
    tracks: state.tracks.filter(t => t.id !== id)
  }))
);