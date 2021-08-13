import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';
import {CategoryComponent} from './category.component';
import {DeleteCategoryModalComponent} from './components/delete-category-modal.component';

@NgModule({
    declarations: [CategoryComponent, DeleteCategoryModalComponent],
    entryComponents: [
        DeleteCategoryModalComponent
    ],
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
