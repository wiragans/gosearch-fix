import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.css']
})
export class ListSearchComponent implements OnInit {

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  value;
  page;
  page_;
  methodSearch;
  vectorSearch = false;
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.value = params.value;
      this.page_ = params['page'];
      this.page = parseInt(params['page']) - 1;
      this.methodSearch = params['method'];
      if (this.methodSearch == 'no_method') {
        this.vectorSearch = false;
      } else {
        this.vectorSearch = true;
      }
      this.search(this.value);
      this.searchValue.setValue(this.value);
    });

  }

  goSearch() {
    let method = 'no_method';
    if (this.vectorSearch) {
      method = 'vector_space_model_active';
    }

    this.router.navigate(['/search', this.searchValue.value, 1, method]);
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
    this.searchData = '';
    this.searchEnt = false;
    this.searchLoad = false;
    this.searchInfo = '';
  }

  searchValue = new FormControl('');
  searchData;
  searchEnt = false;
  searchLoad = false;
  searchInfo;
  searchInterval;
  searchInterval_;
  unsub = new Subscription;
  search(value) {
    this.unsub.unsubscribe();
    this.intervalSearc();
    this.searchLoad = true;
    this.searchEnt = false;
    this.searchInfo = '';
    this.searchData = '';
    this.unsub = this.api.searchQuery({ value: value, method: this.methodSearch }).subscribe(
      res => {
        if (res['status'] == true) {
          if (res['success_data']['amount_result'] == 0) {
            this.searchData = '';
          } else {
            let data = res['success_data']['documents_data'];
            let a = 0;
            let page = 0;
            let data_ = [];
            let data$ = [];
            for (let i = 0; i < data.length; i++) {
              a++;
              data_.push(data[i]);
              if (a == 9) {
                a = 0;
                page++;
                data$.push({ page: page, data: data_ });
                data_ = [];
              } else if (data.length < 9 && i == (data.length - 1)) {
                data$.push({ page: 1, data: data_ });
              }
            }
            this.searchData = data$;
            console.log(this.searchData);
          }
        }

        clearInterval(this.searchInterval_);
        this.searchInfo = { jumlah: res['success_data']['amount_result'], durasi: res['success_data']['query_load_time'] }
        this.searchEnt = true;
        this.searchLoad = false;
        console.log(res);
      }
    )
  }

  intervalSearc() {
    let interval = 0;
    this.searchInterval_ = setInterval(
      () => {
        interval++
        this.searchInterval = (interval / 10);
      },
      100
    )
  }

  download(url) {
    window.open(url, '_blank');
  }

}
