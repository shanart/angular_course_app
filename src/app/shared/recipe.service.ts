import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "./ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'Hamburger', 
            'Super large hamburger', 
            'https://images7.alphacoders.com/297/297530.jpg',
            [
                new Ingredient('Bread', 2),
                new Ingredient('Meat', 1)
            ],
        ),
        new Recipe(
            'Sauce Salsa', 
            'sauce salsa recipe', 
            'https://i2.wp.com/www.cookme-shop.com/blog/wp-content/uploads/2018/03/sauce-salsa.jpg',
            [
                new Ingredient("Tomato", 5),
                new Ingredient('Spice', 2)
            ],
        ),
        new Recipe(
            'Pizza New York', 
            'Pizza New York recipe', 
            'https://afar-production.imgix.net/uploads/images/afar_post_headers/images/kKxmVMAY19/original_Robertas_MilleniumFalco2.jpg',
            [
                new Ingredient('Cheese', 1),
                new Ingredient('Tomato', 1),
                new Ingredient('Pizza', 1)
            ],
        ),
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }
}