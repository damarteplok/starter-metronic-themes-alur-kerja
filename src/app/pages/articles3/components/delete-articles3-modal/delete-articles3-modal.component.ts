import { Component } from '@angular/core';
import {BaseDeletePagesComponent} from 'angular-alur-kerja-lib';
import {Articles3Service} from '../../articles3.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-articles3-modal',
    templateUrl: './delete-articles3-modal.component.html',
    styleUrls: [],
})

export class DeleteArticles3ModalComponent extends BaseDeletePagesComponent {
    constructor(
        public tableService: Articles3Service,
        public modal: NgbActiveModal
    ) {
        super(tableService, modal);
    }
}
