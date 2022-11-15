import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
const SHORTURL_KEY = 'short-url';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    constructor(
        public router: Router,
    ) { }

    signOut(): void {
        window.localStorage.clear();
        this.router.navigate(["login"]);
    }

    public saveToken(token: string): void {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);

        // const user = this.getUser();
        // if (user.id) {
        //   this.saveUser({ ...user, accessToken: token });
        // }
    }

    public getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    public saveRefreshToken(token: string): void {
        window.localStorage.removeItem(REFRESHTOKEN_KEY);
        window.localStorage.setItem(REFRESHTOKEN_KEY, token);
    }

    public getRefreshToken(): string | null {
        return window.localStorage.getItem(REFRESHTOKEN_KEY);
    }

    public saveUser(user: any): void {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = window.localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }

    public saveShortUrl(short_url: string): void {
        window.localStorage.removeItem(SHORTURL_KEY);
        window.localStorage.setItem(SHORTURL_KEY, short_url);
    }

    public getShortUrl(): string | null {
        return window.localStorage.getItem(SHORTURL_KEY);
    }
}
