## Requisitos da aplicação

#### Linguagem e bibliotecas

- Javascript
- React
- Next.js
- Tailwindcss
- Typescript
- React-icon
- axios
- chart.js
- json-server
- Testing Library e bibliotecas auxiliares
- Jest
- Babel e bibliotecas auxiliares.

#### Estrutura de organização

Será seguido a Estrutura de pastas (padrão seguido atualmente pelo Next.js)

- /solarenergy
  - /node_modules
  - /public
  - /src
    - /components
      - Componente1.js
      - ...
    - /pages
      - index.js
      - /about
        - about.js
      - ...
      - /api
      - api.js
    - /styles
      - global.css
    - /lib
      - util.js
  - package.json
  - next.config.js
  - tailwind.config.ts
  - ...

#### Backend - json-server

No momento inicial, não será utilizado um backend completo. Será usado o json-server para simular as requisições de API.

#### Para consumir os dados da API

Será utilizado o axios que permitirá fazer a solicitações HTTP para uma API simulada pelo json-server.

#### Rotas do Next.js

Para as rotas será usado o padrão de rotas do Next.js, que se baseia em um sistema de arquivos onde as pastas criadas dentro da pasta /pages que definem as rotas da aplicação. Será instalado o next-router para criação de rotas dinâmicas.

#### React

Para a criação de interfaces de UI, será usada a biblioteca React.

#### Chart.js

A bilbioteca Chart.js será utilizada para fornecer graficos e facilitar a integração com react.

#### Typescript

O Typescript será utilizado nesse projeto somente para fins de estudos, Já que devido o tamanho do projeto, não se torna necessário.

## Instalar e rodar a aplicação

Faça um clone do projeto:

```
git clone ....
```

Faça a instalação das dependências:

```
npm install
```

Rode o projeto usando:

```
npm run dev
```

## Testar a aplicação

Está sendo utilizado a Jest e Testing-library para testar a aplicação React.

```
npm run test
```

#### Arquivos de configuração para os testes:

Criar na raiz do projeto:

- babel.config.json

```
{
 "presets": [
   ["@babel/preset-env", { "targets": { "esmodules": true } }],
   ["@babel/preset-react", { "runtime": "automatic" }]
 ]
}

```

- jest.config.js

```
module.exports = {
 testEnvironment: 'jest-environment-jsdom',
 setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.js'],
 moduleNameMapper: {
   '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/.jest/mocks/fileMock.js',
   '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
 },
}
```

- .jest/setup-tests.js

```
import '@testing-library/jest-dom';

```

- .jest/mocks/fileMock.js
  Para reconhecer os arquivos do tipo imagens

```
module.exports = 'test-file-stub';
```


## Autores
####  Desenvolvimento:
Debora Sousa

#### Design do projeto
DevinHouse

https://www.figma.com/file/4oDPtiefH9ZCQ17RU9JZQz/Projeto-DevInHouse?type=design&node-id=0-1&mode=design&t=bU0dw3hnvzRANQUB-0