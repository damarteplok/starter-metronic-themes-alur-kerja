import {Component} from '@angular/core';
import {ArticlesService} from './articles.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseCrudPagesComponent} from '../shared/component/base-crud-pages.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteArticlesModalComponent} from './components/delete-articles-modal/delete-articles-modal.component';
import {EditArticlesModalComponent} from './components/edit-articles-modal/edit-articles-modal.component';

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

  create() {
    this.edit(undefined);
  }

  edit(id: number, type: string = 'edit') {
    const modalRef = this.modalService.open(EditArticlesModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
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
    const modalRef = this.modalService.open(DeleteArticlesModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => this.tableService.fetch(), () => {});
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      title: [''],
      content: [''],
      category: [''],
    });
    this.subscriptions.push(
        this.filterGroup.controls.title.valueChanges.subscribe(() =>
            this.filter()
        )
    );
    this.subscriptions.push(
        this.filterGroup.controls.content.valueChanges.subscribe(() =>
            this.filter()
        )
    );
    this.subscriptions.push(
        this.filterGroup.controls.category.valueChanges.subscribe(() =>
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
    const content = this.filterGroup.get('content').value;
    if (content) {
      filter['content'] = content;
    }
    const category = this.filterGroup.get('category').value;
    if (category) {
      filter['category'] = category;
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
