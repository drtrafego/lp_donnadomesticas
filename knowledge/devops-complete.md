# 📕 Base de Conhecimento - DevOps Completo

**Última atualização**: 9 de Fevereiro de 2026

---

## 🎯 Pilares da Estratégia DevOps

### 1. Automation First
Todo processo recorrente deve ser automatizado. Se você faz algo mais de 2 vezes, automata.

**Elementos a Automatizar**:
- Build e compilação de código
- Testes automatizados (unit, integration, e2e)
- Deployment para qualquer ambiente
- Scaling e provisionamento de recursos
- Monitoring e alerting
- Backup e disaster recovery

### 2. Infrastructure as Code (IaC)
Toda infraestrutura deve ser definida em código, versionada e revisada como software.

**Ferramentas**:
- **Terraform**: Cloud-agnostic IaC
- **CloudFormation**: AWS-specific
- **Ansible**: Configuration management
- **Docker**: Container images

### 3. Continuous Integration (CI)
Código deve ser integrado frequentemente com testes automáticos.

**Pipeline Ideal**:
```
1. Developer push código
   ↓
2. Trigger CI pipeline
   ↓
3. Checkout code
   ↓
4. Build application
   ↓
5. Run unit tests
   ↓
6. Run integration tests
   ↓
7. Security scanning
   ↓
8. Build artifacts
   ↓
9. Success/Failure report
```

### 4. Continuous Deployment (CD)
Código testado é automaticamente deployado em produção.

**Estratégias de Deployment**:

#### Blue-Green
```
Production: 
  - Blue (v1.0 - ativo)
  - Green (v2.0 - preparado)

Traffic: 100% → Blue
Deploy: v2.0 → Green
Test: Validar Green
Switch: Traffic → Green (instantâneo)
Fallback: Se problema, Traffic → Blue
```

#### Canary
```
Deploy v2.0 para:
  - 5% users (canary)
  - Monitor metrics
  - 25% users (se OK)
  - 50% users
  - 100% users
Rollback automático se erros detectados
```

#### Rolling
```
App instances (10 total):
  1. Deploy v2.0 → instâncias 1-2
  2. Remove v1.0 → instâncias 1-2 do LB
  3. Deploy v2.0 → instâncias 3-4
  4. Remove v1.0 → instâncias 3-4 do LB
  ...continue até 100%
```

### 5. Monitoring & Observability
Sistema visível é sistema confiável.

**Três Pilares**:
1. **Metrics**: Quantitativo (CPU, Memory, Latency)
2. **Logs**: Qualitativo (error messages, events)
3. **Traces**: Distribuído (request tracing)

---

## 🔧 Stack Técnico Mínimo Viável

### Para Começar
```yaml
VCS Repository: GitHub
CI/CD: GitHub Actions
Container: Docker
Orchestration: Kubernetes (minikube para dev)
Database: PostgreSQL
Cache: Redis
Logging: ELK Stack (ou CloudWatch)
Monitoring: Prometheus + Grafana
```

### Escalando
```yaml
API Gateway: Nginx/Kong
Load Balancer: AWS ELB / CloudFlare
Message Queue: RabbitMQ / Kafka
Service Mesh: Istio
Configuration: Consul / Etcd
Secret Management: HashiCorp Vault
```

---

## 🚀 Exemplo: Pipeline GitHub Actions

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build
      run: |
        npm ci
        npm run build
    
    - name: Unit Tests
      run: npm run test
    
    - name: Integration Tests
      run: npm run test:integration
    
    - name: Security Scan
      run: npm audit
    
    - name: Build Docker Image
      run: docker build -t app:${{ github.sha }} .
    
    - name: Push to Registry
      run: docker push app:${{ github.sha }}
    
    - name: Deploy to Staging
      if: github.ref == 'refs/heads/develop'
      run: kubectl set image deployment/app app=app:${{ github.sha }} -n staging
    
    - name: Deploy to Production
      if: github.ref == 'refs/heads/main'
      run: kubectl set image deployment/app app=app:${{ github.sha }} -n production
```

---

## 📊 Monitoring Essencial

### Métricas Críticas

**Infrastructure**:
- CPU Usage: > 80% = alerta
- Memory Usage: > 85% = alerta
- Disk Space: > 90% = crítico
- Network I/O: baseline comparison

**Application**:
- Request Latency: p95 < 200ms
- Error Rate: < 0.1%
- Throughput: requests/sec
- Database Query Time: p95 < 100ms

**Business**:
- Conversion Rate
- User Signups
- Transaction Success Rate
- API Availability (SLA target)

### Alerting Rules
```yaml
- name: "High CPU"
  expr: 'cpu_usage > 0.80'
  duration: '5m'
  severity: 'warning'
  
- name: "Pod Crash Loop"
  expr: 'rate(pod_restarts[5m]) > 0'
  duration: '2m'
  severity: 'critical'
  
- name: "High Error Rate"
  expr: 'error_rate > 0.01'
  duration: '1m'
  severity: 'critical'
```

---

## 🔒 Security Best Practices

### 1. Secret Management
```bash
# ❌ NUNCA commit secrets
GITHUB_TOKEN=ghp_xxxx
DATABASE_PASSWORD=secret123

# ✅ Use environment variables
export DATABASE_PASSWORD=$(aws secretsmanager get-secret-value --secret-id prod/db/password)

# ✅ Use secret management tools
- HashiCorp Vault
- AWS Secrets Manager
- Azure Key Vault
```

### 2. Network Security
```yaml
Security Groups:
  - Allow SSH only from admin IPs
  - Allow HTTP/HTTPS from internet
  - Allow database only from app tier
  - Block all egress except allowed destinations
  
Network Segmentation:
  - Public tier (ALB, NAT)
  - Private tier (Application)
  - Database tier (isolated)
```

### 3. Scanning & Compliance
```bash
# Container scanning
trivy image myapp:latest

# Infrastructure compliance
checkov -d ./terraform

# Dependency vulnerabilities
npm audit
```

---

## 📋 Checklist: Production Ready

- [ ] CI/CD pipeline automated
- [ ] All tests passing (unit, integration, e2e)
- [ ] Container images building and pushing
- [ ] Kubernetes manifests ready
- [ ] Secrets encrypted and managed
- [ ] Health checks configured
- [ ] Monitoring and alerts active
- [ ] Log aggregation working
- [ ] Backup strategy implemented
- [ ] Disaster recovery tested
- [ ] Documentation complete
- [ ] Team trained and ready
- [ ] Runbooks for common issues
- [ ] On-call rotation set

---

## 🆘 Troubleshooting Comum

### Pipeline Failures
1. Check logs: `kubectl logs deployment/myapp`
2. Check events: `kubectl describe pod <name>`
3. Check resource limits
4. Check environment variables

### High Latency
1. Check database queries (slow logs)
2. Check network latency
3. Check cache hit rates
4. Profile application

### Pod Crashes
1. Check resource requests/limits
2. Check logs for errors
3. Check liveness/readiness probes
4. Check dependencies (DB, Redis)

---

**Ver também**: [CI/CD Pipelines Deep Dive](./docs/devops/cicd-pipelines.md) | [Kubernetes Guide](./docs/devops/kubernetes.md)
