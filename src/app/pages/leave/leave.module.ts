import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {LeaveComponent} from './leave.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteLeaveModalComponent} from './components/delete-leave-modal/delete-leave-modal.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditLeaveModalComponent} from './components/edit-leave-modal/edit-leave-modal.component';
import {CRUDTableModule, CrudModule} from 'angular-alur-kerja-lib';

@NgModule({
    declarations: [LeaveComponent, DeleteLeaveModalComponent, EditLeaveModalComponent],
    entryComponents: [DeleteLeaveModalComponent, EditLeaveModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: LeaveComponent,
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
export class LeaveModule {}
