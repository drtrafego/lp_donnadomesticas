# 📗 Base de Conhecimento - Backend Completo

**Última atualização**: 9 de Fevereiro de 2026

---

## 🎯 Princípios de Arquitetura Backend

### 1. Separation of Concerns (SoC)
Cada camada tem responsabilidade única e testável.

```
Request → Controller (validação entrada)
         ↓
         Service (lógica de negócio)
         ↓
         Repository (acesso a dados)
         ↓
         Database (persistência)
```

### 2. Clean Architecture
```
┌─────────────────────────────┐
│  Frameworks & Drivers       │ (Express, Database drivers)
├─────────────────────────────┤
│  Interface Adapters         │ (Controllers, Presenters)
├─────────────────────────────┤
│  Application Use Cases      │ (Business rules)
├─────────────────────────────┤
│  Enterprise Business Rules  │ (Domain entities)
└─────────────────────────────┘
    (Dependency flows inward)
```

### 3. SOLID Principles

| Letra | Princípio | Descrição |
|-------|-----------|-----------|
| **S** | Single Responsibility | Uma classe = uma razão para mudar |
| **O** | Open/Closed | Aberto para extensão, fechado para modificação |
| **L** | Liskov Substitution | Subclasses podem substituir a classe base |
| **I** | Interface Segregation | Clients não dependem de interfaces que não usam |
| **D** | Dependency Inversion | Depender de abstrações, não concretos |

### 4. DRY (Don't Repeat Yourself)
Código duplicado = bugs duplicados. Extraia para utilities/services.

---

## 🏗️ Arquitetura de Aplicação Típica

### Estrutura de Pastas
```
src/
├── domain/              # Entities e interfaces
│   ├── entities/
│   ├── interfaces/
│   └── enums/
├── application/         # Use cases e business logic
│   ├── usecases/
│   ├── services/
│   └── dto/
├── infrastructure/      # Implementações técnicas
│   ├── repositories/
│   ├── database/
│   ├── http/
│   └── external/
├── presentation/        # Controllers e routes
│   ├── controllers/
│   ├── routes/
│   └── middleware/
├── config/              # Configurações
└── index.ts            # Entry point
```

### Data Flow Padrão
```
HTTP Request
    ↓
Route Handler
    ↓
Controller (validação)
    ↓
Use Case / Service (lógica)
    ↓
Repository (acesso dados)
    ↓
Database
    ↓
Response DTO
    ↓
HTTP Response
```

---

## 📊 Padrões de Design Backend

### Repository Pattern
Abstrai acesso a dados, permite trocar BD sem tocar na lógica.

```typescript
interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

class UserRepository implements IUserRepository {
  constructor(private db: Database) {}
  
  async findById(id: string): Promise<User | null> {
    const row = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return row ? new User(row) : null;
  }
  
  async save(user: User): Promise<User> {
    const result = await this.db.query(
      'INSERT INTO users (...) VALUES (...) RETURNING *',
      [user.id, user.email, user.name]
    );
    return new User(result);
  }
}
```

### Dependency Injection
Dependências injetadas, não criadas. Facilita testes.

```typescript
class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService,
    private logger: ILogger
  ) {}
  
  async execute(email: string, name: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }
    
    const user = new User(email, name);
    const savedUser = await this.userRepository.save(user);
    
    await this.emailService.sendWelcomeEmail(savedUser.email);
    this.logger.info(`User created: ${savedUser.id}`);
    
    return savedUser;
  }
}
```

### Factory Pattern
Cria objetos complexos sem expor lógica de criação.

```typescript
class UserFactory {
  static create(data: CreateUserInput): User {
    const user = new User(data.email, data.name);
    
    if (data.isAdmin) {
      user.addRole('admin');
      user.addPermission('delete_users');
    }
    
    return user;
  }
}
```

---

## 🗄️ Database Design

### Normalização
Reduz redundância, mantém integridade.

```sql
-- ❌ Denormalizado (redundância)
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR,
  name VARCHAR,
  city VARCHAR,
  state VARCHAR,
  country VARCHAR,
  postal_code VARCHAR
);

-- ✅ Normalizado (3NF)
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR UNIQUE,
  name VARCHAR,
  address_id INT FOREIGN KEY
);

CREATE TABLE addresses (
  id INT PRIMARY KEY,
  city VARCHAR,
  state VARCHAR,
  country VARCHAR,
  postal_code VARCHAR
);
```

### Indexing Strategy
```sql
-- Índices essenciais:
CREATE INDEX idx_users_email ON users(email);        -- Lookups por email
CREATE INDEX idx_users_created_at ON users(created_at DESC);  -- Ordering
CREATE INDEX idx_orders_user_id ON orders(user_id);  -- Foreign key lookups
CREATE INDEX idx_orders_status ON orders(status);    -- Filtering

-- Índices compostos:
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- ⚠️ Cuidado: cada índice = mais escrita lenta, menos leitura lenta
```

### Query Optimization
```typescript
// ❌ N+1 Problem
const users = await getUserRepository().findAll();  // 1 query
for (const user of users) {
  const posts = await getPostRepository().findByUserId(user.id);  // N queries!
}

// ✅ Eager Loading
const users = await getUserRepository().findAll({
  relations: ['posts']  // 1 query com join
});

// ✅ Pagination
const users = await getUserRepository().find({
  skip: (page - 1) * limit,
  take: limit,
  order: { createdAt: 'DESC' }
});
```

---

## 🔐 Security Implementation

### Input Validation
```typescript
interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

class EmailValidator {
  static validate(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}

class PasswordValidator {
  static validate(password: string): boolean {
    // Min 8 chars, 1 uppercase, 1 number, 1 special char
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
}

const createUser = async (input: CreateUserInput) => {
  if (!EmailValidator.validate(input.email)) {
    throw new InvalidEmailError();
  }
  
  if (!PasswordValidator.validate(input.password)) {
    throw new WeakPasswordError();
  }
  
  // Safe to use
};
```

### Authentication (JWT)
```typescript
class AuthService {
  static generateToken(user: User): string {
    const secret = process.env.JWT_SECRET;
    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, secret, { expiresIn: '24h' });
    return token;
  }
  
  static verifyToken(token: string): TokenPayload {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret) as TokenPayload;
  }
}

// Middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }
  
  try {
    const payload = AuthService.verifyToken(token);
    (req as any).userId = payload.sub;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### SQL Injection Prevention
```typescript
// ❌ VULNERABLE
const userId = req.params.id;
const query = `SELECT * FROM users WHERE id = ${userId}`;
db.query(query);  // SQL injection!

// ✅ SAFE (Parameterized queries)
const userId = req.params.id;
const query = 'SELECT * FROM users WHERE id = $1';
db.query(query, [userId]);  // Parameter binding
```

---

## 🚀 Performance Optimization

### Caching Strategy
```typescript
class UserService {
  constructor(
    private userRepository: IUserRepository,
    private cache: ICache
  ) {}
  
  async getUser(id: string): Promise<User> {
    // Check cache first
    const cached = await this.cache.get(`user:${id}`);
    if (cached) {
      return cached;
    }
    
    // Fallback to database
    const user = await this.userRepository.findById(id);
    
    // Cache for 1 hour
    await this.cache.set(`user:${id}`, user, 3600);
    
    return user;
  }
  
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = await this.userRepository.update(id, updates);
    
    // Invalidate cache
    await this.cache.delete(`user:${id}`);
    
    return user;
  }
}
```

### Lazy Loading
```typescript
class PostService {
  async getPosts(limit = 20, offset = 0) {
    return await this.postRepository.find({
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' }
    });
  }
  
  async getPostWithComments(postId: string) {
    // Load post
    const post = await this.postRepository.findById(postId);
    
    // Load comments separately (lazy)
    const comments = await this.commentRepository.findByPostId(postId);
    
    return { post, comments };
  }
}
```

---

## 📋 Checklist: Backend Pronto para Produção

- [ ] Tests coverage > 80%
- [ ] All security validations in place
- [ ] Database indexes optimized
- [ ] Caching strategy implemented
- [ ] Error handling comprehensive
- [ ] Logging configured
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] Health check endpoint
- [ ] API documentation complete
- [ ] Environment variables set
- [ ] Secrets encrypted
- [ ] Monitoring in place
- [ ] Backup strategy tested

---

**Ver também**: [API Design Guide](./docs/backend/api-design.md) | [Database Patterns](./docs/backend/database.md)
