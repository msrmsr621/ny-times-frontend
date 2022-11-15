
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, IAppConfig } from "../app.config";

@Injectable()
export class UserService {
    public nagarroApiEndpoint: string;
    constructor(
        @Inject(APP_CONFIG) public config: IAppConfig,
        private http: HttpClient,
    ) {
        this.nagarroApiEndpoint = this.config.nagarroApiEndpoint;
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    /**
     * this method will fetch user profile and auth token from server
     * @param input - login input to the service
     */
    public login(input): Observable<any> {
        return this.http
            .post("/v1/auth/login", {
                userName: input.userName,
                password: input.password
            })
            .pipe(
                map(response => {
                    console.log("login response from service", JSON.stringify(response));
                    // this.tokenStorage.saveToken(response['data']['accessToken']);
                    // this.tokenStorage.saveRefreshToken(response['data']['refreshToken']);
                    return response;
                }),
                catchError(this.errorHandler)
            );
    }

    errorHandler(error: HttpErrorResponse) {
        console.log(error)
        return error.message
    }

}
