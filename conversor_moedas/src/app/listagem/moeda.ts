export interface token{
    data: token_data[]
}

export interface token_data{
    code: string,
    description: string
}

export interface Ijson{
    motd:{
        msg:string,
        url:string,
    }
    success: boolean,
    symbols: {
       
    }   
}