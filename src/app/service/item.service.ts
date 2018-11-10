import {Injectable} from '@angular/core';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import {Item} from '../model/Item';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  private items: Item[];

  public getDataFromApi(value: string): Item[] {
    const httpClient = new HttpClient(new HttpXhrBackend({build: () => new XMLHttpRequest()}));
    httpClient.get('http://localhost:8080/filmoteka/getAllItems/' + value).subscribe(data => {
      this.items = data as Item[];
    });
    return this.items;
  }

  public getMovies(value: string): Observable<any> {
    return this.http.get('http://localhost:8080/filmoteka/api/films/' + value);

  }

}
