import { BookStoreService } from './../shared/book-store.service';
import { Book } from './../shared/book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.bookStoreService.getAll().subscribe( res => {
      this.books = res;
    });
  }

}
