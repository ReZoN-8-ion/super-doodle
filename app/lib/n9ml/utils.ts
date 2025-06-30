import type { CognitiveIntent, QuantizationStrategy, Architecture } from './types';

/**
 * Parse cognitive intent from a Plan 9-style path
 * Examples:
 * - /models/vision/realtime -> { domain: 'vision', task: 'realtime', precision: 'medium', realtime: true, complexity: 7 }
 * - /inference/nlp/precise -> { domain: 'nlp', task: 'precise', precision: 'high', realtime: false, complexity: 9 }
 */
export function parsePath(path: string): CognitiveIntent {
  const parts = path.split('/').filter(Boolean);
  
  if (parts.length < 2) {
    throw new Error('Invalid path: must contain at least domain and task');
  }

  // Handle different path patterns:
  // Pattern 1: /models/vision/realtime -> domain='vision', task='realtime'
  // Pattern 2: /inference/nlp/precise -> domain='nlp', task='precise'
  let domain: string, task: string, modifiers: string[];
  
  if (parts.length >= 3 && (parts[0] === 'models' || parts[0] === 'inference')) {
    // Skip namespace prefix and use second part as domain
    [, domain, task, ...modifiers] = parts;
  } else {
    // Direct domain/task format
    [domain, task, ...modifiers] = parts;
  }
  
  // Determine precision from task name and modifiers
  let precision: 'high' | 'medium' | 'low' = 'medium';
  if (task.indexOf('precise') !== -1 || modifiers.indexOf('precise') !== -1 || modifiers.indexOf('high') !== -1) {
    precision = 'high';
  } else if (task.indexOf('fast') !== -1 || modifiers.indexOf('fast') !== -1 || modifiers.indexOf('low') !== -1) {
    precision = 'low';
  }

  // Determine if realtime is required
  const realtime = task.indexOf('realtime') !== -1 || modifiers.indexOf('realtime') !== -1 || task.indexOf('live') !== -1;

  // Calculate complexity based on domain and task
  let complexity = 5; // base complexity
  if (domain === 'vision') complexity += 2;
  if (domain === 'nlp') complexity += 3;
  if (task.indexOf('generation') !== -1) complexity += 2;
  if (precision === 'high') complexity += 2;
  if (realtime) complexity -= 1; // realtime often means simpler models

  return {
    domain,
    task,
    precision,
    realtime,
    complexity: Math.max(1, Math.min(10, complexity))
  };
}

/**
 * Optimize quantization strategy based on cognitive intent
 */
export function optimizeQuantization(intent: CognitiveIntent): QuantizationStrategy {
  let bits: 8 | 16 | 32 = 16; // default
  let method: 'linear' | 'dynamic' | 'adaptive' = 'dynamic';
  let preserveAccuracy = true;

  // Choose bits based on precision requirements
  if (intent.precision === 'high') {
    bits = 32;
    method = 'adaptive';
  } else if (intent.precision === 'low' || intent.realtime) {
    bits = 8;
    method = 'linear';
    preserveAccuracy = false;
  }

  // Adjust for specific domains
  if (intent.domain === 'vision' && intent.realtime) {
    bits = 8;
    method = 'linear';
  }

  return { bits, method, preserveAccuracy };
}

/**
 * Collapse quantum field to specific architecture based on intent and quantization
 */
export function collapseQuantumField(intent: CognitiveIntent, quant: QuantizationStrategy): Architecture {
  let type: 'transformer' | 'cnn' | 'rnn' | 'hybrid' = 'transformer';
  let optimization: 'speed' | 'memory' | 'accuracy' = 'accuracy';

  // Choose architecture type based on domain
  if (intent.domain === 'vision') {
    type = 'cnn';
  } else if (intent.domain === 'sequence' || intent.task.indexOf('time') !== -1) {
    type = 'rnn';
  } else if (intent.domain === 'nlp') {
    type = 'transformer';
  } else if (intent.complexity > 7 && intent.domain === 'multimodal') {
    type = 'hybrid';
  }

  // Choose optimization based on intent and quantization
  if (intent.realtime || quant.bits === 8) {
    optimization = 'speed';
  } else if (quant.bits === 16) {
    optimization = 'memory';
  }

  // Calculate layers and parameters based on complexity
  const layers = Math.max(2, Math.floor(intent.complexity * 1.5));
  const parameters = Math.floor(Math.pow(2, intent.complexity + 10)); // 2^(complexity+10)

  return {
    type,
    layers,
    parameters,
    optimization
  };
}