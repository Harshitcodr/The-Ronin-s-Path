import { useState, useEffect } from 'react';
import feudalJapanStory, { Scene } from '../data/feudalJapanStory';

interface GameState {
  currentSceneId: string;
  inventory: string[];
  visitedScenes: string[];
  gameEnded: boolean;
}

const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: 'start',
    inventory: [],
    visitedScenes: ['start'],
    gameEnded: false
  });
  
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  
  // Load the current scene based on the scene ID
  useEffect(() => {
    const scene = feudalJapanStory.find(scene => scene.id === gameState.currentSceneId);
    if (scene) {
      setCurrentScene(scene);
      
      // Check if this is an ending scene
      if (scene.isEnding) {
        setGameState(prev => ({ ...prev, gameEnded: true }));
      }
    }
  }, [gameState.currentSceneId]);
  
  // Handle player decisions
  const handleDecision = (choiceId: string) => {
    if (!currentScene) return;
    
    const choice = currentScene.choices.find(c => c.id === choiceId);
    if (!choice) return;
    
    // Find the next scene
    const nextSceneId = choice.nextSceneId;
    
    // Update game state
    setGameState(prev => ({
      ...prev,
      currentSceneId: nextSceneId,
      visitedScenes: [...prev.visitedScenes, nextSceneId]
    }));
  };
  
  // Add item to inventory
  const addToInventory = (item: string) => {
    if (gameState.inventory.includes(item)) return;
    
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item]
    }));
  };
  
  // Reset the game
  const resetGame = () => {
    setGameState({
      currentSceneId: 'start',
      inventory: [],
      visitedScenes: ['start'],
      gameEnded: false
    });
  };
  
  return {
    currentScene,
    handleDecision,
    addToInventory,
    resetGame,
    inventory: gameState.inventory,
    visitedScenes: gameState.visitedScenes,
    gameEnded: gameState.gameEnded
  };
};

export default useGameLogic;