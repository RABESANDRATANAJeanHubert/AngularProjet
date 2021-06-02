import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/books.model';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book!: Book;

  constructor(private bookservice: BooksService,
              private router: Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.book = new Book('title', 'author');
    const id = this.route.snapshot.params['id'];
    this.bookservice.getSingleBook(+id).then(

     () => {
      return this.book;
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
