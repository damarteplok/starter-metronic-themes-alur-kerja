import {Component} from '@angular/core';
import {LeaveService} from './leave.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditLeaveModalComponent} from './components/edit-leave-modal/edit-leave-modal.component';
import {BaseCrudBpmnPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-leave',
    templateUrl: './leave.component.html',
    styleUrls: ['./leave.component.scss']
})
export class LeaveComponent extends BaseCrudBpmnPagesComponent {
    diagramUrl = `${environment.apiUrl}/bpmn/leave`;

    constructor(
        public tableService: LeaveService,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    editComponentShow(id, type, typeTask, transFormArrForm, transFormArrVar, transFormArrDecision, typeDecision) {
        const modalRef = this.modalService.open(EditLeaveModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Leave';
        modalRef.componentInstance.type = typeTask;
        modalRef.componentInstance.arrFormGroup = transFormArrForm;
        modalRef.componentInstance.arrform = '1';
        modalRef.componentInstance.arrParamsGroup = transFormArrVar;
        modalRef.componentInstance.arrvar = '1';
        modalRef.componentInstance.arrDecision = transFormArrDecision;

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

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
