import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-primary mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">ShopFront</a>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" routerLink="/admin">Administrador</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {}
