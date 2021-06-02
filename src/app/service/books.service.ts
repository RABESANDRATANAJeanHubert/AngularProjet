import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/books.model';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksubject = new Subject<Book[]>();
  // C'est la methode pour emmettre le subject

  emitBooks() {
    this.booksubject.next(this.books);
  }

  // SaveBook():l methode permettant d'enregistrer les données dans la base de données
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  // La suite on utilise une methode permettant de recuperer la liste des livres


  getBooks() {

    firebase.database().ref('/books')
      .on('value', (data) => {
      // et  en deuxième argument un objet data qui contient un bojet val
      // Et s'il n'existe pas  elle retourne un valeur de tableau vide
      this.books = data.val() ? data.val() : [];
      // enfin on fait emmettre le subject
      this.emitBooks();
    });
  }

  // ici on utilise la methode permettant de recuperer un seul livre
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  //  Ici finalement on utilise une methode permettant de creer un nouveau livre
  creatNewBooks(newbook: Book) {
    // La fonction push pousse le valeur vers la base de données
    this.books.push(newbook);
    // save enregistre les listes  des donnees
    this.saveBooks();
    // Elle emmetre chaque données entré
    this.emitBooks();
  }

  // methode permettant de supprimer un livre
  removeBooks(book: Book) {
  const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
      if (bookEl === book) {
        return true;
      } else {
        return false;
      }
    }
    );
    // la methode splice va retirer la valeur de chaque livre
    this.books.splice(bookIndexToRemove);
    this.saveBooks();
    this.emitBooks();
  }
}
