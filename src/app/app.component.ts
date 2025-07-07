import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <span class="spacer"></span>
      <button routerLink="/admin">Administrador</button>
    </nav>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {}
