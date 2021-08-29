import {Component} from '@angular/core';
import {Jatahcuti2Service} from './jatahcuti2.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteJatahcuti2ModalComponent} from './components/delete-jatahcuti2-modal/delete-jatahcuti2-modal.component';
import {EditJatahcuti2ModalComponent} from './components/edit-jatahcuti2-modal/edit-jatahcuti2-modal.component';
import {BaseCrudPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-jatahcuti2',
    templateUrl: './jatahcuti2.component.html',
    styleUrls: ['./jatahcuti2.component.scss']
})
export class Jatahcuti2Component extends BaseCrudPagesComponent {
    constructor(
        public tableService: Jatahcuti2Service,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    create() {
        this.edit(undefined);
    }

    edit(id: number, type: string = 'edit') {
        const modalRef = this.modalService.open(EditJatahcuti2ModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Jatahcuti2';
        // OVERRIDE this transFormArrForm with your array object, if u want to custom, not from BE
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
        const modalRef = this.modalService.open(DeleteJatahcuti2ModalComponent);
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Jatahcuti2';
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
        if (id) {
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
