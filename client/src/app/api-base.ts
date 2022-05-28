import { HttpClient } from "@angular/common/http";


export abstract class ApiBase {
    protected endpoints: { [key: string]: string; } = {};
    readonly ROOT_URL;

    constructor( protected http: HttpClient ) {
        this.ROOT_URL = 'http://localhost:3000';
        this.initEndpoints()
    }

    protected initEndpoints() {
        throw new Error('Endpoints not initialized!');
    }

    protected setEndpoints(endpoints: {[key: string]: string}) {
        this.endpoints = endpoints
    }

    protected buildURL (endpointKey: string) {
        let uri: string = this.endpoints[endpointKey];
       return `${this.ROOT_URL}/${uri}`;
    }
    
    get(url: string) {
        return this.http.get(url);
    }

    post(url: string, payload: any, options?: object) {
        return this.http.post(url, payload, options);
    }
}