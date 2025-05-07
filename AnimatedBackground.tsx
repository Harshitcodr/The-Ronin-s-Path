import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedBackgroundProps {
  animationType: string;
  intensity?: 'low' | 'medium' | 'high';
  children?: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  animationType,
  intensity = 'medium',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Clear any existing animation elements
    const existingElements = container.querySelectorAll('.animation-element');
    existingElements.forEach(el => el.remove());
    
    // Set up animations based on type
    switch (animationType) {
      case 'sakura-falling':
        createSakuraAnimation(container, intensity);
        break;
      case 'forest-mist':
        createMistAnimation(container, intensity);
        break;
      case 'spirit-wisps':
        createWispsAnimation(container, intensity);
        break;
      case 'glowing-talisman':
        createTalismanGlow(container, intensity);
        break;
      case 'yokai-manifestation':
        createYokaiManifestation(container, intensity);
        break;
      case 'light-burst':
        createLightBurst(container, intensity);
        break;
      case 'sword-slash':
        createSwordSlash(container, intensity);
        break;
      case 'harmony-glow':
        createHarmonyGlow(container, intensity);
        break;
      default:
        // No animation
        break;
    }
    
    return () => {
      // Cleanup animations
      gsap.killTweensOf(container.querySelectorAll('.animation-element'));
    };
  }, [animationType, intensity]);
  
  return (
    <div ref={containerRef} className={`animated-background ${animationType}`}>
      {children}
    </div>
  );
};

// Animation creation functions
const createSakuraAnimation = (container: HTMLElement, intensity: string) => {
  const count = intensity === 'low' ? 20 : intensity === 'medium' ? 40 : 60;
  
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'animation-element sakura-petal';
    container.appendChild(petal);
    
    const size = Math.random() * 10 + 5;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    gsap.set(petal, {
      x: Math.random() * window.innerWidth,
      y: -20,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.6 + 0.2
    });
    
    animatePetal(petal);
  }
};

const animatePetal = (petal: HTMLElement) => {
  const duration = Math.random() * 10 + 10;
  const xMovement = Math.random() * 100 - 50;
  
  gsap.to(petal, {
    y: window.innerHeight + 20,
    x: `+=${xMovement}`,
    rotation: `+=${Math.random() * 360 + 180}`,
    duration: duration,
    ease: 'none',
    repeat: -1,
    delay: Math.random() * 5,
    onRepeat: () => {
      gsap.set(petal, {
        y: -20,
        x: Math.random() * window.innerWidth
      });
    }
  });
};

const createMistAnimation = (container: HTMLElement, intensity: string) => {
  const count = intensity === 'low' ? 3 : intensity === 'medium' ? 5 : 8;
  
  for (let i = 0; i < count; i++) {
    const mist = document.createElement('div');
    mist.className = 'animation-element mist-cloud';
    container.appendChild(mist);
    
    const size = Math.random() * 300 + 200;
    mist.style.width = `${size}px`;
    mist.style.height = `${size / 2}px`;
    
    gsap.set(mist, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: 0
    });
    
    gsap.to(mist, {
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 4 + 4,
      yoyo: true,
      repeat: -1
    });
    
    gsap.to(mist, {
      x: `+=${Math.random() * 100 - 50}`,
      duration: Math.random() * 20 + 20,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }
};

const createWispsAnimation = (container: HTMLElement, intensity: string) => {
  const count = intensity === 'low' ? 5 : intensity === 'medium' ? 10 : 15;
  
  for (let i = 0; i < count; i++) {
    const wisp = document.createElement('div');
    wisp.className = 'animation-element spirit-wisp';
    container.appendChild(wisp);
    
    const size = Math.random() * 15 + 5;
    wisp.style.width = `${size}px`;
    wisp.style.height = `${size}px`;
    
    gsap.set(wisp, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: 0,
      scale: 0.5
    });
    
    animateWisp(wisp);
  }
};

const animateWisp = (wisp: HTMLElement) => {
  const duration = Math.random() * 5 + 3;
  
  gsap.to(wisp, {
    opacity: 0.7,
    scale: 1,
    duration: duration / 2,
    ease: 'power1.inOut',
    onComplete: () => {
      gsap.to(wisp, {
        opacity: 0,
        scale: 0.5,
        duration: duration / 2,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.set(wisp, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          });
          animateWisp(wisp);
        }
      });
    }
  });
  
  gsap.to(wisp, {
    x: `+=${Math.random() * 100 - 50}`,
    y: `+=${Math.random() * 100 - 50}`,
    duration: duration,
    ease: 'sine.inOut'
  });
};

const createTalismanGlow = (container: HTMLElement, intensity: string) => {
  const talisman = document.createElement('div');
  talisman.className = 'animation-element talisman-glow';
  container.appendChild(talisman);
  
  gsap.set(talisman, {
    left: '50%',
    top: '50%',
    xPercent: -50,
    yPercent: -50,
    opacity: 0.7,
    scale: 1
  });
  
  gsap.to(talisman, {
    opacity: 1,
    scale: 1.2,
    duration: 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });
  
  // Add pulsing light rays
  const rayCount = intensity === 'low' ? 4 : intensity === 'medium' ? 6 : 8;
  
  for (let i = 0; i < rayCount; i++) {
    const ray = document.createElement('div');
    ray.className = 'animation-element talisman-ray';
    container.appendChild(ray);
    
    const angle = (i / rayCount) * 360;
    const length = 100;
    
    gsap.set(ray, {
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: 0,
      rotation: angle,
      height: 0,
      opacity: 0.5
    });
    
    gsap.to(ray, {
      height: length,
      opacity: 0.8,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.2
    });
  }
};

const createYokaiManifestation = (container: HTMLElement, intensity: string) => {
  // Dark mist effect
  const mistCount = intensity === 'low' ? 5 : intensity === 'medium' ? 8 : 12;
  
  for (let i = 0; i < mistCount; i++) {
    const darkMist = document.createElement('div');
    darkMist.className = 'animation-element yokai-mist';
    container.appendChild(darkMist);
    
    const size = Math.random() * 200 + 100;
    darkMist.style.width = `${size}px`;
    darkMist.style.height = `${size}px`;
    
    gsap.set(darkMist, {
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      opacity: 0,
      scale: 0.5
    });
    
    gsap.to(darkMist, {
      y: Math.random() * window.innerHeight,
      opacity: 0.7,
      scale: 1,
      duration: 3 + Math.random() * 2,
      ease: 'power2.out',
      delay: i * 0.3
    });
    
    gsap.to(darkMist, {
      x: `+=${Math.random() * 100 - 50}`,
      rotation: Math.random() * 360,
      duration: 10,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  }
  
  // Glowing eyes effect
  if (intensity !== 'low') {
    const eyes = document.createElement('div');
    eyes.className = 'animation-element yokai-eyes';
    container.appendChild(eyes);
    
    gsap.set(eyes, {
      left: '50%',
      top: '40%',
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.5
    });
    
    gsap.to(eyes, {
      opacity: 0.9,
      scale: 1,
      duration: 2,
      delay: 2,
      ease: 'power2.inOut'
    });
    
    gsap.to(eyes, {
      y: '+=10',
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  }
};

const createLightBurst = (container: HTMLElement, intensity: string) => {
  const burst = document.createElement('div');
  burst.className = 'animation-element light-burst-circle';
  container.appendChild(burst);
  
  gsap.set(burst, {
    left: '50%',
    top: '50%',
    xPercent: -50,
    yPercent: -50,
    opacity: 0,
    scale: 0.1
  });
  
  gsap.to(burst, {
    opacity: 1,
    scale: 2,
    duration: 1,
    ease: 'power2.out',
    onComplete: () => {
      gsap.to(burst, {
        opacity: 0,
        scale: 3,
        duration: 1.5,
        ease: 'power2.in'
      });
    }
  });
  
  // Light rays
  const rayCount = intensity === 'low' ? 8 : intensity === 'medium' ? 12 : 16;
  
  for (let i = 0; i < rayCount; i++) {
    const ray = document.createElement('div');
    ray.className = 'animation-element light-ray';
    container.appendChild(ray);
    
    const angle = (i / rayCount) * 360;
    
    gsap.set(ray, {
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
      rotation: angle,
      opacity: 0,
      width: 0,
      height: 3
    });
    
    gsap.to(ray, {
      opacity: 0.8,
      width: '100%',
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(ray, {
          opacity: 0,
          duration: 1,
          ease: 'power2.in'
        });
      }
    });
  }
};

const createSwordSlash = (container: HTMLElement, intensity: string) => {
  const slash = document.createElement('div');
  slash.className = 'animation-element sword-slash';
  container.appendChild(slash);
  
  gsap.set(slash, {
    left: '30%',
    top: '50%',
    xPercent: -50,
    yPercent: -50,
    rotation: -45,
    scaleX: 0,
    opacity: 0
  });
  
  gsap.to(slash, {
    scaleX: 1,
    opacity: 1,
    duration: 0.2,
    ease: 'power1.in',
    onComplete: () => {
      gsap.to(slash, {
        opacity: 0,
        duration: 0.5,
        delay: 0.1,
        ease: 'power1.out'
      });
    }
  });
  
  // Add afterimages for more intense slashes
  if (intensity !== 'low') {
    const afterimageCount = intensity === 'medium' ? 2 : 4;
    
    for (let i = 0; i < afterimageCount; i++) {
      const afterimage = document.createElement('div');
      afterimage.className = 'animation-element sword-slash afterimage';
      container.appendChild(afterimage);
      
      gsap.set(afterimage, {
        left: '30%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        rotation: -45,
        scaleX: 0,
        opacity: 0
      });
      
      gsap.to(afterimage, {
        scaleX: 1,
        opacity: 0.5,
        duration: 0.2,
        delay: 0.05 * (i + 1),
        ease: 'power1.in',
        onComplete: () => {
          gsap.to(afterimage, {
            opacity: 0,
            duration: 0.3,
            ease: 'power1.out'
          });
        }
      });
    }
  }
};

const createHarmonyGlow = (container: HTMLElement, intensity: string) => {
  // Create central glow
  const centralGlow = document.createElement('div');
  centralGlow.className = 'animation-element harmony-central-glow';
  container.appendChild(centralGlow);
  
  gsap.set(centralGlow, {
    left: '50%',
    top: '50%',
    xPercent: -50,
    yPercent: -50,
    opacity: 0,
    scale: 0.5
  });
  
  gsap.to(centralGlow, {
    opacity: 0.8,
    scale: 1,
    duration: 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });
  
  // Create orbiting particles
  const particleCount = intensity === 'low' ? 10 : intensity === 'medium' ? 20 : 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'animation-element harmony-particle';
    container.appendChild(particle);
    
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const radius = Math.random() * 100 + 50;
    const angle = Math.random() * 360;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    
    gsap.set(particle, {
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
      x: x,
      y: y,
      opacity: Math.random() * 0.5 + 0.3
    });
    
    // Orbit animation
    gsap.to(particle, {
      duration: Math.random() * 10 + 10,
      rotation: '+=360',
      repeat: -1,
      ease: 'none',
      onUpdate: function() {
        const progress = this.progress();
        const newAngle = angle + progress * 360;
        const newX = Math.cos(newAngle * Math.PI / 180) * radius;
        const newY = Math.sin(newAngle * Math.PI / 180) * radius;
        gsap.set(particle, { x: newX, y: newY });
      }
    });
    
    // Pulsing animation
    gsap.to(particle, {
      opacity: `+=${Math.random() * 0.3}`,
      scale: Math.random() * 0.5 + 1,
      duration: Math.random() * 2 + 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
};

export default AnimatedBackground;