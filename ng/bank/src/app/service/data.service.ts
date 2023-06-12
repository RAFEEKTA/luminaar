import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//globel header for overload
const option = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  //token hedder
  getToken() {
    const headers = new HttpHeaders();
    const token = JSON.parse(localStorage.getItem("token") || "");
    if (token) {
      option.headers = headers.append('access_token', token)

    }
    return option
  }


  //register api  
  registerApi(acno: any, uname: any, psw: any) {
    const body = {
      acno,
      uname,
      psw
    }
    return this.http.post('http://localhost:3000/register', body)
  }

  //api to login -post
  loginApi(acno: any, psw: any) {

    const body = {
      acno, psw
    }
    return this.http.post('http://localhost:3000/login', body)
  }

  //api to access balance
  balanceApi(acno: any) {
    return this.http.get('http://localhost:3000/balance/' + acno, this.getToken())
  }
  //get single user data
  getUserApi(acno: any) {
    return this.http.get('http://localhost:3000/getUser/' + acno, this.getToken())
  }

  //api fund tansfer

  fundTransfer(toAcno: any, fromAcno: any, amount: any, psw: any, date: any) {
    const body = {
      toAcno, fromAcno, amount, psw, date
    }
    return this.http.post('http://localhost:3000/transfer/', body, this.getToken())
  }


  //api for transactions

  Transactionhistory(acno: any) {
    return this.http.get('http://localhost:3000/transactions/' + acno, this.getToken())
  }

  //api for delete account
  deleteAccount(acno: any) {
    return this.http.delete('http://localhost:3000/deleteAccount/' + acno, this.getToken())
  }
}
