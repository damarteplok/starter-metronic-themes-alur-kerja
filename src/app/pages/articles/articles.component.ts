import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ArticlesService} from './articles.service';
import {IFilterView, IPaginatorView, ISortView, PaginatorState, SortState} from '../../_metronic/shared/crud-table';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseCrudPagesComponent} from '../shared/component/base-crud-pages.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteArticlesModalComponent} from './components/delete-articles-modal/delete-articles-modal.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent extends BaseCrudPagesComponent {

  constructor(
      public tableService: ArticlesService,
      protected fb: FormBuilder,
      private modalService: NgbModal,
  ) {
    super(tableService, fb);
  }

  delete(id: number) {  // +
    const modalRef = this.modalService.open(DeleteArticlesModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => this.tableService.fetch(), () => {});
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
