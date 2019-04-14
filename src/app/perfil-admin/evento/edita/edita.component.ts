import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edita',
  templateUrl: './edita.component.html',
  styleUrls: ['./edita.component.css']
})
export class EditaComponent implements OnInit {

  categorias: any [] = []; 

  cadastroForm = this.fb.group({
    titulo: [null, Validators.required],
    subtitulo: [null, Validators.required],
    vagas: [null, Validators.required],
    categoria: [null, Validators.required],
    descricaoCurta: [''],
    descricaoLonga: ['']
  });

  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
  }

}
