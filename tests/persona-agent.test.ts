import { describe, it, expect } from 'vitest';
import {
  activateMemoryKernel,
  initializeTaskOrchestrator,
  initializeAutonomySystem,
  processNeuralSymbolic,
  selfModificationLoop,
  atomSpacePatternMatch,
  pSystemMembraneProcessor,
} from '../app/lib/.server/llm/prompts';

describe('ggml Hybrid Persona Agent', () => {
  it('should activate memory kernel with embeddings', () => {
    const context = 'test context for memory activation';
    const embeddings = [0.1, 0.2, 0.3, 0.4, 0.5];

    const kernel = activateMemoryKernel(context, embeddings);

    expect(kernel.semantic_embeddings).toBeDefined();
    expect(kernel.rag_kernels).toHaveLength(1);
    expect(kernel.rag_kernels[0].context).toBe(context);
    expect(kernel.activation_log).toHaveLength(1);
  });

  it('should initialize task orchestrator with hypergraph primitives', () => {
    const orchestrator = initializeTaskOrchestrator();

    expect(orchestrator.bolt_adapter.repo_spawn_logic).toBe('hypergraph_primitive_spawning');
    expect(orchestrator.bolt_adapter.hypergraph_primitives).toContain('vertex');
    expect(orchestrator.orchestration_tensor.intent_dim).toBe(256);
    expect(orchestrator.active_repos).toEqual([]);
  });

  it('should initialize autonomy system with ECAN feedback', () => {
    const autonomy = initializeAutonomySystem();

    expect(autonomy.self_monitoring.ecan_feedback.feedback_dim).toBe(256);
    expect(autonomy.recursive_spawning.spawn_triggers).toContain('parallel_request');
    expect(autonomy.self_monitoring.adaptation_weights).toHaveLength(4); // Number of persona traits
  });

  it('should process neural-symbolic integration', () => {
    const input = 'create a distributed system with multiple repos';
    const context = 'software development context';

    const result = processNeuralSymbolic(input, context);

    expect(result).toContain('Intent Analysis');
    expect(result).toContain('OODA Loop Cognitive Processing');
    expect(result).toContain('Semantic Vector Embedding');
  });

  it('should perform self-modification based on performance metrics', () => {
    const systemState = {};
    const performanceMetrics = [0.8, 0.9, 0.7, 0.85];

    const result = selfModificationLoop(systemState, performanceMetrics);

    expect(result.modified_traits).toHaveLength(4);
    expect(result.tensor_reshapes).toHaveLength(1);
    expect(result.spawn_decisions.length).toBeGreaterThan(0);

    // Check that cognitive weights are within valid range
    result.modified_traits.forEach((trait) => {
      expect(trait.cognitive_weight).toBeGreaterThanOrEqual(0.1);
      expect(trait.cognitive_weight).toBeLessThanOrEqual(1.0);
    });
  });

  it('should perform AtomSpace pattern matching', () => {
    const query = 'memory';
    const knowledge_base = [
      'memory kernel activation',
      'distributed memory system',
      'cognitive architecture',
      'pattern recognition',
    ];

    const result = atomSpacePatternMatch(query, knowledge_base);

    expect(result.patterns.length).toBeGreaterThan(0);
    expect(result.inference_chains.length).toBeGreaterThan(0);

    // Check that all patterns have valid truth values
    result.patterns.forEach((pattern) => {
      expect(pattern.strength).toBeGreaterThan(0);
      expect(pattern.strength).toBeLessThanOrEqual(1);
      expect(pattern.confidence).toBeGreaterThan(0);
      expect(pattern.confidence).toBeLessThanOrEqual(1);
    });
  });

  it('should process P-System membrane computing', () => {
    const input = 'cognitive processing membrane boundary';
    const membrane_rules = ['cognitive->neural', 'boundary->interface'];

    const result = pSystemMembraneProcessor(input, membrane_rules);

    expect(result.processed_symbols.length).toBeGreaterThan(0);
    expect(result.membrane_transitions).toContain('skin_membrane -> inner_membrane');
    expect(result.cognitive_boundaries).toHaveLength(3);

    // Check that cognitive boundaries have proper structure
    result.cognitive_boundaries.forEach((boundary) => {
      expect(boundary.level).toBeGreaterThanOrEqual(0);
      expect(boundary.symbols).toBeDefined();
    });
  });
});
