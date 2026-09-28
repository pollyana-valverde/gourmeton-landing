# GourmetOn | Landing Page

Landing page do **GourmetOn**, um aplicativo (fictício) de delivery de comida. A página apresenta o app, seus benefícios e funcionalidades e traz um **cardápio ao vivo** que busca pratos em tempo real na **Spoonacular API**, com busca por nome e filtros por culinária, tipo de refeição e restrição alimentar.

Projeto desenvolvido para o **Checkpoint 05** da disciplina **Web Development with JS** (Engenharia de Software, FIAP), com o Prof. Lucas Sousa.

**Deploy:** 

## Integrantes

| Nome | RM |
| --- | --- |
| Pollyana Valverde dos Santos | RM569871 |
| Luana Lopes Sventkauskas | RM569643 |
| João Fernando Gonçalves Senziani | RM572144 |

## Tecnologias

- **React 19**: construção da interface em componentes
- **Vite**: criação e build do projeto
- **Tailwind CSS v4**: estilização, responsividade e transições
- **Font Awesome**: ícones (`@fortawesome/react-fontawesome`)
- **Fetch API + async/await**: requisições assíncronas
- **JSON**: dados locais (benefícios, funcionalidades, depoimentos e pratos de exemplo) e respostas da API
- **Spoonacular API**: busca de receitas (`/recipes/complexSearch`)
- **ESLint**: análise estática do código (regras de JavaScript e dos hooks do React)
- **Vercel**: deploy

## Seções da página

1. **Menu fixo**: fica transparente no topo e ganha fundo branco com desfoque ao rolar; menu hambúrguer no celular.
2. **Hero**: título, descrição, botões de download e imagem de fundo.
3. **Benefícios**: entrega rápida, variedade de restaurantes e pagamento fácil (carregados de JSON).
4. **Funcionalidades**: principais recursos do app (carregados de JSON).
5. **Cardápio ao vivo**: busca e filtros consultando a Spoonacular.
6. **Depoimentos**: avaliações de clientes (carregadas de JSON).
7. **Formulário de contato**: cadastro de e-mail com validação.
8. **Rodapé**: contato, redes sociais, termos de uso e links das lojas.

## Estrutura do projeto

```
gourmeton-landing/
├── public/
│   ├── favicon.svg
│   └── data/                    # arquivos JSON lidos com fetch
│       ├── beneficios.json
│       ├── funcionalidades.json
│       ├── depoimentos.json
│       └── pratos-exemplo.json  # usado se a API estiver sem chave ou sem limite
├── src/
│   ├── components/              # um componente por seção
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Apresentacao.jsx
│   │   ├── Funcionalidades.jsx
│   │   ├── Cardapio.jsx
│   │   ├── CardReceita.jsx
│   │   ├── Depoimentos.jsx
│   │   ├── Contato.jsx
│   │   ├── Footer.jsx
│   │   ├── Logo.jsx
│   │   ├── BotoesDownload.jsx
│   │   └── TituloSecao.jsx
│   ├── hooks/
│   │   └── useJson.js           # hook personalizado para carregar JSON
│   ├── services/
│   │   └── spoonacular.js       # todas as chamadas à API
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # Tailwind e cores do tema
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Como rodar localmente

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
cp .env.example .env     # no Windows: copy .env.example .env
```

Abra o arquivo `.env` e cole a sua chave da Spoonacular:

```
VITE_SPOONACULAR_KEY=sua_chave_aqui
```

Depois rode:

```bash
npm run dev
```

A página abre em `http://localhost:5173`.

Outros comandos úteis:

```bash
npm run lint      # verifica o código com o ESLint
npm run build     # gera a versão de produção na pasta dist
npm run preview   # testa localmente a versão de produção
```

> Sem a chave, ou quando o limite diário gratuito da API acaba, o cardápio entra em **modo demonstração** e usa o arquivo `pratos-exemplo.json`. Os filtros continuam funcionando.

## Deploy na Vercel

1. Suba o projeto para o GitHub (o arquivo `.env` não vai junto, ele está no `.gitignore`).
2. Na Vercel, clique em **Add New > Project** e importe o repositório. A Vercel detecta o Vite sozinha.
3. Em **Environment Variables**, adicione `VITE_SPOONACULAR_KEY` com a sua chave.
4. Clique em **Deploy**.

Se adicionar a variável depois do primeiro deploy, faça um **Redeploy** para ela passar a valer.
