# FIAP_FASE1_TC

## Sobre o Projeto

Este repositório contém o Trabalho de Conclusão da Fase 1 do curso de Pós-Graduação da FIAP. O objetivo do projeto é aplicar os conhecimentos adquiridos durante o curso em um desafio prático, envolvendo análise, desenvolvimento e documentação de uma solução tecnológica.

## Estrutura

- Swagger: Documentação do projeto
- Códigos-fonte em Arquitetura Hexagonal
- Banco de dados Postgres
- Foi criado um script de iniciação do banco de dados que roda automaticamente 10 segundo apos o deploy do backend.
- Docker
- A aplicação demora cerca de 1 minuto para ficar completamente online devido ao banco e criação automatica do banco
- Todos os componentes do projetos são iniciados usando docker compose e levarão cerca de 1 minuto para todos os itens estarem devidamente online
- Mais instruções na seção "Como Executar"

## Tecnologias Utilizadas

- Typescript
- Node.js
- Express
- Postgres
- Knex
- Docker
- Swagger

## Videos
Vídeo de Apresentação do youtube
https://youtu.be/kWt2huRdhoY

## Diagramas
Storytelling
https://miro.com/app/board/uXjVIGJeGzM=/?share_link_id=664932554252

Event Storming
https://miro.com/app/board/uXjVI0-L25c=/?share_link_id=612145918677


## Como Executar
1. Como docker instalado na sua maquina, execute: "docker compose up -d" e todos os componentes serão executados e ficarão prontos para ser usado
2. A api node será responsavel por criar o base de dados fiap_loja, essa execução acontecerá 10 segundo apos a api subir.

## No knexfile 
1. atualmente está como host "banco" mas pode ser alterado para localhost 

## Serviços:
- Swagger: http://localhost:8081/swagger/
- Backend: http://localhost:8080
- Banco: fiap_loja (será criado automaticamente pela api 10 segundos apos a inicialização)


## Autores
- Nome: Herlessi Nogueira
- Email: herlessi@gmail.com
- Discord: herlessi
- Fone: 85 9 97822541

## Licença

Este projeto é apenas para fins acadêmicos.
