import { Component } from '@angular/core';
import {LeaveService} from '../../leave.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseBpmnEditPagesComponent} from 'angular-alur-kerja-lib';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-edit-leave-modal',
    templateUrl: './edit-leave-modal.component.html',
    styleUrls: ['./edit-leave-modal.component.scss'],
})

export class EditLeaveModalComponent extends BaseBpmnEditPagesComponent {
    diagramUrl = ``;
    isCollapsed = false;
    title = 'bpmn-js-angular';
    importError?: Error;

    arrNameOfForm: any[] = [];

    constructor(
        protected templateService: LeaveService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }

    loadForm() {
        this.diagramUrl = `${environment.apiUrl}/bpmn/leave/${this.id}/xml`;
        console.log(this.diagramUrl)
    //    OVERRIDE THIS
    //    AUTOMATICALLY GENERATE
        this.arrNameOfForm = this.arrFormGroup.map((el) => {
            return el.form;
        });
        for (const key of this.arrNameOfForm) {
            this.EMPTY_OBJ[key] = key;
        }
        let objFormGroup = new Object();
        this.arrNameOfForm.forEach((el) => {
            objFormGroup[el] = [this.formObj.model[el], Validators.compose([Validators.required])];
        });
        this.formGroup = this.fb.group(objFormGroup);
    }

    prepareFormData() {
    //    OVERRIDE THIS
    }

    prepareFormEdit() {
    //    OVERRIDE THIS
        const formData = this.formGroup.value;
        return {
            name: formData.name,
            reason: formData.reason,
        };
    }

    handleImported(event) {
        const {
            type,
            error,
            warnings
        } = event;

        if (type === 'success') {
            console.log(`Rendered diagram (%s warnings)`, warnings.length);
        }

        if (type === 'error') {
            console.error('Failed to render diagram', error);
        }

        this.importError = error;
    }
}
