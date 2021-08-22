import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';
import {CategoryComponent} from './category.component';
import {DeleteCategoryModalComponent} from './components/delete-category-modal/delete-category-modal.component';
import {EditCategoryModalComponent} from './components/edit-category-modal/edit-category-modal.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter, CustomDateParserFormatter} from '../../_metronic/core';
import {EditorModule} from '@tinymce/tinymce-angular';
import {CrudModule} from 'angular-alur-kerja-lib';

@NgModule({
    declarations: [CategoryComponent, DeleteCategoryModalComponent, EditCategoryModalComponent],
    entryComponents: [
        DeleteCategoryModalComponent,
        EditCategoryModalComponent
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
        NgbModule,
        NgbDatepickerModule,
        EditorModule,
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
export class CategoryModule {}
