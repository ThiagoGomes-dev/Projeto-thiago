import pandas as pd

def extrair_campos_arquivo_txt(nome_arquivo):
    dados = []
    chaves_duplicadas = set()  # Conjunto para armazenar chaves duplicadas no arquivo TXT
    with open(nome_arquivo, 'r', encoding='ISO-8859-1') as f:
        next(f)  # Ignorar a primeira linha (cabeçalho)
        for linha in f:
            campos = linha.strip().split('|')
            if len(campos) >= 46:  # Verifica se a linha tem pelo menos 46 campos
                chave_de_acesso = campos[0]
                if chave_de_acesso in chaves_duplicadas:
                    continue  # Ignorar linhas com chaves duplicadas
                chaves_duplicadas.add(chave_de_acesso)

                numero = campos[1]
                data_de_emissao = campos[3]
                situacao = campos[5]
                tipo_operacao = campos[6]
                valor_total_da_nota = campos[7]
                nota_referenciada = campos[8]
                nome_razao_social_emit = campos[9]
                cpf_cnpj_emit = campos[10]
                base_de_calculo_do_icms = campos[41]
                valor_do_icms = campos[42]
                cfop_prod = campos[76]

                # Adiciona os campos desejados em forma de lista
                dados.append([ 
                    chave_de_acesso, numero, data_de_emissao, situacao,
                    tipo_operacao, valor_total_da_nota, nota_referenciada,
                    nome_razao_social_emit, cpf_cnpj_emit, base_de_calculo_do_icms,
                    valor_do_icms, cfop_prod
                ])

    # Criar DataFrame com os dados extraídos do arquivo TXT
    df_txt = pd.DataFrame(dados, columns=[
        'Chave_de_acesso', 'Numero', 'Data_de_emissao', 'Situacao', 'Tipo_Operacao',
        'Valor_total_da_nota', 'Nota_referenciada', 'Nome_razao_social_emit',
        'CPF_CNPJ_emit', 'Base_de_Calculo_do_ICMS', 'Valor_do_ICMS', 'CFOP_prod'
    ])

    return df_txt


def extrair_campos_arquivo_efd(nome_arquivo):
    dados_efd = []
    chaves_duplicadas = set()  # Conjunto para armazenar chaves duplicadas no arquivo EFD
    with open(nome_arquivo, 'r', encoding='ISO-8859-1') as f:
        for linha in f:
            if linha.startswith('|C100|'):
                campos = linha.strip().split('|')
                chave_de_acesso_efd = campos[9]
                if chave_de_acesso_efd in chaves_duplicadas:
                    continue  # Ignorar linhas com chaves duplicadas
                chaves_duplicadas.add(chave_de_acesso_efd)

                cod = campos[1]
                entrada = campos[2]
                propria_terceira = campos[3]
                situacao_efd = campos[6]
                branco = campos[7]
                n_nfe = campos[8]
                emissao_efd = campos[10]
                vlor_total_nfe = campos[12]
                bc = campos[21]
                icms = campos[22]

                # Adiciona os campos desejados em forma de lista
                dados_efd.append([ 
                    cod, entrada, propria_terceira, situacao_efd, 
                    branco, n_nfe, chave_de_acesso_efd, emissao_efd, 
                    vlor_total_nfe, bc, icms 
                ])

    # Criar DataFrame com os dados extraídos do arquivo EFD
    df_efd = pd.DataFrame(dados_efd, columns=[
        'COD', 'Entrada', 'Propria_Terceira', 'Situacao_EFD', 'Branco', 'N_NFE',
        'Chave_de_Acesso_EFD', 'Emissao_EFD', 'Vlor_Total_NFE', 'BC', 'ICMS'
    ])

    return df_efd


def verificar_situacao_e_cfop(df):
    situacao_mapping = {
        'C': 'Cancelada', 'A': 'Autorizada', 'O': 'Autorizada'
    }

    cfop_devolucao = ['5202', '6202', '6201', '5201', '5411', '6411']
    cfop_outros = ['1949', '2949', '5949', '6949']

    situacoes = []
    for index, row in df.iterrows():
        situacao = situacao_mapping.get(row['Situacao'], 'Desconhecida')
        cfop = row['CFOP_prod']
        if cfop in cfop_devolucao:
            tipo_operacao = 'Devolução'
        elif cfop in cfop_outros:
            tipo_operacao = 'Outras operações'
        else:
            tipo_operacao = 'Desconhecida'

        situacoes.append(situacao + ' - ' + tipo_operacao)

    return situacoes


def analisar_omissas(txt_files, efd_files):
    if txt_files and efd_files:
        # Criar listas para armazenar todos os dados de TXT e EFD
        dados_txt = []
        dados_efd = []

        # Processar cada arquivo de TXT
        for arquivo_txt in txt_files:
            df_txt = extrair_campos_arquivo_txt(arquivo_txt)
            dados_txt.append(df_txt)

        # Processar cada arquivo de EFD
        for arquivo_efd in efd_files:
            df_efd = extrair_campos_arquivo_efd(arquivo_efd)
            dados_efd.append(df_efd)

        # Combinar todos os dados de TXT e EFD em um único DataFrame
        df_txt_all = pd.concat(dados_txt, ignore_index=True)
        df_efd_all = pd.concat(dados_efd, ignore_index=True)

        # Identificar chaves de acesso dos arquivos TXT ausentes nos arquivos EFD
        chaves_ausentes_efd = df_txt_all[~df_txt_all['Chave_de_acesso'].isin(
            df_efd_all['Chave_de_Acesso_EFD'])]

        # Selecionar apenas os campos desejados das chaves ausentes
        if not chaves_ausentes_efd.empty:
            campos_desejados = chaves_ausentes_efd[[
                'Chave_de_acesso', 'Numero', 'Data_de_emissao', 'Nome_razao_social_emit',
                'CPF_CNPJ_emit', 'Valor_total_da_nota', 'Base_de_Calculo_do_ICMS',
                'Valor_do_ICMS', 'Tipo_Operacao', 'CFOP_prod'
            ]]

            # Criar DataFrame para o relatório de situação
            df_relatorio_situacao = pd.DataFrame({
                'Chave_de_acesso': chaves_ausentes_efd['Chave_de_acesso'],
                'Numero': chaves_ausentes_efd['Numero'],
                'Data_de_emissao': chaves_ausentes_efd['Data_de_emissao'],
                'Situacao': chaves_ausentes_efd['Situacao'],
                'Tipo_Operacao': chaves_ausentes_efd['Tipo_Operacao'],
                'Valor_total_da_nota': chaves_ausentes_efd['Valor_total_da_nota'],
                'Nota_referenciada': chaves_ausentes_efd['Nota_referenciada'],
                'Situacao_NFE': verificar_situacao_e_cfop(chaves_ausentes_efd)
            })

            # Resultado da análise, pode ser retornado ou manipulado para o frontend
            return campos_desejados, df_relatorio_situacao

        else:
            return "Todas as chaves de acesso dos arquivos TXT estão presentes nos arquivos EFD."

    else:
        return "Por favor, selecione os arquivos TXT e EFD."


# Exemplo de chamada
# txt_files e efd_files seriam as listas de arquivos carregados via outro método (como upload)
txt_files = ["path/to/txt_file1.txt", "path/to/txt_file2.txt"]
efd_files = ["path/to/efd_file1.txt", "path/to/efd_file2.txt"]

resultado = analisar_omissas(txt_files, efd_files)
print(resultado)
