import { Component } from '@angular/core';
import {BaseDeletePagesComponent} from 'angular-alur-kerja-lib';
import {Category3Service} from '../../category3.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-category3-modal',
    templateUrl: './delete-category3-modal.component.html',
    styleUrls: ['./delete-category3-modal.component.scss'],
})

export class DeleteCategory3ModalComponent extends BaseDeletePagesComponent {
    constructor(
        public tableService: Category3Service,
        public modal: NgbActiveModal
    ) {
        super(tableService, modal);
    }
}
