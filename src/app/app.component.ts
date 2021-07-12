import {Component} from '@angular/core';
import {HttpService, Product} from "./config/config.service";
import {FormControl} from "@angular/forms";
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  selected: any[] = [];

  cID = new FormControl("");
  cPID = new FormControl("");
  cName = new FormControl("");
  cPrice = new FormControl("");
  cColor = new FormControl("");
  nName = new FormControl("");
  nPrice = new FormControl("");
  nColor = new FormControl("");


  rows = [];
  loadingIndicator = true;
  reorderable = true;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;


  constructor(private configService: HttpService) {
    this.getAll();
  }

  sendJSON() {
    this.configService.postReq(new Product(this.cID.value, this.cName.value, this.cPrice.value, this.cColor.value)).subscribe(r => {
      console.log(r)
    });
  }

  getAll() {
    // @ts-ignore
    this.fetch(data => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
    console.log(this.rows);
  }

  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://localhost:8080/hello`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  delRequest() {
    const delConst: number = this.selected[0].id;
    console.log(delConst);
    this.configService.delReq(delConst).subscribe(r => {
      console.log(r)
    });
  }

  updRequest() {
    const updEl: number = this.selected[0].id;
    const pr: Product = new Product(updEl, this.nName.value, this.nPrice.value, this.nColor.value);
    this.configService.updReq(pr,updEl).subscribe(r => {
      console.log(r);
    })
  }
}

