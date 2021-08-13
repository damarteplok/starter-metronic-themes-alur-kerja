import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {of, Subscription} from 'rxjs';
import {catchError, first, tap} from 'rxjs/operators';
import {CategoryService} from '../../category.service';

const EMPTY_OBJ: any = {
    id: undefined,
    name: ''
};


@Component({
    selector: 'app-edit-category-modal',
    templateUrl: './edit-category-modal.component.html',
    styleUrls: ['./edit-category-modal.component.scss'],
})
export class EditCategoryModalComponent implements OnInit, OnDestroy {
    @Input() id: number;
    isLoading$;
    formObj: any;
    formGroup: FormGroup;
    private subscriptions: Subscription[] = [];
    constructor(
        private templateService: CategoryService,
        private fb: FormBuilder,
        public modal: NgbActiveModal
    ) { }

    ngOnInit(): void {
        this.isLoading$ = this.templateService.isLoading$;
        this.loadFormData();
    }

    loadFormData() {
        if (!this.id) {
            this.formObj = EMPTY_OBJ;
            this.loadForm();
        } else {
            const sb = this.templateService.getItemById(this.id).pipe(
                first(),
                catchError((errorMessage) => {
                    this.modal.dismiss(errorMessage);
                    return of(EMPTY_OBJ);
                })
            ).subscribe((res: any) => {
                this.formObj = res.data;
                this.loadForm();
            });
            this.subscriptions.push(sb);
        }
    }

    loadForm() {
        this.formGroup = this.fb.group({
            name: [this.formObj.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])]
        });
    }

    save() {
        this.prepareFormData();
        if (this.formObj.id) {
            this.edit();
        } else {
            this.create();
        }
    }

    edit() {
        const sbUpdate = this.templateService.update(this.formObj.id, this.prepareFormEdit()).pipe(
            tap(() => {
                this.modal.close();
            }),
            catchError((errorMessage) => {
                this.modal.dismiss(errorMessage);
                return of(this.formObj);
            }),
        ).subscribe(res => this.formObj = res);
        this.subscriptions.push(sbUpdate);
    }

    create() {
        const sbCreate = this.templateService.create(this.formObj).pipe(
            tap(() => {
                this.modal.close();
            }),
            catchError((errorMessage) => {
                this.modal.dismiss(errorMessage);
                return of(this.formObj);
            }),
        ).subscribe((res: any) => this.formObj = res);
        this.subscriptions.push(sbCreate);
    }

    private prepareFormData() {
        const formData = this.formGroup.value;
        this.formObj.name = formData.name;
    }

    private prepareFormEdit() {
        return {
            name: this.formObj.name
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sb => sb.unsubscribe());
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
