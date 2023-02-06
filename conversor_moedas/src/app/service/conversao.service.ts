import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversao } from '../interfaces/conversao';
import { Ijson } from '../interfaces/token';

@Injectable({
    providedIn: 'root'
})
export class ConversaoService {

    constructor(private http: HttpClient) { }

    getConvesao(tokenOrigem: string, tokenDestino: string, valor: number): Observable<Conversao> {
        let url: string = "https://api.exchangerate.host/convert?from=" + tokenOrigem + "&to=" + tokenDestino + "&amount=" + valor;
        return this.http.get<Conversao>(url)
    }

    getListTokens(): Observable<Ijson> {
        let url = 'https://api.exchangerate.host/symbols';
        return this.http.get<Ijson>(url);
    }

    getConversaoDolar(tokenOrigem: string, valor: number): Observable<Conversao>{
        let url = "https://api.exchangerate.host/convert?from=" + tokenOrigem + "&to=USD&amount=" + valor;
        return this.http.get<Conversao>(url);
    }
}
