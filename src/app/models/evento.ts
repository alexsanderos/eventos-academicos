import { Agenda } from './agenda';
import { Categoria } from './categoria';

export class Evento {
    id: string;
    titulo: string;
    subtitulo: string;
    idCategoria: string;
    vagas: number;
    descricaoCurta: string;
    descricaoLonga: string;
    agendamentos: Agenda[];
    categoria: Categoria
  }