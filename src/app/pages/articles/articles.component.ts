import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ArticlesService} from './articles.service';
import {IFilterView, IPaginatorView, ISortView, PaginatorState, SortState} from '../../_metronic/shared/crud-table';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy, ISortView, IFilterView, IPaginatorView {
  isLoading: boolean;
  private subscriptions: Subscription[] = [];
  filterGroup: FormGroup;
  sorting: SortState;
  paginator: PaginatorState;

  constructor(
      public tableService: ArticlesService,
      private fb: FormBuilder
  ) { }

  paginate(paginator: PaginatorState) {
    this.tableService.patchState({ paginator });
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
