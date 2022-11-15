import { APP_CONFIG, IAppConfig } from 'src/app/app.config';
import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NewYorkServices {

    newYorkApiEndpoint;
    newYorkApiKey;
    nagarroApiEndpoint;

    constructor(
        private http: HttpClient,
        @Inject(APP_CONFIG) public config: IAppConfig,
    ) {
        this.newYorkApiEndpoint = this.config.newYorkApiEndpoint;
        this.newYorkApiKey = this.config.newYorkApiKey;
        this.nagarroApiEndpoint = this.config.nagarroApiEndpoint;
    }

    topStories(article) {
        return this.http
            .get(this.nagarroApiEndpoint + "/nytimes/topstories?article=" + article)
            .toPromise()
            .then((res) => res)
            .then((data) => data);
    }

    articleSearch(query, page_number) {
        return this.http
            .get(this.nagarroApiEndpoint + "/nytimes/articlesearch?page_no=" + page_number + "&query=" + query)
            .toPromise()
            .then((res) => res)
            .then((data) => data);
    }

    historySearch() {
        return this.http
            .get(this.nagarroApiEndpoint + "/nytimes/historysearch")
            .toPromise()
            .then((res) => res)
            .then((data) => data);
    }


}
