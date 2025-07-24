import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Categorías</h2>
    <table class="table table-bordered" *ngIf="categorias.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of categorias">
          <td>{{ c.id }}</td>
          <td>{{ c.nombre }}</td>
        </tr>
      </tbody>
    </table>
    <p *ngIf="!categorias.length">No hay categorias.</p>
  `,
  styles: []
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(data => this.categorias = data);
  }
}
