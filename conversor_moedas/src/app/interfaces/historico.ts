export interface Historico {
    id: number;
    data: string;
    hora: string;
    valor: number;
    tokenOrigem: string;
    tokenDestino: string;
    resultado: number;
    taxa: number;
    flag_valor_dolar: boolean;
}