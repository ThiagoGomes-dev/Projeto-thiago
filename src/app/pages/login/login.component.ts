import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {SocialMediaComponent} from "../../shared/components/social-media/social-media.component";
import {RouterLink} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, SocialMediaComponent, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  senha: string = '';

  users: any

  constructor(private userService: UserService) {}

  login() {
    this.userService.getUsers().subscribe(
      next => {
        this.users = next
        console.log(
          this.users.find((user: { email: string; }) => user.email === this.email)
        )
      },
      err => console.log(err)
    )
  }

}
