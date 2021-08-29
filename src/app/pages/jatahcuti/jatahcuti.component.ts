import {Component} from '@angular/core';
import {JatahcutiService} from './jatahcuti.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteJatahcutiModalComponent} from './components/delete-jatahcuti-modal/delete-jatahcuti-modal.component';
import {EditJatahcutiModalComponent} from './components/edit-jatahcuti-modal/edit-jatahcuti-modal.component';
import {BaseCrudPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-jatahcuti',
    templateUrl: './jatahcuti.component.html',
    styleUrls: ['./jatahcuti.component.scss']
})
export class JatahcutiComponent extends BaseCrudPagesComponent {
    isCollapsed = false;
    title = 'bpmn-js-angular';
    diagramUrl = `${environment.apiUrl}/bpmn/leave/xml`;
    importError?: Error;

    constructor(
        public tableService: JatahcutiService,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    create() {
        this.edit(undefined);
    }

    edit(id: number, type: string = 'edit') {
        const modalRef = this.modalService.open(EditJatahcutiModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Jatahcuti';
        //OVERRIDE THIS...
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
        const modalRef = this.modalService.open(DeleteJatahcutiModalComponent);
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Jatahcuti';
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
