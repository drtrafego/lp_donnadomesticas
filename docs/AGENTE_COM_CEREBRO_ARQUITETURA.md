# Documentação: Criando um Agente Inteligente com Arquitetura de Cérebro (Tipo OpenClaw)

## Índice
1. [Conceitos Fundamentais](#conceitos-fundamentais)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Componentes Principais](#componentes-principais)
4. [Implementação Passo a Passo](#implementação-passo-a-passo)
5. [Exemplos de Código](#exemplos-de-código)
6. [Deploy e Uso](#deploy-e-uso)

---

## Conceitos Fundamentais

### O que é um Agente com Estrutura de Cérebro?

Um agente com estrutura de cérebro é um sistema de IA que funciona de forma similar ao OpenClaw, com:

- **Contexto Persistente**: Memória do que foi feito antes
- **Raciocínio Estruturado**: Decide o que fazer baseado em objetivo
- **Execução de Ferramentas**: Pede ações (pesquisa, código, terminal, etc)
- **Loop Autônomo**: Continua até atingir objetivo sem intervenção

### Fluxo de Funcionamento

```
┌─────────────────────────────────────────────────┐
│ 1. Recebe Objetivo/Pergunta do Usuário          │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│ 2. Processa com Modelo de IA (Claude/GPT)       │
│    - Analisa objetivo                           │
│    - Pensa no que precisa fazer                 │
│    - Decide qual ferramenta usar                │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│ 3. Executa Ação/Ferramenta                      │
│    - Terminal/Python                             │
│    - Busca de arquivo                           │
│    - Edição de código                           │
│    - Pesquisa web                               │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│ 4. Obtém Resultado                              │
│    - Analisa output                             │
│    - Atualiza conhecimento                      │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│ 5. Objetivo Atingido?                           │
│    SIM → Retorna resposta                       │
│    NÃO → Volta ao passo 2                       │
└─────────────────────────────────────────────────┘
```

---

## Arquitetura do Sistema

### Estrutura em Camadas

```
┌──────────────────────────────────────────────────────┐
│              CAMADA DE INTERFACE                      │
│  (CLI, API HTTP, Webhook, Chat)                      │
└────────────────────┬─────────────────────────────────┘
                     │
┌──────────────────────────────────────────────────────┐
│         CAMADA DE ORQUESTRAÇÃO/CÉREBRO               │
│  - Gerencia estado                                    │
│  - Decide próxima ação                               │
│  - Mantém histórico                                  │
│  - Controla loop                                     │
└────────────────────┬─────────────────────────────────┘
                     │
┌──────────────────────────────────────────────────────┐
│         CAMADA DE RACIOCÍNIO (LLM)                    │
│  - Claude 3.5 Sonnet                                 │
│  - GPT-4                                             │
│  - Llama                                             │
│  - Análise com context completo                      │
└────────────────────┬─────────────────────────────────┘
                     │
┌──────────────────────────────────────────────────────┐
│            CAMADA DE FERRAMENTAS                      │
│  - Sistema de arquivos                               │
│  - Terminal/Shell                                    │
│  - HTTP/APIs                                         │
│  - Banco de dados                                    │
│  - Outros serviços                                   │
└──────────────────────────────────────────────────────┘
```

---

## Componentes Principais

### 1. **Memory/Context Manager**
Mantém histórico de tudo que foi feito.

```typescript
interface AgentContext {
  conversationId: string;
  userId: string;
  objective: string;
  history: Message[];
  tools: ToolDefinition[];
  state: AgentState;
  thinking: string;
  startTime: Date;
  iterations: number;
}

interface Message {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  timestamp: Date;
  toolCall?: ToolCall;
}
```

### 2. **Tool Registry**
Define todas as ferramentas disponíveis.

```typescript
interface Tool {
  name: string;
  description: string;
  input_schema: JSONSchema;
  execute: (input: any) => Promise<any>;
  category: 'read' | 'write' | 'compute' | 'external';
}

type ToolRegistry = {
  [key: string]: Tool;
};
```

### 3. **Reasoning Engine**
O cérebro que decide o que fazer.

```typescript
interface ReasoningResponse {
  thinking: string;
  action: 'tool_use' | 'final_answer' | 'clarify';
  toolName?: string;
  parameters?: any;
  confidence: number;
}
```

### 4. **Execution Loop**
O loop principal que executa tudo.

```typescript
async function executionLoop(
  context: AgentContext,
  maxIterations: number = 10
): Promise<AgentResponse> {
  while (context.iterations < maxIterations) {
    // 1. Pensar sobre o que fazer
    const reasoning = await llmThink(context);
    
    // 2. Se temos uma ferramenta, executar
    if (reasoning.action === 'tool_use') {
      const result = await executeTool(
        reasoning.toolName,
        reasoning.parameters
      );
      context.history.push({
        role: 'tool',
        content: result
      });
    }
    
    // 3. Se temos resposta final, retornar
    else if (reasoning.action === 'final_answer') {
      return { success: true, answer: reasoning.thinking };
    }
    
    // 4. Se precisa clarificar, pedir ao usuário
    else if (reasoning.action === 'clarify') {
      return { success: false, needsClarification: true };
    }
    
    context.iterations++;
  }
}
```

---

## Implementação Passo a Passo

### Passo 1: Configurar Ambiente

```bash
# Criar projeto
mkdir meu-agente-cerebro
cd meu-agente-cerebro

# Inicializar Node.js
npm init -y

# Instalar dependências
npm install anthropic axios dotenv express uuid

# TypeScript (opcional mas recomendado)
npm install -D typescript @types/node ts-node
npx tsc --init
```

### Passo 2: Criar Strutura de Pastas

```
meu-agente-cerebro/
├── src/
│   ├── agent.ts           # Classe principal do agente
│   ├── tools/             # Ferramentas disponíveis
│   │   ├── index.ts
│   │   ├── filesystem.ts
│   │   ├── terminal.ts
│   │   ├── http.ts
│   │   └── code.ts
│   ├── memory/            # Gerenciamento de contexto
│   │   ├── index.ts
│   │   └── context.ts
│   ├── reasoning/         # Engine de raciocínio
│   │   ├── index.ts
│   │   └── llm.ts
│   ├── types.ts           # TypeScript interfaces
│   └── index.ts           # Entrada principal
├── examples/              # Exemplos de uso
│   ├── simple-agent.ts
│   └── with-tools.ts
├── .env.example
├── tsconfig.json
└── package.json
```

### Passo 3: Definir Tipos

```typescript
// src/types.ts

export interface Tool {
  name: string;
  description: string;
  input_schema: Record<string, any>;
  execute: (input: any) => Promise<string>;
  category: 'read' | 'write' | 'compute' | 'external';
}

export interface Message {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  timestamp: Date;
  toolCall?: {
    toolName: string;
    parameters: any;
  };
}

export interface AgentContext {
  conversationId: string;
  userId: string;
  objective: string;
  history: Message[];
  tools: Map<string, Tool>;
  thinking: string;
  startTime: Date;
  iterations: number;
  maxIterations: number;
  tokenUsage: {
    input: number;
    output: number;
  };
}

export interface ReasoningResponse {
  thinking: string;
  action: 'tool_use' | 'final_answer' | 'clarify' | 'search';
  toolName?: string;
  parameters?: any;
  confidence: number;
}

export interface AgentResponse {
  success: boolean;
  answer: string;
  iterations: number;
  details?: {
    toolsUsed: string[];
    thinking: string[];
    errors: string[];
  };
}
```

### Passo 4: Implementar Context Manager

```typescript
// src/memory/context.ts

import { AgentContext, Message, Tool } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class ContextManager {
  static createContext(
    userId: string,
    objective: string,
    tools: Map<string, Tool>,
    maxIterations: number = 15
  ): AgentContext {
    return {
      conversationId: uuidv4(),
      userId,
      objective,
      history: [
        {
          role: 'user',
          content: objective,
          timestamp: new Date()
        }
      ],
      tools,
      thinking: '',
      startTime: new Date(),
      iterations: 0,
      maxIterations,
      tokenUsage: {
        input: 0,
        output: 0
      }
    };
  }

  static addMessage(
    context: AgentContext,
    role: 'user' | 'assistant' | 'tool',
    content: string,
    toolCall?: any
  ): void {
    context.history.push({
      role,
      content,
      timestamp: new Date(),
      toolCall
    });
  }

  static getRecentContext(
    context: AgentContext,
    lastMessages: number = 20
  ): Message[] {
    return context.history.slice(-lastMessages);
  }

  static formatContextForLLM(context: AgentContext): string {
    const systemPrompt = `Você é um agente de IA autônomo com objetivo: "${context.objective}"

FERRAMENTAS DISPONÍVEIS:
${Array.from(context.tools.values())
  .map(
    tool => `
- ${tool.name}: ${tool.description}
  Categoria: ${tool.category}
  Schema: ${JSON.stringify(tool.input_schema)}
`
  )
  .join('\n')}

HISTÓRICO:
${context.history
  .map(
    msg =>
      `[${msg.role.toUpperCase()}] ${msg.content.substring(0, 200)}...`
  )
  .join('\n')}

SEU ESTADO:
- Iterações: ${context.iterations}/${context.maxIterations}
- Tokens: Input ${context.tokenUsage.input} | Output ${context.tokenUsage.output}
- Tempo: ${Math.floor((Date.now() - context.startTime.getTime()) / 1000)}s

PRÓXIMO PASSO:
Analise o objetivo e o histórico. Decida:
1. Se precisa usar uma ferramenta (tool_use)
2. Se pode responder agora (final_answer)
3. Se precisa de clarificação (clarify)

Responda em JSON com format:
{
  "thinking": "seu pensamento",
  "action": "tool_use|final_answer|clarify",
  "toolName": "se tool_use, qual ferramenta",
  "parameters": {"se": "tool_use, parametros"}
}`;

    return systemPrompt;
  }
}
```

### Passo 5: Implementar Tools

```typescript
// src/tools/index.ts

import { Tool } from '../types';
import fs from 'fs/promises';
import { execSync } from 'child_process';
import axios from 'axios';

export class ToolFactory {
  static createFileReadTool(): Tool {
    return {
      name: 'read_file',
      description: 'Lê conteúdo de um arquivo',
      input_schema: {
        type: 'object',
        properties: {
          filepath: { type: 'string', description: 'Caminho do arquivo' },
          startLine: { type: 'number', description: 'Linha inicial' },
          endLine: { type: 'number', description: 'Linha final' }
        },
        required: ['filepath']
      },
      category: 'read',
      execute: async (input) => {
        try {
          const content = await fs.readFile(input.filepath, 'utf-8');
          const lines = content.split('\n');
          const start = (input.startLine || 1) - 1;
          const end = input.endLine || lines.length;
          return lines.slice(start, end).join('\n');
        } catch (e: any) {
          return `Erro ao ler arquivo: ${e.message}`;
        }
      }
    };
  }

  static createFileWriteTool(): Tool {
    return {
      name: 'write_file',
      description: 'Escreve conteúdo em um arquivo',
      input_schema: {
        type: 'object',
        properties: {
          filepath: { type: 'string' },
          content: { type: 'string' }
        },
        required: ['filepath', 'content']
      },
      category: 'write',
      execute: async (input) => {
        try {
          await fs.writeFile(input.filepath, input.content, 'utf-8');
          return `Arquivo ${input.filepath} escrito com sucesso`;
        } catch (e: any) {
          return `Erro ao escrever arquivo: ${e.message}`;
        }
      }
    };
  }

  static createTerminalTool(): Tool {
    return {
      name: 'run_terminal',
      description: 'Executa comando no terminal',
      input_schema: {
        type: 'object',
        properties: {
          command: { type: 'string', description: 'Comando a executar' }
        },
        required: ['command']
      },
      category: 'compute',
      execute: async (input) => {
        try {
          const result = execSync(input.command, { encoding: 'utf-8' });
          return result.substring(0, 2000); // Limitar output
        } catch (e: any) {
          return `Erro ao executar comando: ${e.message}`;
        }
      }
    };
  }

  static createHttpTool(): Tool {
    return {
      name: 'http_request',
      description: 'Faz requisição HTTP',
      input_schema: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          method: { type: 'string', enum: ['GET', 'POST', 'PUT', 'DELETE'] },
          headers: { type: 'object' },
          body: { type: 'object' }
        },
        required: ['url']
      },
      category: 'external',
      execute: async (input) => {
        try {
          const response = await axios({
            url: input.url,
            method: input.method || 'GET',
            headers: input.headers,
            data: input.body,
            timeout: 10000
          });
          return JSON.stringify(response.data).substring(0, 2000);
        } catch (e: any) {
          return `Erro na requisição HTTP: ${e.message}`;
        }
      }
    };
  }

  static getDefaultTools(): Map<string, Tool> {
    const tools = new Map<string, Tool>();
    tools.set('read_file', this.createFileReadTool());
    tools.set('write_file', this.createFileWriteTool());
    tools.set('run_terminal', this.createTerminalTool());
    tools.set('http_request', this.createHttpTool());
    return tools;
  }
}
```

### Passo 6: Implementar Reasoning Engine

```typescript
// src/reasoning/llm.ts

import Anthropic from '@anthropic-ai/sdk';
import { AgentContext, ReasoningResponse } from '../types';
import { ContextManager } from '../memory/context';

export class ReasoningEngine {
  private client: Anthropic;
  private model: string = 'claude-3-5-sonnet-20241022';

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async think(context: AgentContext): Promise<ReasoningResponse> {
    const systemPrompt = `Você é um agente de IA autônomo e inteligente. Seu objetivo é: "${context.objective}"

Você tem acesso a estas ferramentas:
${Array.from(context.tools.values())
  .map(tool => `- ${tool.name}: ${tool.description}`)
  .join('\n')}

IMPORTANTE:
1. Analise o histórico anterior
2. Determine se precisa de mais informações (usar ferramenta)
3. Ou se já pode responder (action: final_answer)
4. Seu raciocínio deve ser lógico e estruturado

Responda APENAS com JSON válido:
{
  "thinking": "seu raciocínio",
  "action": "tool_use|final_answer|clarify",
  "toolName": "se tool_use",
  "parameters": {}
}`;

    const userMessage = `
Objetivo: ${context.objective}

Histórico recente:
${context.history
  .slice(-5)
  .map(m => `${m.role}: ${m.content.substring(0, 100)}`)
  .join('\n')}

Iteração: ${context.iterations}/${context.maxIterations}

O que você fará agora?`;

    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ]
      });

      // Atualizar token usage
      context.tokenUsage.input += response.usage.input_tokens;
      context.tokenUsage.output += response.usage.output_tokens;

      const content = response.content[0];
      if (content.type === 'text') {
        // Tentar extrair JSON
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }

      return {
        thinking: 'Erro ao processar resposta',
        action: 'clarify',
        confidence: 0
      };
    } catch (error: any) {
      console.error('Erro no reasoning:', error);
      throw error;
    }
  }
}
```

### Passo 7: Implementar Agent Principal

```typescript
// src/agent.ts

import { AgentContext, Tool, AgentResponse, ReasoningResponse } from './types';
import { ContextManager } from './memory/context';
import { ReasoningEngine } from './reasoning/llm';
import { ToolFactory } from './tools';

export class AgentCerebro {
  private reasoning: ReasoningEngine;
  private tools: Map<string, Tool>;

  constructor() {
    this.reasoning = new ReasoningEngine();
    this.tools = ToolFactory.getDefaultTools();
  }

  async execute(objective: string, userId: string = 'default'): Promise<AgentResponse> {
    // 1. Criar contexto
    const context = ContextManager.createContext(
      userId,
      objective,
      this.tools,
      15 // max iterações
    );

    const details = {
      toolsUsed: [] as string[],
      thinking: [] as string[],
      errors: [] as string[]
    };

    // 2. Loop de execução
    while (context.iterations < context.maxIterations) {
      try {
        // Pensar
        const reasoning = await this.reasoning.think(context);
        details.thinking.push(reasoning.thinking);
        context.thinking = reasoning.thinking;

        // Resposta final?
        if (reasoning.action === 'final_answer') {
          return {
            success: true,
            answer: reasoning.thinking,
            iterations: context.iterations,
            details
          };
        }

        // Executar ferramenta
        if (reasoning.action === 'tool_use' && reasoning.toolName) {
          const tool = this.tools.get(reasoning.toolName);
          if (!tool) {
            details.errors.push(`Ferramenta não encontrada: ${reasoning.toolName}`);
            context.iterations++;
            continue;
          }

          details.toolsUsed.push(reasoning.toolName);
          const result = await tool.execute(reasoning.parameters || {});
          
          ContextManager.addMessage(context, 'tool', result, {
            toolName: reasoning.toolName,
            parameters: reasoning.parameters
          });
        }

        // Clarificação
        if (reasoning.action === 'clarify') {
          return {
            success: false,
            answer: 'Preciso de mais informações para continuar',
            iterations: context.iterations,
            details
          };
        }

        context.iterations++;
      } catch (error: any) {
        details.errors.push(error.message);
        context.iterations++;
      }
    }

    return {
      success: false,
      answer: 'Limite de iterações atingido',
      iterations: context.iterations,
      details
    };
  }

  addTool(tool: Tool): void {
    this.tools.set(tool.name, tool);
  }
}

export { AgentContext } from './types';
```

---

## Exemplos de Código

### Exemplo 1: Uso Básico

```typescript
// examples/simple-agent.ts

import { AgentCerebro } from '../src/agent';

async function main() {
  const agent = new AgentCerebro();

  const result = await agent.execute(
    'Qual é o conteúdo do arquivo package.json? Extraia a versão.',
    'user123'
  );

  console.log('Objetivo atingido:', result.success);
  console.log('Resposta:', result.answer);
  console.log('Iterações:', result.iterations);
  console.log('Ferramentas usadas:', result.details?.toolsUsed);
}

main().catch(console.error);
```

### Exemplo 2: Com Ferramentas Customizadas

```typescript
// examples/with-tools.ts

import { AgentCerebro } from '../src/agent';
import { Tool } from '../src/types';

async function main() {
  const agent = new AgentCerebro();

  // Adicionar ferramenta customizada
  const customTool: Tool = {
    name: 'analyze_sentiment',
    description: 'Analisa sentimento de um texto',
    input_schema: {
      type: 'object',
      properties: {
        text: { type: 'string' }
      },
      required: ['text']
    },
    category: 'compute',
    execute: async (input) => {
      // Implementação fake
      const positive = input.text.includes('bom') || 
                      input.text.includes('ótimo');
      return positive ? 'Positivo' : 'Neutro/Negativo';
    }
  };

  agent.addTool(customTool);

  const result = await agent.execute(
    'Sou muito bom no que faço. Qual é meu sentimento?'
  );

  console.log(result);
}

main().catch(console.error);
```

---

## Deploy e Uso

### Opção 1: CLI

```typescript
// src/cli.ts

import { AgentCerebro } from './agent';
import readline from 'readline';

const agent = new AgentCerebro();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  console.log('🤖 Agent Cérebro - Digite seu objetivo (ou "sair" para encerrar)');
  
  const ask = () => {
    rl.question('\n📝 Objetivo: ', async (objective) => {
      if (objective.toLowerCase() === 'sair') {
        console.log('Até logo!');
        rl.close();
        return;
      }

      console.log('\n⏳ Processando...');
      const result = await agent.execute(objective);
      
      console.log('\n✅ Resultado:');
      console.log(result.answer);
      console.log(`\n📊 Iterações: ${result.iterations}`);
      console.log(`🔧 Ferramentas: ${result.details?.toolsUsed.join(', ')}`);
      
      ask();
    });
  };

  ask();
}

main();
```

### Opção 2: API HTTP

```typescript
// src/api.ts

import express from 'express';
import { AgentCerebro } from './agent';

const app = express();
const agent = new AgentCerebro();

app.use(express.json());

app.post('/agent/execute', async (req, res) => {
  const { objective, userId } = req.body;

  if (!objective) {
    return res.status(400).json({ error: 'Objetivo requerido' });
  }

  try {
    const result = await agent.execute(objective, userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 API rodando em http://localhost:3000');
});
```

### Opção 3: Discord Bot

```typescript
// examples/discord-bot.ts

import { Client, GatewayIntentBits } from 'discord.js';
import { AgentCerebro } from '../src/agent';

const client = new Client({
  intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent]
});
const agent = new AgentCerebro();

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  try {
    await message.channel.sendTyping();
    const result = await agent.execute(message.content);
    
    // Dividir resposta em chunks se for muito grande
    const chunks = result.answer.match(/[\s\S]{1,2000}/g) || [];
    for (const chunk of chunks) {
      await message.reply(chunk);
    }
  } catch (error: any) {
    await message.reply(`Erro: ${error.message}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
```

---

## Otimizações Avançadas

### 1. Cache de Resultados

```typescript
interface CacheEntry {
  query: string;
  result: AgentResponse;
  timestamp: Date;
  ttl: number;
}

class CacheManager {
  private cache = new Map<string, CacheEntry>();

  set(query: string, result: AgentResponse, ttlSeconds: number = 3600): void {
    this.cache.set(query, {
      query,
      result,
      timestamp: new Date(),
      ttl: ttlSeconds
    });
  }

  get(query: string): AgentResponse | null {
    const entry = this.cache.get(query);
    if (!entry) return null;

    const age = (Date.now() - entry.timestamp.getTime()) / 1000;
    if (age > entry.ttl) {
      this.cache.delete(query);
      return null;
    }

    return entry.result;
  }
}
```

### 2. Parallelização de Ferramentas

```typescript
// Executar múltiplas ferramentas em paralelo
async function executeToolsParallel(
  tools: Array<{ name: string; params: any }>,
  toolRegistry: Map<string, Tool>
): Promise<string[]> {
  return Promise.all(
    tools.map(async (toolCall) => {
      const tool = toolRegistry.get(toolCall.name);
      if (!tool) throw new Error(`Tool not found: ${toolCall.name}`);
      return tool.execute(toolCall.params);
    })
  );
}
```

### 3. Persistência em Banco de Dados

```typescript
// Salvar conversa em MongoDB
interface ConversationRecord {
  conversationId: string;
  userId: string;
  objective: string;
  messages: Message[];
  result: AgentResponse;
  createdAt: Date;
  duration: number;
  tokenUsage: { input: number; output: number };
}

async function saveToDB(
  db: any,
  context: AgentContext,
  result: AgentResponse
): Promise<void> {
  await db.collection('conversations').insertOne({
    conversationId: context.conversationId,
    userId: context.userId,
    objective: context.objective,
    messages: context.history,
    result,
    createdAt: new Date(),
    duration: Date.now() - context.startTime.getTime(),
    tokenUsage: context.tokenUsage
  });
}
```

---

## Boas Práticas

### ✅ Faça

- Sempre limitar iterações máximas
- Incluir timeout em requisições HTTP
- Fazer logs de tudo
- Validar inputs de ferramentas
- Usar versionamento de ferramentas
- Implementar rate limiting
- Monitorar uso de tokens/custo

### ❌ Não Faça

- Não dar acesso ilimitado ao terminal
- Não executar código arbitrário
- Não confiar cegamente em respostas do LLM
- Não ignorar erros silenciosamente
- Não fazer loops infinitos

---

## Conclusão

Você agora tem uma estrutura completa para criar um agente com inteligência autônoma similar ao OpenClaw. A arquitetura é modular, extensível e pronta para produção.

**Próximos passos:**
1. Implementar ferramentas específicas do seu caso de uso
2. Treinar o modelo com prompts customizados
3. Adicionar persistência de dados
4. Implementar monitoramento e logs
5. Deploy para ambiente de produção

Para mais informações sobre APIs:
- Claude: https://console.anthropic.com
- GPT: https://platform.openai.com
- Llama: https://www.llamaindex.ai/
