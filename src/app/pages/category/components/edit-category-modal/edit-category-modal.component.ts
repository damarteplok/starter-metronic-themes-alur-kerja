import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {CategoryService} from '../../category.service';
import {BaseEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-category-modal',
    templateUrl: './edit-category-modal.component.html',
    styleUrls: [],
})
export class EditCategoryModalComponent extends BaseEditPagesComponent{
    EMPTY_OBJ = {
        id: undefined,
        name: ''
    };
    constructor(
        protected templateService: CategoryService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal,
    ) {
        super(templateService, fb, modal);
    }

    loadForm() {
        this.formGroup = this.fb.group({
            name: [this.formObj.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])]
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
