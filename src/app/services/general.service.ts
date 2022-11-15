import { APP_CONFIG, IAppConfig } from 'src/app/app.config';
import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GeneralServices {

    nagarroApiEndpoint;

    constructor(
        private http: HttpClient,
        @Inject(APP_CONFIG) public config: IAppConfig,
    ) {
        this.nagarroApiEndpoint = this.config.nagarroApiEndpoint;
    }

    login(request_data) {
        return this.http
            .post(this.nagarroApiEndpoint + "/auth/login", request_data)
            .toPromise()
            .then((res) => res)
            .then((data) => data);
    }

    register(request_data) {
        return this.http
            .post(this.nagarroApiEndpoint + "/auth/register", request_data)
            .toPromise()
            .then((res) => res)
            .then((data) => data);
    }

}
