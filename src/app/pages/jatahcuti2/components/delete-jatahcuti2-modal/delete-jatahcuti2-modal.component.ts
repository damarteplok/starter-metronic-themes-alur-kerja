import { Component } from '@angular/core';
import {BaseDeletePagesComponent} from 'angular-alur-kerja-lib';
import {Jatahcuti2Service} from '../../jatahcuti2.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-jatahcuti2-modal',
    templateUrl: './delete-jatahcuti2-modal.component.html',
    styleUrls: ['./delete-jatahcuti2-modal.component.scss'],
})

export class DeleteJatahcuti2ModalComponent extends BaseDeletePagesComponent {
    constructor(
        public tableService: Jatahcuti2Service,
        public modal: NgbActiveModal
    ) {
        super(tableService, modal);
    }
}
