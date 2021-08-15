import {Component} from '@angular/core';
import {BaseDeletePagesComponent} from '../../../shared/component/base-delete-pages.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../category.service';

@Component({
    selector: 'app-delete-category-modal',
    templateUrl: './delete-category-modal.component.html',
    styleUrls: ['./delete-category-modal.component.scss']
})

export class DeleteCategoryModalComponent extends BaseDeletePagesComponent{
    constructor(
        public tableService: CategoryService,
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
