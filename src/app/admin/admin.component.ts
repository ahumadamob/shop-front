import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="d-flex" id="wrapper">
      <nav id="sidebar" class="bg-dark text-white p-3">
        <h3 class="text-white">Admin</h3>
        <ul class="nav flex-column mt-4">
          <li class="nav-item">
            <a class="nav-link text-white" href="#">Gestionar Productos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#">Ver Ventas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#">Configuración</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" routerLink="categoria">Categoria</a>
          </li>
        </ul>
      </nav>

      <div id="page-content-wrapper" class="w-100">
        <nav class="navbar navbar-light bg-light border-bottom">
          <button class="btn btn-outline-primary" type="button">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        <div class="container-fluid mt-4">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminComponent {}
