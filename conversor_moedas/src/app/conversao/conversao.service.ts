import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversao, Token, Itoken } from '../interfaces/conversao';

@Injectable({
    providedIn: 'root'
})
export class ConversaoService {

    constructor(private http: HttpClient) { }

    getConvesao(tokenOrigem: string, tokenDestino: string, valor: number): Observable<Conversao> {
        let url: string = "https://api.exchangerate.host/convert?from=" + tokenOrigem + "&to=" + tokenDestino + "&amount=" + valor;
        return this.http.get<Conversao>(url)
    }

    getListTokens(): Observable<Itoken> {
        let url = 'https://api.exchangerate.host/symbols';
        return this.http.get<Itoken>(url);
    }
}
