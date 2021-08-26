import { Component } from '@angular/core';
import {BaseDeletePagesComponent} from 'angular-alur-kerja-lib';
import {Category2Service} from '../../category2.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-category2-modal',
    templateUrl: './delete-category2-modal.component.html',
    styleUrls: ['./delete-category2-modal.component.scss'],
})

export class DeleteCategory2ModalComponent extends BaseDeletePagesComponent {
    constructor(
        public tableService: Category2Service,
        public modal: NgbActiveModal
    ) {
        super(tableService, modal);
    }
}
