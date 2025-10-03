import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      cost: [null, [Validators.required, Validators.min(1)]],
      company: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
        .then(res => res.json())
        .then(data => {
          console.log('Product added:', data);
          alert('Product added successfully.');
          this.router.navigate(['']); // Navigate to home after successful add
        })
        .catch(err => {
          console.error('Error adding product:', err);
        });
    }
  }

  BacktoHome() {
    this.router.navigate(['']); // Navigate to add-product route
  }
}
