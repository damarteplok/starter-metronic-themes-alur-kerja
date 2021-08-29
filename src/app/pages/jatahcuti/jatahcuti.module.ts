import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {JatahcutiComponent} from './jatahcuti.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteJatahcutiModalComponent} from './components/delete-jatahcuti-modal/delete-jatahcuti-modal.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditJatahcutiModalComponent} from './components/edit-jatahcuti-modal/edit-jatahcuti-modal.component';
import {CrudModule} from 'angular-alur-kerja-lib';

@NgModule({
    declarations: [JatahcutiComponent, DeleteJatahcutiModalComponent, EditJatahcutiModalComponent],
    entryComponents: [DeleteJatahcutiModalComponent, EditJatahcutiModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: JatahcutiComponent,
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
export class JatahcutiModule {}
