import {Component} from '@angular/core';
import {Mainan5Service} from './mainan5.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditMainan5ModalComponent} from './components/edit-mainan5-modal/edit-mainan5-modal.component';
import {BaseCrudBpmnPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-mainan5',
    templateUrl: './mainan5.component.html',
    styleUrls: ['./mainan5.component.scss']
})
export class Mainan5Component extends BaseCrudBpmnPagesComponent {
    diagramUrl = `${environment.apiUrl}/bpmn/mainan`;

    constructor(
        public tableService: Mainan5Service,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    editComponentShow(id, type, typeTask, transFormArrForm, transFormArrVar, transFormArrDecision, typeDecision) {
        const modalRef = this.modalService.open(EditMainan5ModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Mainan5';
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
