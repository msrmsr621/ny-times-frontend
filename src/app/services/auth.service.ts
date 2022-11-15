import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    nagarroApiEndpoint;
    constructor(
        @Inject(APP_CONFIG) public config: IAppConfig,
        private http: HttpClient
    ) {
        this.nagarroApiEndpoint = this.config.nagarroApiEndpoint;
    }

    refreshToken(token) {
        return this.http.post(this.nagarroApiEndpoint + '/v1/auth/refreshToken', token, httpOptions);
    }
}
