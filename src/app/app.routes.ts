import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AdminComponent } from './admin/admin.component';
import { CategoriaListComponent } from './admin/categoria-list.component';
import { CategoriaFormComponent } from './admin/categoria-form.component';
import { AdminHomeComponent } from './admin/admin-home.component';
import { ProductoListComponent } from './admin/producto-list.component';
import { ProductoFormComponent } from './admin/producto-form.component';
import { CatalogoAtributoListComponent } from './admin/catalogo-atributo-list.component';
import { CatalogoAtributoFormComponent } from './admin/catalogo-atributo-form.component';

export const appRoutes: Routes = [
  { path: '', component: CatalogComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'categoria', component: CategoriaListComponent },
      { path: 'categoria/nueva', component: CategoriaFormComponent },
      { path: 'categoria/:id', component: CategoriaFormComponent },
      { path: 'producto', component: ProductoListComponent },
      { path: 'producto/nuevo', component: ProductoFormComponent },
      { path: 'producto/:id', component: ProductoFormComponent },
      { path: 'catalogo-atributo', component: CatalogoAtributoListComponent },
      { path: 'catalogo-atributo/nuevo', component: CatalogoAtributoFormComponent },
      { path: 'catalogo-atributo/:id', component: CatalogoAtributoFormComponent }
    ]
  }
];
