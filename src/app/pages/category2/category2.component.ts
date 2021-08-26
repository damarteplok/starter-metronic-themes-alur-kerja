import {Component} from '@angular/core';
import {Category2Service} from './category2.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteCategory2ModalComponent} from './components/delete-category2-modal/delete-category2-modal.component';
import {EditCategory2ModalComponent} from './components/edit-category2-modal/edit-category2-modal.component';
import {BaseCrudPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-category2',
    templateUrl: './category2.component.html',
    styleUrls: ['./category2.component.scss']
})
export class Category2Component extends BaseCrudPagesComponent {

    constructor(
        public tableService: Category2Service,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    create() {
        this.edit(undefined);
    }

    edit(id: number, type: string = 'edit') {
        const modalRef = this.modalService.open(EditCategory2ModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Category2';
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
        const modalRef = this.modalService.open(DeleteCategory2ModalComponent);
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Category2';
        modalRef.result.then(() => this.tableService.fetch(), () => {});
    }

    filterForm() {
        // DEFAULT FILTER FORM ID, U CAN ADD MORE
        this.filterGroup = this.fb.group({
            id: ['']
        });
        this.subscriptions.push(
            this.filterGroup.controls.id.valueChanges.subscribe(() =>
                this.filter()
            )
        );
    }

    filter() {
        // DEFAULT FILTER BY ID, U CAN ADD MORE
        const filter = {};
        const id = this.filterGroup.get('id').value;
        if (name) {
            filter['id'] = id;
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
