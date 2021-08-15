import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CategoryService} from '../../category.service';
import {BaseEditPagesComponent} from '../../../shared/component/base-edit-pages.component';

const EMPTY_OBJ: any = {
    id: undefined,
    name: ''
};


@Component({
    selector: 'app-edit-category-modal',
    templateUrl: './edit-category-modal.component.html',
    styleUrls: ['./edit-category-modal.component.scss'],
})
export class EditCategoryModalComponent extends BaseEditPagesComponent{
    EMPTY_OBJ = {
        id: undefined,
        name: ''
    };
    subscriptions: Subscription[] = [];
    constructor(
        protected templateService: CategoryService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }

    ngOnInit(): void {
        super.ngOnInit();
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
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    // helpers for View
    isControlValid(controlName: string): boolean {
        const control = this.formGroup.controls[controlName];
        return control.valid && (control.dirty || control.touched);
    }

    isControlInvalid(controlName: string): boolean {
        const control = this.formGroup.controls[controlName];
        return control.invalid && (control.dirty || control.touched);
    }

    controlHasError(validation, controlName): boolean {
        const control = this.formGroup.controls[controlName];
        return control.hasError(validation) && (control.dirty || control.touched);
    }

    isControlTouched(controlName): boolean {
        const control = this.formGroup.controls[controlName];
        return control.dirty || control.touched;
    }
}
