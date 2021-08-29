import { Component } from '@angular/core';
import {JatahcutiService} from '../../jatahcuti.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-jatahcuti-modal',
    templateUrl: './edit-jatahcuti-modal.component.html',
    styleUrls: ['./edit-jatahcuti-modal.component.scss'],
})

export class EditJatahcutiModalComponent extends BaseEditPagesComponent {
    arrNameOfForm: any[] = [];

    constructor(
        protected templateService: JatahcutiService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }

    loadForm() {
    //    OVERRIDE THIS
    //    AUTOMATICALLY GENERATE
        this.arrNameOfForm = this.arrFormGroup.map((el) => {
            return el.form;
        });
        for (const key of this.arrNameOfForm) {
            this.EMPTY_OBJ[key] = key;
        }
        //TODO Masih salah bikin array formgroupnya
        let objFormGroup = new Object();
        this.arrNameOfForm.forEach((el) => {
            objFormGroup[el] = [this.formObj[el], Validators.compose([Validators.required])];
        });
        this.formGroup = this.fb.group(objFormGroup);
    }

    prepareFormData() {
        const formData = this.formGroup.value;
        this.formObj.username = formData.username;
        this.formObj.type = formData.type;
        this.formObj.numOfDay = formData.numOfDay;
    }

    prepareFormEdit() {
        const formData = this.formGroup.value;
        return {
            username: formData.username,
            type: formData.type,
            numOfDay: formData.numOfDay
        };
    }
}
