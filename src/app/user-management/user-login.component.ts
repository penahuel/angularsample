import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthGuard } from '../_guards/auth.guard';
import { Authentication } from '../_services/authentication.service';
import { User } from '../_models/user.model';
import 'rxjs/add/operator/debounceTime';
import { CartService } from '../_services/cart.service';

@Component({
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class LogInDialog implements OnInit {
  UserForm: FormGroup;
  user: User;
  returnUrl: string;
  loading = false;
  errorMessages: string[] = ["", ""];
  index={user: 0, pass: 1}

  private validationMessages = [
    {
      required: 'Please enter your username.',
      minlength: 'Too short'
    },
    {
      required: 'Please enter your password.',
      pattern: 'Please enter a valid password.'
    }
  ];
  
  constructor(
    public dialogRef: MatDialogRef<AuthGuard>,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: Authentication,
    private fb: FormBuilder,
    private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.closeDialog()
  }

  closeDialog(){
    this.dialogRef.close();
  }

  logIn(state: RouterStateSnapshot){
    this.user = new User( 
      this.UserForm.get("username").value,
      this.UserForm.get("password").value)
    this.authenticationService.login(this.user)
    .subscribe(
        data => {
          this.cartService.setUserId(data.userId);
          if(this.returnUrl!=""){
            this.router.navigate([this.returnUrl]);
          }
          else{
            location.reload();
          }
          this.closeDialog()
        },
        error => {
            console.log(<any>error);
            this.loading = false;
        });
  }

  setMessage(c: AbstractControl, i:number): void {
    this.errorMessages[i] = '';
    if ((c.touched || c.dirty) && c.errors) {
        this.errorMessages[i] = Object.keys(c.errors).map(key =>
            this.validationMessages[i][key]).join(' ');
    }
  }

  ngOnInit(): void {
    let passPattern = '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}';
    this.UserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.pattern(passPattern)]]
    });
    this.returnUrl = this.data.url;
    const usernameControl = this.UserForm.get('username');
    usernameControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(usernameControl, this.index.user));

    const passwordControl = this.UserForm.get('password');
    passwordControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(passwordControl, this.index.pass));
  }
}