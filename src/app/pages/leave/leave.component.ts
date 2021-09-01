import {Component} from '@angular/core';
import {LeaveService} from './leave.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditLeaveModalComponent} from './components/edit-leave-modal/edit-leave-modal.component';
import {environment} from '../../../environments/environment';
import {DeleteJatahcuti2ModalComponent} from '../jatahcuti2/components/delete-jatahcuti2-modal/delete-jatahcuti2-modal.component';
import {BaseCrudBpmnPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-leave',
    templateUrl: './leave.component.html',
    styleUrls: ['./leave.component.scss']
})
export class LeaveComponent extends BaseCrudBpmnPagesComponent {
    //INI yang di ganti bpmn component
    diagramUrl = `${environment.apiUrl}/bpmn/leave/xml`;

    constructor(
        public tableService: LeaveService,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    create() {
        this.edit(undefined);
    }

    edit(id: number, type: string = 'edit', typeTask = null) {
        const modalRef = this.modalService.open(EditLeaveModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'leave';
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

    delete(id: number) {
        const modalRef = this.modalService.open(DeleteJatahcuti2ModalComponent);
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Jatahcuti2';
        modalRef.result.then(() => this.tableService.fetchBpmn(), () => {});
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
