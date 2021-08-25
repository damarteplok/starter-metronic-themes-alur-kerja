import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Articles3Component} from './articles3.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteArticles3ModalComponent} from './components/delete-articles3-modal/delete-articles3-modal.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditArticles3ModalComponent} from './components/edit-articles3-modal/edit-articles3-modal.component';
import {CrudModule} from 'angular-alur-kerja-lib';

@NgModule({
    declarations: [Articles3Component, DeleteArticles3ModalComponent, EditArticles3ModalComponent],
    entryComponents: [DeleteArticles3ModalComponent, EditArticles3ModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Articles3Component,
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
export class Articles3Module {}
