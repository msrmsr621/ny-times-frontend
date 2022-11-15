import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { APP_CONFIG, IAppConfig } from "../app.config";
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

const TOKEN_HEADER_KEY = 'Authorization';        // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';          // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    nagarroApiEndpoint;

    constructor(
        private toastr: ToastrService,
        public router: Router,
        @Inject(APP_CONFIG) public config: IAppConfig,
        private tokenService: TokenStorageService,
        private spinner: NgxSpinnerService,
        private authService: AuthService) {
        this.nagarroApiEndpoint = this.config.nagarroApiEndpoint;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        let authReq = req;
        const token = this.tokenService.getToken();
        // console.log("token ",token)
        if (token != null) {
            authReq = this.addTokenHeader(req, token);
        }

        return next.handle(authReq).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if (evt.body && evt.body.message) {
                        if (authReq.method == "POST") {
                        }
                        else if (authReq.method == "PUT") {
                        }
                        else if (authReq.method == "DELETE") {
                        }
                    }
                }
            }),

            catchError(error => {
                // console.log("error ", error)
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.toastr.error(error.error.message, 'ERROR');
                    this.spinner.hide();

                    // return this.handle401Error(authReq, next);
                }
                else if (error instanceof HttpErrorResponse && error.status === 404) {
                    if (this.nagarroApiEndpoint + '/v1/auth/refreshToken' == authReq.url) {
                        console.log("error ", error);
                        this.tokenService.signOut();
                    }

                }
                else if (error instanceof HttpErrorResponse && error.status === 400) {
                }
                else if (error instanceof HttpErrorResponse && error.status === 500) {
                    console.log(error)
                }

                return throwError(error);
            }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const token = this.tokenService.getRefreshToken();
            const accessToken = this.tokenService.getToken();

            if (token)
                return this.authService.refreshToken({ accessToken: accessToken, refreshToken: token }).pipe(
                    switchMap((response: any) => {
                        this.isRefreshing = false;

                        this.tokenService.saveToken(response['data']['accessToken']);
                        this.tokenService.saveRefreshToken(response['data']['refreshToken']);

                        this.refreshTokenSubject.next(response['data']['accessToken']);

                        return next.handle(this.addTokenHeader(request, response['data']['accessToken']));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;

                        this.tokenService.signOut();
                        return throwError(err);
                    })
                );
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer " + token) });
    }

}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];