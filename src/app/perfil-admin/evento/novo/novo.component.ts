import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {

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
