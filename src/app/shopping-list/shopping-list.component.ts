import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    Ingredients: Ingredient[] = [];
    private igChangeSub?: Subscription;
    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.Ingredients = this.shoppingListService.getShoppingList();
        this.igChangeSub = this.shoppingListService.ingredientsChanged
            .subscribe((ingredients: Ingredient[]) => {
                this.Ingredients = ingredients;
            });
    }

    ngOnDestroy(): void {
        this.igChangeSub?.unsubscribe();
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }
}
