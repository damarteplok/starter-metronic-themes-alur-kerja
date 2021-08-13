import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ArticlesService} from '../../articles.service';
import {BaseDeletePagesComponent} from '../../../shared/component/base-delete-pages.component';

@Component({
    selector: 'app-delete-articles-modal',
    templateUrl: './delete-articles-modal.component.html',
    styleUrls: ['./delete-articles-modal.component.scss']
})

export class DeleteArticlesModalComponent extends BaseDeletePagesComponent{
    constructor(
        public tableService: ArticlesService,
        public modal: NgbActiveModal
    ) {
        super(tableService, modal);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
