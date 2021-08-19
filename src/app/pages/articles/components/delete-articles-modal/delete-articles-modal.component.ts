import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ArticlesService} from '../../articles.service';
import {DeleteCrudModalComponent} from '../../../shared/component/crud/delete-crud/delete-crud-modal.component';

@Component({
    selector: 'app-delete-articles-modal',
    templateUrl: '../../../shared/component/crud/delete-crud/delete-crud-modal.component.html',
    styleUrls: ['../../../shared/component/crud/delete-crud/delete-crud-modal.component.scss']
})

export class DeleteArticlesModalComponent extends DeleteCrudModalComponent{
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
