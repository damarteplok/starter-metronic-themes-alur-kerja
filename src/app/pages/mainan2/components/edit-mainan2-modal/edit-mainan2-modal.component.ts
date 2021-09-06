import { Component } from '@angular/core';
import {Mainan2Service} from '../../mainan2.service';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseBpmnEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-mainan2-modal',
    templateUrl: './edit-mainan2-modal.component.html',
    styleUrls: ['./edit-mainan2-modal.component.scss'],
})

export class EditMainan2ModalComponent extends BaseBpmnEditPagesComponent {
    applyHide = false;
    EMPTY_OBJ = {
        model: {},
        logs: []
    };

    constructor(
        protected templateService: Mainan2Service,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }
}
