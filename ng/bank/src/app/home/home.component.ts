import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  acno: any;
  balance: any;
  name: any;
  date: any;
  transactionStatus: any;
  tstatus: any


  constructor(private router: Router, private ds: DataService, private fb: FormBuilder, private datepipe: DatePipe) { }

  moneyTransferForm = this.fb.group({
    toAcno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  })

  ngOnInit(): void {
    if (!localStorage.getItem('currentacno')) {
      this.router.navigateByUrl('')
    }
    this.user = localStorage.getItem("currentUser");


  }
  logout() {
    localStorage.removeItem('currentacno');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token')
    this.router.navigateByUrl('')
  }

  getbalance() {
    this.acno = localStorage.getItem("currentacno")
    this.ds.balanceApi(this.acno).subscribe((result: any) => {
      this.balance = result.message;
      console.log(this.balance);

    })
  }
  getUser() {
    this.acno = localStorage.getItem("currentacno")
    this.ds.getUserApi(this.acno).subscribe((result: any) => {
      this.name = result.message.uname;
      this.balance = result.message.balance;
      this.acno = result.message.acno;



    })
  }
  fundTransfer() {
    if (this.moneyTransferForm.valid) {
      this.date = new Date();
      let latestDate = this.datepipe.transform(this.date, 'short');
      // console.log(latestDate);
      this.acno = localStorage.getItem('currentacno')
      let toAcno = this.moneyTransferForm.value.toAcno;
      let amnt = this.moneyTransferForm.value.amount;
      let psw = this.moneyTransferForm.value.psw;


      if (this.acno == toAcno) {
        this.transactionStatus = "inavalid account number"
      }
      else {
        this.ds.fundTransfer(toAcno, this.acno, amnt, psw, latestDate).subscribe(
          (result: any) => {
            console.log(result.message);
            this.transactionStatus = result.message;
            this.tstatus = true

          },
          result => {
            console.log(result.error.message);
            this.transactionStatus = result.error.message;
            this.tstatus = false

          }
        )
      }


    }
    else {
      this.transactionStatus = "invalid form";
      this.tstatus = false
    }
  }


  deleteClick() {
    this.acno = localStorage.getItem('currentacno');

  }
  noDelete() {
    this.acno = ''
  }
  yesDelete(event: any) {
    return this.ds.deleteAccount(event).subscribe((result: any) => {
      alert(result.message);
      this.logout()
    })
  }

}
