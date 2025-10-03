import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface Product {
  _id: number;
  name: string;
  cost: number;
  color: string;
  company: string;
}


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products = signal<Product[]>([]);

  constructor(private router: Router) { }

  ngOnInit() {
    fetch('http://localhost:3000/api/products') // Replace with your actual API endpoint
      .then(res => res.json())
      .then(data => {
        // console.log('API response:', data); // Log the response
        this.products.set(data);
        console.log('Products set to:', this.products());
      });

  }

  showAddProduct() {
    this.router.navigate(['/add-product']); // Navigate to add-product route

  }

  editProduct(id: number) {
    this.router.navigate(['/edit-product', id]); // Navigate to edit-product route with product ID
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (res.status === 200) {
            alert('Product deleted successfully.');
            this.ngOnInit(); // Refresh the product list
          }
        }
        )
    };
  }
}