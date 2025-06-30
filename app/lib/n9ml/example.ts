/**
 * Example usage of the n9ml Cognitive Quantum Field
 * 
 * This demonstrates how to use the n9ml namespace to mount and remount
 * tensors with different architectures and quantizations based on cognitive intent.
 */

import { CognitiveQuantumField } from './cognitive-quantum-field';
import { parsePath, optimizeQuantization, collapseQuantumField } from './utils';

export function demonstrateN9ml() {
  console.log('🧠 n9ml - Where quantization meets namespaces meets cognition');
  
  // Create a cognitive quantum field
  const field = new CognitiveQuantumField();
  
  // Mount tensors using Plan 9-style paths
  console.log('\n📡 Mounting tensors:');
  
  // Vision processing for real-time applications
  const realtimeVision = field.mount('/models/vision/realtime');
  console.log(`  Vision (realtime): ${realtimeVision.architecture.type}, ${realtimeVision.quantization.bits}bit`);
  
  // NLP for high-precision inference
  const preciseNLP = field.mount('/inference/nlp/precise');
  console.log(`  NLP (precise): ${preciseNLP.architecture.type}, ${preciseNLP.quantization.bits}bit`);
  
  // Fast audio processing
  const fastAudio = field.mount('/streaming/audio/fast');
  console.log(`  Audio (fast): ${fastAudio.architecture.type}, ${fastAudio.quantization.bits}bit`);
  
  // The key insight: remount the same data with different cognitive intent
  console.log('\n🔄 Remounting (same data, different views):');
  
  // Take the realtime vision tensor and remount it for precise NLP
  const remountedTensor = field.remount(realtimeVision, '/research/nlp/analysis/high');
  console.log(`  Vision→NLP: ${realtimeVision.architecture.type}(${realtimeVision.quantization.bits}bit) → ${remountedTensor.architecture.type}(${remountedTensor.quantization.bits}bit)`);
  
  // Demonstrate path-based cognitive intent parsing
  console.log('\n🧭 Cognitive Intent Parsing:');
  const examples = [
    '/models/vision/realtime',
    '/inference/nlp/precise/high',
    '/streaming/audio/fast/low',
    '/research/multimodal/generation'
  ];
  
  examples.forEach(path => {
    const intent = parsePath(path);
    const quant = optimizeQuantization(intent);
    const arch = collapseQuantumField(intent, quant);
    console.log(`  ${path}`);
    console.log(`    Intent: ${intent.domain}/${intent.task} (${intent.precision}, realtime: ${intent.realtime})`);
    console.log(`    Result: ${arch.type} with ${quant.bits}bit ${quant.method} quantization`);
  });
  
  return {
    field,
    examples: {
      realtimeVision,
      preciseNLP,
      fastAudio,
      remountedTensor
    }
  };
}

// Export for use in other parts of the application
export { CognitiveQuantumField, parsePath, optimizeQuantization, collapseQuantumField };