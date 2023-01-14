import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, withLatestFrom, concatMap } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";
import { of } from "rxjs";

@Injectable()
export class RecipeEffects {

  fetchRecipes = createEffect(() =>
  this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() =>this.http.get<Recipe[]>(
        'https://ng-complete-guide-66395-default-rtdb.firebaseio.com/recipes.json')),
    map(recipes => new RecipesActions.SetRecipes(
      recipes
        ? recipes.map(recipe => ({ ingredients: [], ...recipe }))
        : []
      )
    )
  ),
  //{ dispatch: false }

);

storeRecipes$ = createEffect(
  () => {
      return this.actions$.pipe(
          ofType(
              RecipesActions.STORE_RECIPES
          ),

          concatMap(
              (action) => {
                  return of(action).pipe(
                      withLatestFrom(
                          this.store.select('recipes')
                      )
                  );
              }
          ),

          switchMap(
              ([_actionData, recipesState]) => {
                  return this.http.put(
                      'https://ng-complete-guide-66395-default-rtdb.firebaseio.com/recipes.json',
                      recipesState.recipes
                  );
              }
          )
      );
  },

  {dispatch: false}
);

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
