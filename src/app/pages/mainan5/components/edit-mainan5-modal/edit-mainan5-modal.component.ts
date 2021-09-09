import { Component } from '@angular/core';
import {Mainan5Service} from '../../mainan5.service';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseBpmnEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-mainan5-modal',
    templateUrl: './edit-mainan5-modal.component.html',
    styleUrls: ['./edit-mainan5-modal.component.scss'],
})

export class EditMainan5ModalComponent extends BaseBpmnEditPagesComponent {
    EMPTY_OBJ = {
        model: {},
        logs: []
    };

    constructor(
        protected templateService: Mainan5Service,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }
}
