import { Component } from '@angular/core';
import {BaseDeletePagesComponent} from 'angular-alur-kerja-lib';
import {JatahcutiService} from '../../jatahcuti.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-jatahcuti-modal',
    templateUrl: './delete-jatahcuti-modal.component.html',
    styleUrls: ['./delete-jatahcuti-modal.component.scss'],
})

export class DeleteJatahcutiModalComponent extends BaseDeletePagesComponent {
    constructor(
        public tableService: JatahcutiService,
        public modal: NgbActiveModal
    ) {
        super(tableService, modal);
    }
}
