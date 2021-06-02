import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

    const firebaseConfig = {
      apiKey: "AIzaSyBJFkbp2DtTwiDjFj6jwgKSJvE8KM-2oEM",
      authDomain: "backend-f1fff.firebaseapp.com",
      databaseURL: "https://backend-f1fff-default-rtdb.firebaseio.com",
      projectId: "backend-f1fff",
      storageBucket: "backend-f1fff.appspot.com",
      messagingSenderId: "948901458743",
      appId: "1:948901458743:web:79e0e4a4fea67e168aa0b2",
      measurementId: "G-C7H21PGKC9"
    };
    firebase.initializeApp(firebaseConfig);
  }

}
