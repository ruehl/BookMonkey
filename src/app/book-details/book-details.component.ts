import { BookStoreService } from './../shared/book-store.service';
import { Book } from './../shared/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;

  constructor(private activatedRoute: ActivatedRoute, private bookStore: BookStoreService) { }

  ngOnInit() {
    const isbn = this.activatedRoute.snapshot.paramMap.get('isbn');
    this.book = this.bookStore.getSingle(isbn);
  }

  getRating(num: number) {
    return new Array(num);
  }
}
