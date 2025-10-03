import { Routes } from '@angular/router';
import { AddProduct } from './components/add-product/add-product';

import { ProductList } from './components/product-list/product-list';
import { EditProduct } from './components/edit-product/edit-product';
export const routes: Routes = [
    { path: '', component: ProductList },
    { path: 'add-product', component: AddProduct },
    { path: 'edit-product/:id', component: EditProduct },
];
