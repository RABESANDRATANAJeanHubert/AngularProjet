import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;
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
    this.signInForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {

    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;
    this.AuthService.signin(email, password).then(

      () => {
        this.route.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  };

}
