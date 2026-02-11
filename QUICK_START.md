# 📚 Guia Rápido: Como Usar Este Cérebro

**Última atualização**: 9 de Fevereiro de 2026

---

## 🎯 Cenários Comuns & Como Resolver

### Cenário 1: Iniciando um Novo Projeto

**Passo 1**: Defina a stack técnica
- Leia: [Stack Técnico Recomendado](./knowledge/arch-decisions.md#-stack-técnico-recomendado-atual)

**Passo 2**: Escolha o template
- Backend? → [NestJS Template](./templates/project-templates.md#-template-nestjs-backend-project)
- Frontend? → [React Template](./templates/project-templates.md#-template-react--vite-project)

**Passo 3**: Consulte os padrões
- Backend → [Backend Complete](./knowledge/backend-complete.md)
- Frontend → [Frontend Complete](./knowledge/frontend-complete.md)
- DevOps → [DevOps Complete](./knowledge/devops-complete.md)

**Passo 4**: Setup CI/CD
- Template: [GitHub Actions](./templates/project-templates.md#-template-github-actions-cicd)

---

### Cenário 2: Resolver um Problema

**Passo 1**: Identificar a categoria
```
Problema com banco de dados?        → Backend Complete → Database Architecture
Performance lenta?                   → Frontend/Backend Complete → Performance Optimization
Deployment não funciona?             → DevOps Complete → CI/CD Pipeline Architecture
Componente complexo?                 → Frontend Complete → Component Architecture
API insegura?                        → Backend Complete → Security Implementation
```

**Passo 2**: Consulte o padrão
- Procure por seção relevante no documento

**Passo 3**: Implemente a solução
- Use exemplos de código fornecidos

**Passo 4**: Documente a decisão
- Adicione em [Architectural Decisions](./knowledge/arch-decisions.md)

---

### Cenário 3: Revisar Código

**Checklist para Backend**:
```
✅ Code quality:
  - Segue SOLID?
  - Testes > 80%?
  - Tratamento de erro?
  
✅ Performance:
  - Queries otimizadas?
  - Caching implementado?
  - N+1 problem evitado?
  
✅ Security:
  - Input validation?
  - JWT/Auth correto?
  - SQL injection prevention?
```

**Checklist para Frontend**:
```
✅ Code quality:
  - Componente bem dividido?
  - Props tipadas?
  - Testes?
  
✅ Performance:
  - Renders otimizadas (memo)?
  - Bundle size OK?
  - Images otimizadas?
  
✅ UX:
  - Loading states?
  - Error handling?
  - WCAG A11y?
```

---

### Cenário 4: Otimizar Performance

**Se Backend está lento**:
1. Leia: [Performance Optimization](./knowledge/backend-complete.md#🚀-performance-optimization)
2. Checklist:
   - [ ] N+1 queries removed
   - [ ] Database indexes added
   - [ ] Caching implemented
   - [ ] Slow queries identified

**Se Frontend está lento**:
1. Leia: [Performance Optimization](./knowledge/frontend-complete.md#⚡-performance-optimization)
2. Checklist:
   - [ ] Lazy loading implemented
   - [ ] Code splitting done
   - [ ] Memo applied to heavy components
   - [ ] Bundle analyzed

---

## 📖 Índice Rápido por Tópico

### Database
- [Schema Design](./knowledge/backend-complete.md#-database-design)
- [Indexing Strategy](./knowledge/backend-complete.md#indexing-strategy)
- [Query Optimization](./knowledge/backend-complete.md#query-optimization)
- [Templates](./templates/project-templates.md)

### Authentication & Security
- [Input Validation](./knowledge/backend-complete.md#input-validation)
- [JWT Implementation](./knowledge/backend-complete.md#authentication-jwt)
- [SQL Injection Prevention](./knowledge/backend-complete.md#sql-injection-prevention)
- [Backend Security](./knowledge/backend-complete.md#🔐-security-implementation)

### State Management
- [Local vs Global State](./knowledge/frontend-complete.md#local-vs-global-state)
- [Redux Best Practices](./knowledge/frontend-complete.md#redux-best-practices)
- [Context API](./knowledge/frontend-complete.md#context-api-alternative)

### Performance
- [React.memo](./knowledge/frontend-complete.md#reactmemo)
- [useCallback](./knowledge/frontend-complete.md#usecallback)
- [useMemo](./knowledge/frontend-complete.md#usememo)
- [Code Splitting](./knowledge/frontend-complete.md#code-splitting)
- [Caching Strategy](./knowledge/backend-complete.md#caching-strategy)
- [N+1 Prevention](./knowledge/backend-complete.md#query-optimization)

### DevOps
- [CI/CD Pipelines](./knowledge/devops-complete.md#3-continuous-integration-ci)
- [Deployment Strategies](./knowledge/devops-complete.md#4-continuous-deployment-cd)
- [Kubernetes](./knowledge/devops-complete.md#-stack-técnico-mínimo-viável)
- [Monitoring](./knowledge/devops-complete.md#-monitoring-essencial)
- [Security](./knowledge/devops-complete.md#🔒-security-best-practices)

---

## 🔍 Busca por Palavra-Chave

| Palavra | Arquivo |
|---------|---------|
| Repository Pattern | backend-complete.md |
| Dependency Injection | backend-complete.md |
| Redux | frontend-complete.md |
| Context API | frontend-complete.md |
| Docker | devops-complete.md |
| Kubernetes | devops-complete.md |
| Testing | backend-complete.md, frontend-complete.md |
| Security | devops-complete.md, backend-complete.md |
| Performance | All files |
| SOLID | backend-complete.md |
| Component Architecture | frontend-complete.md |
| Infrastructure as Code | devops-complete.md |

---

## 💡 Tips para Máxima Produtividade

1. **Use Ctrl+F** para buscar palavras-chave nos documentos
2. **Linke decisões** em [Architectural Decisions](./knowledge/arch-decisions.md)
3. **Atualize templates** quando padrões mudarem
4. **Revise checklists** antes de publicar em produção
5. **Contribua com exemplos** quando resolver novos problemas

---

## 📝 Como Contribuir para Este Cérebro

1. **Encontrou um padrão útil?** → Adicione em knowledge/
2. **Resolveu um problema novo?** → Documente em knowledge/ com exemplo
3. **Criou um útil template?** → Adicione em templates/
4. **Tomou uma decisão arquitetural?** → Registre em arch-decisions.md

**Formato de Contribuição**:
```markdown
## [Seu Padrão/Solução Aqui]

**Problema**: O que ela resolve?
**Solução**: Como implementar
**Exemplo**: Código prático
**Benefícios**: Por que usar
**Trade-offs**: Desvantagens
```

---

## 🚀 Próximos Passos

- [ ] Ler CEREBRO_INDEX.md (este arquivo)
- [ ] Escolher seu primeiro projeto
- [ ] Consultar padrão relevante
- [ ] Implementar com confiança
- [ ] Documentar sua decisão
- [ ] Compartilhar aprendizado

---

**Última atualização**: 09/02/2026  
**Mantido por**: Team LP Luciana
