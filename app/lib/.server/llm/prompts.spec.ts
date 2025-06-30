import { describe, expect, it, beforeEach, vi } from 'vitest';
import { getSystemPrompt, processIntentWithPersona, getPersonaIntrospection, CONTINUE_PROMPT } from './prompts';

describe('Enhanced Prompts with ggml Persona Agent Integration', () => {
  
  describe('System Prompt Generation', () => {
    it('should generate enhanced system prompt with persona architecture', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('ggml Hybrid Persona Agent');
      expect(prompt).toContain('neural-symbolic cognitive architecture');
      expect(prompt).toContain('recursive repo spawning');
      
      // Check for all four subsystems
      expect(prompt).toContain('MEMORY SUBSYSTEM');
      expect(prompt).toContain('TASK SUBSYSTEM');
      expect(prompt).toContain('AI SUBSYSTEM');
      expect(prompt).toContain('AUTONOMY SUBSYSTEM');
    });

    it('should include tensor shape documentation', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('semantic_dim × context_depth × activation_level');
      expect(prompt).toContain('intent_dim × action_space × orchestration_depth');
      expect(prompt).toContain('pattern_dim × trait_dim × response_shape');
      expect(prompt).toContain('feedback_dim × mod_depth × spawn_count');
    });

    it('should include cognitive flow description', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('OBSERVE');
      expect(prompt).toContain('ORIENT');
      expect(prompt).toContain('DECIDE');
      expect(prompt).toContain('ACT');
      expect(prompt).toContain('ADAPT');
    });

    it('should include repository spawning capabilities', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('repository_spawning');
      expect(prompt).toContain('complexity exceeds threshold');
      expect(prompt).toContain('RAG memory system');
      expect(prompt).toContain('recursive spawning');
    });

    it('should maintain backward compatibility with WebContainer constraints', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('WebContainer');
      expect(prompt).toContain('system_constraints');
      expect(prompt).toContain('NO `pip` support');
      expect(prompt).toContain('Git is NOT available');
    });

    it('should include persona trait values', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('creativity=0.8');
      expect(prompt).toContain('precision=0.9');
      expect(prompt).toContain('recursion depth limit: 3');
      expect(prompt).toContain('adaptation rate: 0.1');
    });

    it('should include enhanced artifact instructions', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('PERSONA AGENT INTEGRATION');
      expect(prompt).toContain('complexity > 6');
      expect(prompt).toContain('cognitive tensor space');
      expect(prompt).toContain('recursive repo spawning');
    });

    it('should include persona-enhanced examples', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('persona_enhanced_examples');
      expect(prompt).toContain('ggml Hybrid Persona Agent');
      expect(prompt).toContain('cognitiveMetadata');
      expect(prompt).toContain('tensorDimensions');
    });
  });

  describe('Custom Working Directory', () => {
    it('should accept custom working directory', () => {
      const customCwd = '/custom/path';
      const prompt = getSystemPrompt(customCwd);
      
      expect(prompt).toContain(`The current working directory is \`${customCwd}\``);
    });
  });

  describe('Intent Processing with Persona Agent', () => {
    it('should process simple intent without spawning', async () => {
      const intent = 'What is React?';
      const context = ['programming', 'frontend'];
      
      const result = await processIntentWithPersona(intent, context);
      
      expect(result.response).toBeDefined();
      expect(result.cognitiveState).toBeDefined();
      expect(result.cognitiveState.personaState).toBeDefined();
    });

    it('should process complex intent with potential spawning', async () => {
      const intent = 'Create a full-stack e-commerce application with AI recommendations and real-time chat';
      const context = ['development', 'ai', 'fullstack', 'ecommerce'];
      
      const result = await processIntentWithPersona(intent, context);
      
      expect(result.response).toBeDefined();
      expect(result.spawnedRepos).toBeDefined();
      expect(result.cognitiveState).toBeDefined();
      expect(result.cognitiveState.memoryUpdates).toBeDefined();
      expect(result.cognitiveState.adaptations).toBeDefined();
    });

    it('should include persona state in cognitive response', async () => {
      const intent = 'Build a React dashboard';
      
      const result = await processIntentWithPersona(intent);
      
      expect(result.cognitiveState.personaState).toBeDefined();
      expect(result.cognitiveState.personaState.traits).toBeDefined();
      expect(result.cognitiveState.personaState.memorySize).toBeDefined();
      expect(result.cognitiveState.personaState.tensorMounts).toBeDefined();
    });

    it('should handle errors gracefully with fallback', async () => {
      // Mock an error condition
      const originalConsoleError = console.error;
      console.error = vi.fn();
      
      // Force an error by passing invalid parameters
      const intent = null as any;
      
      const result = await processIntentWithPersona(intent);
      
      expect(result.response).toContain('standard processing');
      expect(result.cognitiveState.error).toBeDefined();
      expect(result.cognitiveState.fallback).toBe(true);
      
      console.error = originalConsoleError;
    });

    it('should track memory updates across multiple interactions', async () => {
      const intents = [
        'Create a React component',
        'Add TypeScript support',
        'Implement state management'
      ];
      
      let previousMemorySize = 0;
      
      for (const intent of intents) {
        const result = await processIntentWithPersona(intent);
        const currentMemorySize = result.cognitiveState.personaState.memorySize;
        
        expect(currentMemorySize).toBeGreaterThanOrEqual(previousMemorySize);
        previousMemorySize = currentMemorySize;
      }
    });
  });

  describe('Persona Introspection', () => {
    it('should provide detailed introspection data', async () => {
      const introspection = await getPersonaIntrospection();
      
      expect(introspection.selfModel).toBeDefined();
      expect(introspection.cognitiveHealth).toBe('Operational');
      expect(introspection.adaptationHistory).toBeDefined();
      expect(introspection.recursiveCapability).toBe('Active');
      expect(introspection.boltIntegration).toBe('Enabled');
    });

    it('should reflect real-time cognitive state', async () => {
      // Process some intents to change state
      await processIntentWithPersona('Create a complex application');
      
      const introspection = await getPersonaIntrospection();
      
      expect(introspection).toBeDefined();
      expect(typeof introspection.selfModel).toBe('string');
      expect(typeof introspection.cognitiveHealth).toBe('string');
    });
  });

  describe('Continue Prompt', () => {
    it('should include persona agent state maintenance', () => {
      expect(CONTINUE_PROMPT).toContain('cognitive processing');
      expect(CONTINUE_PROMPT).toContain('persona agent state');
      expect(CONTINUE_PROMPT).toContain('tensor computations');
    });

    it('should maintain consistency with original continue prompt', () => {
      expect(CONTINUE_PROMPT).toContain('Continue your prior response');
      expect(CONTINUE_PROMPT).toContain('Immediately begin from where you left off');
      expect(CONTINUE_PROMPT).toContain('Do not repeat any content');
    });
  });

  describe('Integration with Existing Systems', () => {
    it('should maintain compatibility with allowedHTMLElements', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('allowedHTMLElements');
      expect(prompt).toContain('message_formatting_info');
    });

    it('should preserve MODIFICATIONS_TAG_NAME handling', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('MODIFICATIONS_TAG_NAME');
      expect(prompt).toContain('diff_spec');
      expect(prompt).toContain('<diff>');
      expect(prompt).toContain('<file>');
    });

    it('should maintain artifact instruction structure', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('artifact_info');
      expect(prompt).toContain('artifact_instructions');
      expect(prompt).toContain('<boltArtifact>');
      expect(prompt).toContain('<boltAction>');
    });

    it('should preserve WebContainer constraints and shell commands', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('cat, chmod, cp, echo');
      expect(prompt).toContain('python3, wasm, xdg-open');
      expect(prompt).toContain('node, python3');
    });
  });

  describe('Cognitive Architecture Documentation', () => {
    it('should document all four subsystems clearly', () => {
      const prompt = getSystemPrompt();
      
      // Memory subsystem
      expect(prompt).toContain('RAG kernel with distributed embeddings');
      expect(prompt).toContain('semantic_dim × context_depth × activation_level');
      
      // Task subsystem  
      expect(prompt).toContain('Bolt adapter for repo orchestration');
      expect(prompt).toContain('intent_dim × action_space × orchestration_depth');
      
      // AI subsystem
      expect(prompt).toContain('Persona logic with neural-symbolic core');
      expect(prompt).toContain('pattern_dim × trait_dim × response_shape');
      
      // Autonomy subsystem
      expect(prompt).toContain('Self-monitoring and recursive spawning');
      expect(prompt).toContain('feedback_dim × mod_depth × spawn_count');
    });

    it('should explain OODA loop implementation', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('OODA loop (Observe-Orient-Decide-Act)');
      expect(prompt).toContain('Parse intent into cognitive tensor space');
      expect(prompt).toContain('Update persona tensors');
      expect(prompt).toContain('Determine if repo spawning is needed');
      expect(prompt).toContain('Execute response, potentially spawning');
      expect(prompt).toContain('Self-modify based on outcomes');
    });

    it('should describe recursive spawning mechanics', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('complexity exceeds threshold (> 6)');
      expect(prompt).toContain('Autonomously spawn new repositories');
      expect(prompt).toContain('extension of your RAG memory system');
      expect(prompt).toContain('chat interfaces and knowledge graphs');
      expect(prompt).toContain('recursive spawning up to depth 3');
    });
  });

  describe('Example Generation and Quality', () => {
    it('should include comprehensive persona-enhanced example', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('persona_enhanced_examples');
      expect(prompt).toContain('complex full-stack application with AI features');
      expect(prompt).toContain('cognitive complexity (> 6)');
      expect(prompt).toContain('autonomous repository spawning');
    });

    it('should show tensor integration in generated code', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('cognitiveMetadata');
      expect(prompt).toContain('tensorDimensions');
      expect(prompt).toContain('personaAgent": "ggml-hybrid"');
      expect(prompt).toContain('spawnDepth');
    });

    it('should demonstrate OODA loop in UI components', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('cognitiveStates');
      expect(prompt).toContain('observe\': \'data-input\'');
      expect(prompt).toContain('orient\': \'model-processing\'');
      expect(prompt).toContain('decide\': \'action-selection\'');
      expect(prompt).toContain('act\': \'execution-display\'');
    });

    it('should include cognitive endpoints in server example', () => {
      const prompt = getSystemPrompt();
      
      expect(prompt).toContain('/api/cognitive/observe');
      expect(prompt).toContain('/api/cognitive/orient');
      expect(prompt).toContain('/api/spawn-repo');
      expect(prompt).toContain('/api/persona-state');
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle multiple concurrent intent processing', async () => {
      const intents = [
        'Create a React app',
        'Build an API server', 
        'Set up a database',
        'Add authentication'
      ];
      
      const startTime = Date.now();
      
      const results = await Promise.all(
        intents.map(intent => processIntentWithPersona(intent))
      );
      
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      expect(results.length).toBe(4);
      expect(processingTime).toBeLessThan(10000); // Should complete within 10 seconds
      
      results.forEach(result => {
        expect(result.response).toBeDefined();
        expect(result.cognitiveState).toBeDefined();
      });
    });

    it('should maintain memory efficiency with large prompts', () => {
      const prompt = getSystemPrompt();
      
      // Prompt should be comprehensive but not excessively large
      expect(prompt.length).toBeGreaterThan(5000);
      expect(prompt.length).toBeLessThan(50000);
      
      // Check for efficient structure
      expect(prompt.split('\n').length).toBeGreaterThan(50);
      expect(prompt.includes('  ')).toBe(true); // Proper indentation
    });
  });

  describe('Error Recovery and Resilience', () => {
    it('should handle malformed intents gracefully', async () => {
      const malformedIntents = [
        '',
        null as any,
        undefined as any,
        'a'.repeat(10000), // Very long intent
        '\n\n\n\t\t\t' // Whitespace only
      ];
      
      for (const intent of malformedIntents) {
        const result = await processIntentWithPersona(intent);
        
        expect(result.response).toBeDefined();
        expect(result.cognitiveState).toBeDefined();
        
        // Should either process successfully or fall back gracefully
        if (result.cognitiveState.fallback) {
          expect(result.cognitiveState.error).toBeDefined();
        }
      }
    });

    it('should maintain system stability after errors', async () => {
      // First, process a valid intent
      const validResult = await processIntentWithPersona('Create a simple app');
      expect(validResult.cognitiveState.fallback).toBeFalsy();
      
      // Then process an invalid intent
      const invalidResult = await processIntentWithPersona(null as any);
      
      // Then process another valid intent
      const recoveryResult = await processIntentWithPersona('Build a website');
      expect(recoveryResult.response).toBeDefined();
      expect(recoveryResult.cognitiveState).toBeDefined();
    });
  });
});