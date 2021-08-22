import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ArticlesService} from '../../articles.service';
import {BaseDeletePagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-delete-articles-modal',
    templateUrl: './delete-articles-modal.component.html',
    styleUrls: []
})

export class DeleteArticlesModalComponent extends BaseDeletePagesComponent{
    constructor(
        public tableService: ArticlesService,
        public modal: NgbActiveModal
    ) {
        super(tableService, modal);
    }
}
