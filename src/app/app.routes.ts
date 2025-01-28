import { Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { CategoryComponent } from './component/category/category.component';

export const routes: Routes = [

  { path: 'products', component:ProductComponent },
  { path: 'categories', component: CategoryComponent },
];
