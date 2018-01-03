export class Cart{
    userId:number;
    tickets: {ticket:Ticket, cuantity: number}[] = []
}
export class Ticket{
    id: number;
    cost: number;
}