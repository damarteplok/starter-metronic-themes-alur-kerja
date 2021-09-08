import { Component } from '@angular/core';
import {Mainan3Service} from '../../mainan3.service';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseBpmnEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-mainan3-modal',
    templateUrl: './edit-mainan3-modal.component.html',
    styleUrls: ['./edit-mainan3-modal.component.scss'],
})

export class EditMainan3ModalComponent extends BaseBpmnEditPagesComponent {
    applyHide = false;
    EMPTY_OBJ = {
        model: {},
        logs: []
    };

    constructor(
        protected templateService: Mainan3Service,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }
}
