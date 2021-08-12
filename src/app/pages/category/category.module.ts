import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';
import {CategoryComponent} from './category.component';

@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: CategoryComponent,
            },
        ]),
        InlineSVGModule,
        CRUDTableModule,
        ReactiveFormsModule,
    ],
})
export class CategoryModule {}
