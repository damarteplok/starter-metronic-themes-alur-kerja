import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {TableService} from '../../../../_metronic/shared/crud-table';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {catchError, delay, finalize, tap} from 'rxjs/operators';
import {ArticlesService} from '../../articles.service';

@Component({
    selector: 'app-delete-articles-modal',
    templateUrl: './delete-articles-modal.component.html',
    styleUrls: ['./delete-articles-modal.component.scss']
})

export class DeleteArticlesModalComponent implements OnInit, OnDestroy {
    @Input() id: number;
    isLoading = false;
    subscriptions: Subscription[] = [];

    constructor(private tableService: ArticlesService, public modal: NgbActiveModal) { }

    ngOnInit(): void {
    }

    deleteCustomer() {
        this.isLoading = true;
        const sb = this.tableService.delete(this.id).pipe(
            delay(1000), // Remove it from your code (just for showing loading)
            tap(() => this.modal.close()),
            catchError((err) => {
                this.modal.dismiss(err);
                return of(undefined);
            }),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe();
        this.subscriptions.push(sb);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }
}
