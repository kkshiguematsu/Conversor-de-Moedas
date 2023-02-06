import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Conversao, Token, Itoken } from '../interfaces/conversao';
import { Historico } from '../interfaces/historico';
import { ConversaoService } from './conversao.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-conversao',
    templateUrl: './conversao.component.html',
    styleUrls: ['./conversao.component.scss']
})
export class ConversaoComponent implements OnInit {
    convesorForm: FormGroup;
    private list_tokens: Token[];
    conversao: Historico[] = [];
    taxa: number;
    valor: number;

    constructor(
        private fb: FormBuilder,
        private service: ConversaoService,
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
            map((resposta: Itoken) => Object.values(resposta.symbols)),
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

                        this.conversao = []
                        this.conversao.push(conversao)
                        sessionStorage.setItem("conversao", JSON.stringify(this.conversao));
                    }
                })
        } else {
            alert("Valor digitado inválido!");
        }
    }

    criaObjHistorico(dado: Conversao, index: number, valor_dolar: number): Historico {
        let dataAtual = new Date()
        let Ihistorico: Historico

        let flag;
        if (valor_dolar > 10000) {
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
        console.log(Ihistorico.flag_valor_dolar)
        return Ihistorico
    }

    getListTokens(): Token[] {
        return this.list_tokens;
    }
}
