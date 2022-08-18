import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe | undefined;
  id: number | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDetail = this.recipeService.findRecipeById(this.id);
    })
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    // alternatywnie:
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute});
  }
}
