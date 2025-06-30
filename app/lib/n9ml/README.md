# n9ml - Where quantization meets namespaces meets cognition

The n9ml namespace implements a cognitive quantum field that allows tensors to exist in superposition until collapsed by Plan 9-style path mounting. This enables the same underlying data to be interpreted with different architectures and quantization strategies based on cognitive intent.

## Core Concept

All possible model architectures exist in quantum superposition until a namespace path collapses the field to a specific configuration:

```typescript
import { CognitiveQuantumField } from '~/lib/n9ml';

const field = new CognitiveQuantumField();

// Mount creates a tensor optimized for the cognitive intent in the path
const realtimeVision = field.mount('/models/vision/realtime');
// → CNN architecture, 8-bit quantization, speed optimization

const preciseNLP = field.mount('/inference/nlp/precise');  
// → Transformer architecture, 32-bit quantization, accuracy optimization

// The key insight: remount the same data with different cognitive intent
const remountedTensor = field.remount(realtimeVision, '/research/nlp/analysis/high');
// → Same data, but now interpreted as Transformer with 32-bit precision
```

## Path-Based Cognitive Intent

Paths follow Plan 9 conventions and encode cognitive intent:

- `/models/vision/realtime` → Real-time vision processing (CNN, 8-bit, speed)
- `/inference/nlp/precise` → High-precision NLP (Transformer, 32-bit, accuracy)  
- `/streaming/audio/fast` → Fast audio processing (RNN, 8-bit, speed)
- `/research/multimodal/generation` → Complex generation task (Hybrid, 32-bit, accuracy)

## Architecture Selection

The quantum field collapses to specific architectures based on domain and complexity:

- **Vision domain** → CNN architectures
- **NLP domain** → Transformer architectures  
- **Sequence/time domain** → RNN architectures
- **High complexity** → Hybrid architectures

## Quantization Optimization

Quantization is automatically optimized based on cognitive intent:

- **High precision** → 32-bit float, adaptive quantization
- **Medium precision** → 16-bit, dynamic quantization
- **Low precision/realtime** → 8-bit, linear quantization

## API Reference

### CognitiveQuantumField

Main class that manages the quantum field and tensor mounting.

```typescript
const field = new CognitiveQuantumField();

// Mount tensor with path-derived cognitive intent
const tensor = field.mount(path: string): Tensor;

// Remount existing tensor with new cognitive intent  
const newTensor = field.remount(data: Tensor, newPath: string): Tensor;

// Get all mounted tensors
const mounted = field.getMountedTensors(): { [path: string]: Tensor };

// Unmount tensor from path
const success = field.unmount(path: string): boolean;

// Inspect quantum states (for debugging)
const states = field.getQuantumStates(): { [domain: string]: QuantumState[] };
```

### Utility Functions

```typescript
// Parse cognitive intent from path
const intent = parsePath('/models/vision/realtime'): CognitiveIntent;

// Optimize quantization for intent
const quant = optimizeQuantization(intent): QuantizationStrategy;

// Collapse quantum field to specific architecture
const arch = collapseQuantumField(intent, quant): Architecture;
```

## Types

- `CognitiveIntent` - Parsed intent from path (domain, task, precision, realtime, complexity)
- `QuantizationStrategy` - Quantization configuration (bits, method, accuracy preservation)
- `Architecture` - Model architecture (type, layers, parameters, optimization)  
- `Tensor` - Mounted tensor with data, shape, and configuration
- `QuantumState` - Superposition state with architecture, quantization, and probability

## Example Usage

See `app/lib/n9ml/example.ts` for a complete demonstration of the cognitive quantum field in action.

The key insight is that the same data can be interpreted through different cognitive lenses based on the namespace path, enabling efficient model deployment and experimentation without data duplication.