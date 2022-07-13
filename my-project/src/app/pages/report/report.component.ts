import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipment } from 'src/app/models/equipment';
import { EquipmentStorage } from 'src/app/storage/storage';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/services/api-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  validateForm!: FormGroup;
  equipment: Equipment;
  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private service: ApiService,
    private router: Router,) {
    this.equipment = EquipmentStorage.addEquipment;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      model: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      manufactureDate: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    if (!this.validateForm.valid) {
      this.message.info('请检查您的填写信息！');
      this.openDirtyControl(this.validateForm);
      return;
    }
    this.service.putEquipment(this.equipment.id, this.validateForm.value).then(r => {
      if (r) {
        this.message.info('修改成功！');
        this.goback();
      } else {
        this.message.info('修改失败!');
      }
    }).catch(r => {
      this.message.info('修改失败：' + r.message);
    })
  }

  openDirtyControl(data: any) {
    for (const i in data.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  goback() {
    this.router.navigate([environment.default, 'home']);
  }


}
