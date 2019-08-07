import { BookRaw } from './book-raw';
export class BookFactory {
  static fromRaw(b: BookRaw) {
    return {
      ...b,
      published: new Date(b.published)
    };
  }
}
