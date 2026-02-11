# Padrões Avançados e Arquitetura para Produção

## Design Patterns para Agentes

### 1. **Agent Factory Pattern**

Para criar diferentes tipos de agentes com configurações diferentes:

```typescript
enum AgentType {
  RESEARCH = 'research',
  CODING = 'coding',
  CUSTOMER_SERVICE = 'customer_service',
  DATA_ANALYSIS = 'data_analysis'
}

interface AgentConfig {
  type: AgentType;
  model: string;
  maxIterations: number;
  timeout: number;
  tools: string[];
  systemPrompt: string;
  temperature: number;
}

class AgentFactory {
  static createAgent(config: AgentConfig): AgentCerebro {
    const agent = new AgentCerebro();
    
    // Configurar baseado no tipo
    switch (config.type) {
      case AgentType.RESEARCH:
        agent.addTool(createWebSearchTool());
        agent.addTool(createPDFParserTool());
        agent.setSystemPrompt(
          'Você é um pesquisador. Busque fontes confiáveis.'
        );
        break;
        
      case AgentType.CODING:
        agent.addTool(createFileReadTool());
        agent.addTool(createTerminalTool());
        agent.addTool(createCodeLinterTool());
        agent.setSystemPrompt(
          'Você é um desenvolvedor experiente. Escreva código limpo.'
        );
        break;
        
      case AgentType.CUSTOMER_SERVICE:
        agent.addTool(createDatabaseQueryTool());
        agent.addTool(createEmailTool());
        agent.addTool(createFAQSearchTool());
        agent.setSystemPrompt(
          'Você é atencioso e resolve problemas rapidamente.'
        );
        break;
    }
    
    return agent;
  }
}

// Uso
const agent = AgentFactory.createAgent({
  type: AgentType.RESEARCH,
  model: 'claude-3-5-sonnet-20241022',
  maxIterations: 20,
  timeout: 300000,
  tools: ['web_search', 'pdf_parser'],
  systemPrompt: 'Custom prompt',
  temperature: 0.7
});
```

### 2. **Tool Middleware Pattern**

Para adicionar logging, rate limiting, validação antes/depois:

```typescript
interface ToolMiddleware {
  before?:(toolName: string, params: any) => Promise<void>;
  after?: (toolName: string, params: any, result: any) => Promise<void>;
  error?: (toolName: string, params: any, error: Error) => Promise<void>;
}

class AuditLoggingMiddleware implements ToolMiddleware {
  async before(toolName: string, params: any): Promise<void> {
    console.log(`[AUDIT] Tool "${toolName}" called with:`, params);
  }

  async after(toolName: string, params: any, result: any): Promise<void> {
    console.log(`[AUDIT] Tool "${toolName}" returned:`, 
      typeof result === 'string' ? result.substring(0, 100) : result
    );
  }

  async error(toolName: string, params: any, error: Error): Promise<void> {
    console.error(`[AUDIT] Tool "${toolName}" failed:`, error.message);
  }
}

class RateLimitMiddleware implements ToolMiddleware {
  private callCounts = new Map<string, number>();
  private resetTime = Date.now() + 60000; // 1 minuto

  async before(toolName: string): Promise<void> {
    if (Date.now() > this.resetTime) {
      this.callCounts.clear();
      this.resetTime = Date.now() + 60000;
    }

    const count = (this.callCounts.get(toolName) || 0) + 1;
    this.callCounts.set(toolName, count);

    if (count > 10) {
      throw new Error(`Rate limit exceeded for ${toolName}`);
    }
  }
}

class ToolWithMiddleware extends Tool {
  private middlewares: ToolMiddleware[] = [];

  use(middleware: ToolMiddleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(input: any): Promise<string> {
    try {
      // Executar todos os "before"
      for (const mw of this.middlewares) {
        if (mw.before) await mw.before(this.name, input);
      }

      // Executar a ferramenta
      const result = await super.execute(input);

      // Executar todos os "after"
      for (const mw of this.middlewares) {
        if (mw.after) await mw.after(this.name, input, result);
      }

      return result;
    } catch (error) {
      // Executar todos os "error"
      for (const mw of this.middlewares) {
        if (mw.error) await mw.error(this.name, input, error as Error);
      }
      throw error;
    }
  }
}
```

### 3. **State Machine Pattern**

Para gerenciar estados complexos do agente:

```typescript
type AgentState = 
  | 'idle' 
  | 'thinking' 
  | 'executing' 
  | 'waiting_input' 
  | 'error' 
  | 'complete';

interface StateTransition {
  from: AgentState;
  to: AgentState;
  condition: () => boolean;
  action?: () => Promise<void>;
}

class AgentStateMachine {
  private currentState: AgentState = 'idle';
  private transitions: StateTransition[] = [];
  private stateHistory: Array<{state: AgentState; timestamp: Date}> = [];

  registerTransition(transition: StateTransition): void {
    this.transitions.push(transition);
  }

  async transitionTo(newState: AgentState): Promise<boolean> {
    const validTransitions = this.transitions.filter(
      t => t.from === this.currentState && t.to === newState
    );

    for (const transition of validTransitions) {
      if (transition.condition()) {
        if (transition.action) {
          await transition.action();
        }
        
        this.currentState = newState;
        this.stateHistory.push({
          state: newState,
          timestamp: new Date()
        });
        
        console.log(`[STATE] ${this.currentState}`);
        return true;
      }
    }

    return false;
  }

  getState(): AgentState {
    return this.currentState;
  }

  getHistory(): Array<{state: AgentState; timestamp: Date}> {
    return this.stateHistory;
  }
}

// Uso
const stateMachine = new AgentStateMachine();

stateMachine.registerTransition({
  from: 'idle',
  to: 'thinking',
  condition: () => true,
  action: async () => console.log('Começando a pensar...')
});

stateMachine.registerTransition({
  from: 'thinking',
  to: 'executing',
  condition: () => true
});

stateMachine.registerTransition({
  from: 'executing',
  to: 'complete',
  condition: () => true
});
```

### 4. **Circuit Breaker Pattern**

Para falhas de ferramentas/APIs:

```typescript
enum CircuitState {
  CLOSED = 'closed',      // Funcionando normalmente
  OPEN = 'open',          // Bloqueando chamadas
  HALF_OPEN = 'half_open' // Testando se voltou
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount = 0;
  private successCount = 0;
  private lastFailureTime = 0;
  
  private readonly failureThreshold = 5;
  private readonly successThreshold = 2;
  private readonly timeout = 60000; // 1 minuto

  async execute<T>(
    fn: () => Promise<T>
  ): Promise<T> {
    // OPEN - rejeitar chamadas
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        console.log('[CB] Testando recuperação...');
        this.state = CircuitState.HALF_OPEN;
        this.successCount = 0;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();

      // HALF_OPEN - contar sucessos
      if (this.state === CircuitState.HALF_OPEN) {
        this.successCount++;
        if (this.successCount >= this.successThreshold) {
          console.log('[CB] Recuperado! Voltando ao CLOSED');
          this.state = CircuitState.CLOSED;
          this.failureCount = 0;
        }
      }

      return result;
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();

      if (this.failureCount >= this.failureThreshold) {
        console.log('[CB] Muitos erros! Abrindo circuit...');
        this.state = CircuitState.OPEN;
      }

      throw error;
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}

// Uso
const breaker = new CircuitBreaker();

class ResilientTool extends Tool {
  private breaker = new CircuitBreaker();

  async execute(input: any): Promise<string> {
    return this.breaker.execute(() => super.execute(input));
  }
}
```

---

## Arquitetura de Produção

### Diagrama de Sistema Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  Web UI  │  CLI  │  Discord Bot  │  Slack  │  API REST  │ Webhook
└────────────────────┬─────────────────────────────────────────────┘
                     │
          ┌──────────▼──────────┐
          │  API Gateway        │
          │  - Auth             │
          │  - Rate Limit       │
          │  - Request Log      │
          └──────────┬──────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│                    AGENT ORCHESTRATION                            │
├─────────────────────────────────────────────────────────────────┤
│  Agent Manager  │  Queue Processor  │  Job Scheduler             │
└────────────────┬──────────────────────────────────────────────────┘
                 │
    ┌────────────┴─────────────┐
    │                          │
┌───▼────────────┐  ┌──────────▼──────┐
│ Agent Core     │  │ Tool Registry   │
│ - Context Mgr  │  │ - Built-in      │
│ - State Machine│  │ - Custom        │
│ - Loop Control │  │ - External      │
└───┬────────────┘  └─────────────────┘
    │
    ├─ LLM Provider
    │  (Claude/GPT/Llama)
    │
    ├─ Cache Layer
    │  (Redis/Memcached)
    │
    ├─ Database
    │  (MongoDB/PostgreSQL)
    │
    └─ Monitoring
       (Prometheus/Datadog)

┌─────────────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES & DATA SOURCES                    │
├─────────────────────────────────────────────────────────────────┤
│ Google Sheets │ APIs │ Database │ File Storage │ Email │ Analytics
└─────────────────────────────────────────────────────────────────┘
```

### Configuração Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Dependências
COPY package*.json ./
RUN npm ci --only=production

# Código
COPY src ./src
COPY config ./config

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r)=>{if(r.statusCode!==200)throw new Error(r.statusCode)})"

EXPOSE 3000

CMD ["node", "src/index.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  agent:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - REDIS_URL=redis://redis:6379
      - DB_URL=mongodb://mongo:27017/agent
    depends_on:
      - redis
      - mongo
    volumes:
      - ./logs:/app/logs

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  # Monitoramento
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

volumes:
  redis-data:
  mongo-data:
```

---

## Monitoramento e Logging

### Logging Estruturado

```typescript
interface LogEntry {
  timestamp: Date;
  level: 'debug' | 'info' | 'warn' | 'error';
  context: string; // ex: 'agent', 'tool', 'llm'
  message: string;
  data?: any;
  duration?: number;
  agentId?: string;
  userId?: string;
}

class Logger {
  private logs: LogEntry[] = [];

  log(level: string, context: string, message: string, data?: any, duration?: number): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level: level as any,
      context,
      message,
      data,
      duration
    };

    this.logs.push(entry);

    // Env-specific handling
    if (process.env.NODE_ENV === 'production') {
      this.sendToCloudLogging(entry);
    } else {
      console.log(this.format(entry));
    }
  }

  private format(entry: LogEntry): string {
    return `[${entry.timestamp.toISOString()}] ${entry.level.toUpperCase()} [${entry.context}] ${entry.message} ${
      entry.data ? JSON.stringify(entry.data) : ''
    } ${entry.duration ? `(${entry.duration}ms)` : ''}`;
  }

  private async sendToCloudLogging(entry: LogEntry): Promise<void> {
    // Integração com Google Cloud Logging, DataDog, etc
    // await cloudLoggingClient.log(entry);
  }

  getAgentLogs(agentId: string): LogEntry[] {
    return this.logs.filter(l => l.agentId === agentId);
  }
}
```

### Métricas com Prometheus

```typescript
import { Counter, Histogram, Gauge } from 'prom-client';

const agentIterationCounter = new Counter({
  name: 'agent_iterations_total',
  help: 'Total de iterações executadas',
  labelNames: ['agent_type', 'status']
});

const toolExecutionTime = new Histogram({
  name: 'tool_execution_seconds',
  help: 'Tempo de execução das ferramentas',
  labelNames: ['tool_name'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const activeAgents = new Gauge({
  name: 'agent_active_count',
  help: 'Número de agentes ativos'
});

// Uso
async function trackAgentExecution(fn: () => Promise<any>): Promise<any> {
  const start = Date.now();
  activeAgents.inc();
  
  try {
    const result = await fn();
    agentIterationCounter.labels('research', 'success').inc();
    return result;
  } catch (error) {
    agentIterationCounter.labels('research', 'error').inc();
    throw error;
  } finally {
    activeAgents.dec();
  }
}
```

---

## Escalabilidade

### Queue-Based Processing

```typescript
import Bull from 'bull';

const agentQueue = new Bull('agent', {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
  }
});

// Job producer
async function submitAgentJob(
  objective: string,
  userId: string,
  priority: number = 5
): Promise<string> {
  const job = await agentQueue.add(
    { objective, userId },
    {
      priority,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  );

  return job.id;
}

// Job consumer (worker)
agentQueue.process(10, async (job) => {
  const agent = new AgentCerebro();
  const result = await agent.execute(job.data.objective);
  
  job.progress(100);
  return result;
});

// Event listeners
agentQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed:`, result);
});

agentQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});
```

### Load Balancing

```typescript
class AgentPool {
  private agents: AgentCerebro[] = [];
  private queue: Array<{objective: string; resolve: Function; reject: Function}> = [];
  private currentIndex = 0;

  constructor(poolSize: number) {
    for (let i = 0; i < poolSize; i++) {
      this.agents.push(new AgentCerebro());
    }
  }

  async execute(objective: string): Promise<AgentResponse> {
    return new Promise((resolve, reject) => {
      // Se todos ocupados, enfileirar
      if (!this.hasAvailableAgent()) {
        this.queue.push({ objective, resolve, reject });
        return;
      }

      this.executeWithAgent(objective, resolve, reject);
    });
  }

  private hasAvailableAgent(): boolean {
    // Implementar lógica de detecção
    return this.agents.length > 0;
  }

  private async executeWithAgent(
    objective: string,
    resolve: Function,
    reject: Function
  ): Promise<void> {
    const agent = this.agents[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.agents.length;

    try {
      const result = await agent.execute(objective);
      resolve(result);

      // Processar próximo da fila
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        if (next) {
          this.executeWithAgent(next.objective, next.resolve, next.reject);
        }
      }
    } catch (error) {
      reject(error);
    }
  }
}
```

---

## Testes

### Unit Tests

```typescript
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('AgentCerebro', () => {
  let agent: AgentCerebro;

  beforeEach(() => {
    agent = new AgentCerebro();
  });

  it('deve criar um contexto válido', () => {
    const context = ContextManager.createContext(
      'user123',
      'Find the answer to life',
      new Map()
    );

    expect(context.userId).toBe('user123');
    expect(context.objective).toBe('Find the answer to life');
    expect(context.iterations).toBe(0);
  });

  it('deve executar uma ferramenta', async () => {
    const mockTool: Tool = {
      name: 'test_tool',
      description: 'Test tool',
      input_schema: {},
      category: 'compute',
      execute: async () => 'test result'
    };

    agent.addTool(mockTool);
    const result = await mockTool.execute({});

    expect(result).toBe('test result');
  });

  it('deve manter histórico de mensagens', () => {
    const context = ContextManager.createContext(
      'user1',
      'test',
      new Map()
    );

    ContextManager.addMessage(context, 'assistant', 'Hello');
    ContextManager.addMessage(context, 'user', 'Hi');

    expect(context.history).toHaveLength(3); // initial + 2
  });
});
```

### Integration Tests

```typescript
describe('Agent E2E', () => {
  it('deve completar um fluxo completo', async () => {
    const agent = new AgentCerebro();
    
    agent.addTool(createFileReadTool());
    agent.addTool(createCalculatorTool());

    const result = await agent.execute(
      'Read file sum.txt and calculate the sum'
    );

    expect(result.success).toBe(true);
    expect(result.answer).toContain('sum');
  });
});
```

---

## Conclusão

Esta documentação fornece uma base sólida para construir agentes de produção escaláveis e confiáveis. Os padrões aqui apresentados são testados e usados em sistemas reais.

**Checklist para Produção:**
- ✅ Logging estruturado
- ✅ Métricas e monitoramento
- ✅ Tratamento de erros
- ✅ Circuit breaker
- ✅ Rate limiting
- ✅ Cache
- ✅ Queue processing
- ✅ Load balancing
- ✅ Testes unitários e integração
- ✅ Docker/Kubernetes
- ✅ Documentação (OpenAPI/Swagger)

