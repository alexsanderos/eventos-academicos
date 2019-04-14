import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators  } from '@angular/forms';

import { Agenda } from 'src/app/models/agenda';

@Component({
  selector: 'app-modal-adiciona-agenda',
  templateUrl: './modal-adiciona-agenda.component.html',
  styleUrls: ['./modal-adiciona-agenda.component.css']
})
export class ModalAdicionaAgendaComponent implements OnInit {

  agendamento: Agenda = new Agenda; 

  adicionaForm = this.fb.group({
    dataInicial: [null, Validators.required],
    dataFinal: [null, Validators.required],
    horaInicial: [null, Validators.required],
    horaFinal: [null, Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: [],
    private dialogRef: MatDialogRef<ModalAdicionaAgendaComponent>,
     private fb: FormBuilder) {  }

  ngOnInit() {

  }

  adicionar() {
    if( this.adicionaForm.dirty && this.adicionaForm.valid ) {
      var dataInicial = this.adicionaForm.get('dataInicial').value;
      var horaMin = this.adicionaForm.get('horaInicial').value.split(":");
      var h = horaMin[0];
      var m = horaMin[1];
      dataInicial.setHours(h);
      dataInicial.setMinutes(m);

      var dataFinal = this.adicionaForm.get('dataFinal').value;
      horaMin = this.adicionaForm.get('horaFinal').value.split(":");
      var h = horaMin[0];
      var m = horaMin[1];
      dataFinal.setHours(h);
      dataFinal.setMinutes(m);

      this.agendamento.dataInicial = dataInicial;
      this.agendamento.dataFinal = dataFinal;
      this.dialogRef.close(this.agendamento);
    }
  }

}
