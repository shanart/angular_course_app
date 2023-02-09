import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number = 0;
    editMode?: boolean = false;
    recipeForm: FormGroup = new FormGroup({
        'name': new FormControl(),
        'description': new FormControl(),
        'imagePath': new FormControl(),
        'ingredients': new FormArray<any>([
            new FormGroup({
                'name': new FormControl(),
                'amount': new FormControl()
            })
        ])
    });

    constructor(private route: ActivatedRoute,
        private recipeService: RecipeService) { }

    ngOnInit(): void {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    this.editMode = params['id'] != null;
                    this.initForm();
                }
            )
    }

    private initForm() {
        let recipeName = '';
        let recipeDescription = '';
        let imagePath = '';
        let recipeIngredients = new FormArray<any>([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeDescription = recipe.description;
            imagePath = recipe.imagePath;

            if (recipe['ingredients']) {
                for (let ingredient of recipe['ingredients']) {
                    recipeIngredients.push(
                        new FormGroup({
                            'name': new FormControl(ingredient.name),
                            'amount': new FormControl(ingredient.amount)
                        })
                    )
                }
            }
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName),
            'description': new FormControl(recipeDescription),
            'imagePath': new FormControl(imagePath),
            'ingredients': recipeIngredients
        })
    }

    onSubmit() {
        console.log(this.recipeForm);
    }

    onAddIngredient() {
        if (this.recipeForm) {
            (<FormArray>this.recipeForm.get('ingredients')).push(
                new FormGroup({
                    'name': new FormControl(),
                    'amount': new FormControl()
                })
            )
        }
    }

    getIngredientsFormArray() {
        console.log((this.recipeForm.get('ingredients') as FormArray).controls);
        return (this.recipeForm.get('ingredients') as FormArray).controls
    }
}
