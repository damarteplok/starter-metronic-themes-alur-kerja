import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ArticlesComponent} from './articles.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [ArticlesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ArticlesComponent,
            },
        ]),
        InlineSVGModule,
        CRUDTableModule,
        ReactiveFormsModule,
    ],
})
export class ArticlesModule {}
