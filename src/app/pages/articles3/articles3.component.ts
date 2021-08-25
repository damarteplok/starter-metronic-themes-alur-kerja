import {Component} from '@angular/core';
import {Articles3Service} from './articles3.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteArticles3ModalComponent} from './components/delete-articles3-modal/delete-articles3-modal.component';
import {EditArticles3ModalComponent} from './components/edit-articles3-modal/edit-articles3-modal.component';
import {BaseCrudPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-articles3',
    templateUrl: './articles3.component.html',
    styleUrls: ['./articles3.component.scss']
})
export class Articles3Component extends BaseCrudPagesComponent {

    constructor(
        public tableService: Articles3Service,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    create() {
        this.edit(undefined);
    }

    edit(id: number, type: string = 'edit') {
        const modalRef = this.modalService.open(EditArticles3ModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Articles';
        modalRef.componentInstance.arrFormGroup = [
            {title: 'Title', form: 'title', type: 'text', mandatory: true},
            {title: 'Content', form: 'content', type: 'textarea', mandatory: true},
            {title: 'Test Date', form: 'content', type: 'date', mandatory: true},
        ];
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
        const modalRef = this.modalService.open(DeleteArticles3ModalComponent);
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Articles3';
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

}
