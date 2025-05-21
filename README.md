# Finanças Pessoais

Aplicativo de finanças pessoais desenvolvido com React e TypeScript, focado em controle financeiro pessoal com ênfase em acessibilidade, design responsivo e experiência de usuário intuitiva.

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Versão](https://img.shields.io/badge/versão-0.1.0-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

## 📋 Visão Geral

O Finanças Pessoais é uma aplicação web que permite aos usuários gerenciar suas finanças pessoais de forma simples e eficiente. Com foco em acessibilidade e usabilidade, o aplicativo oferece uma interface intuitiva para controle de receitas, despesas, orçamentos e metas financeiras.

## ✨ Funcionalidades

- **Gestão de Transações**: Cadastro e gerenciamento de receitas e despesas
- **Categorização**: Organização de transações por categorias personalizáveis
- **Cartões de Crédito**: Controle de gastos em cartões de crédito
- **Relatórios**: Visualização de dados financeiros através de gráficos e tabelas
- **Metas Financeiras**: Definição e acompanhamento de objetivos financeiros
- **Orçamentos**: Planejamento de gastos por categoria
- **Múltiplos Temas**: Suporte a tema claro, escuro e alto contraste

## 🚀 Tecnologias Utilizadas

- **Frontend**:
  - React 19
  - TypeScript
  - Styled Components
  - React Router
  - Chart.js
  - React Helmet Async

- **Qualidade e Testes**:
  - ESLint
  - Jest
  - React Testing Library
  - Axe-core para testes de acessibilidade

- **Ferramentas de Desenvolvimento**:
  - Vite
  - npm
  - Git

## 🌟 Destaques do Projeto

### Acessibilidade

O projeto segue as diretrizes WCAG 2.1 nível AA, incluindo:

- Contraste de cores adequado
- Navegação completa por teclado
- Suporte a leitores de tela
- Textos alternativos para elementos visuais
- Estrutura semântica de HTML

### Design Responsivo

- Abordagem Mobile First
- Layout adaptável a diferentes tamanhos de tela
- Experiência consistente em dispositivos móveis e desktop

### Arquitetura e Código

- Componentização para reusabilidade
- Separação clara de responsabilidades
- Código limpo e bem documentado
- Tipagem forte com TypeScript

## 📁 Estrutura do Projeto

```
financas-pessoais/
├── public/
├── src/
│   ├── components/
│   │   ├── CartaoCredito/
│   │   ├── Dashboard/
│   │   ├── Layout/
│   │   ├── Sidebar/
│   │   ├── Transacoes/
│   │   └── common/
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── styles/
│   │   ├── GlobalStyles.ts
│   │   └── animations.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   ├── views/
│   │   ├── Configuracoes/
│   │   ├── NotFound/
│   │   └── Transacoes/
│   ├── App.tsx
│   └── index.tsx
└── package.json
```

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 9 ou superior)

### Passos para instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/ValeriaRoyal/financas-pessoais.git
   cd financas-pessoais
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm start
   ```

4. Acesse a aplicação em seu navegador:
   ```
   http://localhost:3000
   ```

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

Para verificar a acessibilidade:

```bash
npm run test:a11y
```

## 🔜 Próximos Passos

- [ ] Implementação de backend com Node.js e Express
- [ ] Autenticação de usuários
- [ ] Sincronização com contas bancárias
- [ ] Exportação de relatórios em PDF
- [ ] Notificações e lembretes
- [ ] Versão PWA para instalação em dispositivos móveis

## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📬 Contato

Valéria - [GitHub](https://github.com/ValeriaRoyal)

Link do Projeto: [https://github.com/ValeriaRoyal/financas-pessoais](https://github.com/ValeriaRoyal/financas-pessoais)
