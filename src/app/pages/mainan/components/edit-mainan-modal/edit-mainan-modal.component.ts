import { Component } from '@angular/core';
import {MainanService} from '../../mainan.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseBpmnEditPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-edit-mainan-modal',
    templateUrl: './edit-mainan-modal.component.html',
    styleUrls: ['./edit-mainan-modal.component.scss'],
})

export class EditMainanModalComponent extends BaseBpmnEditPagesComponent {
    diagramUrl = ``;
    isCollapsed = false;
    title = 'bpmn-js-angular';
    importError?: Error;

    arrNameOfForm: any[] = [];
    arrNameOfVar: any[] = [];

    constructor(
        protected templateService: MainanService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }

    loadForm() {
        this.diagramUrl = `${environment.apiUrl}/bpmn/mainan/${this.id}/xml`;
    //    OVERRIDE THIS
    //    AUTOMATICALLY GENERATE
        this.arrNameOfForm = this.arrFormGroup.map((el) => {
            return el.form;
        });
        this.arrNameOfVar = this.arrParamsGroup.map((el) => {
            return el.form;
        });

        for (const key of this.arrNameOfForm) {
            this.EMPTY_OBJ[key] = key;
        }
        for (const key of this.arrNameOfVar) {
            this.EMPTY_OBJ[key] = key;
        }

        const objFormGroup = new Object();
        this.arrNameOfForm.forEach((el) => {
            objFormGroup[el] = [this.formObj.model[el], Validators.compose([Validators.required])];
        });
        this.arrNameOfVar.forEach((el) => {
            objFormGroup[el] = ['', Validators.compose([Validators.required])];
        });
        this.formGroup = this.fb.group(objFormGroup);
    }

    prepareFormData() {
    //    OVERRIDE THIS
    }

    prepareFormEdit() {
    //    OVERRIDE THIS
        const formData = this.formGroup.value;
        let obj = new Object();
        this.arrNameOfForm.forEach((el) => {
            obj[el] = formData[el];
        });
        return obj;
    }

    prepareParamsEdit() {
        const formParams = this.formGroup.value;
        const arrTemp = [];
        this.arrNameOfVar.forEach((el) => {
            arrTemp.push({
                name: el,
                value: formParams[el]
            });
        });
        //decision hard code dlu
        arrTemp.push({
            name: 'decision',
            value: 'ok'
        });
        //if have arrNameOfVar
        if (this.arrNameOfForm.length) {
            arrTemp.push({
                name: 'withVariable',
                value: '1'
            });
        }
        return arrTemp;
    }
}
