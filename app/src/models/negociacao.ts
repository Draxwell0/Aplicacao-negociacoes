import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao>{
    //O typeScript entende com esse método que ele deve fazer a atribuição
    //das variáveis para o escopo da classe. Só funciona quando acompanhado
    //do public ou private
    constructor(
        private readonly _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ){}

    //Sem o atributo readOnly nas propriedades, antes era necessário o uso de
    //getters para visualização sem modificação das propriedades, e o atributo
    //public era definido como private

    get data(): Date{
        const data = new Date(this._data.getTime());
        return data;
    }

    get volume(): number{
        return this.quantidade * this.valor;
    }

    public paraTexto(): string{
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
        `
    }

    public eIgual(negociacao: Negociacao): boolean{
        return this.data.getDate() === negociacao.data.getDate() 
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
    }

    public static criaDe(dataString: string, quantidadeString:string, valorString: string): Negociacao{
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

}