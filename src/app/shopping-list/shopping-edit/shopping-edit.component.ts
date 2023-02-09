import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../../shared/shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('f', { static: true }) slForm?: NgForm;
    sub?: Subscription;
    editMode: boolean = false;
    editingItemIndex?: number;
    editedItem?: Ingredient;

    constructor(private shoppingListService: ShoppingListService) { }

    onSubmitItem(form: NgForm) {
        if (this.editMode) {
            this.shoppingListService.updateIngredient(<number>this.editingItemIndex, new Ingredient(form.value.name, form.value.amount));
        } else {
            this.shoppingListService.addIngredient(new Ingredient(form.value.name, form.value.amount));
        }
        this.slForm?.reset();
        this.editMode = false;
    }

    ngOnInit(): void {
        this.shoppingListService.startedEditing.subscribe(
            (index: number) => {
                this.editingItemIndex = index;
                this.editMode = true;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.slForm?.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                })
            }
        );
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    onClear(): void {
        this.slForm?.reset();
    }

    onDelete(): void {
        if (this.editingItemIndex !== undefined) {
            this.shoppingListService.deleteIngredient(this.editingItemIndex);
            this.onClear();
        }
    }
}
