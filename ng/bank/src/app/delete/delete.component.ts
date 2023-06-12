import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  //VARIABLE TO STORE INCOMIN DATA FROM PARENT
  @Input() childAcno: String | undefined

  //even creation
  @Output() onCancel = new EventEmitter()

  @Output() onDelete = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  cancelDelete() {
    this.onCancel.emit()
  }
  deleteconf(){
    this.onDelete.emit(this.childAcno)
  }

}
