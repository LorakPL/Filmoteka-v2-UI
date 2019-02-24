import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Movie} from '../../model/Movie';

export enum Type {
  MOVIE = 'MOVIE',
  SERIES = 'SERIES'
}

export enum Genre {
  COMEDY = 'Komedia',
  ACTION = 'Akcja',
  ADVENTURE = 'Przygodowy'
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit {

  private form: FormGroup;
  private description: string;
  public movie: Movie;
  public types: Type[] = [Type.MOVIE, Type.SERIES];
  public genres: Genre[] = [Genre.COMEDY, Genre.ACTION, Genre.ADVENTURE];
  public selectdGenres: Genre[] = [];
  public Type = Type;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) { this.movie = data; }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []]});
  }

  save() {
    this.dialogRef.close(this.movie);
  }

  remove(genre: Genre) {
    this.selectdGenres = this.selectdGenres.filter((item: Genre) => item !== genre);
  }

  addGenre(genre: Genre) {
    if (this.selectdGenres.indexOf(genre) < 0) {
      this.selectdGenres.push(genre);
    }
  }

}
