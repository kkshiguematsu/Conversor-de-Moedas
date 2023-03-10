import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';

import { Conversao } from '../interfaces/conversao';
import { Ijson, token_data } from '../interfaces/token';
import { Historico } from '../interfaces/historico';

import { ConversaoService } from '../service/conversao.service';
import { map } from 'rxjs';

import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { SnackbarAlertComponent } from './snackbar-alert/snackbar-alert.component';

@Component({
    selector: 'app-conversao',
    templateUrl: './conversao.component.html',
    styleUrls: ['./conversao.component.scss']
})
export class ConversaoComponent implements OnInit {
    convesorForm: FormGroup;
    private list_tokens: token_data[];
    conversao: Historico[] = [];
    taxa: number;
    valor: number;
    toggle_alerta: boolean

    constructor(
        private fb: FormBuilder,
        private service: ConversaoService,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit() {
        this.startForm();
        this.loadTokens();
    }

    startForm() {
        this.convesorForm = this.fb.group({
            valor: [''],
            tokenOrigem: [''],
            tokenDestino: [''],
        });
    }

    loadTokens() {
        this.service.getListTokens().pipe(
            map((resposta: Ijson) => Object.values(resposta.symbols)),
        ).subscribe(
            data => {
                this.list_tokens = data
            }
        )
    }

    converterValor() {
        this.conversao = JSON.parse(sessionStorage.getItem("conversao") || "{}")

        let valor_dolar: number
        this.service.getConversaoDolar(this.convesorForm.value.tokenOrigem, this.convesorForm.value.valor).subscribe((dado: Conversao) => {
            valor_dolar = dado.result
        })

        if (this.convesorForm.value.valor > 0 && typeof this.convesorForm.value.valor == "number") {
            this.service.getConvesao(this.convesorForm.value.tokenOrigem, this.convesorForm.value.tokenDestino, this.convesorForm.value.valor)
                .subscribe((dado: Conversao) => {
                    let conversao: Historico

                    this.valor = dado.result
                    this.taxa = dado.info.rate

                    if (this.conversao.length != 0) {
                        if (this.conversao.filter(item => item.id == this.conversao.length)) {
                            conversao = this.criaObjHistorico(dado, this.conversao[this.conversao.length - 1].id + 1, valor_dolar)
                        } else {
                            conversao = this.criaObjHistorico(dado, this.conversao.length, valor_dolar)
                        }

                        this.conversao.push(conversao)
                        sessionStorage.setItem("conversao", JSON.stringify(this.conversao));
                    } else {
                        conversao = this.criaObjHistorico(dado, 1, valor_dolar)

                        this.conversao.push(conversao)
                        sessionStorage.setItem("conversao", JSON.stringify(this.conversao));
                    }
                })
        } else {
            this.openSnackBar()
        }
    }

    criaObjHistorico(dado: Conversao, index: number, valor_dolar: number): Historico {
        let dataAtual = new Date()
        let Ihistorico: Historico

        let flag;
        if (valor_dolar >= 10000) {
            flag = true
        } else {
            flag = false
        }

        Ihistorico = {
            id: index,
            data: dado.date,
            hora: dataAtual.getHours() + ":" + dataAtual.getMinutes(),
            valor: dado.query.amount,
            tokenOrigem: dado.query.from,
            tokenDestino: dado.query.to,
            resultado: dado.result,
            taxa: dado.info.rate,
            flag_valor_dolar: flag,
        }
        return Ihistorico
    }

    getListTokens(): token_data[] {
        return this.list_tokens;
    }

    openSnackBar() {
        this.snackBar.openFromComponent(SnackbarAlertComponent, {
          duration: 3 * 1000,
        });
      }
}
