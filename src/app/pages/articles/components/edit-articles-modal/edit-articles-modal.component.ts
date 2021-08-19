import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ArticlesService} from '../../articles.service';
import {EditCrudModalComponent} from '../../../shared/component/crud/edit-crud/edit-crud-modal.component';

@Component({
    selector: 'app-edit-articles-modal',
    templateUrl: '../../../shared/component/crud/edit-crud/edit-crud-modal.component.html',
    styleUrls: ['../../../shared/component/crud/edit-crud/edit-crud-modal.component.scss'],
})
export class EditArticlesModalComponent extends EditCrudModalComponent{
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

    ngOnInit(): void {
        super.ngOnInit();
    }

    loadForm() {
        this.formGroup = this.fb.group({
            title: [this.formObj.title, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            content: [this.formObj.content, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
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

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
