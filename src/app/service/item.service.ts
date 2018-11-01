import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import {Item} from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  private items: Item[];
  public getDataFromApi(value: string): Item[] {
    const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    httpClient.get('http://localhost:8080/filmoteka/getAllItems/' + value).subscribe(data => {
      this.items = data as Item[];
    });
    return this.items;
  }

}
