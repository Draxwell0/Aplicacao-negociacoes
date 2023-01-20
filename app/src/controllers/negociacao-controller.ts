import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import {Negociacao} from '../models/negociacao.js'
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController{
    @domInjector('#data') 
    private inputData: HTMLInputElement;

    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;

    @domInjector('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor(){
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void{
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
            
        if(!this.isBusinessDay(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dias úteis são disponíveis')
            return;
        }
        this.negociacoes.add(negociacao);

        imprimir(negociacao, this.negociacoes)

        this.cleanForm();
        this.updateViews();
    }

    public importaDados():void {
        this.negociacoesService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje=>{
                return negociacoesDeHoje.filter(elm=>{
                    return !this.negociacoes.list().some(negociacao => negociacao.eIgual(elm))
                })
            })
            .then(negociacoesDeHoje => {
                negociacoesDeHoje.forEach(elm=>{
                    this.negociacoes.add(elm)
                })
                this.negociacoesView.update(this.negociacoes)
            })
    }

    private isBusinessDay(data: Date): boolean{
        return data.getDay() > DiasDaSemana.domingo && data.getDay() < DiasDaSemana.sabado
    }

    private cleanForm(): void{
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    //não é recomendável em questões de performance
    private updateViews():void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação Adicionada com sucesso!');
    }
}