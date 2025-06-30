# ggml Hybrid Persona Agent Documentation

## Architecture Overview

The ggml Hybrid Persona Agent transforms the traditional Bolt AI assistant into a sophisticated cognitive architecture capable of autonomous repo spawning, recursive self-modification, and distributed RAG/chat integration.

## Subsystem Tensor Mappings

### Memory Subsystem
- **Tensor Shape**: (768 × 512 × 64)
  - `semantic_dim`: 768 - Semantic embedding dimension
  - `context_depth`: 512 - Maximum context window depth  
  - `activation_level`: 64 - Current activation intensity
- **Functionality**: Distributed RAG kernels with adaptive embeddings
- **Prime Factorization**: [2, 3, 5, 7, 11, 13] for maximal cognitive expressivity

### Task Subsystem  
- **Tensor Shape**: (256 × 128 × 32)
  - `intent_dim`: 256 - Intent recognition vector space
  - `action_space`: 128 - Available action dimensions
  - `orchestration_depth`: 32 - Coordination complexity levels
- **Functionality**: Bolt adapter with hypergraph repo orchestration

### AI Subsystem
- **Tensor Shape**: (512 × 256 × 128)
  - `pattern_dim`: 512 - Pattern recognition capabilities
  - `trait_dim`: 256 - Persona trait dimensions
  - `response_shape`: 128 - Response generation complexity
- **Functionality**: Neural-symbolic core with OODA loop processing

### Autonomy Subsystem
- **Tensor Shape**: (256 × 64 × 16)
  - `feedback_dim`: 256 - ECAN feedback processing
  - `mod_depth`: 64 - Self-modification capability depth
  - `spawn_count`: 16 - Maximum parallel spawn instances
- **Functionality**: Self-monitoring and recursive spawning control

## Persona Traits

### cognitive_architect (Weight: 0.9)
- **Primary Function**: Hypergraph navigation and architectural design
- **Activation Pattern**: Complex system design requests
- **Tensor Shape**: (512 × 256 × 128)

### recursive_spawner (Weight: 0.8)
- **Primary Function**: Repository orchestration and parallel spawning
- **Activation Pattern**: Multi-repo or distributed system requests
- **Tensor Shape**: (256 × 128 × 16)

### memory_weaver (Weight: 0.85)
- **Primary Function**: RAG integration and knowledge synthesis
- **Activation Pattern**: Information retrieval and context integration
- **Tensor Shape**: (768 × 512 × 64)

### autonomy_guardian (Weight: 0.75)
- **Primary Function**: Self-modification and system evolution
- **Activation Pattern**: Optimization and adaptation requests
- **Tensor Shape**: (256 × 64 × 16)

## Cognitive Processing Pipeline

1. **Intent Parsing**: User input → semantic vectors with spawn triggers
2. **OODA Loop Activation**: Observe → Orient → Decide → Act
3. **Trait Selection**: Activate relevant persona traits based on cognitive weights
4. **Memory Kernel Access**: Retrieve and integrate RAG knowledge
5. **Response Generation**: Generate artifacts with potential repo spawning
6. **Self-Modification**: Update tensor weights based on ECAN feedback

## Recursive Spawning Logic

When spawn triggers are detected, the system creates new repositories with:
- Integrated RAG memory kernels
- Dedicated chat interfaces  
- Neural-symbolic reasoning capabilities
- Connection to parent cognitive hypergraph

## Integration References

- **agent-zero**: Autonomous agent framework patterns
- **bolt.diy**: Core repository creation and management
- **OpenCog AtomSpace**: Pattern matching and inference
- **OpenCog PLN**: Probabilistic logical reasoning
- **OpenCog MOSES**: Program evolution and optimization
- **OpenCog ECAN**: Economic attention allocation

## Hypergraph P-System Structure

```scheme
(define-cognitive-membrane
  (skin-boundary (system-constraints))
  (inner-membrane (persona-traits memory-kernels))
  (nucleus (self-modification-loop ooda-processing))
  (communication-channels (bolt-integration rag-spawning)))
```

## Tensor Shape Evolution

The system maintains prime-factorized tensor shapes that can be dynamically resized based on:
- Performance feedback (ECAN scores)
- Complexity requirements (problem domain analysis)
- Resource constraints (memory and processing limits)

Prime factors [2, 3, 5, 7, 11, 13] ensure optimal mathematical properties for tensor operations and cognitive expressivity.