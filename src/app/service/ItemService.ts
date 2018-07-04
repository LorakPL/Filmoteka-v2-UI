import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import {Item} from '../model/Item';

export class ItemService {

  constructor() {}

  static items: Item[];

  static getDataFromApi(value: string): Item[] {
    const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    httpClient.get('http://localhost:8080/getAllItems/' + value).subscribe(data => {
      this.items = data as Item[];
      console.log('Metoda');
      console.log(this.items);
    });
    return this.items;
  }
}


