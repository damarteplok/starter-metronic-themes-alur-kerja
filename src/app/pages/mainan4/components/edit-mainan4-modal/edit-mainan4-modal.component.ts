import { Component } from '@angular/core';
import {Mainan4Service} from '../../mainan4.service';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseBpmnEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-mainan4-modal',
    templateUrl: './edit-mainan4-modal.component.html',
    styleUrls: ['./edit-mainan4-modal.component.scss'],
})

export class EditMainan4ModalComponent extends BaseBpmnEditPagesComponent {
    EMPTY_OBJ = {
        model: {},
        logs: []
    };

    constructor(
        protected templateService: Mainan4Service,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }
}
