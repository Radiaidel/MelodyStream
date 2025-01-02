import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface Track {
  id?: number;
  songName: string;
  artistName: string;
  description?: string;
  category: string;
  audioFile: File;
  dateAdded: Date;
  duration: number;
}

interface TrackDB extends DBSchema {
  tracks: {
    key: number;
    value: Track;
    indexes: { 'by-date': Date };
  };
  audioFiles: {
    key: number;
    value: { id: number; file: File };
  };
}

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private dbPromise: Promise<IDBPDatabase<TrackDB>>;

  constructor() {
    this.dbPromise = openDB<TrackDB>('track-db', 1, {
      upgrade(db) {
        const trackStore = db.createObjectStore('tracks', {
          keyPath: 'id',
          autoIncrement: true
        });
        trackStore.createIndex('by-date', 'dateAdded');

        db.createObjectStore('audioFiles', {
          keyPath: 'id'
        });
      }
    });
  }

  getTracks(): Observable<Track[]> {
    return from(this.dbPromise.then(db => db.getAll('tracks')));
  }

  addTrack(track: Track): Observable<Track> {
    return from(
      this.dbPromise.then(async db => {
        const tx = db.transaction(['tracks', 'audioFiles'], 'readwrite');
        const trackStore = tx.objectStore('tracks');
        const audioFileStore = tx.objectStore('audioFiles');

        const trackId = await trackStore.add(track);
        await audioFileStore.add({ id: trackId, file: track.audioFile });

        await tx.done;
        return { ...track, id: trackId };
      })
    );
  }

  updateTrack(updatedTrack: Track): Observable<Track> {
    return from(
      this.dbPromise.then(async db => {
        const tx = db.transaction(['tracks', 'audioFiles'], 'readwrite');
        const trackStore = tx.objectStore('tracks');
        const audioFileStore = tx.objectStore('audioFiles');

        await trackStore.put(updatedTrack);
        await audioFileStore.put({ id: updatedTrack.id!, file: updatedTrack.audioFile });

        await tx.done;
        return updatedTrack;
      })
    );
  }

  deleteTrack(id: number): Observable<void> {
    return from(
      this.dbPromise.then(async db => {
        const tx = db.transaction(['tracks', 'audioFiles'], 'readwrite');
        const trackStore = tx.objectStore('tracks');
        const audioFileStore = tx.objectStore('audioFiles');

        await trackStore.delete(id);
        await audioFileStore.delete(id);

        await tx.done;
      })
    );
  }
}