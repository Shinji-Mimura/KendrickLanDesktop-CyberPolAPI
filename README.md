# KendrickLanDesktop-CyberPolAPI

Este repositório contém o código-fonte e os write-ups das trilhas criadas para o evento de Capture The Flag (CTF) realizado no Tempest Academy Conference 2024. O objetivo é fornecer aos participantes desafios práticos em segurança da informação, abrangendo diversas áreas e técnicas.

## Estrutura do Repositório

- **KendrickLanDesktop/**: Contém os arquivos relacionados ao desafio "KendrickLanDesktop".
- **CyberPolAPI/**: Inclui os arquivos referentes ao desafio "CyberPolAPI".
- **WriteUps/**: Diretório com as soluções detalhadas (write-ups) para cada desafio.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Docker**: Necessário para a execução dos contêineres dos desafios.

## Passos Iniciais

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/Shinji-Mimura/KendrickLanDesktop-CyberPolAPI.git
   ```

2. **Acesse o diretório do repositório**:

   ```bash
   cd KendrickLanDesktop-CyberPolAPI
   ```

## Desafios

### 1. KendrickLanDesktop

**Como executar**:

1. **Acesse o diretório do desafio**:

   ```bash
   cd KendrickLanDesktop
   ```

2. **Construa a imagem Docker**:

   ```bash
   docker build -t kendricklandesktop .
   ```

3. **Inicie o contêiner**:

   ```bash
   docker run -d -p 8080:80 --name kendricklandesktop_container kendricklandesktop
   ```

4. **Acesse o ambiente**:

   Abra seu navegador e vá para `http://localhost:8080` para interagir com o ambiente do desafio.

**Observações**:

- Certifique-se de que a porta 8080 esteja disponível em sua máquina.
- Para parar o contêiner após concluir o desafio:

   ```bash
   docker stop kendricklandesktop_container
   ```

### 2. CyberPolAPI

**Como executar**:

1. **Acesse o diretório do desafio**:

   ```bash
   cd ../CyberPolAPI
   ```

2. **Construa a imagem Docker**:

   ```bash
   docker build -t cyberpolapi .
   ```

3. **Inicie o contêiner**:

   ```bash
   docker run -d -p 5000:5000 --name cyberpolapi_container cyberpolapi
   ```

4. **Acesse a API**:

   Utilize ferramentas como `curl`, Postman ou BurpSuite para interagir com a API em `http://localhost:5000`.

**Observações**:

- Certifique-se de que a porta 5000 esteja disponível em sua máquina.
- Para parar o contêiner após concluir o desafio:

   ```bash
   docker stop cyberpolapi_container
   ```

## Write-Ups

Após concluir os desafios, você pode consultar as soluções detalhadas disponíveis no diretório `WriteUps/`. Esses documentos fornecem uma explicação passo a passo das técnicas utilizadas para resolver cada desafio.
