import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Mainan5Component} from './mainan5.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditMainan5ModalComponent} from './components/edit-mainan5-modal/edit-mainan5-modal.component';
import {CrudModule, CRUDTableModule} from 'angular-alur-kerja-lib';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    declarations: [Mainan5Component, EditMainan5ModalComponent],
    entryComponents: [EditMainan5ModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Mainan5Component,
            },
        ]),
        InlineSVGModule,
        CRUDTableModule,
        ReactiveFormsModule,
        NgbModule,
        NgbDatepickerModule,
        CrudModule,
        MatTabsModule,
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
export class Mainan5Module {}
