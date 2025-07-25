import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action">Gestionar Productos</a>
          <a href="#" class="list-group-item list-group-item-action">Ver Ventas</a>
          <a href="#" class="list-group-item list-group-item-action">Configuraci\u00f3n</a>
          <a routerLink="categoria" class="list-group-item list-group-item-action">Categoria</a>
        </div>
      </div>
      <div class="col">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class AdminComponent {}
