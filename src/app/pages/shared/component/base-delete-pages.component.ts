import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {catchError, delay, finalize, tap} from 'rxjs/operators';

@Component({
    selector: 'app-base-delete-pages',
    template: ``,
    styles: [],
})

export class BaseDeletePagesComponent implements OnInit, OnDestroy {
    @Input() id: number;
    isLoading = false;
    subscriptions: Subscription[] = [];

    constructor(
        @Inject('') protected tableService: any,
        public modal: NgbActiveModal
    ) { }

    ngOnInit(): void {
    }

    deleteMethod() {
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
