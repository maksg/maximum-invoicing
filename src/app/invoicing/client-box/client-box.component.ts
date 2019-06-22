import { Component, OnInit } from '@angular/core';
import { Client } from '../model/invoice';

@Component({
  selector: 'app-client-box',
  templateUrl: './client-box.component.html',
  styleUrls: ['./client-box.component.scss']
})
export class ClientBoxComponent implements OnInit {

  client: Client;

  constructor() {
    this.client = {
      companyName: "",
      address: "",
      zipCode: "",
      country: "",
      nip: ""
    }
  }

  ngOnInit() {
  }

}
