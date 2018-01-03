import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { LogInDialog } from "../user-management/user-login.component";

@Injectable()
export class ModalControlService {

    constructor(public dialog: MatDialog){}

    openDialog(route: string) {
        let dialogRef = this.dialog.open(LogInDialog, {
        height: '250px',
        width: '350px',
        data: {url:route}
        });
    }
}