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
    diagramUrl = `${environment.apiUrl}/bpmn/reimburse`;

    constructor(
        public tableService: ReimburseService,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    editComponentShow(id, type, typeTask, transFormArrForm, transFormArrVar, transFormArrDecision, typeDecision) {
        const modalRef = this.modalService.open(EditReimburseModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Reimburse';
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
