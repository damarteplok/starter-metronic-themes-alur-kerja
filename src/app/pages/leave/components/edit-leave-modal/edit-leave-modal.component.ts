import { Component } from '@angular/core';
import {LeaveService} from '../../leave.service';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseBpmnEditPagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-edit-leave-modal',
    templateUrl: './edit-leave-modal.component.html',
    styleUrls: ['./edit-leave-modal.component.scss'],
})

export class EditLeaveModalComponent extends BaseBpmnEditPagesComponent {
    EMPTY_OBJ = {
        model: {},
        logs: []
    };

    constructor(
        protected templateService: LeaveService,
        protected fb: FormBuilder,
        public modal: NgbActiveModal
    ) {
        super(templateService, fb, modal);
    }
}
