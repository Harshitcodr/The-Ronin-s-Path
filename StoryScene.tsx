import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import Scene3D from './3d/Scene3D';
import { Scene, Choice, ExplorationPoint } from '../data/feudalJapanStory';

interface StorySceneProps {
  scene: Scene;
  onDecision: (choiceId: string) => void;
  inventory?: string[];
}

const StoryScene: React.FC<StorySceneProps> = ({ scene, onDecision, inventory = [] }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [activeExploration, setActiveExploration] = useState<ExplorationPoint | null>(null);
  const [foundItem, setFoundItem] = useState<string | null>(null);
  
  useEffect(() => {
    // Reset states when scene changes
    setShowDescription(false);
    setActiveExploration(null);
    setFoundItem(null);
    
    // Animate in the description after a short delay
    const timer = setTimeout(() => {
      setShowDescription(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [scene.id]);
  
  const handleExplorationClick = (point: ExplorationPoint) => {
    setActiveExploration(point);
    
    if (point.itemFound && !inventory.includes(point.itemFound)) {
      setFoundItem(point.itemFound);
    }
  };
  
  const closeExploration = () => {
    setActiveExploration(null);
    setFoundItem(null);
  };
  
  return (
    <div className="story-scene-container">
      <AnimatedBackground animationType={scene.animation || ''}>
        <div 
          className="story-scene" 
          style={{ backgroundImage: `url(${scene.backgroundImage})` }}
        >
          <motion.div 
            className="scene-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="scene-title"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {scene.title}
            </motion.h1>
            
            <AnimatePresence>
              {showDescription && (
                <motion.div 
                  className="scene-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                >
                  <p>{scene.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {scene.explorationPoints && (
              <div className="exploration-points">
                {scene.explorationPoints.map(point => (
                  <motion.div
                    key={point.id}
                    className="exploration-point"
                    style={{ 
                      left: `${point.position[0]}%`, 
                      top: `${point.position[1]}%` 
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 1 + Math.random() * 0.5
                    }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleExplorationClick(point)}
                  >
                    <div className="point-indicator" />
                    <div className="point-tooltip">{point.tooltip}</div>
                  </motion.div>
                ))}
              </div>
            )}
            
            <motion.div 
              className="choices-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {scene.choices.map((choice: Choice) => (
                <motion.button
                  key={choice.id}
                  className="choice-button"
                  onClick={() => onDecision(choice.id)}
                  whileHover={{ scale: 1.05, backgroundColor: '#4a2511' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {choice.text}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          
          {/* 3D model display for special scenes */}
          {scene.id === 'accept_quest' && (
            <div className="scene-3d-model">
              <Scene3D 
                modelPath="/assets/models/katana.glb" 
                environmentPath="sunset" 
              />
            </div>
          )}
          
          {/* Exploration detail modal */}
          <AnimatePresence>
            {activeExploration && (
              <motion.div 
                className="exploration-detail"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="exploration-content">
                  <h3>{activeExploration.tooltip}</h3>
                  <p>{activeExploration.description}</p>
                  
                  {foundItem && (
                    <motion.div 
                      className="found-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4>You found: {foundItem}</h4>
                      <p>Added to your inventory</p>
                    </motion.div>
                  )}
                  
                  <button 
                    className="close-exploration"
                    onClick={closeExploration}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedBackground>
    </div>
  );
};

export default StoryScene;