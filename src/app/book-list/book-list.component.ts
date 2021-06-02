import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/books.model';
import { BooksService } from '../service/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit ,OnDestroy{

  books!: Book[];
  booksubscription!: Subscription;

  constructor(private bookService:BooksService,
              private route:Router) {}


  ngOnInit(): void {
    this.booksubscription = this.bookService.booksubject.subscribe(
      // ici on veut recuperer un array de type book
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.bookService.getBooks();
    this.bookService.emitBooks();
  }

  onewBook() {
    this.route.navigate(['/books', 'book-new']);
  }

  onDeleteBook(book:Book) {
    this.bookService.removeBooks(book);

  }
  oneViewBook(id: number) {
    this.route.navigate(['/books', 'view', id]);
  }
  ngOnDestroy() {
    this.booksubscription.unsubscribe();
  }

}
