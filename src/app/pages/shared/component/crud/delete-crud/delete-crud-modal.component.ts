import {Component, Inject, Input} from '@angular/core';
import {BaseDeletePagesComponent} from '../base-delete-pages.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-category-modal',
    templateUrl: './delete-crud-modal.component.html',
    styleUrls: ['./delete-crud-modal.component.scss']
})

export class DeleteCrudModalComponent extends BaseDeletePagesComponent{
    @Input() title: string;
    constructor(
        @Inject('') protected deleteService: any,
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
