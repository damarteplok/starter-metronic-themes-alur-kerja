import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {of, Subscription} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {catchError, first, tap} from 'rxjs/operators';
import {LIST_TYPE_INPUT} from './model-crud/crud.model';

@Component({
    selector: 'app-base-edit-pages',
    templateUrl: './edit-crud/edit-crud-modal.component.html',
    styleUrls: ['./edit-crud/edit-crud-modal.component.scss'],
})

export class BaseEditPagesComponent implements OnInit, OnDestroy {
    @Input() id: number;
    @Input() show: boolean;
    @Input() title: string;
    @Input() arrFormGroup: {
        title: string,
        form: string,
        type?: string,
        url?: string,
        metaData?: string,
        placeHolder?: string,
        name?: string
    }[];
    isLoading$;
    formObj: any;
    formGroup: FormGroup;
    subscriptions: Subscription[] = [];
    htmlInputType = LIST_TYPE_INPUT;
    EMPTY_OBJ: {} = {};
    constructor(
        @Inject('') protected service: any,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) { }

    ngOnInit(): void {
        this.isLoading$ = this.service.isLoading$;
        this.loadFormData();
    }

    loadFormData() {
        if (!this.id) {
            this.formObj = this.EMPTY_OBJ;
            this.loadForm();
        } else {
            const sb = this.service.getItemById(this.id).pipe(
                first(),
                catchError((errorMessage) => {
                    this.modal.dismiss(errorMessage);
                    return of(this.EMPTY_OBJ);
                })
            ).subscribe((res: any) => {
                this.formObj = res.data;
                this.loadForm();
            });
            this.subscriptions.push(sb);
        }
    }

    // OVERRIDE THIS (ADD CUSTOM FORMCONTROLL AND VALIDATION)
    loadForm() {

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
        const sbUpdate = this.service.update(this.formObj.id, this.prepareFormEdit()).pipe(
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
        const sbCreate = this.service.create(this.formObj).pipe(
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

    // OVERRIDE THIS (PREPARE DATA FOR BODY PAYLOAD)
    prepareFormData() {

    }

    // OVERRIDE THIS (PREPARE DATA FOR BODY PAYLOAD)
    prepareFormEdit() {

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
