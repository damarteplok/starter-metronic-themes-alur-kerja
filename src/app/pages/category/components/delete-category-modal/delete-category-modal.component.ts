import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../category.service';
import {BaseDeletePagesComponent} from 'angular-alur-kerja-lib';

@Component({
    selector: 'app-delete-category-modal',
    templateUrl: './delete-category-modal.component.html',
    styleUrls: []
})

export class DeleteCategoryModalComponent extends BaseDeletePagesComponent{
    constructor(
        public deleteService: CategoryService,
        public modal: NgbActiveModal
    ) {
        super(deleteService, modal);
    }
}
