import { Component } from '@angular/core';
import {BaseDeletePagesComponent} from 'angular-alur-kerja-lib';
import {LeaveService} from '../../leave.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-leave-modal',
    templateUrl: './delete-leave-modal.component.html',
    styleUrls: ['./delete-leave-modal.component.scss'],
})

export class DeleteLeaveModalComponent extends BaseDeletePagesComponent {
    constructor(
        public tableService: LeaveService,
        public modal: NgbActiveModal
    ) {
        super(tableService, modal);
    }
}
