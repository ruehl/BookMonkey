import { BookStoreService } from './../shared/book-store.service';
import { Book } from './../shared/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookStore: BookStoreService,
    private router: Router
  ) {

  }

  ngOnInit() {
    const isbn = this.activatedRoute.snapshot.paramMap.get('isbn');
    this.bookStore.getSingle(isbn).subscribe(res => {
      this.book = res;
    });
  }

  getRating(num: number) {
    return new Array(num);
  }

  removeBook() {
    if (confirm('Buch wirklich löschen?')) {
      this.bookStore.remove(this.book.isbn).subscribe(res => {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      });
    }
  }
}
