import { CanActivate, Router } from "@angular/router";

import { Inject, Injectable } from "@angular/core";
import { TokenStorageService } from "./token-storage.service";
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable()
export class RouteGuardService implements CanActivate {
    constructor(
        @Inject(APP_CONFIG) public config: IAppConfig,
        private tokenService: TokenStorageService,
        public router: Router,
    ) {
    }

    /**
     * add all checks to authorize access to given route
     */
    public canActivate(): boolean {
        const accessToken = this.tokenService.getToken();
        if (!accessToken) {
            // window.location.href = window.location.protocol + '//' + window.location.host + '/' + this.projectSolidWebBaseUrl + '/login';
            this.router.navigate(["login"]);
            return false;
        }
        return true;
    }
}
