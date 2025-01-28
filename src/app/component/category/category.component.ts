import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../model';

@Component({
  selector: 'app-category',
  imports: [FormsModule, NgFor],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent  implements OnInit{

  public constructor(private categoryService: CategoryService){
  }

  categories: Category[] = [];

  successMessage = '';
  errorMessage = '';

  newCategory : Category = {
    id: 0,
    name: '',
    description: '',
  };

  showCategory : Category | null = {
    id: 0,
    name: '',
    description: '',
  };

  ngOnInit(): void {
    this.getAllsCategorys();
  }

  public getAllsCategorys(){
    this.categoryService.getCategories().subscribe({
      next : (value) => {
        this.categories = value;
        console.log(value)
      },
      error : (err) => {
          this.errorMessage = 'Erreur de chargement de liste'
          console.log("ERREUR : " + err)
      },
    })
  }


  openModal(id: string, name: string, decription: string) {
    const modal = document.getElementById('categoryModal');
    if (modal) modal.classList.add('show');
  }

  addCategory() {
    const Category = { ...this.newCategory };
  
    this.categoryService.addCategory(Category).subscribe({
      next: () => {
        this.successMessage = "Categorie ajouté avec succès !";
        this.newCategory = {id : 0, 
          name : 'MAT12', 
          description: '', 
        }; // Réinitialiser le formulaire
        window.location.reload(); // Rafraîchir la page après ajout
      },
      error: (err) => {
        this.errorMessage = "Échec de l'ajout : " + err.error.message;
      },
    });
  }
  

  updateCategory(id: number | null, category: Category | null){
    if (id && category) {    
      this.categoryService.updateCategory(id, category).subscribe({
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
      this.categoryService.getCategoryById(id).subscribe({
        next:(value) =>{
            this.showCategory = value;
        },
      })
    }
  }

  onDelete(id?: number|null) {
    if (id) {
      this.categoryService.deleteCategory(id).subscribe({
        next:() =>{
          this.getAllsCategorys();
          this.successMessage = "Category Modifier avec succes !"
        },
        error :(err) => {
            this.errorMessage = "Echec de la modification " + err;
        },
      });
    }
  }



}
