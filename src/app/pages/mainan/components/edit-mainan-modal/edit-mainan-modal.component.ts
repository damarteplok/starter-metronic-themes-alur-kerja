import { Component } from '@angular/core';
import {MainanService} from '../../mainan.service';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseBpmnEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-mainan-modal',
    templateUrl: './edit-mainan-modal.component.html',
    styleUrls: ['./edit-mainan-modal.component.scss'],
})

export class EditMainanModalComponent extends BaseBpmnEditPagesComponent {
    applyHide = false;
    EMPTY_OBJ = {
        model: {},
        logs: []
    };

    constructor(
        protected templateService: MainanService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }
}
