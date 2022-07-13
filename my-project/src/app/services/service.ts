import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class Service {
    protected httpClient: HttpClient;


    constructor(private host: string = './api/') {
        this.httpClient = inject(HttpClient);
    }

    requestJson<T>(query: string, method: string, data: any = {}, responseType: string = 'json'): Promise<T> {
        let url = this.host + query;
        console.debug('Debug: Begin a text request. url:' + url + ';method:' + method + ';data:' + JSON.stringify(data));
        return new Promise<T>((resolve, reject) => {
            this.httpClient.request(method, url, {
                body: data,
                responseType: 'json',
            }).subscribe(r => {
                console.debug('Debug: Request text successful. Return:' + JSON.stringify(r));
                resolve(<T>r);
            }, e => {
                reject(e);
                console.error('Request text error: ' + e);
            });
        });
    }


    requestfile(query: string, method: string, data: any, responseType: string = 'text'): Promise<string> {
        const url = this.host + query;
        return new Promise((resolve, reject) => {
            this.httpClient.request(method, url, {
                body: data,
                responseType: 'text'
            }).subscribe(r => {
                resolve(r.toString());
            }, e => {
                reject(e);
                console.error('Request text error: ' + e);
            });
        });
    }


    requestText(query: string, method: string, data: any = {}): Promise<string> {
        let url = this.host + query;
        console.debug('Debug: Begin a text request. url:' + url + ';method:' + method + ';data:' + JSON.stringify(data));
        return new Promise((resolve, reject) => {
            this.httpClient.request(method, url, {
                body: data,
                responseType: 'text'
            }).subscribe(r => {
                resolve(r);
            }, e => {
                reject(e);
                console.error('Request text error: ' + e);
            });
        });
    }
}
