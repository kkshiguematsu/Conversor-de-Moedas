import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ijson, token, token_data } from '../interfaces/listagem';
import { map } from 'rxjs/operators'
import { Token } from '@angular/compiler';

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
