import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  // creation de la nouvelle compte
  createNewUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        )
      }
    );
  }

  // creer une methode permettant de connecter si le compte est deja existe
  signin(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error: any) => {
            reject(error);
          }
        )
      }
    );
  }

  // Deconnexion
  signOut() {
    firebase.auth().signOut();
  }

}
