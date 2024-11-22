import { Component } from '@angular/core';
import {SocialMediaComponent} from "../../shared/components/social-media/social-media.component";
import {RouterLink} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SocialMediaComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  nome = ''
  email = ''
  senha = ''

  constructor(private userService: UserService) {}

  register() {
    this.userService.createUser(this.email, this.nome, this.senha).subscribe(
      next => console.log(next),
      err => console.log(err)
    )
  }

}
