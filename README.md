# Finanças Pessoais

Aplicativo de finanças pessoais desenvolvido com React, focado em mobile first, acessibilidade e segurança.

## Características

- **Mobile First**: Design responsivo que prioriza a experiência em dispositivos móveis
- **Acessibilidade**: Implementação de práticas WCAG 2.1 para garantir que o aplicativo seja acessível a todos
- **Segurança**: Medidas de proteção para dados financeiros sensíveis

## Tecnologias Utilizadas

- React com TypeScript
- Styled Components para estilização
- React Router para navegação
- Axios para requisições HTTP
- React Helmet para SEO e acessibilidade
- Axe-core para testes de acessibilidade

## Estrutura do Projeto

```
financas-pessoais/
├── public/
├── src/
│   ├── components/
│   │   ├── Accessibility/
│   │   ├── Layout/
│   │   └── ... (outros componentes)
│   ├── pages/
│   ├── styles/
│   │   └── GlobalStyles.ts
│   ├── utils/
│   │   └── security.ts
│   ├── App.tsx
│   └── index.tsx
└── package.json
```

## Funcionalidades Planejadas

- Controle de receitas e despesas
- Categorização de transações
- Relatórios e gráficos
- Planejamento financeiro
- Metas financeiras

## Instalação e Execução

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o projeto em modo de desenvolvimento:
   ```
   npm start
   ```

## Acessibilidade

O projeto segue as diretrizes WCAG 2.1 e inclui:

- Suporte a leitores de tela
- Navegação por teclado
- Opções de alto contraste
- Ajuste de tamanho de fonte
- Links de pular navegação

## Segurança

Implementações de segurança incluem:

- Sanitização de inputs
- Proteção contra XSS
- Armazenamento seguro de dados locais
- Tokens CSRF para operações sensíveis

## Licença

Este projeto está licenciado sob a licença MIT.
