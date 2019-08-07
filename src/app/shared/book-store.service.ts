import { Book } from './book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private api = "https://api3.angular-buch.com";

  constructor(private httpClient: HttpClient) { }

  books: Book[] = [];

  getAll(): Observable<Book[]> {
    return this.httpClient.get<any[]>(`${this.api}/books`);
  }

  getSingle(isbn: string): Observable<Book> {
    return this.httpClient.get<any>(`${this.api}/book/${isbn}`);
  }

  remove(isbn: string): Observable<any> {
    return this.httpClient.delete(`${this.api}/book/${isbn}`, { responseType: 'text'});
  }
}
