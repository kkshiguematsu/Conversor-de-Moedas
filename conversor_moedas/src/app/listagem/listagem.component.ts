import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ListagemService } from '../service/listagem.service';
import { token_data } from '../interfaces/token';
import { delay, map } from 'rxjs/operators'

@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.scss']
})

export class ListagemComponent implements OnInit {
    tableSource: MatTableDataSource<token_data>;
    list_tokens: token_data[];
    displayedColunas = ["simbolo", "descricao"]

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private service: ListagemService
    ) { }


    ngOnInit() {
        this.setTable();
    }

    ngAfterViewInit() {

    }

    setTable() {
        this.service.getTokens().pipe(
            map(res => Object.values(res.symbols)),
        ).subscribe(
            data => {
                this.list_tokens = data
                this.tableSource = new MatTableDataSource(data)
                this.tableSource.paginator = this.paginator;
                this.tableSource.sort = this.sort;
            },
        );
    }

    buscaToken(event: Event) {
        var value = (event.target as HTMLInputElement).value;
        this.tableSource.filter = value;
    }
}
