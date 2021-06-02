import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { AuthService } from 'src/app/service/auth.service';
require('firebase/auth');

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  errorMessage!: string;

  // Dans le constructeur nous allos instancier tous les objets venant de service
  constructor(private formBuilder: FormBuilder,
              private AuthService: AuthService,
              private route:Router) { }

  ngOnInit(): void {
    this!.initForm();
  }
  // methode permettant de creer un nouvel utilisateur ainsi que on doit instancier tous le objet dans le service
  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {

    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    this.AuthService.createNewUser(email, password).then(

      () => {
        this.route.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  };

}
