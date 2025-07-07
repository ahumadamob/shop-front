import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action">Gestionar Productos</a>
          <a href="#" class="list-group-item list-group-item-action">Ver Ventas</a>
          <a href="#" class="list-group-item list-group-item-action">Configuraci\u00f3n</a>
        </div>
      </div>
      <div class="col">
        <h1>Administrador</h1>
        <p>Seleccione una opci\u00f3n del men\u00fa.</p>
      </div>
    </div>
  `,
  styles: []
})
export class AdminComponent {}
