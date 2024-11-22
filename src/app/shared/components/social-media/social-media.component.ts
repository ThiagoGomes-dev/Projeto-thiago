import {Component, Input} from '@angular/core';

@Component({
  selector: 'social-media',
  standalone: true,
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {

  @Input() socialLogo: "facebook" | "apple" | "google" | "" = "";
}
