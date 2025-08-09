import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="d-flex">
      <nav class="bg-light p-3" style="min-width: 200px;">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a routerLink="categoria" class="nav-link">Categoria</a>
          </li>
          <li class="nav-item">
            <a routerLink="producto" class="nav-link">Producto</a>
          </li>
          <li class="nav-item">
            <a routerLink="catalogo-atributo" class="nav-link">Catálogo Atributo</a>
          </li>
        </ul>
      </nav>
      <div class="flex-grow-1 p-3">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class AdminComponent {}
