import { BookFactory } from './book-factory';
import { BookRaw } from './book-raw';
import { Book } from './book';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private api = 'http://localhost:3000/secure';

  constructor(private httpClient: HttpClient) { }

  books: Book[] = [];

  getAll(): Observable<Book[]> {
    return this.httpClient.get<BookRaw[]>(`${this.api}/books`)
    .pipe(
      retry(3),
      map(booksRaw => booksRaw.map(b => BookFactory.fromRaw(b))),
      catchError(this.errorHandler)
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.httpClient.get<BookRaw>(`${this.api}/book2/${isbn}`)
    .pipe(
      retry(3),
      map(b => BookFactory.fromRaw(b)),
      catchError(this.errorHandler)
    );
  }

  remove(isbn: string): Observable<any> {
    return this.httpClient.delete(`${this.api}/book/${isbn}`, { responseType: 'text'});
  }

  search(term: string): Observable<Book[]> {
    return this.httpClient.get<BookRaw[]>(`${this.api}/books/search/${term}`)
    .pipe(
      retry(3),
      map(booksRaw => booksRaw.map ( b => BookFactory.fromRaw(b) )),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten.');
    return throwError(error);
  }
}
