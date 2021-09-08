import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Mainan2Component} from './mainan2.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditMainan2ModalComponent} from './components/edit-mainan2-modal/edit-mainan2-modal.component';
import {CrudModule, CRUDTableModule} from 'angular-alur-kerja-lib';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

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
        CrudModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        NgxMatSelectSearchModule
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
