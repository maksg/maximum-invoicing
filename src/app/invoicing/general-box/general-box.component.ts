import { Component, OnInit } from '@angular/core';
import { General } from '../model/invoice';

@Component({
  selector: 'app-general-box',
  templateUrl: './general-box.component.html',
  styleUrls: ['./general-box.component.scss']
})
export class GeneralBoxComponent implements OnInit {

  general: General;

  constructor() {
    this.general = {
      issueDate: "",
      number: "",
      dueDate: ""
    }
  }

  ngOnInit() {
  }

}
