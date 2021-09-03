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
    diagramUrl = `${environment.apiUrl}/bpmn/mainan`;

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
        // OVERRIDE this transFormArrForm with your array object, if u want to custom, not from BE
        let transFormArrForm = [];
        let transFormArrVar = [];
        this.tableService.getSpec('dto', typeTask).subscribe( (res: any) => {
            const dataTemp = res.data.map((item) => {
                return {
                    title: item.label,
                    form: item.name,
                    type: 'text',
                    mandatory: item.required
                };
            });
            this.arrDto = [...dataTemp];
            transFormArrForm = this.arrDto.map((el) => {
                return {
                    title: el.title,
                    form: el.form,
                    type: el.type,
                    mandatory: el.mandatory
                };
            });
            this.tableService.getSpec('variable', typeTask).subscribe((res2: any) => {
                const dataTemp2 = res2.data.map((item) => {
                    return {
                        title: item.label,
                        form: item.name,
                        type: 'text',
                        mandatory: item.required
                    };
                });
                this.arrVar = [...dataTemp2];
                transFormArrVar = this.arrVar.map((el) => {
                    return {
                        title: el.title,
                        form: el.form,
                        type: el.type,
                        mandatory: el.mandatory
                    };
                });
                const modalRef = this.modalService.open(EditMainanModalComponent, { size: 'xl' });
                modalRef.componentInstance.id = id;
                modalRef.componentInstance.title = 'Mainan';
                modalRef.componentInstance.type = typeTask;
                modalRef.componentInstance.arrFormGroup = transFormArrForm;
                modalRef.componentInstance.arrform = '1';
                modalRef.componentInstance.arrParamsGroup = transFormArrVar;
                modalRef.componentInstance.arrvar = '1';

                if (type !== 'edit') {
                    // Show View
                    modalRef.componentInstance.show = true;
                }
                modalRef.result.then(() =>
                        this.tableService.fetchBpmn(),
                    () => { }
                );
            });
        });

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
