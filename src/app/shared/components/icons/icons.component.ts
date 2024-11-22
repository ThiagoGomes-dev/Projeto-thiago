import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})
export class IconsComponent {

  @Input() icon: "user" | "dashboard" | "payment" | "configs" | "docs" | "download" | "upload" | "config" | "notification" | "profile" | "dark-upload" | "" = "";
}
