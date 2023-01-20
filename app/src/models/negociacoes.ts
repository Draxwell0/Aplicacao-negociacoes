import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes>{
    
    private negociacoes: Negociacao[] = [];

    public add(negociacao: Negociacao): void{
        this.negociacoes.push(negociacao);
    }

    public list(): readonly Negociacao[]{
        return this.negociacoes;
    }

    public paraTexto(): string{
        return JSON.stringify(this.negociacoes, null, 2)
    }

    public eIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) == JSON.stringify(negociacoes.list())
    }
}