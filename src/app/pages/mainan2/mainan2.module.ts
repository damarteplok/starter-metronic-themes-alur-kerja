import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Mainan2Component} from './mainan2.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditMainan2ModalComponent} from './components/edit-mainan2-modal/edit-mainan2-modal.component';
import {CrudModule, CRUDTableModule} from 'angular-alur-kerja-lib';

@NgModule({
    declarations: [Mainan2Component, EditMainan2ModalComponent],
    entryComponents: [EditMainan2ModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Mainan2Component,
            },
        ]),
        InlineSVGModule,
        CRUDTableModule,
        ReactiveFormsModule,
        NgbModule,
        NgbDatepickerModule,
        CrudModule
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
export class Mainan2Module {}
