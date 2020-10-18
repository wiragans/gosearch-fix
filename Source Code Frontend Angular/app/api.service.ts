import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  allHeader() {
    let header = new HttpHeaders('');
    header = header.append('GOSEARCH-API-KEY', environment.key);
    header = header.append('Authorization', environment.authorization);
    header = header.append('Content-Type', 'application/x-www-form-urlencoded');
    return header;
  }

  upload(data) {
    const url = 'https://www.kmsp-store.com/gosearch/api/v1/file_upload';
    let header = new HttpHeaders('');
    header = header.append('GOSEARCH-API-KEY', environment.key);
    header = header.append('Authorization', environment.authorization);

    const payload = new FormData();
    payload.append('document', data.documment);
    payload.append('search_title', data.title);
    payload.append('user', data.username);

    return this.http.post(url, payload, { headers: header });
  }

  latestUpload() {
    const url = 'https://www.kmsp-store.com/gosearch/api/v1/latest_upload';
    let header = this.allHeader();
    return this.http.get(url, { headers: header });
  }

  searchQuery(data) {
    const url = 'https://www.kmsp-store.com/gosearch/api/v1/search_query';
    let header = this.allHeader();
    const payload = 'search_query=' + data.value + '&search_method=' + data.method;
    return this.http.post(url, payload, { headers: header });
  }

}
