import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { Historico } from '../interfaces/historico';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-historico',
    templateUrl: './historico.component.html',
    styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit{
    tableSource: MatTableDataSource<Historico>;
    lista_historico: Historico[];
    displayColunas = ["data","hora","valor","moedaSelecionada","moedaConvertida","resultado","taxa"," "];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(){}

    ngOnInit(){
        this.carregaListaHistorico();
    }

    ngAfterViewInit(){
        this.tableSource.paginator = this.paginator
        this.tableSource.sort = this.sort
    }

    carregaListaHistorico(){
        this.lista_historico = JSON.parse(sessionStorage.getItem("conversao") || "{}")
        this.tableSource = new MatTableDataSource(this.lista_historico)
    }

    deleteItem(historico: Historico){
        let lista: Historico[] = JSON.parse(sessionStorage.getItem("conversao") || "{}");
        lista = lista.filter( busca => {
            return busca.resultado != historico.resultado;
        });
        sessionStorage.setItem("conversao", JSON.stringify(lista));
        this.tableSource.data = [...lista]
    }
}
