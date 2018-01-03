import { Address } from "../_models/new-user.form.model";

export interface IProfile {
    name: string;
    birthday: string;
    mail: string;
    username: string;
    addresses: Address[];
}

