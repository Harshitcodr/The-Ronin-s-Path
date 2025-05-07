export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  animation?: string;
  choices: Choice[];
  explorationPoints?: ExplorationPoint[];
  isEnding?: boolean;
}

export interface ExplorationPoint {
  id: string;
  position: [number, number]; // x, y coordinates as percentage of container
  tooltip: string;
  description: string;
  itemFound?: string;
}

export const feudalJapanStory: Scene[] = [
  {
    id: "start",
    title: "The Ronin's Path",
    description: "The year is 1603, the beginning of the Edo period. You are a ronin, a masterless samurai, wandering the countryside after your lord was defeated in battle. As dawn breaks, you find yourself at a crossroads near a small village in the shadow of Mount Fuji. The cherry blossoms are in full bloom, their petals dancing in the gentle breeze.",
    backgroundImage: "/assets/images/crossroads.jpg",
    animation: "sakura-falling",
    choices: [
      {
        id: "village",
        text: "Enter the village to seek food and shelter",
        nextSceneId: "village_entrance"
      },
      {
        id: "forest",
        text: "Take the forest path to avoid human contact",
        nextSceneId: "forest_path"
      }
    ],
    explorationPoints: [
      {
        id: "sakura",
        position: [75, 30],
        tooltip: "Examine the cherry blossoms",
        description: "The sakura trees are in full bloom, a symbol of the beauty and transience of life. As a samurai, you understand that life is as fleeting as these blossoms."
      },
      {
        id: "distant_mountain",
        position: [20, 25],
        tooltip: "Gaze at Mount Fuji",
        description: "The sacred mountain stands tall in the distance, its snow-capped peak gleaming in the morning sun. It reminds you of the permanence of nature against the changing tides of human conflict."
      }
    ]
  },
  {
    id: "village_entrance",
    title: "Village of Shadows",
    description: "The village is eerily quiet as you approach. Smoke rises from a few chimneys, but there are no people in sight. A weathered torii gate marks the entrance, its red paint peeling to reveal the aged wood beneath. You notice fresh footprints in the dirt and what appears to be signs of a struggle.",
    backgroundImage: "/assets/images/village_entrance.jpg",
    choices: [
      {
        id: "investigate",
        text: "Investigate the signs of struggle",
        nextSceneId: "village_investigation"
      },
      {
        id: "teahouse",
        text: "Head to the teahouse at the center of the village",
        nextSceneId: "teahouse"
      },
      {
        id: "leave_village",
        text: "This feels dangerous - leave immediately",
        nextSceneId: "forest_path"
      }
    ],
    explorationPoints: [
      {
        id: "footprints",
        position: [40, 70],
        tooltip: "Examine the footprints",
        description: "The footprints suggest a group of armed men passed through recently. Some prints are deeper, indicating they were carrying heavy loads - or perhaps prisoners."
      },
      {
        id: "broken_cart",
        position: [65, 55],
        tooltip: "Inspect the broken cart",
        description: "A merchant's cart lies overturned, its contents scattered. Among the spilled goods, you find a broken tanto knife with an unfamiliar crest.",
        itemFound: "Mysterious Tanto"
      }
    ]
  },
  {
    id: "forest_path",
    title: "The Ancient Forest",
    description: "The forest path is shrouded in mist, with towering cedar trees blocking much of the sunlight. The air is thick with the scent of moss and damp earth. As you venture deeper, you hear the distant sound of drums and what might be chanting.",
    backgroundImage: "/assets/images/forest_path.jpg",
    animation: "forest-mist",
    choices: [
      {
        id: "follow_sounds",
        text: "Follow the mysterious sounds",
        nextSceneId: "shrine_clearing"
      },
      {
        id: "avoid_sounds",
        text: "Avoid the sounds and continue through the forest",
        nextSceneId: "bandit_encounter"
      }
    ],
    explorationPoints: [
      {
        id: "shrine_marker",
        position: [30, 60],
        tooltip: "Examine the stone marker",
        description: "A moss-covered stone marker bears the faded symbol of an ancient shrine. It warns travelers of spirits that guard the sacred grounds ahead."
      },
      {
        id: "broken_armor",
        position: [70, 45],
        tooltip: "Inspect the broken armor piece",
        description: "Half-buried in the undergrowth lies a piece of samurai armor, cracked and weathered. The mon (family crest) belongs to the Takeda clan - your former enemies.",
        itemFound: "Takeda Armor Fragment"
      }
    ]
  },
  {
    id: "village_investigation",
    title: "Traces of Conflict",
    description: "Following the signs of struggle, you discover blood stains leading to the village headman's house. The door hangs open, and inside you find overturned furniture and signs of a hasty departure. A scroll bearing an official seal lies partially unrolled on the floor.",
    backgroundImage: "/assets/images/headman_house.jpg",
    choices: [
      {
        id: "read_scroll",
        text: "Read the scroll",
        nextSceneId: "scroll_revelation"
      },
      {
        id: "follow_blood",
        text: "Follow the blood trail",
        nextSceneId: "village_outskirts"
      }
    ],
    explorationPoints: [
      {
        id: "family_altar",
        position: [20, 30],
        tooltip: "Examine the family altar",
        description: "The small Buddhist altar has been respectfully covered, suggesting the family left intentionally and hoped to return. A single incense stick still burns - they haven't been gone long."
      },
      {
        id: "hidden_compartment",
        position: [75, 65],
        tooltip: "Investigate the loose floorboard",
        description: "Beneath a loose floorboard, you discover a hidden compartment containing a small pouch of silver coins and a map marking several locations in the surrounding mountains.",
        itemFound: "Mountain Map"
      }
    ]
  },
  {
    id: "teahouse",
    title: "The Empty Teahouse",
    description: "The village teahouse stands with its doors wide open, as if abandoned in haste. Inside, cups of tea still sit on tables, some half-drunk. A fire smolders in the hearth. Behind the counter, you notice a trapdoor slightly ajar.",
    backgroundImage: "/assets/images/teahouse.jpg",
    choices: [
      {
        id: "check_trapdoor",
        text: "Investigate the trapdoor",
        nextSceneId: "hidden_cellar"
      },
      {
        id: "search_teahouse",
        text: "Search the teahouse thoroughly",
        nextSceneId: "teahouse_search"
      },
      {
        id: "leave_teahouse",
        text: "This place feels unsafe - head back outside",
        nextSceneId: "village_center"
      }
    ],
    explorationPoints: [
      {
        id: "guest_book",
        position: [15, 40],
        tooltip: "Check the guest registry",
        description: "The teahouse guest book shows entries from several samurai of the Tokugawa clan who passed through three days ago. The last entry is smudged, as if written in haste."
      },
      {
        id: "strange_tea",
        position: [60, 55],
        tooltip: "Examine the unusual tea",
        description: "One of the teacups contains a strange, dark brew unlike the others. Sniffing it carefully, you detect a bitter almond scent - possibly poison."
      }
    ]
  },
  {
    id: "shrine_clearing",
    title: "The Forgotten Shrine",
    description: "Following the sounds, you emerge into a clearing where an ancient Shinto shrine stands, partially reclaimed by nature. Several monks in white robes are performing a ritual around a stone altar. They fall silent as they notice your approach, their expressions a mixture of fear and relief.",
    backgroundImage: "/assets/images/shrine.jpg",
    animation: "spirit-wisps",
    choices: [
      {
        id: "approach_monks",
        text: "Approach the monks peacefully",
        nextSceneId: "monk_conversation"
      },
      {
        id: "observe_hidden",
        text: "Observe from hiding",
        nextSceneId: "shrine_observation"
      },
      {
        id: "leave_shrine",
        text: "This is not your concern - continue your journey",
        nextSceneId: "forest_depths"
      }
    ],
    explorationPoints: [
      {
        id: "stone_altar",
        position: [50, 40],
        tooltip: "Study the stone altar",
        description: "The altar is ancient, predating even the shrine itself. Carved into its surface are symbols representing the five elements and what appears to be a map of the stars."
      },
      {
        id: "offering_box",
        position: [30, 65],
        tooltip: "Look inside the offering box",
        description: "The wooden offering box contains several unusual items: a lock of hair tied with red string, a broken arrow head, and a small jade magatama bead.",
        itemFound: "Jade Magatama"
      }
    ]
  },
  // More scenes would be added here
  {
    id: "monk_conversation",
    title: "The Monks' Warning",
    description: "The eldest monk steps forward, bowing respectfully. 'Samurai-san, your arrival is either fortunate or ill-fated - we cannot yet tell. Our village has been plagued by yokai - supernatural creatures - emerging from the mountains since the battle that claimed your master. We believe they are drawn to the lingering spirits of the fallen warriors.'",
    backgroundImage: "/assets/images/monk_elder.jpg",
    choices: [
      {
        id: "offer_help",
        text: "Offer your sword in service to the monks",
        nextSceneId: "accept_quest"
      },
      {
        id: "request_information",
        text: "Ask for more information about these yokai",
        nextSceneId: "yokai_information"
      },
      {
        id: "decline_involvement",
        text: "Express sympathy but decline involvement",
        nextSceneId: "leave_shrine"
      }
    ],
    explorationPoints: [
      {
        id: "monk_scrolls",
        position: [20, 50],
        tooltip: "Glance at the monk's scrolls",
        description: "The scrolls contain detailed drawings of various yokai, with notes on their weaknesses and habits. Some illustrations match folk tales you heard as a child."
      },
      {
        id: "prayer_beads",
        position: [70, 40],
        tooltip: "Notice the elder's unusual prayer beads",
        description: "The elder monk's prayer beads are made from what appears to be crystallized tears. Legend says such beads form from the grief of pure souls and hold power against supernatural forces.",
        itemFound: "Insight about Spiritual Weapons"
      }
    ]
  },
  {
    id: "accept_quest",
    title: "The Path of Redemption",
    description: "The elder monk nods solemnly as you offer your assistance. 'Your warrior spirit may be what we need. The yokai are drawn to a cave in the northern mountains where many samurai fell. We believe a powerful artifact - the Tears of Amaterasu - was lost there during the battle. If recovered and purified, it might calm the restless spirits.'",
    backgroundImage: "/assets/images/monk_ritual.jpg",
    animation: "glowing-talisman",
    choices: [
      {
        id: "prepare_journey",
        text: "Prepare for the journey to the mountain cave",
        nextSceneId: "mountain_preparation"
      },
      {
        id: "seek_allies",
        text: "Suggest seeking additional allies for the dangerous task",
        nextSceneId: "ally_search"
      }
    ],
    explorationPoints: [
      {
        id: "sacred_sword",
        position: [40, 60],
        tooltip: "Examine the ceremonial sword",
        description: "A ceremonial sword rests on a stand near the altar. Though ornate, you can tell the blade is remarkably well-crafted and would be effective against mortal foes. Whether it will affect yokai remains to be seen.",
        itemFound: "Blessed Blade"
      }
    ]
  },
  // Add more scenes as needed
  {
    id: "final_battle",
    title: "Confrontation at Dawn",
    description: "As the first light of dawn breaks over the mountain, you stand before the cave entrance, the Tears of Amaterasu glowing softly in your hand. The air grows cold as a swirling darkness emerges from the cave - the yokai lord in its true form. Behind you, the monks begin their ritual chanting, strengthening your resolve.",
    backgroundImage: "/assets/images/final_battle.jpg",
    animation: "yokai-manifestation",
    choices: [
      {
        id: "use_artifact",
        text: "Use the Tears of Amaterasu against the yokai lord",
        nextSceneId: "purification_ending"
      },
      {
        id: "martial_prowess",
        text: "Rely on your samurai training and blessed blade",
        nextSceneId: "warrior_ending"
      },
      {
        id: "combined_approach",
        text: "Combine spiritual power with martial skill",
        nextSceneId: "true_ending"
      }
    ]
  },
  {
    id: "purification_ending",
    title: "Light of Purification",
    description: "You hold the Tears of Amaterasu high, and it erupts with blinding light. The yokai lord shrieks as the purifying energy washes over it, dissolving its malevolent form. As peace returns to the mountain, you feel a weight lift from your spirit. The monks bow deeply, honoring your sacrifice and courage.",
    backgroundImage: "/assets/images/purification.jpg",
    animation: "light-burst",
    isEnding: true,
    choices: [
      {
        id: "restart",
        text: "Begin a new journey",
        nextSceneId: "start"
      }
    ]
  },
  {
    id: "warrior_ending",
    title: "The Warrior's Path",
    description: "Drawing your blessed blade, you charge forward with the technique and spirit of a true samurai. The yokai lord meets your attacks with supernatural force, but your unwavering resolve and perfect form prevail. As your blade finds its mark, the creature dissolves into peaceful light. You have restored your honor as a samurai.",
    backgroundImage: "/assets/images/warrior_victory.jpg",
    animation: "sword-slash",
    isEnding: true,
    choices: [
      {
        id: "restart",
        text: "Begin a new journey",
        nextSceneId: "start"
      }
    ]
  },
  {
    id: "true_ending",
    title: "Harmony of Spirit and Steel",
    description: "Understanding that true strength comes from balance, you channel the power of the Tears through your blade as you execute perfect strikes. The yokai lord, faced with both spiritual and martial might, cannot withstand your harmonious attack. As peace returns to the land, you find your new path - a protector who balances the material and spiritual worlds.",
    backgroundImage: "/assets/images/true_ending.jpg",
    animation: "harmony-glow",
    isEnding: true,
    choices: [
      {
        id: "restart",
        text: "Begin a new journey",
        nextSceneId: "start"
      }
    ]
  }
];

export default feudalJapanStory;