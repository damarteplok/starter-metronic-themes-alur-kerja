import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ArticlesService} from '../../articles.service';
import {BaseEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-articles-modal',
    templateUrl: '../../../_layout/components/menu/modal-edit/modal-edit.component.html',
    styleUrls: [],
})
export class EditArticlesModalComponent extends BaseEditPagesComponent{
    EMPTY_OBJ = {
        id: undefined,
        title: '',
        content: '',
    };
    constructor(
        protected templateService: ArticlesService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }

    loadForm() {
        this.formGroup = this.fb.group({
            title: [this.formObj.title, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            content: [this.formObj.content, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            date: [this.formObj.date, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
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
