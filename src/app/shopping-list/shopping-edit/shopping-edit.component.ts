
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import  * as ShoppingListActions  from "../store/shopping-list.actions";
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static:false}) slForm: NgForm;
  suscription: Subscription;
  editMode = false;
  editedItem: Ingredient;


  constructor(private store: Store<fromApp.AppState>) { }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
   }
  ngOnInit(): void {

    this.suscription = this.store.select('shoppingList')
    .subscribe( stateData => {
      if (stateData.editedIngredientIndex > -1){

        this.editMode = true;
        this.editedItem = stateData.editedIngredient;

        console.log(stateData);
        console.log(this.slForm);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
      else{
        this.editMode = false;
      }
    });


  }

  onSubmit(form: NgForm) {

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }



}
