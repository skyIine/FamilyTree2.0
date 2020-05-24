import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registration(nickname: string, password: string, email: EmailValidator, firstname: string, lastname: string) {
    let data = { nickname,email,firstname,lastname, password };
     return this.http.post<any>(`https://2f6b7b7e-87e8-4d27-804b-f629c01dd9a9.mock.pstmn.io`,{});
 }
}
