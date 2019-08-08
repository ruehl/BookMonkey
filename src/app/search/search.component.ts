import { BookStoreService } from './../shared/book-store.service';
import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  foundBooks: Book[] = [];
  keyUp$ = new Subject<string>();
  isLoading = false;

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.keyUp$
    .pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bookStoreService.search(searchTerm)),
      tap(() => this.isLoading = false)
    ).subscribe(books => this.foundBooks = books);
  }

}
