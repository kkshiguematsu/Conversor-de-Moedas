import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Conversao, Token } from './home';
import { HomeService } from './home.service';

var requestURL = 'https://api.exchangerate.host/symbols';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

var tokenData: Token[] = [];
request.onload = function () {
  var response = request.response;

  var values = Object.values(response);
  var json_string: string = JSON.stringify(values[2]);
  var json = JSON.parse(json_string);

  var tokens = Object.values(json);
  json_string = JSON.stringify(tokens);
  json = JSON.parse(json_string);

  for (let i = 0; i < json.length; i++) {
    var solo_token: Token = { simbolo: json[i].code };
    tokenData.push(solo_token);
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  convesorForm: FormGroup;
  tokens: Token[] = tokenData;
  conversao: Conversao[] = [];
  taxa:number;
  valor:number;

  constructor(
    private fb: FormBuilder,
    private service: HomeService,
  ) { }

  ngOnInit() {
    this.convesorForm = this.fb.group({
      valor: [''],
      tokenOrigem: [''],
      tokenDestino: [''],
    });
    sessionStorage.clear();

    // this.service.getTokens().subscribe(dados => {
    //   this.tokens = { simbolo: dados. };
    //   console.log(dados.simbolo)
    // })
  }

  converterValor() {
    if (this.convesorForm.value.valor > 0) {
      this.service.getConvesao(
        this.convesorForm.value.tokenOrigem,
        this.convesorForm.value.tokenDestino,
        this.convesorForm.value.valor).subscribe(dado => {
          this.conversao.push(dado)
          this.valor = dado.result
          this.taxa = dado.info.rate
        })
        
        sessionStorage.setItem("conversao",JSON.stringify(this.conversao));
    } else {
      // PRINT ERRO
    }
  }

}
