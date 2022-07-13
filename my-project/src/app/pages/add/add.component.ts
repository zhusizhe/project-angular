import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/services/api-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EquipmentStorage } from 'src/app/storage/storage';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {

  validateForm!: FormGroup;
  isVisible = false;
  isSave = false;
  observer!: any;
  constructor(private fb: FormBuilder, private message: NzMessageService, private service: ApiService, private router: Router,) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      model: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      manufactureDate: [null, [Validators.required]],
    });
  }

  leaveTip() {
    return Observable.create((observer: any) => {
      this.observer = observer;
      if (!this.isSave) {
        this.showModal()
      }
      else {
        observer.next(true);
      }
    });
  }

  submitForm(): void {
    if (!this.validateForm.valid) {
      this.message.info('请检查您的填写信息！');
      this.openDirtyControl(this.validateForm);
      return;
    }
    this.service.postEquipment(this.validateForm.value).then(r => {
      if (r) {
        this.isSave = true;
        this.message.info('添加成功！');
        EquipmentStorage.addEquipment = r;
        this.goDetail();
      } else {
        this.message.info('添加失败!');
      }
    }).catch(r => {
      this.message.info('添加失败：' + r.message);
    })


  }

  ngOnDestroy() {
  }

  openDirtyControl(data: any) {
    for (const i in data.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  goBack() {
    this.router.navigate([environment.default, 'home']);
  }

  goDetail() {
    this.router.navigate([environment.default, 'report']);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.observer.next(true);
  }

  handleCancel(): void {
    this.isVisible = false;
  }



}
