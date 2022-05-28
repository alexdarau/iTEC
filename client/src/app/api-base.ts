import { HttpClient, HttpHeaders } from "@angular/common/http";


export abstract class ApiBase {
    protected endpoints: { [key: string]: string; } = {};
    readonly ROOT_URL;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': '' + localStorage.getItem('USER_TOKEN')
    });

    private headersImage = new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
        'x-access-token': '' + localStorage.getItem('USER_TOKEN')
    })

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

    protected buildDeleteURL (endpointKey: string, id: string) {
        let uri: string = this.endpoints[endpointKey];
       return `${this.ROOT_URL}/${uri}/${id}`;
    }

    protected buildGetURL (endpointKey: string, resourceName: string) {
        let uri: string = this.endpoints[endpointKey];
       return `${this.ROOT_URL}/${endpointKey}/?name=${resourceName}`;
    }

    protected buildGetWorkdeskURL (endpointKey: string, floorId: string, startDate: string, endDate: string) {
        return `${this.ROOT_URL}/${endpointKey}?id=${floorId}&startDate=${startDate}&endDate=${endDate}`;
    }
    
    get(url: string) {
        return this.http.get(url, {headers: this.headers});
    }

    post<T>(url: string, payload: any, isLogin: boolean = false, isImage?: boolean) {
        return isLogin ? this.http.post<T>(url, payload) : isImage ? this.http.post<T>(url, payload, { headers:  this.headersImage }) : this.http.post<T>(url, payload, { headers:  this.headers });
    }

    delete(url: string) {
        return this.http.delete(url);
    }
}