import { describe, expect, it } from 'vitest';
import { CognitiveQuantumField } from './cognitive-quantum-field';
import { parsePath, optimizeQuantization, collapseQuantumField } from './utils';

describe('n9ml - Cognitive Quantum Field', () => {
  describe('Path parsing', () => {
    it('should parse basic vision realtime path', () => {
      const intent = parsePath('/models/vision/realtime');
      expect(intent.domain).toBe('vision');
      expect(intent.task).toBe('realtime');
      expect(intent.realtime).toBe(true);
      expect(intent.precision).toBe('medium');
      expect(intent.complexity).toBeGreaterThan(0);
    });

    it('should parse NLP precise inference path', () => {
      const intent = parsePath('/inference/nlp/precise');
      expect(intent.domain).toBe('nlp');
      expect(intent.task).toBe('precise');
      expect(intent.precision).toBe('high');
      expect(intent.realtime).toBe(false);
      expect(intent.complexity).toBeGreaterThanOrEqual(8);
    });

    it('should parse fast vision path with low precision', () => {
      const intent = parsePath('/models/vision/fast/low');
      expect(intent.domain).toBe('vision');
      expect(intent.task).toBe('fast');
      expect(intent.precision).toBe('low');
      expect(intent.realtime).toBe(false);
    });

    it('should throw error for invalid path', () => {
      expect(() => parsePath('/invalid')).toThrow('Invalid path: must contain at least domain and task');
    });
  });

  describe('Quantization optimization', () => {
    it('should optimize for high precision', () => {
      const intent = { domain: 'nlp', task: 'precise', precision: 'high' as const, realtime: false, complexity: 9 };
      const quant = optimizeQuantization(intent);
      expect(quant.bits).toBe(32);
      expect(quant.method).toBe('adaptive');
      expect(quant.preserveAccuracy).toBe(true);
    });

    it('should optimize for realtime performance', () => {
      const intent = { domain: 'vision', task: 'realtime', precision: 'medium' as const, realtime: true, complexity: 6 };
      const quant = optimizeQuantization(intent);
      expect(quant.bits).toBe(8);
      expect(quant.method).toBe('linear');
      expect(quant.preserveAccuracy).toBe(false);
    });

    it('should optimize for low precision', () => {
      const intent = { domain: 'audio', task: 'classification', precision: 'low' as const, realtime: false, complexity: 4 };
      const quant = optimizeQuantization(intent);
      expect(quant.bits).toBe(8);
      expect(quant.method).toBe('linear');
      expect(quant.preserveAccuracy).toBe(false);
    });
  });

  describe('Architecture selection', () => {
    it('should select CNN for vision tasks', () => {
      const intent = { domain: 'vision', task: 'classification', precision: 'medium' as const, realtime: false, complexity: 6 };
      const quant = { bits: 16 as const, method: 'dynamic' as const, preserveAccuracy: true };
      const arch = collapseQuantumField(intent, quant);
      expect(arch.type).toBe('cnn');
      expect(arch.layers).toBeGreaterThan(0);
      expect(arch.parameters).toBeGreaterThan(0);
    });

    it('should select RNN for sequence tasks', () => {
      const intent = { domain: 'sequence', task: 'prediction', precision: 'medium' as const, realtime: false, complexity: 5 };
      const quant = { bits: 16 as const, method: 'dynamic' as const, preserveAccuracy: true };
      const arch = collapseQuantumField(intent, quant);
      expect(arch.type).toBe('rnn');
    });

    it('should select hybrid for complex tasks', () => {
      const intent = { domain: 'multimodal', task: 'generation', precision: 'high' as const, realtime: false, complexity: 10 };
      const quant = { bits: 32 as const, method: 'adaptive' as const, preserveAccuracy: true };
      const arch = collapseQuantumField(intent, quant);
      expect(arch.type).toBe('hybrid');
    });

    it('should optimize for speed when realtime', () => {
      const intent = { domain: 'vision', task: 'realtime', precision: 'medium' as const, realtime: true, complexity: 6 };
      const quant = { bits: 8 as const, method: 'linear' as const, preserveAccuracy: false };
      const arch = collapseQuantumField(intent, quant);
      expect(arch.optimization).toBe('speed');
    });
  });

  describe('CognitiveQuantumField', () => {
    it('should mount tensor from path', () => {
      const field = new CognitiveQuantumField();
      const tensor = field.mount('/models/vision/realtime');
      
      expect(tensor.id).toBeDefined();
      expect(tensor.data).toBeDefined();
      expect(tensor.shape).toBeDefined();
      expect(tensor.architecture.type).toBe('cnn');
      expect(tensor.quantization.bits).toBe(8);
      expect(tensor.dtype).toBe('uint8');
    });

    it('should remount tensor with different configuration', () => {
      const field = new CognitiveQuantumField();
      const originalTensor = field.mount('/models/vision/realtime');
      const remountedTensor = field.remount(originalTensor, '/inference/nlp/precise');
      
      expect(remountedTensor.id).not.toBe(originalTensor.id);
      expect(remountedTensor.architecture.type).toBe('transformer');
      expect(remountedTensor.quantization.bits).toBe(32);
      expect(remountedTensor.dtype).toBe('float32');
      expect(remountedTensor.shape).toEqual(originalTensor.shape); // Shape preserved
    });

    it('should maintain mounted tensors registry', () => {
      const field = new CognitiveQuantumField();
      const path1 = '/models/vision/realtime';
      const path2 = '/inference/nlp/precise';
      
      field.mount(path1);
      field.mount(path2);
      
      const mounted = field.getMountedTensors();
      expect(Object.keys(mounted).length).toBe(2);
      expect(mounted[path1]).toBeDefined();
      expect(mounted[path2]).toBeDefined();
    });

    it('should unmount tensors', () => {
      const field = new CognitiveQuantumField();
      const path = '/models/vision/realtime';
      
      field.mount(path);
      expect(field.getMountedTensors()[path]).toBeDefined();
      
      const unmounted = field.unmount(path);
      expect(unmounted).toBe(true);
      expect(field.getMountedTensors()[path]).toBeUndefined();
    });

    it('should handle data type conversion correctly', () => {
      const field = new CognitiveQuantumField();
      
      // Mount with float32 (high precision)
      const highPrecisionTensor = field.mount('/models/nlp/precise');
      expect(highPrecisionTensor.dtype).toBe('float32');
      
      // Remount to low precision
      const lowPrecisionTensor = field.remount(highPrecisionTensor, '/models/vision/fast');
      expect(lowPrecisionTensor.dtype).toBe('uint8');
      expect(lowPrecisionTensor.data.length).toBe(highPrecisionTensor.data.length);
    });

    it('should preserve quantum states for introspection', () => {
      const field = new CognitiveQuantumField();
      const states = field.getQuantumStates();
      
      expect(states['vision']).toBeDefined();
      expect(states['nlp']).toBeDefined();
      
      const visionStates = states['vision'];
      expect(visionStates.length).toBeGreaterThan(0);
      expect(visionStates.every(state => state.probability > 0)).toBe(true);
      expect(visionStates.reduce((sum, state) => sum + state.probability, 0)).toBeCloseTo(1.0, 1);
    });
  });

  describe('Data reinterpretation', () => {
    it('should convert float32 to uint8 correctly', () => {
      const field = new CognitiveQuantumField();
      const floatTensor = field.mount('/models/nlp/precise/high');
      
      // Manually set some known values for testing
      const data = floatTensor.data as Float32Array;
      data[0] = 0.0;
      data[1] = 0.5;
      data[2] = 1.0;
      
      const uint8Tensor = field.remount(floatTensor, '/models/vision/fast');
      const uint8Data = uint8Tensor.data as Uint8Array;
      
      expect(uint8Data[0]).toBe(0);
      expect(uint8Data[1]).toBeCloseTo(128, 0); // 0.5 * 255 ≈ 128
      expect(uint8Data[2]).toBe(255);
    });

    it('should convert uint8 to float32 correctly', () => {
      const field = new CognitiveQuantumField();
      const uint8Tensor = field.mount('/models/vision/fast');
      
      // Manually set some known values for testing
      const data = uint8Tensor.data as Uint8Array;
      data[0] = 0;
      data[1] = 128;
      data[2] = 255;
      
      const floatTensor = field.remount(uint8Tensor, '/models/nlp/precise');
      const floatData = floatTensor.data as Float32Array;
      
      expect(floatData[0]).toBeCloseTo(0.0, 3);
      expect(floatData[1]).toBeCloseTo(0.5, 2);
      expect(floatData[2]).toBeCloseTo(1.0, 3);
    });
  });
});