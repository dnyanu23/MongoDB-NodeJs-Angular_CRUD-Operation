import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit {

  editForm!: FormGroup;
  productId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form with empty/default values
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      cost: [null, [Validators.required, Validators.min(1)]],
      company: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      // Fetch product data by id
      fetch(`http://localhost:3000/api/products/${this.productId}`)
        .then(res => res.json())
        .then(product => {
          this.editForm.patchValue({
            name: product.name,
            cost: product.cost,
            company: product.company,
            color: product.color
          });
        });
    });

  }

  onSubmit() {
    if (this.editForm.valid) {
      fetch(`http://localhost:3000/api/products/${this.productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.editForm.value)
      })
        .then(res => res.json())
        .then(data => {
          console.log('Product updated:', data);
          alert('Product updated successfully.');
          this.router.navigate(['']);
        })
        .catch(err => {
          console.error('Error updating product:', err);
        });
    }
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
