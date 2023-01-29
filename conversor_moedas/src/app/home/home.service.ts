import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversao } from './home';
import { Token } from './home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  constructor(private http: HttpClient) { }
  
  getConvesao(tokenOrigem: string, tokenDestino:string, valor:number){
    let url:string = "https://api.exchangerate.host/convert?from=" + tokenOrigem + "&to=" + tokenDestino + "&amount=" + valor;
    return this.http.get<Conversao>(url)
  }

  getTokens(){
    let url = 'https://api.exchangerate.host/symbols';
    return this.http.get<Token>(url);
  }
}
