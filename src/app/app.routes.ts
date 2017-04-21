import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailsComponent } from './product-details.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
