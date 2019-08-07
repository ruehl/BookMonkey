import { BookFactory } from './book-factory';
import { BookRaw } from './book-raw';
import { Book } from './book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private api = "https://api3.angular-buch.com";

  constructor(private httpClient: HttpClient) { }

  books: Book[] = [];

  getAll(): Observable<Book[]> {
    return this.httpClient.get<BookRaw[]>(`${this.api}/books`)
    .pipe(
      map(booksRaw => booksRaw.map(b => BookFactory.fromRaw(b)))
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.httpClient.get<BookRaw>(`${this.api}/book/${isbn}`)
    .pipe(
      map(b => BookFactory.fromRaw(b))
    );
  }

  remove(isbn: string): Observable<any> {
    return this.httpClient.delete(`${this.api}/book/${isbn}`, { responseType: 'text'});
  }
}
