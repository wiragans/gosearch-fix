import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private api: ApiService) {

  }

  unsubs = Subscription;
  interval;
  ngOnInit(): void {
    this.interval = setInterval(
      () => {
        this.latestUpload();
      },
      3000
    )
  }

  ngAfterViewInit() {
    this.latestUpload();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  latestUp;
  latestUpload() {
    this.api.latestUpload().subscribe(
      res => {
        if (res['status'] == true) {
          this.latestUp = res['success_data']['documents_data'];
        }
      }
    )
  }

  download(url) {
    window.open(url, '_blank');
  }

  titleFile = new FormArray([]);
  userName = new FormControl('');

  @ViewChild('fileInput') fileInput;
  dataUpload = [];
  uploadData = false;
  uploadFile(e) {
    this.suksesUpload = '';
    this.uploadList = [];
    this.uploadData = false;
    let jumlah = this.dataUpload.length;
    for (let i = 0; i < e.length; i++) {
      this.titleFile.push(new FormControl(''));
      if (e[i]['type'] == 'application/pdf') {
        this.uploadData = true;
        this.titleFile.controls[jumlah++].setValue(e[i]['name']);
        this.dataUpload.push({ data: e[i], status: true });
      } else {
        this.titleFile.controls[jumlah++].setValue('');
        this.dataUpload.push({ data: e[i], status: false });
      }
    }
    console.log(this.dataUpload);
    this.fileInput.nativeElement.value = '';
  }

  hilangin(id) {
    let dataUpload$ = [];
    for (let i = 0; i < this.dataUpload.length; i++) {
      if (i != id) {
        dataUpload$.push(this.dataUpload[i]);
      }
    }
    this.dataUpload = dataUpload$;
    console.log(this.dataUpload);
  }

  loading = false;
  suksesUpload;
  uploadList = [];
  titleEmpty = [];
  uploadCheckTitle = false;
  uploadDocumment() {
    this.titleEmpty = [];
    this.uploadCheckTitle = true;
    for (let i = 0; i < this.dataUpload.length; i++) {
      if (this.dataUpload[i]['status'] == true) {
        if (!this.titleFile.controls[i].value) {
          this.titleEmpty.push({ id: i, 'msg': 'Judul tidak boleh kosong.', status: 1 });
          this.uploadCheckTitle = false;
        } else {
          this.titleEmpty.push({ id: i, 'msg': '', status: 0 });
        }
      } else {
        this.titleEmpty.push({ id: i, 'msg': '', status: 0 });
      }
    }

    if (this.uploadCheckTitle) {
      this.loading = true;
      this.suksesUpload = '';
      this.uploadList = [];
      let title = [];
      for (let i = 0; i < this.titleFile.length; i++) {
        title.push(this.titleFile.controls[i].value);
        if (this.titleFile.length == (i + 1)) {
          this.titleFile.reset();
        }
      }
      if (this.titleFile) {
        let jumlah = 0;
        for (let i = 0; i < this.dataUpload.length; i++) {
          if (this.dataUpload[i]['status'] == true) {
            jumlah++;
          }
        }
        let jumlah_ = 0;
        for (let i = 0; i < this.dataUpload.length; i++) {
          if (this.dataUpload[i]['status'] == true) {
            jumlah_++;
            this.api.upload({ documment: this.dataUpload[i]['data'], title: title[i], username: this.userName.value }).subscribe(
              res => {

                if (res) {
                  if (res['status'] == true) {
                    this.uploadList.push({ status: 1, title: title[i] });
                  } else {
                    this.uploadList.push({ status: 0, title: title[i] });
                  }
                }
                if (jumlah == jumlah_) {
                  this.uploadCheckTitle = false;
                  this.loading = false;
                  this.dataUpload = [];
                  this.suksesUpload = 'Sukses Upload.';
                }

              },
              error => {

              }
            )
          }
        }
      } else {
        this.loading = false;
      }
    }

  }

}
