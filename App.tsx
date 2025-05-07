import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoryScene from './components/StoryScene';
import useGameLogic from './hooks/useGameLogic';

const App: React.FC = () => {
  const { 
    currentScene, 
    handleDecision, 
    inventory, 
    addToInventory, 
    resetGame, 
    gameEnded 
  } = useGameLogic();
  
  const [showIntro, setShowIntro] = useState(true);
  const [showInventory, setShowInventory] = useState(false);
  
  // Handle item discovery
  useEffect(() => {
    if (currentScene?.explorationPoints) {
      currentScene.explorationPoints.forEach(point => {
        if (point.itemFound) {
          addToInventory(point.itemFound);
        }
      });
    }
  }, [currentScene, addToInventory]);
  
  const startGame = () => {
    setShowIntro(false);
  };
  
  const toggleInventory = () => {
    setShowInventory(prev => !prev);
  };
  
  if (showIntro) {
    return (
      <div className="intro-screen">
        <div className="intro-content">
          <motion.h1 
            className="game-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            The Ronin's Path
          </motion.h1>
          
          <motion.div 
            className="intro-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <p>
              Journey through Feudal Japan as a masterless samurai seeking redemption.
              Your choices will shape your destiny in this interactive tale of honor, 
              supernatural forces, and the warrior's code.
            </p>
          </motion.div>
          
          <motion.button 
            className="start-button"
            onClick={startGame}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            whileHover={{ scale: 1.05, backgroundColor: '#4a2511' }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Journey
          </motion.button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app">
      {currentScene && (
        <>
          <div className="game-ui">
            <button 
              className="inventory-button"
              onClick={toggleInventory}
            >
              Inventory ({inventory.length})
            </button>
            
            {gameEnded && (
              <button 
                className="restart-button"
                onClick={resetGame}
              >
                Start New Journey
              </button>
            )}
          </div>
          
          <AnimatePresence>
            {showInventory && (
              <motion.div 
                className="inventory-panel"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <h2>Your Belongings</h2>
                {inventory.length === 0 ? (
                  <p>You have no items yet.</p>
                ) : (
                  <ul className="inventory-list">
                    {inventory.map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                )}
                <button 
                  className="close-inventory"
                  onClick={toggleInventory}
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <StoryScene 
            scene={currentScene} 
            onDecision={handleDecision} 
            inventory={inventory}
          />
        </>
      )}
    </div>
  );
};

export default App;