import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Element } from '../model/Element';
import { ItemService } from '../service/ItemService';
import { Item } from '../model/Item';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private http: HttpClient) { }

  items: Item[];

  ngOnInit() {
    /*
    this.http.get('http://localhost:8080/elements/gwiezdne').subscribe(data => {
      // console.log(data);
      this.elements = data as Element[];
      console.log(this.elements);
    });
    */
    // this.changePhoto();
  }

  test() {
    this.items = ItemService.getDataFromApi();
    console.log('Test');
    console.log(this.items);
  }
}
