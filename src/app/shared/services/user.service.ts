import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = '/api'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.api + '/users')
  }

  createUser(email: string, nome: string, senha:string) {
    return this.http.post(this.api + '/users', {
      email: email,
      name: nome,
      password: senha,
      age: 26,
    })
  }
}
