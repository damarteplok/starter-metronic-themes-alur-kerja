import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ArticlesService} from '../../articles.service';
import {BaseDeletePagesComponent} from '../../../shared/component/crud/base-delete-pages.component';

@Component({
    selector: 'app-delete-articles-modal',
    templateUrl: '../../../shared/component/crud/delete-crud/delete-crud-modal.component.html',
    styleUrls: ['../../../shared/component/crud/delete-crud/delete-crud-modal.component.scss']
})

export class DeleteArticlesModalComponent extends BaseDeletePagesComponent{
    constructor(
        public tableService: ArticlesService,
        public modal: NgbActiveModal
    ) {
        super(tableService, modal);
    }
}
