import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Jatahcuti2Component} from './jatahcuti2.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteJatahcuti2ModalComponent} from './components/delete-jatahcuti2-modal/delete-jatahcuti2-modal.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditJatahcuti2ModalComponent} from './components/edit-jatahcuti2-modal/edit-jatahcuti2-modal.component';
import {CrudModule} from 'angular-alur-kerja-lib';

@NgModule({
    declarations: [Jatahcuti2Component, DeleteJatahcuti2ModalComponent, EditJatahcuti2ModalComponent],
    entryComponents: [DeleteJatahcuti2ModalComponent, EditJatahcuti2ModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Jatahcuti2Component,
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
export class Jatahcuti2Module {}
