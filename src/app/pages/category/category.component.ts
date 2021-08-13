import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFilterView, IPaginatorView, ISortView, PaginatorState, SortState} from '../../_metronic/shared/crud-table';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryService} from './category.service';
import {BaseCrudPagesComponent} from '../shared/component/base-crud-pages.component';
import {ArticlesService} from '../articles/articles.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseCrudPagesComponent {

  constructor(
      public tableService: CategoryService,
      protected fb: FormBuilder
  ) {
    super(tableService, fb);
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      name: ['']
    });
    this.subscriptions.push(
        this.filterGroup.controls.name.valueChanges.subscribe(() =>
            this.filter()
        )
    );
  }

  filter() {
    const filter = {};
    const name = this.filterGroup.get('name').value;
    if (name) {
      filter['name'] = name;
    }
    this.tableService.patchState({ filter });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
