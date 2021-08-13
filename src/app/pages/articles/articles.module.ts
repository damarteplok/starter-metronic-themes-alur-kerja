import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ArticlesComponent} from './articles.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteArticlesModalComponent} from './components/delete-articles-modal/delete-articles-modal.component';

@NgModule({
    declarations: [ArticlesComponent, DeleteArticlesModalComponent],
    entryComponents: [DeleteArticlesModalComponent],
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
