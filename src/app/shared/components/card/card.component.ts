import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    IconsComponent,
    MatIconModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  public fileContentTxt: string | null = null;
  public fileContentSped: string | null = null;
  private pyodide: any;

  constructor() {
    this.loadPyodide();
  }

  async loadPyodide() {
    // Carrega Pyodide e a biblioteca Pandas
    this.pyodide = await (window as any).loadPyodide();
    await this.pyodide.loadPackage("pandas");

    // Carrega o arquivo Python externamente
    await this.loadPythonScript("/assets/scripts/Analise_Notas_Omissas.py");
  }

  async loadPythonScript(url: string) {
    const response = await fetch(url);
    const pythonCode = await response.text();

    // Adiciona um log para exibir o conteúdo da variável pythonCode
    console.log('Código Python carregado:', pythonCode);

    // Executa o código Python no Pyodide
    await this.pyodide.runPythonAsync(pythonCode);
  }

  onFileSelected(event: Event, type: 'TXT' | 'SPED'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        if (type === 'TXT') {
          this.fileContentTxt = content;
        } else if (type === 'SPED') {
          this.fileContentSped = content;
        }
      };
      reader.readAsText(file, 'ISO-8859-1');
    }
  }

  async onUpload() {
    if (!this.fileContentTxt || !this.fileContentSped) {
      alert('Por favor, selecione ambos os arquivos (TXT e SPED) antes de enviar.');
      return;
    }

    // Passa o conteúdo dos arquivos para Pyodide e chama as funções Python carregadas
    this.pyodide.globals.set("txt_content", this.fileContentTxt);
    this.pyodide.globals.set("sped_content", this.fileContentSped);

    // Executa as funções importadas do arquivo
    const result = await this.pyodide.runPythonAsync(`
    df_txt_json = extrair_campos_arquivo_txt(txt_content)
    df_efd_json = extrair_campos_arquivo_efd(sped_content)
    df_txt_json.to_json(), df_efd_json.to_json()`);

    // Exibe o resultado
    console.log("Resultado do processamento:", result);
  }
}
