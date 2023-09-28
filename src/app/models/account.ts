export interface Account {
    _id: string;
    userId: {
        cpf: string;
        name: string;
        _id: string;
    };
    accountNumber: string;
    balance: number;
}
