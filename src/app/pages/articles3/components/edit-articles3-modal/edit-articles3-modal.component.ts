import { Component } from '@angular/core';
import {Articles3Service} from '../../articles3.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-articles3-modal',
    templateUrl: './edit-articles3-modal.component.html',
    styleUrls: [],
})

export class EditArticles3ModalComponent extends BaseEditPagesComponent {
    //Override this empty_obj
    EMPTY_OBJ = {
        id: undefined,
        title: '',
        content: '',
    };
    constructor(
        protected templateService: Articles3Service,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }

    loadForm() {
        this.formGroup = this.fb.group({
            title: [this.formObj.title, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            content: [this.formObj.content, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            date: [this.formObj.date],
        });
    }

    prepareFormData() {
        const formData = this.formGroup.value;
        this.formObj.title = formData.title;
        this.formObj.content = formData.content;
        this.formObj.category = {
            id: 'a8bb4fc5-7868-4f5b-ac66-cf9690f1750c'
        };
    }

    prepareFormEdit() {
        const formData = this.formGroup.value;
        return {
            title: formData.title,
            content: formData.content,
            category: {
                id: 'a8bb4fc5-7868-4f5b-ac66-cf9690f1750c'
            },
        };
    }
}
