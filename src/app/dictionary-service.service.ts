import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DictionaryServiceService {

  private apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  constructor(private http: HttpClient) { }

  search(word: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${word}`);
  }
}
