import {Component, Inject, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {BaseEditPagesComponent} from '../base-edit-pages.component';


@Component({
    selector: 'app-edit-category-modal',
    templateUrl: './edit-crud-modal.component.html',
    styleUrls: ['./edit-crud-modal.component.scss'],
})
export class EditCrudModalComponent extends BaseEditPagesComponent{
    @Input() title: string;
    subscriptions: Subscription[] = [];
    constructor(
        @Inject('') protected templateService: any,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    loadForm() {

    }

    prepareFormData() {

    }

    prepareFormEdit() {

    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
