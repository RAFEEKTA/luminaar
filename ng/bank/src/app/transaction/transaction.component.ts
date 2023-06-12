import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import jspdf from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  user: any;
  acno: any;
  date: any;
  transaction: any;
  serchString: any = ''
  constructor(private ds: DataService) { }
  ngOnInit(): void {
    this.user = localStorage.getItem('currentUser');
    this.acno = localStorage.getItem('currentacno');
    this.date = new Date();


    this.ds.Transactionhistory(this.acno).subscribe((result: any) => {
      this.transaction = result.message
      console.log(this.transaction);

    })
  }
  filterTrance(type: any) {
    this.serchString = type
  }
  //download transaction
  exportpdf() {
    //create an object for export pdf
    var pdf = new jspdf()

    //srt up col titles
    let col = ['type', 'amount', 'date']

    //set up row
    let row = []

    //styling pdf file
    pdf.setFontSize(17)

    //PDF heading
    pdf.text('Account Statement', 15, 10)

    //contant styling
    pdf.setTextColor(99)
    pdf.setFontSize(12)
    var allItems =this.transaction

    for(let i of allItems){
      let rowData =[i.type,i.amount,i.date];
      row.push(rowData)
    }

    //convert nested array to pdf
    (pdf as any).autoTable(col,row,{startY:15})

    //OPEN  CONVERTED PDF IN ANOTHER TAB
    pdf.output('dataurlnewwindow')

    //download pdf
    pdf.save('AccountStatement.pdf')

  }
}
