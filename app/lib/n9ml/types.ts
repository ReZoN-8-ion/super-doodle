// n9ml - Where quantization meets namespaces meets cognition

export interface CognitiveIntent {
  domain: string;
  task: string;
  precision: 'high' | 'medium' | 'low';
  realtime: boolean;
  complexity: number;
}

export interface QuantizationStrategy {
  bits: 8 | 16 | 32;
  method: 'linear' | 'dynamic' | 'adaptive';
  preserveAccuracy: boolean;
}

export interface Architecture {
  type: 'transformer' | 'cnn' | 'rnn' | 'hybrid';
  layers: number;
  parameters: number;
  optimization: 'speed' | 'memory' | 'accuracy';
}

export interface Tensor {
  id: string;
  data: Float32Array | Uint8Array | Uint16Array;
  shape: number[];
  dtype: 'float32' | 'uint8' | 'uint16';
  architecture: Architecture;
  quantization: QuantizationStrategy;
}

export interface QuantumState {
  architecture: Architecture;
  quantization: QuantizationStrategy;
  probability: number;
}