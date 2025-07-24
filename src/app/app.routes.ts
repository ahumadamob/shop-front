import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AdminComponent } from './admin/admin.component';
import { CategoriaListComponent } from './admin/categoria-list.component';
import { AdminHomeComponent } from './admin/admin-home.component';

export const appRoutes: Routes = [
  { path: '', component: CatalogComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'categoria', component: CategoriaListComponent }
    ]
  }
];
