import { Cliente } from "../cliente-consulta/cliente-model";
import { Produto } from "../produto/produto";
import { Servico } from "../servico-consulta/servico-model";
import { Tecnico } from "../tecnico-consulta/tecnico-model";
import { Acessorio } from "./acessorio-model";
import { Categoria } from "./categoria-model";
import { Historico } from "./historico-model";
import { InfoTec } from "./infoTec-model";
import { Situacao } from "./situacao-model";

export class  OrdemServico{
    id: any;
    idEmpresa: any;
    status:any;
    nrOrdemServico:any;
    marca: string = '';
    modelo: string = '';
    nrSerie: string = '';
    dsDefeitoCliente: string = '';
    dsDefeitoTecnico: string = '';
    orcamentoAprovado:boolean = false;
    dataEntrada : any;
    dataSaida: any;
    dataRepasse: any;
    osbservacao: string = '';
    cliente: Cliente = new Cliente;
    tecnicoResponsavel: Tecnico = new Tecnico();
    tecnicoResponsavelAnterior!: Tecnico;
    infoTec!: InfoTec;
    categoria: Categoria = new Categoria;
    pecaReparo: string = '';
    precoPecaReparo: string = '';
    valorOrcamento: any;
    valorDesconto: any;
    valorTotal: any;
    cor:any;
    servicosEfetuados: Servico [] = [];
    acessorios: Acessorio[] = [];
    historico: Historico[] = [];
    situacaoAtual!: Situacao;
    produtos: Produto[] = [];
}




    
