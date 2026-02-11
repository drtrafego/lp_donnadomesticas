# 🔧 Templates de Projetos

Estruturas prontas para iniciar novos projetos rapidamente.

---

## 📁 Template: NestJS Backend Project

```bash
# Criar novo projeto
nest new my-api
cd my-api

# Instalar dependências comuns
npm install @nestjs/typeorm @nestjs/jwt @nestjs/passport typeorm pg bcrypt
npm install --save-dev @types/node prettier

# Estrutura de pastas
src/
├── common/
│   ├── decorators/
│   ├── exceptions/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── env.validation.ts
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── dto/
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   ├── entities/
│   │   █── dto/
│   │   └── repositories/
│   └── ...
├── database/
│   └── migrations/
├── app.module.ts
└── main.ts
```

### main.ts
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

### .env
```
NODE_ENV=development
PORT=3000

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=myapp_dev
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h

# External APIs
...
```

---

## 🎨 Template: React + Vite Project

```bash
# Criar novo projeto
npm create vite@latest my-app -- --template react-ts
cd my-app

# Instalar dependências
npm install
npm install -D tailwindcss postcss autoprefixer
npm install react-router-dom @reduxjs/toolkit react-redux axios

# Estrutura
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── features/
│   │   ├── user/
│   │   │   ├── UserList.tsx
│   │   │   ├── UserForm.tsx
│   │   │   └── ...
│   │   └── ...
│   └── layout/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── DashboardPage.tsx
│   └── NotFoundPage.tsx
├── store/
│   ├── store.ts
│   ├── slices/
│   │   ├── userSlice.ts
│   │   └── ...
│   └── hooks.ts
├── services/
│   ├── api.ts
│   ├── userService.ts
│   └── ...
├── types/
│   ├── user.ts
│   └── ...
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
```

---

## 🐳 Template: Docker Setup

### Dockerfile
```dockerfile
# Multi-stage build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  api:
    build: ./backend
    environment:
      DATABASE_HOST: postgres
      REDIS_HOST: redis
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis

  web:
    build: ./frontend
    ports:
      - "3001:3000"
    depends_on:
      - api

volumes:
  postgres_data:
```

---

## 🚀 Template: GitHub Actions CI/CD

### .github/workflows/ci.yml
```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
    - uses: actions/checkout@v3
    
    - uses: actions/setup-node@v3
      with:
        node-version: '20'
    
    - run: npm ci
    - run: npm run lint
    - run: npm run test
    - run: npm run build
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        echo "Deploying to production"
        # Add your deployment commands here
```

---

## 📋 Checklist: Iniciando Novo Projeto

- [ ] Escolher stack técnico (vejo em arch-decisions.md)
- [ ] Criar repositório
- [ ] Setup local development
- [ ] Configure CI/CD pipeline
- [ ] Setup banco de dados local
- [ ] Documentar arquitetura
- [ ] Setup monitoring/logging
- [ ] Criar issue tracker
- [ ] Documentar process (review, deployment, etc)
- [ ] Team training

---

**Ver também**: [Architecture Decisions](./arch-decisions.md) | [Stack Técnico](./arch-decisions.md#-stack-técnico-recomendado-atual)
