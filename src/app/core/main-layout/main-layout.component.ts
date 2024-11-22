import { Component } from '@angular/core';
import {IconsComponent} from "../../shared/components/icons/icons.component";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {OmittedComponent} from "../../pages/omitted/omitted.component";
import {CardComponent} from "../../shared/components/card/card.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    IconsComponent,
    RouterOutlet,
    HeaderComponent,
    OmittedComponent,
    CardComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
