import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ijson } from '../interfaces/token';

@Injectable({
    providedIn: 'root'
})
export class ListagemService {

    constructor(private http: HttpClient) { }

    getTokens(): Observable<Ijson> {
        let url = 'https://api.exchangerate.host/symbols';
        return this.http.get<Ijson>(url);
    }
}
