import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Register } from '../_services/register.service';
import { NewUser, Address } from '../_models/new-user.form.model';
import { AbstractControl } from '@angular/forms/src/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  NewUserForm: FormGroup;
  i: number = 0;
  numberOfAddresses=2;
  addMore: boolean = this.numberOfAddresses>1;
  newUser = new NewUser();
  errorMessages: string[] = ["","","","","","","","","","","","","",""];
  index = {name:0, birth:1, email:2, user:3, pass:4, rppass:5, ap:6, st:7, city:8, state:9}
  private validationMessages = [
    {
      required: 'Please enter your name.',
    },
    {
      required: 'Please enter your birthday.',
    },
    {
      required: 'Please enter your email.',
    },
    {
      required: 'Please enter your username.',
    },
    {
      required: 'Please enter your password.',
    },
    {
      required: 'Please enter your password again.',
    },
    {
      required: 'Please enter your apartment.',
    },
    {
      required: 'Please enter your street.',
    },
    {
      required: 'Please enter your city.',
    },
    {
      required: 'Please enter your state.',
    },
    {
      required: 'Please enter your apartment.',
    },
    {
      required: 'Please enter your street.',
    },
    {
      required: 'Please enter your city.',
    },
    {
      required: 'Please enter your state.',
    }
  ];

  constructor(
    private fb: FormBuilder,
    private registerService: Register,
    private router: Router
  ) { }

  register(){
    this.newUser = {
      name : this.personalInfo.get("name").value,
      username : this.NewUserForm.get("username").value,
      password : this.NewUserForm.get("password").value,
      birthday : this.personalInfo.get("birthday").value,
      email : this.personalInfo.get("email").value,
      address: this.mapAddresses()
    }
    this.registerService.register(this.newUser).subscribe(data => {
      if(data){
        alert("Success");
        this.router.navigate(["/"]);
      }
    });
  }
  
  mapAddresses(): Address[]{
    let local: Address[] = [];
    let a : Address;
    for (let j=0; j<=this.i; j++ ){
      a = new Address();
      a =  {
        apartment: this.addresses.get(j + '.apartment').value,
        street: this.addresses.get(j + '.street').value,
        city: this.addresses.get(j + '.city').value,
        state: this.addresses.get(j + '.state').value,
      }
      local.push(a);
    }
    return local;
  }

  get addresses(): FormArray{
    return <FormArray>this.NewUserForm.get('addresses')
  }

  get personalInfo(): FormArray{
    return <FormArray>this.NewUserForm.get('personalInformation')
  }
  buildAddress(): FormGroup{
    return this.fb.group({
        apartment: ['', [Validators.required]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]]
    })
  }

  addAddress(): void{
    this.i++;
    this.addresses.push(this.buildAddress())
    let addresses = this.NewUserForm.get('addresses') as FormArray;
    const apartmentControl2 = addresses.at(1).get('apartment');
    apartmentControl2.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(apartmentControl2, this.index.ap + 4));
    const streetControl2 = addresses.at(1).get('street');
    streetControl2.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(streetControl2, this.index.st + 4));
    const cityControl2 = addresses.at(1).get('city');
    cityControl2.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(cityControl2, this.index.city + 4));
    const stateControl2 = addresses.at(1).get('state');
    stateControl2.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(stateControl2, this.index.state + 4));
    if (this.i<=this.numberOfAddresses-1){
      this.addMore=false;
    }
  }

  setMessage(c: AbstractControl, i:number): void {
    this.errorMessages[i] = '';
    if ((c.touched || c.dirty) && c.errors) {
        this.errorMessages[i] = Object.keys(c.errors).map(key =>
            this.validationMessages[i][key]).join(' ');
    }
  }  

  ngOnInit() {
    this.NewUserForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatpassword: ['', [Validators.required]],
      addresses: this.fb.array([ this.buildAddress() ]),
      personalInformation: this.fb.group({
        name: ['', [Validators.required]],
        birthday:['', [Validators.required]],
        email:['', [Validators.required]]
      })
    }); 
    const nameControl = this.NewUserForm.get('personalInformation').get('name');
    nameControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(nameControl, this.index.name));
    const birthControl = this.NewUserForm.get('personalInformation').get('birthday');
    birthControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(birthControl, this.index.birth));
    const emailControl = this.NewUserForm.get('personalInformation').get('email');
    emailControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(emailControl, this.index.email));
    const usernameControl = this.NewUserForm.get('username');
    usernameControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(usernameControl, this.index.user));
    const passwordControl = this.NewUserForm.get('password');
    passwordControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(passwordControl, this.index.pass));
    const rpPasswordControl = this.NewUserForm.get('repeatpassword');
    rpPasswordControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(rpPasswordControl, this.index.rppass));
    let addresses = this.NewUserForm.get('addresses') as FormArray;
    const apartmentControl = addresses.at(0).get('apartment');
    apartmentControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(apartmentControl, this.index.ap));
    const streetControl = addresses.at(0).get('street');
    streetControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(streetControl, this.index.st));
    const cityControl = addresses.at(0).get('city');
    cityControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(cityControl, this.index.city));
    const stateControl = addresses.at(0).get('state');
    stateControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(stateControl, this.index.state));          
  }
}