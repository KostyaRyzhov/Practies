import {Component} from '@angular/core';
import {HttpService, Product} from "./config/config.service";
import {FormControl} from "@angular/forms";
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {Page} from "./Page";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  selected: any[] = [];

  cID = new FormControl("");
  cName = new FormControl("");
  cPrice = new FormControl("");
  cColor = new FormControl("");
  nName = new FormControl("");
  nPrice = new FormControl("");
  nColor = new FormControl("");
  fID = new FormControl("");
  fName = new FormControl("");
  fPrice = new FormControl("");
  fColor = new FormControl("");
  sId = new FormControl("");
  sName = new FormControl("");
  sPrice = new FormControl("");
  sColor = new FormControl("");

  isfiltered: boolean = false;
  rows: Product[] = [];
  loadingIndicator = true;
  str: string = "";

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  page = new Page();


  constructor(private configService: HttpService) {
    this.setPage(this.page);
  }


  setPage(pageInfo: any) {
    this.page.offset = pageInfo.offset;
    if (!this.isfiltered) {
      this.setCount();
      console.log(this.page);
      this.configService.pageReq(this.page).subscribe(rows => this.rows = rows);
    } else {
      this.filter();
    }
  }

  cleanFilter(){
    this.isfiltered = false;
    this.setPage(this.page);
  }

  sendJSON() {
    this.configService.postReq(new Product(this.cID.value, this.cName.value, this.cPrice.value, this.cColor.value)).subscribe(r => {
      console.log(r)
    });
  }

  unFilter() {
    this.isfiltered = false;
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
    this.configService.updReq(pr, updEl).subscribe(r => {
      console.log(r);
    })
  }

  setCount() {
    this.configService.countReq(this.page.count).subscribe(r => this.page.count = r);
  }
  filt(){
    this.page.offset = 0;
    this.filter();
  }

  filter() {
    this.isfiltered = true;
    this.configService.filterReq(new Product(this.fID.value, this.checkName(this.sName,this.fName), this.fPrice.value, this.checkName(this.sColor,this.fColor)),
      this.checkInt(this.sId)+"_"+this.checkInt(this.sPrice)+"_"+this.page.elCount+"_"+this.page.offset)
      .subscribe(rows => {this.rows = rows;
        console.log(this.rows);
      this.page.count = this.rows[this.rows.length -1].id;
      this.rows.splice(this.rows.length -1,1)});
  }

  addTestBase() {
    this.configService.postReq(new Product(1, "apple", 12, "red")).subscribe(r => {
      console.log(r)
    });
    this.configService.postReq(new Product(2, "apple", 15, "green")).subscribe(r => {
      console.log(r)
    });
    this.configService.postReq(new Product(3, "carrot", 20, "orange")).subscribe(r => {
      console.log(r)
    });
    this.configService.postReq(new Product(4, "melon", 100, "yellow")).subscribe(r => {
      console.log(r)
    });
    this.configService.postReq(new Product(5, "tomato", 9, "red")).subscribe(r => {
      console.log(r)
    });
    this.configService.postReq(new Product(6, "tomato", 10, "green")).subscribe(r => {
      console.log(r)
    });
  }

  checkInt(formCont: FormControl): string {
    if (formCont.value == "Точный поиск") {
      return "=";
    }
    if (formCont.value == "Больше значения") {
      return ">";
    }
    if (formCont.value == "Меньше значения") {
      return "<";
    }
    return ":";
  }

  checkName(formCont: FormControl, formstr: FormControl): string {
    if (formCont.value == "Точный поиск") {
      return formstr.value;
    } else if (formCont.value == "Поиск по началу") {
      return formstr.value + "%";
    } else if (formCont.value == "Поиск по окончанию") {
      return "%" + formstr.value;
    } else  {
      return "%" + formstr.value + "%";
    }
  }

}

