export interface Conversao {
    date: string,
    info: {
        rate: number,
    },
    query:{
        from: string,
        to: string,
        amount: number,
    },
    result: number,
}

export interface Itoken{
    symbols:Token[]
}

export interface Token {
    code: string;
}

