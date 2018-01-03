export interface ILoggedUser {
    userId : number;
    username : string;
    password : string;
    token : string;
    constructor(id : number,
        username : string,
        password : string,
        token : string)
}
