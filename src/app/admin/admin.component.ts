import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div id="wrapper">
      <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a class="sidebar-brand d-flex align-items-center justify-content-center" routerLink="/admin">
          <div class="sidebar-brand-text mx-3">Admin</div>
        </a>
        <hr class="sidebar-divider my-0" />
        <li class="nav-item">
          <a class="nav-link" href="#">Gestionar Productos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Ver Ventas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Configuración</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="categoria">Categoria</a>
        </li>
        <hr class="sidebar-divider d-none d-md-block" />
      </ul>

      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 shadow">
            <button
              id="sidebarToggleTop"
              class="btn btn-link d-md-none rounded-circle me-3"
            >
              <i class="fa fa-bars"></i>
            </button>
          </nav>
          <div class="container-fluid">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminComponent {}
