import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    nome: [null, Validators.required],
    email: [null, Validators.required]
  });


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
