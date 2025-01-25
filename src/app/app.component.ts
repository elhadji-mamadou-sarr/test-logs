import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EtudiantModel } from './model/Etudiant';
import { NavbarComponent } from "./component/navbar/navbar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-logs';
  
  EtudiantForm: FormGroup = new FormGroup({});
  EtudiantObj: EtudiantModel= new EtudiantModel();
  etudiantList: EtudiantModel[] = [];
  constructor(){
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EtData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.etudiantList = parseData;
    }
  }
  reset() {
    this.EtudiantObj = new EtudiantModel();
  this.createForm();
  }
  createForm() {
    this.EtudiantForm = new FormGroup({
      firstname: new FormControl(this.EtudiantObj.firstname, [Validators.required]),
      lastname: new FormControl(this.EtudiantObj.lastname, [Validators.required]),
      email: new FormControl(this.EtudiantObj.email),
      age: new FormControl(this.EtudiantObj.age),
      phoneNo: new FormControl(this.EtudiantObj.phoneNo),
      serviceNo: new FormControl(this.EtudiantObj.serviceNo, [Validators.required, Validators.minLength(6)]),
      etId: new FormControl(this.EtudiantObj.etId),
      nationality: new FormControl(this.EtudiantObj.nationality),
      adress: new FormControl(this.EtudiantObj.adress),
      classe: new FormControl(this.EtudiantObj.classe),
      });
  } 
  onSave() {
    const oldData = localStorage.getItem("EtData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.EtudiantForm.controls['etId'].setValue(parseData.length +1);
      this.etudiantList.unshift(this.EtudiantForm.value);
  } else{
    this.etudiantList.unshift(this.EtudiantForm.value);
  }
  localStorage.setItem("EtData", JSON.stringify(this.etudiantList));
  this.reset();
}
onEdit(item: EtudiantModel){
this.EtudiantObj = item;
this.createForm();
}
onUpdate() {
  const record = this.etudiantList.find(m=>m.etId == this.EtudiantForm.controls['etId'].value);
  if (record != undefined) {
    record.firstname = this.EtudiantForm.controls['firstname'].value;
    record.lastname = this.EtudiantForm.controls['lastname'].value;
    record.age = this.EtudiantForm.controls['age'].value;
    record.classe = this.EtudiantForm.controls['classe'].value;
    record.email = this.EtudiantForm.controls['email'].value;
    record.phoneNo = this.EtudiantForm.controls['phoneNo'].value;
    record.serviceNo = this.EtudiantForm.controls['serviceNo'].value;
    record.nationality = this.EtudiantForm.controls['nationality'].value;
    record.adress = this.EtudiantForm.controls['adress'].value;
  }
  localStorage.setItem("EtData", JSON.stringify(this.etudiantList));
  this.reset();
}
onDelete(id: number) {
  const isDelete = confirm("Are you sure want to Delete");
  if (isDelete) {
    const index = this.etudiantList.findIndex(m=>m.etId == id);
    this.etudiantList.splice(index,1);
    localStorage.setItem("EtData", JSON.stringify(this.etudiantList));
  }
}

}
