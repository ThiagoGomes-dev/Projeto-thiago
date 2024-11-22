import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IconsComponent} from "../../shared/components/icons/icons.component";

@Component({
  selector: 'app-omitted',
  standalone: true,
  imports: [
    CommonModule,
    IconsComponent
  ],
  templateUrl: './omitted.component.html',
  styleUrl: './omitted.component.scss'
})
export class OmittedComponent implements OnInit {
  tableData = [
    {
      razaoSocial: "Analytica Contábil",
      cnpj: "11.222.333/0001-44",
      arquivoXml: "arquivo123010203.xml",
      arquivoSped: "arquivo1230.txt",
      dataAnalise: "01/09/2014",
      download: ""
    },
    {
      razaoSocial: "Analytica Contábil",
      cnpj: "11.222.333/0001-44",
      arquivoXml: "arquivo123010203.xml",
      arquivoSped: "arquivo1230.txt",
      dataAnalise: "01/09/2014",
      download: ""
    },
    {
      razaoSocial: "Analytica Contábil",
      cnpj: "11.222.333/0001-44",
      arquivoXml: "arquivo123010203.xml",
      arquivoSped: "arquivo1230.txt",
      dataAnalise: "01/09/2014",
      download: ""
    },
    {
      razaoSocial: "Analytica Contábil",
      cnpj: "11.222.333/0001-44",
      arquivoXml: "arquivo123010203.xml",
      arquivoSped: "arquivo1230.txt",
      dataAnalise: "01/09/2014",
      download: ""
    },
    {
      razaoSocial: "Analytica Contábil",
      cnpj: "11.222.333/0001-44",
      arquivoXml: "arquivo123010203.xml",
      arquivoSped: "arquivo1230.txt",
      dataAnalise: "01/09/2014",
      download: ""
    },
    {
      razaoSocial: "Analytica Contábil",
      cnpj: "11.222.333/0001-44",
      arquivoXml: "arquivo123010203.xml",
      arquivoSped: "arquivo1230.txt",
      dataAnalise: "01/09/2014",
      download: ""
    },
    {
      razaoSocial: "Analytica Contábil",
      cnpj: "11.222.333/0001-44",
      arquivoXml: "arquivo123010203.xml",
      arquivoSped: "arquivo1230.txt",
      dataAnalise: "01/09/2014",
      download: ""
    },
    {
      razaoSocial: "Analytica Contábil",
      cnpj: "11.222.333/0001-44",
      arquivoXml: "arquivo123010203.xml",
      arquivoSped: "arquivo1230.txt",
      dataAnalise: "01/09/2014",
      download: ""
    },
    {
      razaoSocial: "Analytica Contábil",
      cnpj: "11.222.333/0001-44",
      arquivoXml: "arquivo123010203.xml",
      arquivoSped: "arquivo1230.txt",
      dataAnalise: "01/09/2014",
      download: ""
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }
}
