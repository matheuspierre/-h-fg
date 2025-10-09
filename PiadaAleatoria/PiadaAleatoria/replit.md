# Microsserviço de Piadas - SmartSolutions Sprint

## 📋 Visão Geral
Microsserviço backend que serve piadas aleatórias através de uma API REST simples. Desenvolvido como parte da Missão 6 do SmartSolutions Sprint aplicando conceitos de SCRUM.

## 🎯 Objetivo
Construir um microsserviço backend focado em servir dados de forma aleatória, demonstrando compreensão de:
- Configuração de ambiente backend
- Criação de rotas (endpoints) e manipulação de requisições
- Manipulação de dados em memória (arrays/listas)
- Retorno de dados estruturados em JSON

## 🚀 Características Implementadas
- ✅ Lista de 14 piadas em português armazenadas em memória
- ✅ Endpoint GET `/api/piada` que retorna piada aleatória
- ✅ Resposta em formato JSON: `{ "piada": "texto da piada" }`
- ✅ Seleção aleatória usando `Math.random()`
- ✅ Interface frontend simples para testar o endpoint
- ✅ Testes E2E com Playwright validando funcionalidade completa

## 📁 Estrutura do Projeto

### Backend
- **`shared/schema.ts`**: Define o tipo TypeScript para o formato da piada
- **`server/storage.ts`**: Armazena lista de piadas e implementa seleção aleatória
- **`server/routes.ts`**: Implementa endpoint GET `/api/piada`

### Frontend
- **`client/src/pages/Home.tsx`**: Interface simples para testar o gerador
- Design minimalista com botão para gerar piadas
- Usa React Query para buscar dados da API

## 🔧 Como Usar

### Acessar o Endpoint
```bash
curl http://localhost:5000/api/piada
```

**Resposta exemplo:**
```json
{
  "piada": "O que a Lua disse ao Sol? – Nossa, você é tão grande e ainda não te deixam sair à noite!"
}
```

### Testar via Interface
1. Abra o navegador na URL do projeto
2. Clique em "Gerar Piada Aleatória"
3. Uma piada será exibida
4. Clique em "Outra piada" para gerar uma nova

## 🧪 Testes
- ✅ Testes E2E validam o fluxo completo frontend → backend
- ✅ Verificam que o endpoint retorna JSON válido
- ✅ Confirmam que piadas são retornadas aleatoriamente

## 💡 Competências Desenvolvidas
- Resolução de problemas
- Autogestão
- Desenvolvimento backend
- APIs REST
- Estruturação de dados

## 🛠️ Stack Tecnológica
- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, TypeScript, React Query
- **Storage**: In-memory (array)
- **Testes**: Playwright

## 📌 Requisitos Atendidos
- [x] Projeto backend configurado do zero
- [x] Lista com pelo menos 10 piadas
- [x] Servidor web escutando requisições
- [x] Endpoint GET na rota `/api/piada`
- [x] Seleção aleatória de piadas
- [x] Retorno em formato JSON

---

*Projeto desenvolvido como parte do SmartSolutions Sprint (SCRUM aplicado)*
