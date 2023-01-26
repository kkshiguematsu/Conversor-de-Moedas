import { Component } from '@angular/core';
import { OnInit  } from '@angular/core';
import { ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Token {
  id: number;
  simbolo: string;
  descricao: string;
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
    var solo_token: Token = { id: i, simbolo: json[i].code, descricao: json[i].description };
    console.log(typeof tokenData)
    tokenData.push(solo_token);
  }
}

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})

export class ListagemComponent implements OnInit{
  tableData: MatTableDataSource<Token>;
  displayedColunas = ["id", "simbolo", "descricao"];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit(){
    this.tableData = new MatTableDataSource(tokenData);
  }
  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
  }
  buscaToken(event:Event){
    var value = (event.target as HTMLInputElement).value;
    this.tableData.filter = value;
  }
}
