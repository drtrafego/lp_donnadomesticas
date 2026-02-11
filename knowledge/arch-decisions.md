# 🎯 Decisões Arquiteturais & Histórico

**Repositório de Decisões do Projeto**

---

## Formato de Registro

```markdown
## ADR-XXXX: Título Descritivo

**Data**: DD/MM/YYYY
**Status**: Proposed | Accepted | Deprecated | Superseded by ADR-YYYY
**Contexto**: Problema que precisava ser resolvido
**Decisão**: O que foi decidido
**Consequências**: Impactos positivos e negativos
**Alternativas Consideradas**: O que foi rejeitado e por quê

**Referências**:
- Link para discussão
- Link para PR implementando
```

---

## Exemplo de Registro Completo

### ADR-001: Usar TypeScript em vez de JavaScript

**Data**: 01/02/2026  
**Status**: Accepted

**Contexto**  
O projeto é uma aplicação complexa que será mantida por múltiplos desenvolvedores. JavaScript dinâmico pode levar a bugs difíceis de detectar.

**Decisão**  
Usar TypeScript com strict mode habilitado em todos os novos código. Migrar código existente progressivamente.

**Consequências**  
✅ Positivos:
- Detecção early de erros de tipo
- Melhor IDE autocomplete
- Documentação via tipos
- Refatoração segura

⚠️ Negativos:
- Tempo de compilação adicional
- Curva de aprendizado
- Boilerplate de tipos

**Alternativas Consideradas**  
- Usar JSDoc para documentação (rejeitado: menos rigoroso)
- Usar Flow (rejeitado: menos maduro que TS)

**Referências**:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Discussão: #123

---

### ADR-002: Adotar Repository Pattern

**Data**: 02/02/2026  
**Status**: Accepted

**Contexto**  
Lógica de acesso a dados espalhada nos controllers. Difícil testar e mudar BD.

**Decisão**  
Implementar Repository Pattern. Cada entidade tem uma interface IRepository que abstrai acesso a dados.

**Consequências**  
✅ Positivos:
- Lógica fácil de testar (mock repositories)
- Trocar BD sem afetar lógica de negócio
- Reutilização de queries

⚠️ Negativos:
- Mais camadas de código
- Curva de aprendizado maior

**Referências**:
- Backend Architect Profile

---

## 📋 Template para Novas ADRs

Use este template ao documentar decisões sobre:
- Escolha de tecnologias
- Padrões arquiteturais
- Mudanças estruturais
- Decisões sobre infraestrutura

```markdown
## ADR-XXX: [Título Conciso]

**Data**: DD/MM/YYYY
**Status**: Proposed | Accepted | Deprecated
**Contexto**: [Por que essa decisão era necessária?]
**Decisão**: [O quê foi decidido?]
**Consequências**: 
✅ Positivos: [benefícios]
⚠️ Negativos: [trade-offs]
**Alternativas Consideradas**: [O que foi rejeitado e por quê?]
**Referências**: [links relevantes]
```

---

## 📚 Stack Técnico Recomendado Atual

**Definido em**: 09/02/2026

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: NestJS 10+
- **Language**: TypeScript 5+
- **Database**: PostgreSQL 15+
- **Cache**: Redis 7+
- **Queue**: Bull (Redis-backed job queue)
- **Testing**: Jest + Supertest
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18+
- **State**: Redux Toolkit OR Context API
- **Styling**: TailwindCSS
- **Build**: Vite
- **Testing**: Vitest + React Testing Library
- **Type Safety**: TypeScript 5+
- **HTTP Client**: Axios + TanStack Query
- **Form**: React Hook Form

### DevOps & Infrastructure
- **Containerization**: Docker 24+
- **Orchestration**: Kubernetes 1.28+
- **IaC**: Terraform 1.6+
- **CI/CD**: GitHub Actions
- **Cloud**: AWS (primary)
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack
- **Registry**: DockerHub / ECR

---

## 🔄 Log de Atualizações

| Data | O Quê | Quem |
|------|-------|------|
| 09/02/2026 | Stack inicial definido | Team |
| - | - | - |

---

**Nota**: Este é um documento vivo. Atualize conforme novas decisões forem tomadas.
