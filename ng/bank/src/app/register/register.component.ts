import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pswCheck: any = false;

  constructor(private fb: FormBuilder, private ds: DataService , private rout:Router) { }
  registerForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    cpsw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]

  })

  ngOnInit(): void {

  }
  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.psw == this.registerForm.value.cpsw) {
        this.ds.registerApi(
          this.registerForm.value.acno,
          this.registerForm.value.uname,
          this.registerForm.value.psw).subscribe((result: any) => {
            alert(result.message)
            this.rout.navigateByUrl('')
            

          },
            result => {
              alert(result.error.message);

            })
      }
      else {
        this.pswCheck = true;
      }
    } else {
      alert("invalid form")
    }

  }
}