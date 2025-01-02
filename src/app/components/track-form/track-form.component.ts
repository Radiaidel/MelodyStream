import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Track } from '../../services/track.service';
import { addTrack } from '../../store/track.actions';

@Component({
  selector: 'app-track-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss']
})
export class TrackFormComponent implements OnInit {
  trackForm: FormGroup;
  isFormVisible: boolean = true;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.trackForm = this.fb.group({
      songName: ['', [Validators.required, Validators.maxLength(50)]],
      artistName: ['', Validators.required],
      description: ['', Validators.maxLength(200)],
      category: ['', Validators.required],
      audioFile: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('File is too large. Maximum size is 15MB');
        return;
      }
      if (!file.type.includes('audio')) {
        alert('Please upload an audio file');
        return;
      }
      this.trackForm.patchValue({ audioFile: file });
    }
  }

  onSubmit(): void {
    if (this.trackForm.valid) {
      const track: Track = {
        ...this.trackForm.value,
        dateAdded: new Date(),
        duration: this.calculateDuration(this.trackForm.value.audioFile)
      };
      this.store.dispatch(addTrack({ track }));
      this.isFormVisible = false;
      this.router.navigate(['/tracks']); 
    }
  }

  private calculateDuration(file: File): number {
    return 0;
  }
}