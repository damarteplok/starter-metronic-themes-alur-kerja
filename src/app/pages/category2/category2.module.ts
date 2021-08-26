import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Category2Component} from './category2.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteCategory2ModalComponent} from './components/delete-category2-modal/delete-category2-modal.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditCategory2ModalComponent} from './components/edit-category2-modal/edit-category2-modal.component';
import {CrudModule} from 'angular-alur-kerja-lib';

@NgModule({
    declarations: [Category2Component, DeleteCategory2ModalComponent, EditCategory2ModalComponent],
    entryComponents: [DeleteCategory2ModalComponent, EditCategory2ModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Category2Component,
            },
        ]),
        InlineSVGModule,
        CRUDTableModule,
        ReactiveFormsModule,
        NgbModule,
        NgbDatepickerModule,
        CrudModule,
    ],
    providers: [
        {
            provide: NgbDateAdapter,
            useClass: CustomAdapter
        },
        {
            provide: NgbDateParserFormatter,
            useClass: CustomDateParserFormatter
        }
    ],
})
export class Category2Module {}
