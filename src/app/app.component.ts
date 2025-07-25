import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="preview-bar bg-white fixed-top py-2 border-bottom-primary">
      <div class="container-fluid h-100">
        <div class="row align-items-center justify-content-between h-100">
          <div class="col-auto col-lg">
            <a class="btn btn-transparent-dark btn-sm" routerLink="/">
              <i class="fas fa-arrow-left me-1"></i>
              Overview Page
            </a>
          </div>
          <div class="col col-auto d-none d-xl-block">
            <div class="responsive-toggler justify-content-center">
              <button class="btn btn-icon btn-transparent-dark mx-1 active">
                <i class="fas fa-desktop"></i>
              </button>
              <button class="btn btn-icon btn-transparent-dark mx-1">
                <i class="fas fa-tablet-alt"></i>
              </button>
              <button class="btn btn-icon btn-transparent-dark mx-1">
                <i class="fas fa-mobile-alt"></i>
              </button>
            </div>
          </div>
          <div class="col text-end">
            <a
              class="btn btn-transparent-dark btn-sm me-2"
              href="https://github.com/StartBootstrap/startbootstrap-sb-admin-2"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              class="btn btn-primary-soft text-primary btn-sm d-none d-sm-inline-block me-2"
              href="https://github.com/StartBootstrap/startbootstrap-sb-admin-2/archive/gh-pages.zip"
            >
              <i class="fas fa-download me-1"></i>
              Free Download
            </a>
            <button class="btn btn-transparent-dark btn-sm btn-icon">
              <i class="fas fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand navbar-light bg-white topbar shadow mt-5">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">ShopFront</a>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" routerLink="/admin">Administrador</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {}
