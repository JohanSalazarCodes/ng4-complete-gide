import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent { 

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simple a test', 
    'https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Airfryer-hero-image-2a442a6.jpg?quality=90&resize=504%2C458')
  ];
  

}
