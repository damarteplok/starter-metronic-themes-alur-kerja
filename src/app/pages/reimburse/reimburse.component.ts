import {Component} from '@angular/core';
import {ReimburseService} from './reimburse.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditReimburseModalComponent} from './components/edit-reimburse-modal/edit-reimburse-modal.component';
import {BaseCrudBpmnPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-reimburse',
    templateUrl: './reimburse.component.html',
    styleUrls: ['./reimburse.component.scss']
})
export class ReimburseComponent extends BaseCrudBpmnPagesComponent {
    //INI yang di ganti bpmn component
    diagramUrl = `${environment.apiUrl}/bpmn/reimburse`;

    constructor(
        public tableService: ReimburseService,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    create() {
        this.edit(undefined);
    }

    edit(id: number, type: string = 'edit', typeTask = null) {
        const modalRef = this.modalService.open(EditReimburseModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Reimburse';
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
