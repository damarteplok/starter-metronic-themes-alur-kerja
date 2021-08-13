import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ArticlesService} from './articles.service';
import {IFilterView, IPaginatorView, ISortView, PaginatorState, SortState} from '../../_metronic/shared/crud-table';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseCrudPagesComponent} from '../shared/component/base-crud-pages.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent extends BaseCrudPagesComponent {

  constructor(
      public tableService: ArticlesService,
      protected fb: FormBuilder
  ) {
    super(tableService, fb);
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      title: ['']
    });
    this.subscriptions.push(
        this.filterGroup.controls.title.valueChanges.subscribe(() =>
            this.filter()
        )
    );
  }

  filter() {
    const filter = {};
    const title = this.filterGroup.get('title').value;
    if (title) {
      filter['title'] = title;
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
