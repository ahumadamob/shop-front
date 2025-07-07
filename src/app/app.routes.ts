import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AdminComponent } from './admin/admin.component';

export const appRoutes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'admin', component: AdminComponent }
];
