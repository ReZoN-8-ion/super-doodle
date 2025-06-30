import type { Tensor, QuantumState, CognitiveIntent, QuantizationStrategy, Architecture } from './types';
import { parsePath, optimizeQuantization, collapseQuantumField } from './utils';

/**
 * CognitiveQuantumField - Where quantization meets namespaces meets cognition
 *
 * All possible architectures exist in superposition until a Plan 9 namespace
 * path collapses the field to a specific tensor configuration.
 */
export class CognitiveQuantumField {
  private quantumStates: { [key: string]: QuantumState[] } = {};
  private mountedTensors: { [key: string]: Tensor } = {};

  constructor() {
    // Initialize with common quantum states in superposition
    this.initializeQuantumStates();
  }

  /**
   * Mount a tensor by collapsing the quantum field based on path intent
   */
  mount(path: string): Tensor {
    // Parse intent from path
    const intent = parsePath(path);

    // Determine optimal quantization for this intent
    const quant = optimizeQuantization(intent);

    // Collapse to specific architecture
    const arch = collapseQuantumField(intent, quant);

    // Create and mount tensor with appropriate precision
    const tensor = this.createTensor(arch, quant, path);
    this.mountedTensors[path] = tensor;

    return tensor;
  }

  /**
   * Remount tensor with different quantization and architecture WITHOUT changing data
   * This is the key insight: same data, different views through path-based reinterpretation
   */
  remount(data: Tensor, newPath: string): Tensor {
    const newIntent = parsePath(newPath);
    const newQuant = optimizeQuantization(newIntent);
    const newArch = collapseQuantumField(newIntent, newQuant);

    // Reinterpret the existing tensor data with new architecture and quantization
    const reinterpretedTensor = this.reinterpretTensor(data, newArch, newQuant, newPath);
    this.mountedTensors[newPath] = reinterpretedTensor;

    return reinterpretedTensor;
  }

  /**
   * Get all mounted tensors
   */
  getMountedTensors(): { [key: string]: Tensor } {
    return { ...this.mountedTensors };
  }

  /**
   * Unmount a tensor from the specified path
   */
  unmount(path: string): boolean {
    if (this.mountedTensors[path]) {
      delete this.mountedTensors[path];
      return true;
    }

    return false;
  }

  /**
   * Get quantum states for visualization/debugging
   */
  getQuantumStates(): { [key: string]: QuantumState[] } {
    return { ...this.quantumStates };
  }

  private initializeQuantumStates(): void {
    // Vision domain states
    this.quantumStates.vision = [
      {
        architecture: { type: 'cnn', layers: 12, parameters: 25000000, optimization: 'speed' },
        quantization: { bits: 8, method: 'linear', preserveAccuracy: false },
        probability: 0.3,
      },
      {
        architecture: { type: 'cnn', layers: 18, parameters: 60000000, optimization: 'accuracy' },
        quantization: { bits: 32, method: 'adaptive', preserveAccuracy: true },
        probability: 0.4,
      },
      {
        architecture: { type: 'hybrid', layers: 24, parameters: 150000000, optimization: 'memory' },
        quantization: { bits: 16, method: 'dynamic', preserveAccuracy: true },
        probability: 0.3,
      },
    ];

    // NLP domain states
    this.quantumStates.nlp = [
      {
        architecture: { type: 'transformer', layers: 12, parameters: 110000000, optimization: 'speed' },
        quantization: { bits: 16, method: 'dynamic', preserveAccuracy: true },
        probability: 0.5,
      },
      {
        architecture: { type: 'transformer', layers: 24, parameters: 340000000, optimization: 'accuracy' },
        quantization: { bits: 32, method: 'adaptive', preserveAccuracy: true },
        probability: 0.3,
      },
      {
        architecture: { type: 'hybrid', layers: 36, parameters: 1300000000, optimization: 'memory' },
        quantization: { bits: 16, method: 'adaptive', preserveAccuracy: true },
        probability: 0.2,
      },
    ];
  }

  private createTensor(architecture: Architecture, quantization: QuantizationStrategy, path: string): Tensor {
    // Determine data type based on quantization
    let dtype: 'float32' | 'uint8' | 'uint16';
    let data: Float32Array | Uint8Array | Uint16Array;

    if (quantization.bits === 32) {
      dtype = 'float32';
      data = new Float32Array(1024); // Example size
    } else if (quantization.bits === 16) {
      dtype = 'uint16';
      data = new Uint16Array(1024);
    } else {
      dtype = 'uint8';
      data = new Uint8Array(1024);
    }

    // Initialize with random data for demonstration
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * (quantization.bits === 32 ? 1 : Math.pow(2, quantization.bits) - 1);
    }

    return {
      id: `tensor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      data,
      shape: [32, 32], // Example shape
      dtype,
      architecture,
      quantization,
    };
  }

  private reinterpretTensor(
    originalTensor: Tensor,
    newArchitecture: Architecture,
    newQuantization: QuantizationStrategy,
    newPath: string,
  ): Tensor {
    // The key insight: reinterpret the same underlying data with different precision/architecture
    let reinterpretedData: Float32Array | Uint8Array | Uint16Array;
    let dtype: 'float32' | 'uint8' | 'uint16';

    // Convert data to new quantization format
    if (newQuantization.bits === 32 && originalTensor.dtype !== 'float32') {
      dtype = 'float32';
      reinterpretedData = new Float32Array(originalTensor.data.length);

      const maxVal = originalTensor.dtype === 'uint16' ? 65535 : 255;

      for (let i = 0; i < originalTensor.data.length; i++) {
        reinterpretedData[i] = originalTensor.data[i] / maxVal;
      }
    } else if (newQuantization.bits === 16 && originalTensor.dtype !== 'uint16') {
      dtype = 'uint16';
      reinterpretedData = new Uint16Array(originalTensor.data.length);

      if (originalTensor.dtype === 'float32') {
        for (let i = 0; i < originalTensor.data.length; i++) {
          reinterpretedData[i] = Math.round((originalTensor.data[i] as number) * 65535);
        }
      } else {
        // uint8 to uint16
        for (let i = 0; i < originalTensor.data.length; i++) {
          reinterpretedData[i] = originalTensor.data[i] * 257; // 65535/255 ≈ 257
        }
      }
    } else if (newQuantization.bits === 8 && originalTensor.dtype !== 'uint8') {
      dtype = 'uint8';
      reinterpretedData = new Uint8Array(originalTensor.data.length);

      if (originalTensor.dtype === 'float32') {
        for (let i = 0; i < originalTensor.data.length; i++) {
          reinterpretedData[i] = Math.round((originalTensor.data[i] as number) * 255);
        }
      } else {
        // uint16 to uint8
        for (let i = 0; i < originalTensor.data.length; i++) {
          reinterpretedData[i] = Math.round(originalTensor.data[i] / 257);
        }
      }
    } else {
      // Same quantization, just copy data
      dtype = originalTensor.dtype;
      reinterpretedData = originalTensor.data.slice() as Float32Array | Uint8Array | Uint16Array;
    }

    return {
      id: `reinterpreted_${originalTensor.id}_${Date.now()}`,
      data: reinterpretedData,
      shape: originalTensor.shape, // Keep same shape
      dtype,
      architecture: newArchitecture,
      quantization: newQuantization,
    };
  }
}
