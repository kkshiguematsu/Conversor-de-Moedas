import { Component } from '@angular/core';
import { OnInit  } from '@angular/core';
import { ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListagemService } from './listagem.service';
import { Ijson, token, token_data } from './moeda';
import { delay, map } from 'rxjs/operators'
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})

export class ListagemComponent implements OnInit{
  tableSource: MatTableDataSource<token_data>;
  token: token;
  LTS_token: token_data[];


  displayedColunas = ["simbolo", "descricao"]
  
  constructor(private service: ListagemService){
    // this.testeSource = {} as Ijson;
    
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  
  ngOnInit(){
    // this.LTS_setTable();
    this.setTable();

  }

  ngAfterViewInit() {
    
    this.tableSource.sort = this.sort;
  }

  setTable(){
    this.service.getTokens().pipe(
      map((res:Ijson) => Object.values(res.symbols)),
    ).subscribe(
      (data:any) => {
        console.log(data);
        this.LTS_token = data;
        this.tableSource = new MatTableDataSource(this.LTS_token)

        // this.token.data = data;
        // this.tableSource = new MatTableDataSource( this.token.data)
        
        this.tableSource.paginator = this.paginator;
        this.tableSource.sort = this.sort;
      },
      err => {console.log("Error", err)},
      () => {console.log("Fim")}
    );
  }

  LTS_setTable(){
    this.service.getTokens().subscribe(resultado => {
      this.LTS_token = Object.values(resultado.symbols).map((item:any, index) => {
        return {
          code: item.code,
          description: item.description
        } 
      })
      this.tableSource = new MatTableDataSource(this.LTS_token)
      this.tableSource.paginator = this.paginator;
      this.tableSource.sort = this.sort;
    });
  }

  buscaToken(event:Event){
    var value = (event.target as HTMLInputElement).value;
    this.tableSource.filter = value;
  }
}
