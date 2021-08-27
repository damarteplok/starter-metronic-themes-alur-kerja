import {Component} from '@angular/core';
import {Category2Service} from './category2.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteCategory2ModalComponent} from './components/delete-category2-modal/delete-category2-modal.component';
import {EditCategory2ModalComponent} from './components/edit-category2-modal/edit-category2-modal.component';
import {BaseCrudPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-category2',
    templateUrl: './category2.component.html',
    styleUrls: ['./category2.component.scss']
})
export class Category2Component extends BaseCrudPagesComponent {
    isCollapsed = false;
    title = 'bpmn-js-angular';
    diagramUrl = `${environment.apiUrl}/bpmn/leave/xml`;
    importError?: Error;

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
            id: [''],
            name: ['']
        });
        this.subscriptions.push(
            this.filterGroup.controls.id.valueChanges.subscribe(() =>
                this.filter()
            )
        );
        this.subscriptions.push(
            this.filterGroup.controls.name.valueChanges.subscribe(() =>
                this.filter()
            )
        );
    }

    filter() {
        // DEFAULT FILTER BY ID, U CAN ADD MORE
        const filter = {};
        const id = this.filterGroup.get('id').value;
        if (id) {
            filter['id'] = id;
        }
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

    handleImported(event) {
        const {
            type,
            error,
            warnings
        } = event;

        if (type === 'success') {
            console.log(`Rendered diagram (%s warnings)`, warnings.length);
        }

        if (type === 'error') {
            console.error('Failed to render diagram', error);
        }

        this.importError = error;
    }

}
