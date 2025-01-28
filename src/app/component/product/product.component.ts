import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../model';

@Component({
  selector: 'app-product',
  imports: [FormsModule, NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  public constructor(private productService: ProductService){
  }

  products: Product[] = [];

  successMessage = '';
  errorMessage = '';

  newProduct : Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
  };

  showProduct : Product | null = {
    id: 0,
    name: '',
    price: 0,
    description: '',
  };

  ngOnInit(): void {
    this.getAllsProducts();
  }

  public getAllsProducts(){
    this.productService.getProducts().subscribe({
      next : (value) => {
        this.products = value;
        console.log(value)
      },
      error : (err) => {
          this.errorMessage = 'Erreur de chargement de liste'
          console.log("ERREUR : " + err)
      },
    })
  }


  openModal(id: string, name: string, price: number, decription: string) {
    const modal = document.getElementById('productModal');
    if (modal) modal.classList.add('show');
  }

  addProduct() {
    const product = { ...this.newProduct };
  
    this.productService.addProduct(product).subscribe({
      next: () => {
        this.successMessage = "Étudiant ajouté avec succès !";
        this.newProduct = {id : 0, 
          name : 'MAT12', 
          price : 0, 
          description: '', 
        }; // Réinitialiser le formulaire
        window.location.reload(); // Rafraîchir la page après ajout
      },
      error: (err) => {
        this.errorMessage = "Échec de l'ajout : " + err.error.message;
      },
    });
  }
  

  updateProduct(id: number | null, product: Product | null){
    if (id && product) {    
      this.productService.updateProduct(id, product).subscribe({
        next:() =>{
          this.successMessage = "Produit Modifier avec succes !";
          window.location.reload();
        },
        error :(err) => {
            this.errorMessage = "Echec de la modification " + err;
        },
      })
    }
  }

  onEdit(id?: number|null){
    if (id) {
      this.productService.getProductById(id).subscribe({
        next:(value) =>{
            this.showProduct = value;
        },
      })
    }
  }

  onDelete(id?: number|null) {
    if (id) {
      this.productService.deleteProduct(id).subscribe({
        next:() =>{
          this.getAllsProducts();
          this.successMessage = "Product Modifier avec succes !"
        },
        error :(err) => {
            this.errorMessage = "Echec de la modification " + err;
        },
      });
    }
  }



}
