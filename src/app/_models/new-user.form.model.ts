export class NewUser{
    name: string;
    username: string;
    password: string;
    birthday: Date;
    email: string;
    address: Address[];
}

export class Address{
    apartment: string;
    street: string;
    city: string;
    state: string;
}