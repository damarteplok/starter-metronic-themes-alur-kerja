import { Component } from '@angular/core';
import {Category3Service} from '../../category3.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-category3-modal',
    templateUrl: './edit-category3-modal.component.html',
    styleUrls: ['./edit-category3-modal.component.scss'],
})

export class EditCategory3ModalComponent extends BaseEditPagesComponent {
    arrNameOfForm: any[] = [];

    constructor(
        protected templateService: Category3Service,
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
    //    OVERRIDE THIS
    }

    prepareFormEdit() {
    //    OVERRIDE THIS
    }
}
