import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken("app.config");

export interface IAppConfig {
    nagarroApiEndpoint: string;
    newYorkApiEndpoint: string;
    newYorkApiKey: string;
}

export const AppConfig: IAppConfig = {
    nagarroApiEndpoint: "http://localhost:8000",
    newYorkApiEndpoint: "https://api.nytimes.com/svc",
    newYorkApiKey: "0yKh39tYFbWxVyaDsyjiQIiGLj9CARmD",

};