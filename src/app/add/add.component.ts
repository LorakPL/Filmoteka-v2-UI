import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItemService} from '../service/item.service';
import {Item} from '../model/Item';
import {Movie} from '../model/Movie';
import * as constants from '../model/constants';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {DialogComponent} from '../components/dialog/dialog.component';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {




  constructor(private http: HttpClient, private itemService: ItemService, private dialog: MatDialog) {
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
        console.log(this.movies);
      });
    } else {
      this.movies = [];
    }
  }

  openDialog(movie: Movie) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = movie;

    this.dialog.open(DialogComponent, dialogConfig).afterClosed().subscribe((item: Movie) => console.log(item));
  }
}
