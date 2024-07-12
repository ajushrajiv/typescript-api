export interface TodoAttributes{
    id?: number;
    userId: number;
    task: string;
    completed?: boolean;
    doBefore: Date | string;
}