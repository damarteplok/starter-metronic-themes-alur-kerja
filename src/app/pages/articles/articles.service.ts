import {Inject, Injectable, OnDestroy} from '@angular/core';
import {TableService} from '../../_metronic/shared/crud-table';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ArticlesService extends TableService<any> implements OnDestroy {
    API_URL = `${environment.apiUrl}/crud/article`;
    constructor(@Inject(HttpClient) http) {
        super(http);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

}
