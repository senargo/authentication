#  API Senar Educacional

Segue abaixo os comandos para ativar a API.


## Localmente

Necessário ter instalado o node, docker, e yarn.
De dentro da pasta do projeto rodar:

 - yarn
 - docker-compose up
	 - (apenas na primeira vez, depois docker-compose start)
 - Logar no postgres e criar a database como o nome do .env (adicionar depois no sequilize)
 - yarn sequelize db:migrate
	 - (apenas na primeira vez, para criar as tabelas no banco)
 - yarn dev

## Remotamente (Heroku)

- Rodar yarn biuld
- Criar a conta e iniciar um projeto
- Vincular o projeto ao github, e aos commits da master
- Vincular o addon do Postgres
- Vincular o addon do Redis (para adicionar o Redmis free é necessário adicionar o cartão de crédito)
- Configurar as variáveis no Heroku como as do .env, ou as novas para acesso ao postgres e link do redis
- Logar no postgres e criar a database como o nome do .env (adicionar depois no sequilize)
- Rodar o sequilize para criar as tabelas, usando o run do painel admin, ou o Heroku CLI

## Documentação das Rotas

A documentação foi gerada exportando os endpoints do Insomnia, e em seguida rodando "npx insomnia-documenter --config Insomnia.json" a partir da pasta documentation.

- Para ver a documentação das rotas entre na pasta documentation e rode o comando:
	 - npx serve
- Acesse o endereço informado pelo comando acima.
# authentication
