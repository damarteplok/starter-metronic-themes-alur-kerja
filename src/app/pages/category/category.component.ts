import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from './category.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditCategoryModalComponent} from './components/edit-category-modal/edit-category-modal.component';
import {DeleteCategoryModalComponent} from './components/delete-category-modal/delete-category-modal.component';
import {BaseCrudPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseCrudPagesComponent {
  API_URL_TEST = `${environment.apiUrl}/crud/category`;
  constructor(
      public tableService: CategoryService,
      protected fb: FormBuilder,
      private modalService: NgbModal
  ) {
    super(tableService, fb);
  }

  create() {
    this.edit(undefined);
  }

  edit(id: number, type: string = 'edit') {
    const modalRef = this.modalService.open(EditCategoryModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = 'Category';
    const transFormArrForm = this.arrFormGroups.map((el) => {
      return {
        title: el.label,
        form: el.name,
        type: el.type,
        mandatory: el.required
      };
    });
    modalRef.componentInstance.arrFormGroup = transFormArrForm;
    if (type !== 'edit') {
      // Show View
      modalRef.componentInstance.show = true;
    }
    modalRef.result.then(() =>
            this.tableService.fetch(),
        () => { }
    );
  }

  delete(id: number) {
    const modalRef = this.modalService.open(DeleteCategoryModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = 'Category';
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

  getForms() {
    this.tableService.getFormArr().subscribe(
        (result: any) => {
          this.arrFormGroups = [...result.data];
        },
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getForms();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
