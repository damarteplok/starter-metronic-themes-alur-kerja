import {Component} from '@angular/core';
import {Mainan2Service} from './mainan2.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditMainan2ModalComponent} from './components/edit-mainan2-modal/edit-mainan2-modal.component';
import {BaseCrudBpmnPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-mainan2',
    templateUrl: './mainan2.component.html',
    styleUrls: ['./mainan2.component.scss']
})
export class Mainan2Component extends BaseCrudBpmnPagesComponent {
    allSpec = {};

    //INI yang di ganti bpmn component
    diagramUrl = `${environment.apiUrl}/bpmn/mainan`;

    constructor(
        public tableService: Mainan2Service,
        protected fb: FormBuilder,
        private modalService: NgbModal,
    ) {
        super(tableService, fb);
    }

    create() {
        this.edit(undefined, 'edit', 'init');
    }

    edit(id: number, type: string = 'edit', typeTask = null) {
        let transFormArrForm = [];
        let transFormArrVar = [];
        let transFormArrDecision = [];
        let typeDecision = 'radio';
        console.log(this.allSpec);
        for (const key in this.allSpec) {
            if (key === typeTask) {
                const obj = this.allSpec[key];
                if (obj.hasOwnProperty('decision')) {
                    if (obj.decision.hasOwnProperty('exclusive')) {
                        transFormArrDecision = obj.decision.exclusive;
                        typeDecision = 'radio';
                    }
                    if (obj.decision.hasOwnProperty('inclusive')) {
                        transFormArrDecision = obj.decision.inclusive;
                        typeDecision = 'checkbox';
                    }
                }
                if (obj.hasOwnProperty('variable')) {
                    transFormArrVar = obj.variable.map((el) => {
                        return {
                            title: el.label,
                            form: el.name,
                            type: 'text',
                            mandatory: el.required
                        };
                    });
                }
                if (obj.hasOwnProperty('dto')) {
                    transFormArrForm = obj.dto.map((el) => {
                        const typeTemp = el.type == 'String' || el.type == 'string' ? 'text' : el.type ? el.type : 'text';
                        if (typeTemp == 'radio') {
                            let tempJson = el.metadata.jsonValues;
                            el.metadata = {
                                ...el.metadata,
                                jsonValues: typeof tempJson === 'string' ? JSON.parse(tempJson) : tempJson
                            };
                        }
                        return {
                            title: el.label,
                            form: el.name,
                            type: typeTemp ? typeTemp.toLowerCase() : typeTemp,
                            mandatory: el.required,
                            metaData: el.metadata
                        };
                    });
                }
            }
        }
        const modalRef = this.modalService.open(EditMainan2ModalComponent, { size: 'xl' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = 'Mainan2';
        modalRef.componentInstance.type = typeTask;
        modalRef.componentInstance.arrFormGroup = transFormArrForm;
        modalRef.componentInstance.arrform = '1';
        modalRef.componentInstance.arrParamsGroup = transFormArrVar;
        modalRef.componentInstance.arrvar = '1';
        modalRef.componentInstance.arrDecision = transFormArrDecision;
        modalRef.componentInstance.typeDecision = typeDecision;

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
