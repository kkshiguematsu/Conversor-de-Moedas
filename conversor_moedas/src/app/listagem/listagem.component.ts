import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListagemService } from './listagem.service';
import { Ijson, token, token_data } from '../interfaces/moeda';
import { delay, map } from 'rxjs/operators'

@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.scss']
})

export class ListagemComponent implements OnInit {
    tableSource: MatTableDataSource<token_data>;
    token: token;
    list_tokens: token_data[];
    displayedColunas = ["simbolo", "descricao"]

    constructor(
        private service: ListagemService
    ) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.setTable();
    }

    ngAfterViewInit() {

    }

    setTable() {
        this.service.getTokens().pipe(
            map((res: Ijson) => Object.values(res.symbols)),
        ).subscribe(
            (data: any) => {
                this.list_tokens = data;

                this.tableSource = new MatTableDataSource(this.list_tokens)
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
