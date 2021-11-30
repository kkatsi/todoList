export interface TodoItem{
    subject: string;
    done: boolean;
}

export interface Item extends TodoItem{
    id: number;
}