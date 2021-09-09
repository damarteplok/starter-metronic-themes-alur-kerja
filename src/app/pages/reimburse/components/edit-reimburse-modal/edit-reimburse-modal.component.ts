import { Component } from '@angular/core';
import {ReimburseService} from '../../reimburse.service';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseBpmnEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-reimburse-modal',
    templateUrl: './edit-reimburse-modal.component.html',
    styleUrls: ['./edit-reimburse-modal.component.scss'],
})

export class EditReimburseModalComponent extends BaseBpmnEditPagesComponent {
    EMPTY_OBJ = {
        model: {},
        logs: []
    };

    constructor(
        protected templateService: ReimburseService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }
}
