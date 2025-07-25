import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Administrador</h1>
    <p>Seleccione una opción del menú.</p>
  `,
  styles: []
})
export class AdminHomeComponent {}
