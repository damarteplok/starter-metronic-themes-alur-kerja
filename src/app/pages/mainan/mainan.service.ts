import {Inject, Injectable, OnDestroy} from '@angular/core';
import {TableService} from 'angular-alur-kerja-lib';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MainanService extends TableService<any> implements OnDestroy {
    //OVERRIDE THIS
    API_URL = `${environment.apiUrl}/bpmn/mainan`;
    constructor(@Inject(HttpClient) http) {
        super(http);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

    getFormArr() {
        const url = this.API_URL + '/form';
        return this.http.get<any>(url);
    }

}
