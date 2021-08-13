import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFilterView, IPaginatorView, ISortView, PaginatorState, SortState} from '../../_metronic/shared/crud-table';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryService} from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy, ISortView, IFilterView, IPaginatorView {

  isLoading: boolean;
  private subscriptions: Subscription[] = [];
  filterGroup: FormGroup;
  sorting: SortState;
  paginator: PaginatorState;

  constructor(
      public tableService: CategoryService,
      private fb: FormBuilder
  ) { }

  paginate(paginator: PaginatorState) {
    this.tableService.patchState({ paginator });
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

  sort(column: string): void {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.tableService.patchState({ sorting });
  }

  ngOnInit(): void {
    this.filterForm();
    this.tableService.fetch();
    const sb = this.tableService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb);
    this.sorting = this.tableService.sorting;
    this.paginator = this.tableService.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

}
