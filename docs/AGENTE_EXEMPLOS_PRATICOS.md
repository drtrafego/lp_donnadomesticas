# Guia Prático: Criando Seu Primeiro Agente

## Quick Start (5 minutos)

### 1. Criar projeto

```bash
mkdir meu-agente
cd meu-agente
npm init -y
npm install anthropic axios dotenv
touch .env agent.js
```

### 2. Configurar .env

```env
ANTHROPIC_API_KEY=sua_chave_aqui
```

### 3. Criar agent.js básico

```javascript
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

class SimpleAgent {
  constructor() {
    this.conversationHistory = [];
    this.tools = [
      {
        name: "calculator",
        description: "Realiza operações matemáticas",
        input: {
          type: "object",
          properties: {
            operation: {
              type: "string",
              enum: ["add", "subtract", "multiply", "divide"],
            },
            a: { type: "number" },
            b: { type: "number" },
          },
        },
      },
    ];
  }

  async executeTool(toolName, params) {
    if (toolName === "calculator") {
      const { operation, a, b } = params;
      let result;

      switch (operation) {
        case "add":
          result = a + b;
          break;
        case "subtract":
          result = a - b;
          break;
        case "multiply":
          result = a * b;
          break;
        case "divide":
          result = a / b;
          break;
      }

      return `Resultado: ${result}`;
    }
  }

  async run(userMessage) {
    console.log(`\n📝 Usuário: ${userMessage}`);

    this.conversationHistory.push({
      role: "user",
      content: userMessage,
    });

    let iteration = 0;
    const maxIterations = 5;

    while (iteration < maxIterations) {
      iteration++;
      console.log(`\n🔄 Iteração ${iteration}...`);

      const response = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        tools: this.tools,
        messages: this.conversationHistory,
      });

      console.log(`Stop reason: ${response.stop_reason}`);

      if (response.stop_reason === "end_turn") {
        // Assistente terminou
        const finalMessage = response.content
          .filter((block) => block.type === "text")
          .map((block) => block.text)
          .join("");

        console.log(`\n✅ Assistente: ${finalMessage}`);
        return finalMessage;
      }

      if (response.stop_reason === "tool_use") {
        // Assistente quer usar uma ferramenta
        this.conversationHistory.push({
          role: "assistant",
          content: response.content,
        });

        for (const block of response.content) {
          if (block.type === "tool_use") {
            console.log(`🔧 Usando ferramenta: ${block.name}`);
            console.log(`📥 Parâmetros:`, block.input);

            const toolResult = await this.executeTool(block.name, block.input);

            console.log(`📤 Resultado:`, toolResult);

            this.conversationHistory.push({
              role: "user",
              content: [
                {
                  type: "tool_result",
                  tool_use_id: block.id,
                  content: toolResult,
                },
              ],
            });
          }
        }
      }
    }

    return "Limite de iterações atingido";
  }
}

// Uso
async function main() {
  const agent = new SimpleAgent();

  // Teste 1
  await agent.run("Qual é 145 + 327?");

  // Teste 2
  await agent.run("Divide 1000 por 8 e depois multiplica por 3");
}

main().catch(console.error);
```

### 4. Executar

```bash
node agent.js
```

---

## Exemplo 2: Agente com Acesso ao Filesystem

```javascript
const fs = require("fs").promises;
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

class FileAgent {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    this.conversationHistory = [];
    this.tools = [
      {
        name: "read_file",
        description: "Lê o conteúdo de um arquivo",
        input: {
          type: "object",
          properties: {
            filepath: {
              type: "string",
              description: "Caminho completo do arquivo",
            },
          },
          required: ["filepath"],
        },
      },
      {
        name: "write_file",
        description: "Escreve conteúdo em um arquivo",
        input: {
          type: "object",
          properties: {
            filepath: { type: "string" },
            content: { type: "string" },
          },
          required: ["filepath", "content"],
        },
      },
      {
        name: "list_files",
        description: "Lista arquivos em um diretório",
        input: {
          type: "object",
          properties: {
            directory: {
              type: "string",
              description: "Diretório a listar",
            },
          },
          required: ["directory"],
        },
      },
    ];
  }

  async executeTool(toolName, params) {
    try {
      switch (toolName) {
        case "read_file": {
          const content = await fs.readFile(params.filepath, "utf-8");
          return content.substring(0, 2000); // Limitar tamanho
        }

        case "write_file": {
          const dir = path.dirname(params.filepath);
          await fs.mkdir(dir, { recursive: true });
          await fs.writeFile(params.filepath, params.content, "utf-8");
          return `✅ Arquivo ${params.filepath} escrito com sucesso`;
        }

        case "list_files": {
          const files = await fs.readdir(params.directory);
          return files.join("\n");
        }
      }
    } catch (error) {
      return `❌ Erro: ${error.message}`;
    }
  }

  async run(userMessage) {
    console.log(`\n👤 Você: ${userMessage}`);

    this.conversationHistory.push({
      role: "user",
      content: userMessage,
    });

    let iterations = 0;
    const maxIterations = 10;

    while (iterations < maxIterations) {
      iterations++;

      const response = await this.client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2048,
        tools: this.tools,
        messages: this.conversationHistory,
        system:
          "Você é um assistente que ajuda a gerenciar arquivos. Seja conciso.",
      });

      if (response.stop_reason === "end_turn") {
        const text = response.content
          .filter((block) => block.type === "text")
          .map((block) => block.text)
          .join("");

        console.log(`\n🤖 Assistente: ${text}`);
        return;
      }

      if (response.stop_reason === "tool_use") {
        this.conversationHistory.push({
          role: "assistant",
          content: response.content,
        });

        const toolResults = [];

        for (const block of response.content) {
          if (block.type === "tool_use") {
            console.log(`\n🔧 Ferramenta: ${block.name}`);
            const result = await this.executeTool(block.name, block.input);
            console.log(`📤 Resultado: ${result.substring(0, 200)}...`);

            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: result,
            });
          }
        }

        this.conversationHistory.push({
          role: "user",
          content: toolResults,
        });
      }
    }
  }
}

// Uso
async function main() {
  const agent = new FileAgent();

  // Cria um arquivo de teste
  await agent.run("Crie um arquivo 'dados.txt' com o conteúdo: 'Olá Mundo'");

  // Lê o arquivo
  await agent.run("Leia o arquivo 'dados.txt'");

  // Lista arquivos
  await agent.run("Quais arquivos existem no diretório atual?");
}

main().catch(console.error);
```

---

## Exemplo 3: Agente com Memory Persistente

```javascript
const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs").promises;

class AgentWithMemory {
  constructor(memoryFile = "agent-memory.json") {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    this.memoryFile = memoryFile;
    this.memory = {
      conversationHistory: [],
      facts: [], // Fatos aprendidos
      decisions: [], // Decisões tomadas
      lastUpdated: new Date().toISOString(),
    };
    this.tools = [];
  }

  async loadMemory() {
    try {
      const data = await fs.readFile(this.memoryFile, "utf-8");
      this.memory = JSON.parse(data);
      console.log("📚 Memória carregada");
    } catch {
      console.log("📚 Nova memória criada");
    }
  }

  async saveMemory() {
    await fs.writeFile(
      this.memoryFile,
      JSON.stringify(this.memory, null, 2),
      "utf-8"
    );
  }

  async run(userMessage) {
    await this.loadMemory();

    console.log(`\n👤 Você: ${userMessage}`);

    // Adicionar ao histórico
    this.memory.conversationHistory.push({
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    });

    const contextMessages = this.memory.conversationHistory.slice(-10);

    const response = await this.client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: contextMessages,
      system: `Você é um assistente inteligente com memória.
      
Fatos que você sabe sobre o usuário:
${this.memory.facts.map((f) => `- ${f}`).join("\n")}

Decisões anteriores:
${this.memory.decisions.map((d) => `- ${d}`).join("\n")}`,
    });

    const assistantMessage = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    console.log(`\n🤖 Assistente: ${assistantMessage}`);

    // Salvar na memória
    this.memory.conversationHistory.push({
      role: "assistant",
      content: assistantMessage,
      timestamp: new Date().toISOString(),
    });

    // Extrair fatos (isso poderia ser mais sofisticado)
    if (userMessage.toLowerCase().includes("meu nome é")) {
      const match = userMessage.match(/meu nome é (\w+)/i);
      if (match) {
        this.memory.facts.push(`Usuário se chama ${match[1]}`);
      }
    }

    this.memory.lastUpdated = new Date().toISOString();
    await this.saveMemory();

    return assistantMessage;
  }
}

// Uso
async function main() {
  const agent = new AgentWithMemory();

  console.log("=== Conversa com Agente com Memória ===\n");

  await agent.run("Olá! Meu nome é João");
  await agent.run("Qual é o meu nome?");
  await agent.run("Eu gosto de programação em JavaScript");
  await agent.run("O que você sabe sobre mim?");
}

main().catch(console.error);
```

---

## Exemplo 4: Agente em Web Server

```javascript
const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Armazenar conversas em memória (em produção, usar BD)
const conversations = new Map();

function getOrCreateConversation(userId) {
  if (!conversations.has(userId)) {
    conversations.set(userId, []);
  }
  return conversations.get(userId);
}

app.post("/chat", async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res
      .status(400)
      .json({ error: "userId e message são obrigatórios" });
  }

  try {
    const history = getOrCreateConversation(userId);

    history.push({
      role: "user",
      content: message,
    });

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: history,
      system:
        "Você é um assistente amigável e útil. Respostas breves e diretas.",
    });

    const assistantMessage = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    history.push({
      role: "assistant",
      content: assistantMessage,
    });

    res.json({
      message: assistantMessage,
      historyLength: history.length,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/conversation/:userId", (req, res) => {
  const history = getOrCreateConversation(req.params.userId);
  res.json({ history });
});

app.post("/conversation/:userId/reset", (req, res) => {
  conversations.delete(req.params.userId);
  res.json({ message: "Conversa resetada" });
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
  console.log("\nExemplos de uso:");
  console.log("POST http://localhost:3000/chat");
  console.log('{"userId": "user1", "message": "Olá!"}');
});
```

---

## Exemplo 5: Agente com Multiple Tools

```javascript
const Anthropic = require("@anthropic-ai/sdk");
const axios = require("axios");

class MultiToolAgent {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    this.history = [];
    this.tools = [
      {
        name: "web_search",
        description: "Busca informações na web",
        input: {
          type: "object",
          properties: {
            query: { type: "string", description: "O que buscar" },
          },
          required: ["query"],
        },
      },
      {
        name: "calculate",
        description: "Realiza cálculos",
        input: {
          type: "object",
          properties: {
            expression: {
              type: "string",
              description: "Expressão matemática (ex: 2+2)",
            },
          },
          required: ["expression"],
        },
      },
      {
        name: "get_weather",
        description: "Obtém informação de clima",
        input: {
          type: "object",
          properties: {
            city: { type: "string", description: "Cidade" },
          },
          required: ["city"],
        },
      },
    ];
  }

  async executeTool(toolName, params) {
    console.log(`\n🔧 Usando: ${toolName}(${JSON.stringify(params)})`);

    switch (toolName) {
      case "web_search":
        // Implementar busca real (Google, Bing, etc)
        return `Resultados sobre "${params.query}": [resultado 1, resultado 2...]`;

      case "calculate":
        try {
          const result = eval(params.expression);
          return `${params.expression} = ${result}`;
        } catch (e) {
          return `Erro ao calcular: ${e.message}`;
        }

      case "get_weather":
        // Integrar com API real (Weather API, etc)
        return `Clima em ${params.city}: 22°C, céu nublado`;

      default:
        return "Ferramenta não encontrada";
    }
  }

  async run(userMessage, maxIterations = 5) {
    console.log(`\n👤 Você: ${userMessage}`);

    this.history.push({
      role: "user",
      content: userMessage,
    });

    let iterations = 0;

    while (iterations < maxIterations) {
      iterations++;
      console.log(`\n[Iteração ${iterations}]`);

      const response = await this.client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2048,
        tools: this.tools,
        messages: this.history,
      });

      console.log(`Stop reason: ${response.stop_reason}`);

      // Terminou de pensar
      if (response.stop_reason === "end_turn") {
        const text = response.content
          .filter((block) => block.type === "text")
          .map((block) => block.text)
          .join("");

        console.log(`\n✅ Resposta Final:\n${text}`);
        return text;
      }

      // Quer usar uma ferramenta
      if (response.stop_reason === "tool_use") {
        this.history.push({
          role: "assistant",
          content: response.content,
        });

        const toolResults = [];

        for (const block of response.content) {
          if (block.type === "tool_use") {
            const result = await this.executeTool(block.name, block.input);
            console.log(`📤 Resultado: ${result}`);

            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: result,
            });
          }
        }

        this.history.push({
          role: "user",
          content: toolResults,
        });

        continue;
      }

      // Outros stop reasons
      console.log("❓ Stop reason desconhecido:", response.stop_reason);
      break;
    }

    return "Limite de iterações atingido";
  }
}

// Teste
async function main() {
  const agent = new MultiToolAgent();

  // Teste múltiplos cenários
  await agent.run("Quanto é 155 vezes 823? E qual é o clima em São Paulo?");
}

main().catch(console.error);
```

---

## Estrutura de Pasta Recomendada para Produção

```
seu-agente/
├── src/
│   ├── agent.js          # Classe principal
│   ├── tools.js          # Definição de ferramentas
│   ├── llm.js            # Integração com LLM
│   └── utils.js          # Funções utilitárias
├── examples/
│   ├── basic.js
│   ├── with-tools.js
│   └── web-server.js
├── tests/
│   ├── agent.test.js
│   └── tools.test.js
├── config/
│   └── config.js
├── .env.example
├── package.json
├── README.md
└── docker-compose.yml    # Se usar container
```

---

## Dicas de Debugging

```javascript
// Ativar verbose logging
const enableDEBUG = true;

function debug(label, data) {
  if (enableDEBUG) {
    console.log(`[DEBUG] ${label}:`, JSON.stringify(data, null, 2));
  }
}

// Usar em seu agente:
debug("History", this.conversationHistory);
debug("Tool Input", block.input);
debug("Token Usage", response.usage);
```

---

## Próximos Passos

1. **Adicionar persistência**: Usar MongoDB/PostgreSQL
2. **Melhorar ferramentas**: Integrar APIs reais
3. **Adicionar observabilidade**: Logs, métricas, traces
4. **Optimizar custos**: Cache, batching, smart routing
5. **Deploy**: Docker, Kubernetes, Serverless

