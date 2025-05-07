# The Ronin's Path - Interactive Feudal Japan Storytelling Experience

An immersive interactive storytelling web application set in Feudal Japan, featuring modern animations, 3D effects, and user-driven decisions that shape the narrative.

## Features

- **Rich Feudal Japan Setting**: Experience a detailed historical setting with supernatural elements
- **Branching Narrative**: Your choices determine how the story unfolds
- **Point-and-Click Exploration**: Discover hidden details and items in each scene
- **Modern Animations**: Beautiful visual effects using GSAP and Framer Motion
- **3D Elements**: Interactive 3D models using Three.js and React Three Fiber
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Inventory System**: Collect items that may affect your journey
- **Multiple Endings**: Discover different conclusions based on your choices

## Technologies Used

- React with TypeScript
- Framer Motion for animations
- Three.js and React Three Fiber for 3D elements
- GSAP for advanced animations
- Vite for fast development and building

## Project Structure
```
interactive-storytelling-web
├── public
│   ├── index.html
│   ├── styles.css
│   └── assets
│       ├── images
│       └── models
├── src
│   ├── components
│   │   ├── 3d
│   │   │   └── Scene3D.tsx
│   │   ├── AnimatedBackground.tsx
│   │   ├── Animation.tsx
│   │   ├── DecisionTree.tsx
│   │   └── StoryScene.tsx
│   ├── data
│   │   └── feudalJapanStory.ts
│   ├── hooks
│   │   └── useGameLogic.ts
│   ├── utils
│   │   └── helpers.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd interactive-storytelling-web
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How to Play

1. Start the application and click "Begin Your Journey"
2. Read the story text and make choices by clicking the decision buttons
3. Explore each scene by clicking on the glowing interaction points
4. Collect items that will be added to your inventory
5. Your decisions will affect the story's outcome

## Adding New Content

### Adding New Scenes

To add new scenes to the story, edit the `feudalJapanStory.ts` file in the `/src/data` directory. Each scene follows this structure:

```typescript
{
  id: "unique_id",
  title: "Scene Title",
  description: "Detailed scene description...",
  backgroundImage: "/assets/images/your_image.jpg",
  animation: "animation-name", // Optional
  choices: [
    {
      id: "choice_id",
      text: "Choice text shown to the player",
      nextSceneId: "id_of_next_scene"
    },
    // More choices...
  ],
  explorationPoints: [ // Optional
    {
      id: "point_id",
      position: [25, 60], // x, y as percentage of container
      tooltip: "What the player sees on hover",
      description: "Detailed description shown when clicked",
      itemFound: "Item Name" // Optional
    },
    // More exploration points...
  ]
}
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Inspired by traditional Japanese folklore and history
- Special thanks to the creators of Three.js, React Three Fiber, and Framer Motion