import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Track, TrackService } from '../../services/track.service';
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
  // tracks$: Observable<Track[]>;
  // hoveredTrackId: number | null = null;
  // activeMenuId: number | null = null;

  // constructor(private store: Store) {
  //   this.tracks$ = this.store.select(selectAllTracks);
  // }

  // ngOnInit(): void {
  //   this.store.dispatch(loadTracks());
  // }

  // onDeleteTrack(id: number | undefined): void {
  //   if (id !== undefined) {
  //     this.store.dispatch(deleteTrack({ id }));
  //   }
  // }
  tracks$: Observable<Track[]>;

  constructor(private trackService: TrackService) {
    this.tracks$ = this.trackService.getTracks();
  }
  ngOnInit(): void {}

  formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  playTrack(track: Track): void {
    // Implement play functionality
    console.log('Playing track:', track.songName);
  }

  editTrack(track: Track): void {
    // Implement edit functionality
    console.log('Editing track:', track.songName);
  }

  deleteTrack(id: number): void {
    this.trackService.deleteTrack(id).subscribe(() => {
      // Refresh tracks after deletion
      this.tracks$ = this.trackService.getTracks();
    });
  }
}