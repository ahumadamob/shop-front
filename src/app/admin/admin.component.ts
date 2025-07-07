import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <h1>Administrador</h1>
    <ul>
      <li><a href="#">Gestionar Productos</a></li>
      <li><a href="#">Ver Ventas</a></li>
      <li><a href="#">Configuraci\u00f3n</a></li>
    </ul>
  `,
  styles: []
})
export class AdminComponent {}
