import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from './category.service';
import {BaseCrudPagesComponent} from '../shared/component/base-crud-pages.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteCategoryModalComponent} from './components/delete-category-modal/delete-category-modal.component';
import {EditCategoryModalComponent} from './components/edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseCrudPagesComponent {

  constructor(
      public tableService: CategoryService,
      protected fb: FormBuilder,
      private modalService: NgbModal,
  ) {
    super(tableService, fb);
  }

  create() {
    this.edit(undefined);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(EditCategoryModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
            this.tableService.fetch(),
        () => { }
    );
  }

  delete(id: number) {
    const modalRef = this.modalService.open(DeleteCategoryModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => this.tableService.fetch(), () => {});
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
