import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../category.service';
import {DeleteCrudModalComponent} from '../../../shared/component/crud/delete-crud/delete-crud-modal.component';

@Component({
    selector: 'app-delete-category-modal',
    templateUrl: '../../../shared/component/crud/delete-crud/delete-crud-modal.component.html',
    styleUrls: ['../../../shared/component/crud/delete-crud/delete-crud-modal.component.html']
})

export class DeleteCategoryModalComponent extends DeleteCrudModalComponent{
    constructor(
        public deleteService: CategoryService,
        public modal: NgbActiveModal
    ) {
        super(deleteService, modal);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}