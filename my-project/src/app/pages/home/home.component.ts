import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipment } from 'src/app/models/equipment';
import { ApiService } from 'src/app/services/api-service';
import { EquipmentStorage } from 'src/app/storage/storage';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  listOfData: Equipment[] = [];
  isVisible = false;
  deleteId = '';
  constructor(
    private router: Router,
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.getEquipment();
  }

  getEquipment() {
    this.service.getEquipment().then(r => {
      this.listOfData = r;
    }).catch(r => {
      console.log(r.message);
    })
  }

  ngOnDestroy() {

  }

  add() {
    this.router.navigate([environment.default, 'add']);
  }

  gotoDetail(item: Equipment) {
    EquipmentStorage.addEquipment = item;
    this.router.navigate([environment.default, 'report']);
  }

  deleteData(id: string) {
    this.deleteId = id;
    this.isVisible = true;
  }

  handleOk(): void {
    this.service.deleteEquipment(this.deleteId).then(r => {
      this.getEquipment();
    }).catch(r => {
      console.log(r.message);
    })
    this.isVisible = false;

  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
