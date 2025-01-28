import { Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { CategoryComponent } from './component/category/category.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [

  { path: '', component:HomeComponent },
  { path: 'products', component:ProductComponent },
  { path: 'categories', component: CategoryComponent },
];
