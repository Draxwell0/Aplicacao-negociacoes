import { escape } from "../decorators/escape.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes>{

    @escape
    protected template(model: Negociacoes): string{
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
                ${
                    model.list().map(elm=>{
                    return `
                        <tr>
                            <td>${this.formatar(elm.data)}</td>
                            <td>${elm.quantidade}</td>
                            <td>${elm.valor}</td>
                        </tr>
                    `
                    }).join('')
                }
            </tbody>
        </table>
        `;
    }

    private formatar(data: Date): string {
        return new Intl.DateTimeFormat().format(data);
    }
}