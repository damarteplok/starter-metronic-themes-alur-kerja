import { Component } from '@angular/core';
import {Category2Service} from '../../category2.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-category2-modal',
    templateUrl: './edit-category2-modal.component.html',
    styleUrls: ['./edit-category2-modal.component.scss'],
})

export class EditCategory2ModalComponent extends BaseEditPagesComponent {
    //Override this empty_obj
    arrNameOfForm: any[] = [];
    constructor(
        protected templateService: Category2Service,
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
        this.arrNameOfForm.forEach((el) => {
            this.formGroup = this.fb.group({
                name: [this.formObj[el], Validators.compose([Validators.required])]
            });
        });
    }

    prepareFormData() {
        const formData = this.formGroup.value;
        this.formObj.name = formData.name;
    }

    prepareFormEdit() {
        return {
            name: this.formObj.name
        };
    }
}
