import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItemService} from '../service/item.service';
import {Item} from '../model/Item';
import {Movie} from '../model/Movie';
import * as constants from '../model/constants';
import {MatPaginator, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {




  constructor(private http: HttpClient, private itemService: ItemService) {
  }
  displayedColumns = ['Title'];
  value: string;
  movies: Movie[] = [];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {}
  search() {
    // alert(this.value);
    // @ts-ignore
    if (this.value.length > 1) {
      // this.items = [];
      this.itemService.getMovies(this.value).subscribe(data => {
        this.movies = data as Movie[];
        this.dataSource = new MatTableDataSource<Movie>(this.movies);
        this.dataSource.paginator = this.paginator;
      });
      console.log(this.movies);
    } else {
      this.movies = [];
    }
  }

  getPosterSrcPath(poster_path: string) {
    return constants.poster_url + poster_path;
  }
}
