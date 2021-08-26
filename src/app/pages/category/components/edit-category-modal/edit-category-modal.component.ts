import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {CategoryService} from '../../category.service';
import {BaseEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-category-modal',
    templateUrl: '../../../_layout/components/menu/modal-edit/modal-edit.component.html',
    styleUrls: [],
})
export class EditCategoryModalComponent extends BaseEditPagesComponent{
    arrNameOfForm: any[] = [];
    constructor(
        protected templateService: CategoryService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal,
    ) {
        super(templateService, fb, modal);
        this.arrNameOfForm = this.arrFormGroup.map((el) => {
            return el.form;
        });
        for (const key of this.arrNameOfForm) {
            this.EMPTY_OBJ[key] = key;
        }
    }

    loadForm() {
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
