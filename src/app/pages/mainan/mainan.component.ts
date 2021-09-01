import {Component} from '@angular/core';
import {MainanService} from './mainan.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditMainanModalComponent} from './components/edit-mainan-modal/edit-mainan-modal.component';
import {BaseCrudBpmnPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-mainan',
    templateUrl: './mainan.component.html',
    styleUrls: ['./mainan.component.scss']
})
export class MainanComponent extends BaseCrudBpmnPagesComponent {
    //INI yang di ganti bpmn component
    diagramUrl = `${environment.apiUrl}/bpmn/mainan/xml`;

    constructor(
        public tableService: MainanService,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    create() {
        this.edit(undefined);
    }

    edit(id: number, type: string = 'edit', typeTask = null) {
        const modalRef = this.modalService.open(EditMainanModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Mainan';
        modalRef.componentInstance.type = typeTask;
        // OVERRIDE this transFormArrForm with your array object, if u want to custom, not from BE
        const transFormArrForm = [
            {
                title: 'Name',
                form: 'name',
                type: 'text',
                mandatory: true
            },
            {
                title: 'Reason',
                form: 'reason',
                type: 'text',
                mandatory: true
            }
        ];
        modalRef.componentInstance.arrFormGroup = transFormArrForm;
        if (type !== 'edit') {
            // Show View
            modalRef.componentInstance.show = true;
        }
        modalRef.result.then(() =>
                this.tableService.fetchBpmn(),
            () => { }
        );
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
        this.tableService.patchStateBpmn({ filter });
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
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
