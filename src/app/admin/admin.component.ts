import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="d-flex">
      <nav class="navbar navbar-expand-lg bg-body-tertiary flex-column align-items-start p-3" style="min-width: 250px;">
        <a class="navbar-brand" href="#">Admin</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse w-100" id="navbarColor04">
          <ul class="navbar-nav flex-column me-auto w-100">
            <li class="nav-item">
              <a class="nav-link active" routerLink=".">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="categoria">Categoria</a>
            </li>
          </ul>
          <form class="d-flex w-100 mt-auto">
            <input class="form-control me-sm-2" type="search" placeholder="Search" />
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div class="flex-grow-1 p-3">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class AdminComponent {}
