import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {IFilterView, IPaginatorView, ISortView, PaginatorState, SortState} from '../../../_metronic/shared/crud-table';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ArticlesService} from '../../articles/articles.service';

@Component({
    selector: 'app-base-crud-pages',
    template: ``,
    styles: [],
})

export class BaseCrudPagesComponent implements OnInit, OnDestroy, ISortView, IFilterView, IPaginatorView {
    isLoading: boolean;
    public subscriptions: Subscription[] = [];
    filterGroup: FormGroup;
    sorting: SortState;
    paginator: PaginatorState;

    constructor(
        @Inject('') protected tableService: any,
        protected fb: FormBuilder
    ) { }

    paginate(paginator: PaginatorState) {
        this.tableService.patchState({ paginator });
    }

    // OVERRIDE THIS FOR FILTER
    filterForm() {

    }

    // OVERRIDE THIS FOR FILTER
    filter() {

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
