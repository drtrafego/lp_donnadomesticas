# 🔧 Backend Architect Profile

**Especialidade**: APIs, Databases, Escalabilidade, Segurança, Confiabilidade

---

## 🎯 Responsabilidades Centrais

### API Design & Development
- RESTful APIs com HTTP standards
- GraphQL para flexible data fetching
- Comprehensive API documentation
- Versioning com backward compatibility
- Rate limiting, throttling, abuse prevention

### Server-Side Logic
- Scalable business logic layers
- Proper error handling, logging, monitoring
- Stateless services para horizontal scaling
- Efficient data processing pipelines
- Background job systems
- Caching strategies (app, DB, CDN)

### Database Architecture
- Normalized schemas (SQL) e NoSQL optimization
- Indexing strategies e query optimization
- Database selection (SQL, NoSQL, Graph)
- Data migration e schema evolution
- Backup, recovery, disaster recovery

### System Scalability & Performance
- Architecture escalável (hundreds → millions users)
- Load balancing, service discovery, auto-scaling
- High availability com redundancy
- Database query optimization
- API response optimization
- Monitoring e observability

---

## 🏆 Padrões & Standards

### Security & Compliance
✅ OAuth 2.0, JWT, SAML authentication  
✅ Input validation, SQL injection prevention  
✅ GDPR, CCPA, HIPAA compliance  
✅ Data encryption (at rest, in transit)  
✅ Security audits e penetration testing

### Code Quality
✅ SOLID principles e design patterns  
✅ Unit, integration, e2e tests  
✅ Dependency management  
✅ Clean architecture layers  
✅ Proper logging para debugging

### Integration & Communication
✅ Third-party service integration  
✅ Message queuing e event-driven architecture  
✅ Webhooks e API callbacks  
✅ Distributed transactions  
✅ Circuit breakers e retry mechanisms

### Deployment & DevOps
✅ Docker containerization  
✅ Kubernetes orchestration  
✅ CI/CD pipelines  
✅ Terraform infrastructure as code  
✅ Zero-downtime deployments

---

## 🔧 Tech Stack Recomendado

| Camada | Tecnologia | Caso de Uso |
|--------|-----------|-----------|
| **Runtime** | Node.js / Python / Go | API server |
| **Framework** | Express / NestJS / FastAPI | HTTP framework |
| **Database** | PostgreSQL / MongoDB | Data persistence |
| **Cache** | Redis | Session, caching |
| **Queue** | RabbitMQ / Kafka | Async jobs |
| **API** | REST + GraphQL | Client interface |
| **Auth** | JWT + OAuth2 | Authentication |
| **Testing** | Jest + Supertest | Automated tests |
| **Logging** | Winston / Bunyan | Event logging |
| **ORM** | Prisma / Sequelize | Database ORM |

---

## 💡 Arquitetura de Camadas

```
┌─────────────────────────────────────┐
│     API Gateway / Load Balancer     │
├─────────────────────────────────────┤
│   REST API Layer (Controllers)      │
├─────────────────────────────────────┤
│   Business Logic Layer (Services)   │
├─────────────────────────────────────┤
│  Data Access Layer (Repositories)   │
├─────────────────────────────────────┤
│  Database / Cache / External APIs   │
└─────────────────────────────────────┘
```

---

## 📊 Padrões de Implementação

### Clean Architecture Example
```typescript
// Domain Entity
export interface User {
  id: string;
  email: string;
  name: string;
}

// Use Case
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  
  async execute(email: string, name: string): Promise<User> {
    const user = new User(email, name);
    return this.userRepository.save(user);
  }
}

// Controller
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  
  async handle(req: Request, res: Response) {
    const user = await this.createUserUseCase.execute(
      req.body.email,
      req.body.name
    );
    res.status(201).json(user);
  }
}
```

### Database Pattern
```typescript
// Generic Repository
export class BaseRepository<T> {
  constructor(private db: Database) {}
  
  async findById(id: string): Promise<T | null> {
    return this.db.query('SELECT * FROM table WHERE id = ?', [id]);
  }
  
  async save(entity: T): Promise<T> {
    return this.db.query('INSERT INTO table VALUES (?)', [entity]);
  }
  
  async delete(id: string): Promise<void> {
    return this.db.query('DELETE FROM table WHERE id = ?', [id]);
  }
}
```

### Error Handling
```typescript
// Custom errors
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
  }
}

// Middleware
export const errorHandler = (err: any, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({ error: message });
};
```

---

## 📈 Performance Optimization Checklist

### Database
- [ ] Indices on frequently queried columns
- [ ] Query optimization and N+1 prevention
- [ ] Connection pooling
- [ ] Caching frequently accessed data
- [ ] Materialized views for complex queries

### API
- [ ] Response compression (gzip)
- [ ] Pagination for large datasets
- [ ] Lazy loading relationships
- [ ] Rate limiting
- [ ] Caching headers (ETags, Cache-Control)

### Application
- [ ] Async processing for heavy tasks
- [ ] Background job processing
- [ ] Circuit breakers for external calls
- [ ] Connection timeout management
- [ ] Memory leak prevention

---

## 🔒 Security Checklist

- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (parameterized queries)
- [ ] CORS properly configured
- [ ] Authentication/Authorization
- [ ] Secrets management (env vars)
- [ ] HTTPS enforced
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] API versioning
- [ ] Audit logging

---

## 🚀 Deployment Checklist

- [ ] Docker image created
- [ ] Health check endpoints
- [ ] Graceful shutdown handling
- [ ] Environment configuration
- [ ] Database migrations automated
- [ ] Rollback strategy prepared
- [ ] Monitoring alerts set
- [ ] Logging configured
- [ ] Documentation complete
- [ ] Team trained

---

**Referência**: [Backend Architect Full Guide](../knowledge/backend-complete.md)
