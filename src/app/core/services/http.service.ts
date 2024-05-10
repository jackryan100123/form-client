import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  getFIRData(fir_id: string) {
    return this._http.get(`http://localhost/${fir_id}/loadcase`);
  }

  postFIRPDF(data: FormData, fir_id: string) {
    return this._http.post(
      `http://localhost/form/${fir_id}/bnss/SOC/upload-pdf`,
      data,
      {
        responseType: 'blob',
      }
    );
  }
}
