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
            (data: any) => {
                this.list_tokens = data
            }
        )
    }

    converterValor() {
        if (this.convesorForm.value.valor > 0 &&  typeof this.convesorForm.value.valor == "number") {

            this.service.getConvesao(this.convesorForm.value.tokenOrigem, this.convesorForm.value.tokenDestino, this.convesorForm.value.valor).subscribe((dado: Conversao) => {
                const conversao: Historico = this.criaObjHistorico(dado)

                this.valor = dado.result
                this.taxa = dado.info.rate
                
                if(sessionStorage.getItem("conversao") == null){
                    this.conversao.push(conversao)
                    sessionStorage.setItem("conversao", JSON.stringify(this.conversao));
                }else{
                    let lista_historico = JSON.parse(sessionStorage.getItem("conversao") || "{}");
                    this.conversao = lista_historico;
                    this.conversao.push(conversao)
                    sessionStorage.setItem("conversao", JSON.stringify(this.conversao));
                }
            })
        } else {
            alert("Valor digitado inválido!");
        }
    }

    criaObjHistorico(dado: Conversao): Historico {
        let dataAtual = new Date()
        
        let  flag;
        let resultado: number = 0;
        this.service.getConversaoDolar(dado.query.from,dado.query.amount).subscribe((dado:Conversao) => {
            resultado = dado.result
        })
        if(resultado > 0){
            flag = true
        }else{
            flag = false
        }

        let Ihistorico: Historico = {
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

    getListTokens(): Token[]{
        return this.list_tokens;
    }

    getValorDolar(token: string, valor: number):boolean{
        let resultado = 0;
        this.service.getConversaoDolar(token,valor).subscribe(dado => {
            resultado = dado.result
        })
        if(resultado > 10000){
            return true
        }else{
            return false
        }
    }
}
