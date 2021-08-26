import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Category3Component} from './category3.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteCategory3ModalComponent} from './components/delete-category3-modal/delete-category3-modal.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditCategory3ModalComponent} from './components/edit-category3-modal/edit-category3-modal.component';
import {CrudModule} from 'angular-alur-kerja-lib';
import {DiagramComponent} from '../../_metronic/shared/crud-table/components/diagram/diagram.component';

@NgModule({
    declarations: [Category3Component, DeleteCategory3ModalComponent, EditCategory3ModalComponent, DiagramComponent],
    entryComponents: [DeleteCategory3ModalComponent, EditCategory3ModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Category3Component,
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
export class Category3Module {}
