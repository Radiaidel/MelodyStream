import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Track } from '../../services/track.service';
import { loadTracks, deleteTrack } from '../../store/track.actions';
import { selectAllTracks } from '../../store/track.selectors';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
  tracks$: Observable<Track[]>;

  constructor(private store: Store) {
    this.tracks$ = this.store.select(selectAllTracks);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTracks());
  }

  onDeleteTrack(id: number | undefined): void {
    if (id !== undefined) {
      this.store.dispatch(deleteTrack({ id }));
    }
  }
}