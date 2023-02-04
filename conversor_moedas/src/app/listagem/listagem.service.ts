import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ijson, token,token_data } from './moeda';
import { map } from 'rxjs/operators'
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ListagemService {

  constructor(private http: HttpClient) { }

  getTokens(): Observable<Ijson>{
    let url = 'https://api.exchangerate.host/symbols';
    return this.http.get<Ijson>(url);
  //   return this.http.get<any>(url).pipe(map((resposta:any) => {
  //     resposta.symbols.map((dados:token_data, index:number) => {
  //       return {
  //         id: index,
  //         code: dados.code,
  //         description: dados.description
  //       }
  //     })
  //   }));
  // }
  }
}
