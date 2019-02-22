import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../model/Movie';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() movies: Movie[] = [];
  constructor() { }

  ngOnInit() {
  }

}
