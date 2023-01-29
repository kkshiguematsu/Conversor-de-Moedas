import { Component } from '@angular/core';
import { FormGroup ,FormBuilder } from '@angular/forms';
import { OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from './home.service';

export interface Json{
  data: string,
  taxa: number,
  resultado: number,
  origem: string,
  destino: string,
  quantidade: number,
}

export interface Token {
  simbolo: string;
}

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
  json: Json;

  constructor(
    private formBuilder: FormBuilder,
    private service: HomeService
  ){}
  
  ngOnInit(){
    this.convesorForm = this.formBuilder.group({
      valor: [''],
      tokenOrigem: [''],
      tokenDestino: [''],
    });
  }

  converterValor(){
    if(this.convesorForm.value.valor > 0){
      // let requestURL:string = "https://api.exchangerate.host/convert?from="+ this.convesorForm.value.tokenOrigem +"&to="+ this.convesorForm.value.tokenDestino +"&amount="+ this.convesorForm.value.valor;
      // let request = new XMLHttpRequest();
      // request.open('GET', requestURL);
      // request.responseType = 'json';
      // request.send();
  
      request.onload = function() {
        let response = request.response;
        let json_string: string = JSON.stringify(response);
        let json = JSON.parse(json_string);
        
        // this.json: Json = {

        // } 

        // this.json = json; 
        console.log(json);
      }
    }else{
      // PRINT ERRO
    }
  }

}
