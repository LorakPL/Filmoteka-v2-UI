import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import { Element } from '../model/Element';
import { ItemService } from '../service/item.service';
import { Item } from '../model/Item';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private http: HttpClient, private itemService: ItemService) { }

  items: Item[] = [];
  value = '';

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
    /*
    this.items = ItemService.getDataFromApi();
    console.log('Test');
    console.log(this.items);
    */
  }

  search() {
    // alert(this.value);
    if (this.value.length > 1) {
      this.items = [];
      this.items = this.itemService.getDataFromApi(this.value);
      console.log(this.value);
      console.log(this.items);
      // const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
      // httpClient.get('http://localhost:8080/filmoteka/getAllItems/' + this.value).subscribe(data => {
      //   this.items = data as Item[];
      //   console.log(this.value);
      //   console.log('data: ' + JSON.stringify(data));
      // });
    }
  }
}
