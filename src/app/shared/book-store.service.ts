import { Book } from './book';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor() { }

  books: Book[] = [
    {
      isbn: '332323232233',
      title: 'Angular',
      authors: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'],
      published: new Date(2019, 4, 30),
      subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practives - mit NativeScript und NgRx',
      rating: 5,
      thumbnails: [{
        url: 'https://ng-buch.de/buch1.jpg',
        title: 'Buchcover'
      }],
      description: 'Die Autoren führen Sie mit einem ansprichsvollen Beispielprojekt durch die Welt von Angular...'
    }, {
      isbn: '332323234213',
      title: 'Superstar Angular',
      authors: ['Christian Rühl', 'Markus Schramm', 'Heiko Barth'],
      published: new Date(2019, 6, 30),
      subtitle: 'Profi Know-how für Angular-Entwickler',
      rating: 5,
      thumbnails: [{
        url: 'https://ng-buch.de/buch2.jpg',
        title: 'Buchcover'
      }],
      description: 'Besser geht es nicht: das ultimative Buch zu Angular, geschrieben von den besten Entwicklern der Welt...'
    }
  ];

  getAll(): Book[] {
    return this.books;
  }

  getSingle(isbn: string): Book {
    return this.books.find(book => book.isbn === isbn);
  }
}
