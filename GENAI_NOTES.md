# LLMs, LangChain, Tool Calling & Model Context Protocol (MCP)

### A Deep-Dive Engineering Tutorial: Low-Level API Calling, State Management, LCEL, Function Calling, and MCP Standards

---

## 1. LLM Mechanics: Autoregressive Sampling

Large Language Models (LLMs) are decoder-based autoregressive probabilistic models. At each step $t$, the model takes a sequence of prior tokens $(w_1, \dots, w_{t-1})$ and projects hidden states through an unembedding matrix to produce unnormalized logits $\mathbf{z}_t \in \mathbb{R}^{|V|}$ over a vocabulary $V$.

### The Softmax Sampling Formula

$$P(w_t \mid w_{1:t-1}) = \operatorname{softmax}\left(\frac{\mathbf{z}_t}{T}\right) = \frac{\exp(z_{t,i} / T)}{\sum_j \exp(z_{t,j} / T)}$$

- **Temperature ($T$):** Scales logit magnitude. As $T \to 0$, the probability collapses onto the maximum logit (greedy argmax). As $T$ increases, probabilities flatten, introducing diversity.
- **Top-$P$ (Nucleus Sampling):** Samples only from the smallest subset of tokens whose cumulative probability exceeds $P$ (typically $0.90$ - $0.95$).
- **Top-$K$:** Restricts the candidate pool to the top $K$ most likely tokens.

---

## 2. Direct Python API Invocations: Google Gemini & Groq

### 2.1 Google Gemini API (`google-genai` SDK)

```python
import os
from google import genai
from google.genai import types

# Initialize client using GEMINI_API_KEY
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

# Standard Generation with System Instruction
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain gradient checkpointing in deep learning.",
    config=types.GenerateContentConfig(
        system_instruction="You are a senior deep learning systems engineer.",
        temperature=0.2,
        max_output_tokens=512,
    ),
)
print("Response:\n", response.text)

# Streaming Generation
response_stream = client.models.generate_content_stream(
    model="gemini-2.5-flash",
    contents="List three primary benefits of LoRA fine-tuning.",
)
for chunk in response_stream:
    if chunk.text:
        print(chunk.text, end="", flush=True)
print()
```

### 2.2 Groq API (High-Throughput LPUs)

```python
import os
from groq import Groq

# Initialize client using GROQ_API_KEY
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# Ultra-Low Latency Streaming on Llama 3.3
stream = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": "You are a compiler engineer."},
        {"role": "user", "content": "Explain how static single-assignment (SSA) form works."}
    ],
    temperature=0.3,
    max_tokens=512,
    stream=True,
)

for chunk in stream:
    token = chunk.choices[0].delta.content
    if token:
        print(token, end="", flush=True)
print()
```

---

## 3. Role Assignment & Multi-Turn Conversation History

### The 3 Core Roles

| Role | Meaning | Function |
|---|---|---|
| `system` | Behavioral Constitution | Pinned prompt dictating persona, output rules, and safety bounds |
| `user` | External Operator | Human query or external runtime data payload |
| `assistant` | Model Response | Historical generation emitted by the model |

### Context Window Maintenance Pattern

LLMs are stateless functions. The client must maintain a sliding buffer of previous turns:

```python
from groq import Groq

class ConversationalAgent:
    def __init__(self, system_prompt: str, model: str = "llama-3.3-70b-versatile", max_turns: int = 6):
        self.client = Groq()
        self.model = model
        self.max_turns = max_turns
        self.system_prompt = system_prompt
        self.history = [{"role": "system", "content": self.system_prompt}]

    def chat(self, user_message: str) -> str:
        # Append User Input
        self.history.append({"role": "user", "content": user_message})

        # Sliding Window Truncation (Preserve system prompt at index 0)
        if len(self.history) > (self.max_turns * 2 + 1):
            self.history = [self.history[0]] + self.history[-(self.max_turns * 2):]

        response = self.client.chat.completions.create(
            model=self.model,
            messages=self.history,
            temperature=0.3,
        )

        reply = response.choices[0].message.content
        self.history.append({"role": "assistant", "content": reply})
        return reply
```

---

## 4. LangChain & LCEL (LangChain Expression Language)

LCEL composes modular components into uniform `Runnable` execution pipelines using the pipe (`|`) operator:

$$\text{Input Dict} \longrightarrow \text{ChatPromptTemplate} \longrightarrow \text{ChatModel} \longrightarrow \text{OutputParser}$$

```python
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field

class AnomalyReport(BaseModel):
    is_anomaly: bool = Field(description="Whether the server telemetry indicates an outage")
    root_cause: str = Field(description="Primary suspect subsystem")
    action_item: str = Field(description="Immediate mitigation command to execute")

parser = PydanticOutputParser(pydantic_object=AnomalyReport)

prompt = ChatPromptTemplate.from_messages([
    ("system", "Analyze system telemetry. Format output according to instructions:\n{format_instructions}"),
    ("human", "Telemetry data: {telemetry}")
])

model = ChatGroq(model_name="llama-3.3-70b-versatile", temperature=0.0)

# The LCEL Pipe Chain
chain = prompt | model | parser

result = chain.invoke({
    "telemetry": "CPU 99%, OOMKilled worker-4, 502 Gateway on /api/v2",
    "format_instructions": parser.get_format_instructions()
})

print(result)
```

---

## 5. Tool Calling Protocol: The 4-Step Handshake

1. **Step 1 (Client $\to$ Model):** Client sends user query + JSON schemas of registered tools.
2. **Step 2 (Model $\to$ Client):** Model detects need for tools and emits `tool_calls` payload (`{name: "run_sql", args: {...}}`) with `stop_reason="tool_calls"`. The model halts execution.
3. **Step 3 (Client Execution):** Client application parses the function name and invokes the local Python code.
4. **Step 4 (Client $\to$ Model):** Client injects a `ToolMessage` with the function output back into the conversation, enabling the LLM to synthesize the final natural language answer.

```python
from langchain_core.tools import tool
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, ToolMessage

@tool
def calculate_compound_interest(principal: float, rate_annual: float, years: int) -> float:
    """Calculate compound interest future value given principal, annual rate (0-1), and years."""
    return round(principal * ((1 + rate_annual) ** years), 2)

tools = [calculate_compound_interest]
tools_by_name = {t.name: t for t in tools}

llm = ChatGroq(model_name="llama-3.3-70b-versatile", temperature=0.0)
llm_with_tools = llm.bind_tools(tools)

# User Query
messages = [HumanMessage(content="What will $10,000 grow to at 8% annual return over 10 years?")]
ai_response = llm_with_tools.invoke(messages)
messages.append(ai_response)

if ai_response.tool_calls:
    for call in ai_response.tool_calls:
        tool_fn = tools_by_name[call["name"]]
        output = tool_fn.invoke(call["args"])
        messages.append(ToolMessage(content=str(output), tool_call_id=call["id"]))

    final_answer = llm_with_tools.invoke(messages)
    print("Final Result:\n", final_answer.content)
```

---

## 6. Model Context Protocol (MCP)

**Model Context Protocol (MCP)** is an open specification establishing a standardized JSON-RPC 2.0 communication bus between AI agent clients and capability servers.

### FastMCP Server (`enterprise_mcp_server.py`)

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Database-Server")

@mcp.resource("schema://users")
def get_user_schema() -> str:
    """Provides the read-only database schema."""
    return "CREATE TABLE users (id INT, email TEXT, active BOOLEAN);"

@mcp.tool()
def check_user_active(user_id: int) -> dict:
    """Checks whether an enterprise user ID is currently active."""
    return {"user_id": user_id, "active": True}

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

### FastMCP Client (`mcp_client_agent.py`)

```python
import asyncio
import json
import os
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from groq import Groq

async def main():
    params = StdioServerParameters(command="python3", args=["enterprise_mcp_server.py"], env=os.environ.copy())
    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tool_list = await session.list_tools()

            groq_tools = [
                {"type": "function", "function": {"name": t.name, "description": t.description, "parameters": t.inputSchema}}
                for t in tool_list.tools
            ]

            groq = Groq()
            resp = groq.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": "Is user ID 402 active?"}],
                tools=groq_tools,
            )

            msg = resp.choices[0].message
            if msg.tool_calls:
                call = msg.tool_calls[0]
                tool_res = await session.call_tool(call.function.name, arguments=json.loads(call.function.arguments))
                print("MCP Server Output:", tool_res.content[0].text)

if __name__ == "__main__":
    asyncio.run(main())
```

---

## 7. Architectural Decision Matrix

| Strategy | Advantages | Primary Limitations | Best For |
|---|---|---|---|
| **Direct SDK (Gemini / Groq)** | Zero abstraction latency; minimal memory; direct streaming control | Vendor lock-in; manual history management | High-throughput microservices, edge devices |
| **LangChain LCEL** | Modular swapping; Pydantic validation; async batching | Dependency footprint; debugging complexity | Enterprise RAG, structured ETL agents |
| **Model Context Protocol (MCP)** | Open standard; universal server reuse; security isolation | Subprocess/SSE management overhead | Multi-agent ecosystems, IDE tools, enterprise data platforms |
