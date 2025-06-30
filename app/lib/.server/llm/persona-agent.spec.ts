import { describe, expect, it, beforeEach, vi } from 'vitest';
import { GGMLPersonaAgent, type PersonaTraits, type RepoSpawnRequest } from './persona-agent';

describe('ggml Hybrid Persona Agent', () => {
  let personaAgent: GGMLPersonaAgent;
  let mockTraits: PersonaTraits;

  beforeEach(() => {
    mockTraits = {
      creativity: 0.8,
      precision: 0.9,
      recursionDepth: 3,
      adaptationRate: 0.1,
      boltIntegration: true
    };
    
    personaAgent = new GGMLPersonaAgent(mockTraits);
  });

  describe('Persona Agent Initialization', () => {
    it('should initialize with correct persona traits', () => {
      const state = personaAgent.getPersonaState();
      
      expect(state.traits.creativity).toBe(0.8);
      expect(state.traits.precision).toBe(0.9);
      expect(state.traits.recursionDepth).toBe(3);
      expect(state.traits.adaptationRate).toBe(0.1);
      expect(state.traits.boltIntegration).toBe(true);
    });

    it('should initialize with mounted cognitive tensors', () => {
      const state = personaAgent.getPersonaState();
      
      expect(state.tensorMounts).toBeGreaterThan(0);
      expect(state.memorySize).toBe(0); // Initially empty
      expect(state.spawnedRepoCount).toBe(0);
    });

    it('should have operational OODA loop state', () => {
      const state = personaAgent.getPersonaState();
      
      expect(state.oodaState).toBeDefined();
      expect(state.oodaState.observe).toBeNull(); // Initially null
      expect(state.oodaState.orient).toBeNull();
      expect(state.oodaState.decide).toBeNull();
      expect(state.oodaState.act).toBeNull();
    });
  });

  describe('Intent Processing and OODA Loop', () => {
    it('should process simple intent without repo spawning', async () => {
      const intent = 'Help me understand JavaScript closures';
      const context = ['programming', 'javascript'];
      
      const result = await personaAgent.processIntent(intent, context);
      
      expect(result.response).toBeDefined();
      expect(result.spawnedRepos).toBeUndefined(); // Should be undefined, not empty array
      expect(result.memoryUpdates).toBeDefined();
      expect(result.adaptations).toBeDefined();
    });

    it('should process complex intent with potential repo spawning', async () => {
      const intent = 'Create a full-stack e-commerce application with AI recommendations';
      const context = ['development', 'ai', 'ecommerce'];
      
      const result = await personaAgent.processIntent(intent, context);
      
      expect(result.response).toBeDefined();
      expect(result.spawnedRepos).toBeDefined();
      expect(result.spawnedRepos!.length).toBeGreaterThan(0);
      expect(result.memoryUpdates).toBeDefined();
    });

    it('should update OODA loop state during processing', async () => {
      const intent = 'Build a React dashboard';
      
      await personaAgent.processIntent(intent);
      const state = personaAgent.getPersonaState();
      
      expect(state.oodaState.observe).not.toBeNull();
      expect(state.oodaState.orient).not.toBeNull();
      expect(state.oodaState.decide).not.toBeNull();
      expect(state.oodaState.act).not.toBeNull();
    });

    it('should update memory size after processing', async () => {
      const intent = 'Create a Node.js API';
      const context = ['backend', 'api', 'nodejs'];
      
      const initialMemorySize = personaAgent.getPersonaState().memorySize;
      
      await personaAgent.processIntent(intent, context);
      
      const finalMemorySize = personaAgent.getPersonaState().memorySize;
      expect(finalMemorySize).toBeGreaterThan(initialMemorySize);
    });
  });

  describe('Repository Spawning', () => {
    it('should spawn repository with valid request', async () => {
      const spawnRequest: RepoSpawnRequest = {
        intent: 'Create a React dashboard application',
        technologies: ['react', 'typescript', 'vite'],
        architecture: 'frontend',
        recursionLevel: 0
      };
      
      const result = await personaAgent.spawnRepository(spawnRequest);
      
      expect(result.repoId).toBeDefined();
      expect(result.repoId).toMatch(/^repo_\d+_[a-z0-9]+$/);
      expect(result.boltArtifact).toBeDefined();
      expect(result.ragExtension).toBeDefined();
      expect(result.ragExtension.repoId).toBe(result.repoId);
    });

    it('should create appropriate Bolt artifact structure', async () => {
      const spawnRequest: RepoSpawnRequest = {
        intent: 'Create a full-stack application',
        technologies: ['react', 'express', 'typescript'],
        architecture: 'fullstack',
        recursionLevel: 0
      };
      
      const result = await personaAgent.spawnRepository(spawnRequest);
      
      expect(result.boltArtifact.id).toBe(result.repoId);
      expect(result.boltArtifact.title).toContain('AI-Generated Repository');
      expect(result.boltArtifact.actions).toBeInstanceOf(Array);
      expect(result.boltArtifact.actions.length).toBeGreaterThan(2);
      
      // Check for essential files
      const fileActions = result.boltArtifact.actions.filter((action: any) => action.type === 'file');
      const filePaths = fileActions.map((action: any) => action.filePath);
      
      expect(filePaths).toContain('package.json');
      expect(filePaths).toContain('README.md');
    });

    it('should respect recursion depth limit', async () => {
      const spawnRequest: RepoSpawnRequest = {
        intent: 'Create a complex system',
        technologies: ['react'],
        architecture: 'fullstack',
        recursionLevel: 3 // At the limit
      };
      
      await expect(personaAgent.spawnRepository(spawnRequest))
        .rejects.toThrow('Maximum recursion depth 3 exceeded');
    });

    it('should track spawned repositories', async () => {
      const spawnRequest: RepoSpawnRequest = {
        intent: 'Create a test application',
        technologies: ['react'],
        architecture: 'frontend',
        recursionLevel: 0
      };
      
      const initialCount = personaAgent.getPersonaState().spawnedRepoCount;
      
      await personaAgent.spawnRepository(spawnRequest);
      
      const finalCount = personaAgent.getPersonaState().spawnedRepoCount;
      expect(finalCount).toBe(initialCount + 1);
    });

    it('should generate correct dependencies for technologies', async () => {
      const spawnRequest: RepoSpawnRequest = {
        intent: 'Create a React app with AI features',
        technologies: ['react', 'typescript', 'pytorch'],
        architecture: 'ai-agent',
        recursionLevel: 0
      };
      
      const result = await personaAgent.spawnRepository(spawnRequest);
      const packageJsonAction = result.boltArtifact.actions.find(
        (action: any) => action.filePath === 'package.json'
      );
      
      expect(packageJsonAction).toBeDefined();
      const packageContent = JSON.parse(packageJsonAction.content);
      
      expect(packageContent.dependencies).toBeDefined();
      expect(packageContent.dependencies['react']).toBeDefined();
      expect(packageContent.dependencies['@tensorflow/tfjs']).toBeDefined(); // Browser-compatible AI
    });
  });

  describe('RAG Memory System', () => {
    it('should retrieve relevant information from memory', async () => {
      // First, add some context to memory
      await personaAgent.processIntent('Create a React application', ['react', 'frontend']);
      
      const results = await personaAgent.retrieveFromRAG('React component');
      
      expect(results.results).toBeInstanceOf(Array);
      expect(results.embeddings).toBeInstanceOf(Float32Array);
      expect(results.embeddings.length).toBe(384); // Standard embedding dimension
    });

    it('should filter results by relevance threshold', async () => {
      // Add diverse context
      await personaAgent.processIntent('Create a backend API', ['nodejs', 'express']);
      await personaAgent.processIntent('Build a machine learning model', ['python', 'ai']);
      
      const results = await personaAgent.retrieveFromRAG('API endpoint', 3);
      
      expect(results.results.length).toBeLessThanOrEqual(3);
      results.results.forEach(result => {
        expect(result.relevance).toBeGreaterThan(0);
        expect(result.relevance).toBeLessThanOrEqual(1);
        expect(result.content).toBeDefined();
        expect(result.source).toBeDefined();
      });
    });

    it('should generate embeddings for text input', async () => {
      const results = await personaAgent.retrieveFromRAG('test query');
      
      expect(results.embeddings).toBeInstanceOf(Float32Array);
      expect(results.embeddings.length).toBe(384);
      
      // Check that embeddings are normalized (values between -1 and 1)
      for (let i = 0; i < results.embeddings.length; i++) {
        expect(results.embeddings[i]).toBeGreaterThanOrEqual(-1);
        expect(results.embeddings[i]).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('Self-Modification and Adaptation', () => {
    it('should perform self-modification and return adaptations', async () => {
      const result = await personaAgent.performSelfModification();
      
      expect(result.cognitiveUpdates).toBeDefined();
      expect(result.tensorUpdates).toBeDefined();
      expect(result.traitAdaptations).toBeDefined();
      
      expect(typeof result.cognitiveUpdates.successRate).toBe('number');
      expect(typeof result.cognitiveUpdates.responseTime).toBe('number');
      expect(typeof result.cognitiveUpdates.userSatisfaction).toBe('number');
    });

    it('should adapt traits based on performance', async () => {
      const initialTraits = { ...personaAgent.getPersonaState().traits };
      
      // Simulate successful interaction
      await personaAgent.processIntent('Create a simple React app', ['react']);
      await personaAgent.performSelfModification();
      
      const finalTraits = personaAgent.getPersonaState().traits;
      
      // Traits should remain within valid bounds [0, 1]
      expect(finalTraits.creativity).toBeGreaterThanOrEqual(0);
      expect(finalTraits.creativity).toBeLessThanOrEqual(1);
      expect(finalTraits.precision).toBeGreaterThanOrEqual(0);
      expect(finalTraits.precision).toBeLessThanOrEqual(1);
    });

    it('should maintain tensor integrity during adaptation', async () => {
      const initialTensorMounts = personaAgent.getPersonaState().tensorMounts;
      
      await personaAgent.performSelfModification();
      
      const finalTensorMounts = personaAgent.getPersonaState().tensorMounts;
      expect(finalTensorMounts).toEqual(initialTensorMounts); // Tensor count should remain stable
    });
  });

  describe('Introspection and Meta-Cognition', () => {
    it('should provide introspective analysis', async () => {
      const introspection = await personaAgent.introspect();
      
      expect(introspection.selfModel).toBeDefined();
      expect(introspection.cognitiveHealth).toBe('Operational');
      expect(introspection.adaptationHistory).toBeDefined();
      expect(introspection.recursiveCapability).toBe('Active');
      expect(introspection.boltIntegration).toBe('Enabled');
    });

    it('should reflect current cognitive state accurately', async () => {
      // Process some intents to change state
      await personaAgent.processIntent('Build a complex application', ['fullstack']);
      
      const state = personaAgent.getPersonaState();
      
      expect(state.traits).toBeDefined();
      expect(state.memorySize).toBeGreaterThan(0);
      expect(state.oodaState).toBeDefined();
      expect(state.tensorMounts).toBeGreaterThan(0);
    });
  });

  describe('Cognitive Intent Parsing', () => {
    it('should classify development intents correctly', async () => {
      const intent = 'Create a full-stack e-commerce website with user authentication';
      
      const result = await personaAgent.processIntent(intent);
      
      // Should trigger repo spawning for complex development task
      expect(result.spawnedRepos).toBeDefined();
      expect(result.spawnedRepos!.length).toBeGreaterThan(0);
      
      const spawnedRepo = result.spawnedRepos![0];
      expect(spawnedRepo.architecture).toBe('fullstack');
      expect(spawnedRepo.technologies).toContain('typescript');
    });

    it('should classify AI intents correctly', async () => {
      const intent = 'Build a machine learning model for image classification';
      
      const result = await personaAgent.processIntent(intent);
      
      if (result.spawnedRepos && result.spawnedRepos.length > 0) {
        const spawnedRepo = result.spawnedRepos[0];
        expect(spawnedRepo.architecture).toBe('ai-agent');
        expect(spawnedRepo.technologies).toContain('python');
      }
    });

    it('should handle simple queries without spawning', async () => {
      const intent = 'What is the difference between let and const in JavaScript?';
      
      const result = await personaAgent.processIntent(intent);
      
      expect(result.response).toBeDefined();
      expect(result.spawnedRepos).toBeUndefined(); // Should be undefined for simple queries
      expect(result.memoryUpdates).toBeDefined();
    });
  });

  describe('Error Handling and Resilience', () => {
    it('should handle invalid recursion gracefully', async () => {
      const invalidRequest: RepoSpawnRequest = {
        intent: 'Test recursion limits',
        technologies: ['react'],
        architecture: 'frontend',
        recursionLevel: 5 // Exceeds limit
      };
      
      await expect(personaAgent.spawnRepository(invalidRequest))
        .rejects.toThrow('Maximum recursion depth');
    });

    it('should maintain state consistency after errors', async () => {
      const initialState = personaAgent.getPersonaState();
      
      try {
        await personaAgent.spawnRepository({
          intent: 'Test',
          technologies: ['react'],
          architecture: 'frontend',
          recursionLevel: 10 // Invalid
        });
      } catch (error) {
        // Expected error
      }
      
      const finalState = personaAgent.getPersonaState();
      
      // State should remain consistent
      expect(finalState.tensorMounts).toEqual(initialState.tensorMounts);
      expect(finalState.spawnedRepoCount).toEqual(initialState.spawnedRepoCount);
    });

    it('should handle empty context gracefully', async () => {
      const result = await personaAgent.processIntent('Simple request', []);
      
      expect(result.response).toBeDefined();
      expect(result.memoryUpdates).toBeDefined();
    });
  });

  describe('Performance and Optimization', () => {
    it('should process multiple intents efficiently', async () => {
      const intents = [
        'Create a React component',
        'Build a REST API',
        'Set up a database',
        'Add authentication',
        'Deploy to cloud'
      ];
      
      const startTime = Date.now();
      
      const results = await Promise.all(
        intents.map(intent => personaAgent.processIntent(intent))
      );
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      expect(results.length).toBe(5);
      expect(totalTime).toBeLessThan(5000); // Should complete within 5 seconds
      
      results.forEach(result => {
        expect(result.response).toBeDefined();
        expect(result.memoryUpdates).toBeDefined();
      });
    });

    it('should manage memory efficiently with large context', async () => {
      const largeContext = Array.from({ length: 200 }, (_, i) => `context_item_${i}`);
      
      await personaAgent.processIntent('Process large context', largeContext);
      
      const state = personaAgent.getPersonaState();
      
      // Memory should be bounded (context window limited and old items removed)
      expect(state.memorySize).toBeLessThan(100); // Should be much less due to cleanup
    });
  });
});