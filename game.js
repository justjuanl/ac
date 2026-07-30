/* ==========================================================================
   BOTHROPS HUNT: MISIÓN HERPETOLÓGICA DE ANGGIE - MOTOR DE JUEGO (game.js)
   ========================================================================== */

// --- Base de Datos de Especies del Género Bothrops ---
const BOTHROPS_SPECIES = [
  { id: 'atrox', name: 'Bothrops atrox', common: 'Jergón del Oriente', color: '#d7ccc8', speed: 1.8, points: 100 },
  { id: 'asper', name: 'Bothrops asper', common: 'Terciopelo / Barba Amarilla', color: '#bcaaa4', speed: 2.2, points: 120 },
  { id: 'jararaca', name: 'Bothrops jararaca', common: 'Jararaca del Sur', color: '#a1887f', speed: 2.0, points: 110 },
  { id: 'venezuelensis', name: 'Bothrops venezuelensis', common: 'Tigra Mariposa', color: '#ffb74d', speed: 2.4, points: 150 },
  { id: 'bilineatus', name: 'Bothrops bilineatus', common: 'Víbora de Palma (Verde)', color: '#76ff03', speed: 2.7, points: 200, nocturnal: true },
  { id: 'taeniatus', name: 'Bothrops taeniatus', common: 'Jergón de Musgo', color: '#64dd17', speed: 2.5, points: 180, nocturnal: true },
  { id: 'pictus', name: 'Bothrops pictus', common: 'Jergón de Costa', color: '#ffb300', speed: 2.3, points: 160, nocturnal: true }
];

// --- Paleta de Colores ---
const COLOR_PALETTE = {
  '.': 'transparent',
  'W': '#ffffff', // Blanco
  'x': '#000000', // Negro
  'P': '#ffdbac', // Piel Anggie
  'p': '#e0ac69', // Piel Jaime Péfaur
  'K': '#5c4033', // Marrón
  'g': '#b0bec5', // Cabello gris Jaime Péfaur
  'Y': '#ffea00', // Amarillo Xpi / Oro
  'O': '#ff7a00', // Naranja
  'B': '#1976d2', // Azul pantalones
  'R': '#d32f2f', // Rojo
  'G': '#2e7d32', // Verde oscuro árbol
  'L': '#81c784', // Verde claro
  'V': '#388e3c', // Chaleco herpetóloga Anggie
  'A': '#9e9e9e', // Gris metal
  'D': '#1d522c', // Arbusto
  'S': '#4e342e', // Tronco
  'H': '#ff80ab', // Rosa
  'C': '#8d6e63', // Madera cofre
  'J': '#d7ccc8'  // Chaqueta beige Jaime
};

// --- Sprites Pixel Art ---
const SPRITES = {
  // 1. Anggie (Herpetóloga con coleta y sombrero)
  anggie: {
    down: [
      [
        "....KKKK....",
        "...KPPPPK...",
        "..KPPPPPPK..",
        "..KxPxxPxK..",
        "..KPPPPPPK..",
        "...PPVPPP...",
        "..VVVVVVVV..",
        ".B.VVVVVV.B.",
        "...VVVVVV...",
        "...BB..BB...",
        "...KK..KK...",
        "............"
      ],
      [
        "....KKKK....",
        "...KPPPPK...",
        "..KPPPPPPK..",
        "..KxPxxPxK..",
        "..KPPPPPPK..",
        "...PPVPPP...",
        "..VVVVVVVV..",
        ".BA.VVVV..B.",
        "...VVVVVV...",
        "...BB..B....",
        "....K..KK...",
        "............"
      ],
      [
        "....KKKK....",
        "...KPPPPK...",
        "..KPPPPPPK..",
        "..KxPxxPxK..",
        "..KPPPPPPK..",
        "...PPVPPP...",
        "..VVVVVVVV..",
        ".B..VVVV.AB.",
        "...VVVVVV...",
        "....B..BB...",
        "...KK..K....",
        "............"
      ]
    ],
    up: [
      [
        "....KKKK....",
        "...KKKKKK...",
        "..KKKKKKKK..",
        "..KKKKKKKK..",
        "..KKKKKKKK..",
        "...KKKKKK...",
        "..VVVVVVVV..",
        ".B.VVVVVV.B.",
        "...VVVVVV...",
        "...BB..BB...",
        "...KK..KK...",
        "............"
      ],
      [
        "....KKKK....",
        "...KKKKKK...",
        "..KKKKKKKK..",
        "..KKKKKKKK..",
        "..KKKKKKKK..",
        "...KKKKKK...",
        "..VVVVVVVV..",
        ".BA.VVVV..B.",
        "...VVVVVV...",
        "...BB..B....",
        "....K..KK...",
        "............"
      ],
      [
        "....KKKK....",
        "...KKKKKK...",
        "..KKKKKKKK..",
        "..KKKKKKKK..",
        "..KKKKKKKK..",
        "...KKKKKK...",
        "..VVVVVVVV..",
        ".B..VVVV.AB.",
        "...VVVVVV...",
        "....B..BB...",
        "...KK..K....",
        "............"
      ]
    ],
    side: [
      [
        ".....KKK....",
        "....KPPPP...",
        "...KPPPPPP..",
        "...KxPPPP...",
        "...KPPPP....",
        "....KPPV....",
        "....VVVV....",
        "....VVVV....",
        "...VVVVVV...",
        "....BB.BB...",
        "....KK.KK...",
        "............"
      ],
      [
        ".....KKK....",
        "....KPPPP...",
        "...KPPPPPP..",
        "...KxPPPP...",
        "...KPPPP....",
        "....KPPV....",
        "....VVVV....",
        "...VVVVV....",
        "...VVVV.....",
        "....B..B....",
        "....K..K....",
        "............"
      ],
      [
        ".....KKK....",
        "....KPPPP...",
        "...KPPPPPP..",
        "...KxPPPP...",
        "...KPPPP....",
        "....KPPV....",
        "....VVVV....",
        "....VVVVV...",
        "....VVVVVV..",
        "....BB..B...",
        "....KK..K...",
        "............"
      ]
    ]
  },

  // 2. Jaime Péfaur (Pelo corto gris, gafas oscuras x, chaqueta beige)
  pefaur: [
    "....gggg....",
    "...gppgpg...",
    "..gpxxxpxg..",
    "..gpxxxpxg..",
    "..gppppppg..",
    "...ppJppp...",
    "..JJJJJJJJ..",
    ".J.JJJJJJ.J.",
    "...JJJJJJ...",
    "...BB..BB...",
    "...KK..KK..."
  ],

  // 3. Serpiente Bothrops (Víbora con cabeza triangular y cuerpo en zig-zag)
  snake: [
    [
      "...KKKK.....",
      "..KYYYYK....",
      ".KYxKKxYK...",
      "..KYYYYK....",
      "...KKKK.....",
      "....KKK.....",
      ".....KYYYY..",
      "......YYYYK.",
      ".......KKKK."
    ],
    [
      "...KKKK.....",
      "..KYYYYK....",
      ".KYxKKxYK...",
      "..KYYYYK....",
      "...KKKK.....",
      "....KKKK....",
      "...YYYYK....",
      "..KYYYY.....",
      "..KKKK......"
    ]
  ],

  // 4. Bebida Energética Xpi (Lata amarilla brillante)
  xpi: [
    "..YYYY..",
    ".YYYYYY.",
    ".YxYYxY.",
    ".YYYYYY.",
    ".YYWYYY.",
    ".YYYYYY.",
    ".YYYYYY.",
    "..YYYY.."
  ],

  // 5. Cofre de la Linterna Frontal
  chest: {
    closed: [
      "..CCCCCC..",
      ".CCCCCCCC.",
      "CCCCYYCCCC",
      "CCCCCCCCCC",
      "CCCCCCCCCC",
      ".CCCCCCCC."
    ],
    open: [
      "..YYYY....",
      ".YYYYYY...",
      "CCCCCCCCCC",
      "CCCCAACCCC",
      "CCCCCCCCCC",
      ".CCCCCCCC."
    ]
  },

  // Decoraciones del entorno
  tree: [
    "......GGGGGG......",
    "....GGGGGGGGGG....",
    "...GGGGGGGGGGGG...",
    "..GGGGGGGGGGGGGG..",
    "..GGGGGGGGGGGGGG..",
    "...GGGGGGGGGGGG...",
    "....GGGGGGGGGG....",
    "......GGGGGG......",
    "........SS........",
    "........SS........",
    "........SS........",
    ".......SSSS......."
  ],
  bush: [
    "....DDDD....",
    "..DDDDDDDD..",
    ".DDDDDDDDDD.",
    "DDDDDDDDDDDD",
    "DDDDDDDDDDDD",
    ".DDDDDDDDDD.",
    "..DDDDDDDD.."
  ]
};

// --- Configuración y Canvas ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

const MAP_WIDTH = 1400;
const MAP_HEIGHT = 1400;

// Estado Narrativo del Juego:
// 'phase1_day', 'cutscene_pefaur1', 'phase2_afternoon', 'cutscene_night', 'phase3_chest', 'phase4_night', 'cutscene_victory', 'gameover'
let storyState = 'phase1_day';
let gameState = 'menu'; // menu, playing, paused, gameover

let score = 0;
let highScore = parseInt(localStorage.getItem('bothrops_hunt_highscore')) || 0;
let caughtSpeciesCount = 0;
let capturedSpeciesCatalog = [];

// Transición de Noche
let nightOpacity = 0.0;
let targetNightOpacity = 0.0;
let hasHeadlamp = false;

// Entidades principales
let player = null; // Anggie
let pefaurNPC = null; // Jaime Péfaur
let chestEntity = null;
let snakes = [];
let obstacles = [];
let particles = [];
let camera = { x: 0, y: 0 };

// --- Controladores de Entrada ---
const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

let joystickActive = false;
let joystickStartPos = { x: 0, y: 0 };
const JOYSTICK_MAX_RADIUS = 50;
let touchInputX = 0;
let touchInputY = 0;

// --- DIBUJAR SPRITE ---
function drawPixelSprite(sprite, x, y, flipX = false, scale = 2.5, customColorMap = null) {
  if (!sprite) return;
  const rows = sprite.length;
  const cols = sprite[0].length;
  
  ctx.save();
  ctx.translate(x, y);
  
  if (flipX) {
    ctx.scale(-1, 1);
    ctx.translate(-cols * scale, 0);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const char = sprite[r][c];
      if (char !== '.') {
        let color = COLOR_PALETTE[char] || '#000000';
        if (customColorMap && customColorMap[char]) {
          color = customColorMap[char];
        }
        ctx.fillStyle = color;
        ctx.fillRect(c * scale, r * scale, scale + 0.3, scale + 0.3);
      }
    }
  }
  ctx.restore();
}

// --- CLASES Y ENTIDADES ---

// Partículas (Brillos, Sudor, Texto)
class Particle {
  constructor(x, y, color, vx, vy, life, size = 4, type = 'pixel') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.maxLife = life;
    this.size = size;
    this.type = type;
    this.textValue = '';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    if (this.type === 'text') this.vy -= 0.04;
  }

  draw() {
    const alpha = this.life / this.maxLife;
    ctx.save();
    
    if (this.type === 'pixel') {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(this.x - camera.x, this.y - camera.y, this.size, this.size);
    } 
    else if (this.type === 'text') {
      ctx.font = 'bold 13px "Press Start 2P", monospace';
      ctx.fillStyle = this.color;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.globalAlpha = alpha;
      ctx.strokeText(this.textValue, this.x - camera.x, this.y - camera.y);
      ctx.fillText(this.textValue, this.x - camera.x, this.y - camera.y);
    }
    
    ctx.restore();
  }
}

// Obstáculos
class Obstacle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.radius = type === 'tree' ? 14 : 0;
  }

  draw() {
    if (this.type === 'tree') {
      drawPixelSprite(SPRITES.tree, this.x - 22.5, this.y - 60, false, 2.5);
    } else {
      drawPixelSprite(SPRITES.bush, this.x - 15, this.y - 12, false, 2.5);
    }
  }
}

// Jaime Péfaur NPC
class PefaurNPC {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 18;
    this.hasItem = true; // Sostiene la lata Xpi
  }

  draw() {
    drawPixelSprite(SPRITES.pefaur, this.x - 15, this.y - 25, false, 2.5);
    
    if (this.hasItem) {
      // Dibujar lata Xpi flotando junto a él
      const floatY = Math.sin(Date.now() / 200) * 3;
      drawPixelSprite(SPRITES.xpi, this.x + 16, this.y - 20 + floatY, false, 1.8);
    }
  }
}

// Cofre con Linterna
class ChestEntity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.isOpen = false;
  }

  draw() {
    const sprite = this.isOpen ? SPRITES.chest.open : SPRITES.chest.closed;
    drawPixelSprite(sprite, this.x - 12, this.y - 12, false, 2.5);
    
    if (!this.isOpen) {
      // Pillar de luz dorada señalando el cofre
      ctx.save();
      ctx.fillStyle = 'rgba(255, 234, 0, 0.2)';
      ctx.beginPath();
      ctx.moveTo(this.x - camera.x - 10, this.y - camera.y);
      ctx.lineTo(this.x - camera.x + 10, this.y - camera.y);
      ctx.lineTo(this.x - camera.x + 25, 0);
      ctx.lineTo(this.x - camera.x - 25, 0);
      ctx.fill();
      ctx.restore();
    }
  }
}

// Serpiente Bothrops
class BothropsSnake {
  constructor(x, y, speciesData) {
    this.x = x;
    this.y = y;
    this.species = speciesData;
    this.radius = 14;
    this.speed = speciesData.speed;
    
    this.frame = 0;
    this.animTimer = 0;
    this.flipX = false;
    this.state = 'moving';
    
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
  }

  update() {
    this.animTimer += 0.12;
    this.frame = Math.floor(this.animTimer) % 2;

    this.x += this.vx;
    this.y += this.vy;

    this.flipX = this.vx < 0;

    // Rebotar en bordes
    if (this.x < 50 || this.x > MAP_WIDTH - 50) this.vx *= -1;
    if (this.y < 50 || this.y > MAP_HEIGHT - 50) this.vy *= -1;

    // Cambiar rumbo aleatorio
    if (Math.random() < 0.02) {
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * this.speed;
      this.vy = Math.sin(angle) * this.speed;
    }
  }

  draw() {
    const customMap = { 'Y': this.species.color };
    drawPixelSprite(SPRITES.snake[this.frame], this.x - 15, this.y - 12, this.flipX, 2.2, customMap);
  }
}

// Protagonista: Anggie
class AnggiePlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 14;
    this.baseSpeed = 3.5;
    this.speed = this.baseSpeed;
    
    this.dir = 'down';
    this.flipX = false;
    this.frame = 0;
    this.walkAnimTimer = 0;
    this.isMoving = false;
    
    this.isTired = false;
    this.xpiBoostTimer = 0;
    this.catchRadius = 26;
  }

  update() {
    this.isMoving = false;
    let dx = 0;
    let dy = 0;

    if (joystickActive) {
      dx = touchInputX;
      dy = touchInputY;
    } else {
      if (keys.w || keys.ArrowUp) dy = -1;
      if (keys.s || keys.ArrowDown) dy = 1;
      if (keys.a || keys.ArrowLeft) dx = -1;
      if (keys.d || keys.ArrowRight) dx = 1;

      if (dx !== 0 && dy !== 0) {
        const len = Math.hypot(dx, dy);
        dx /= len;
        dy /= len;
      }
    }

    // Efecto de Cansancio vs Boost Xpi
    if (this.isTired) {
      this.speed = 1.4; // Muy lenta por fatiga
      if (Math.random() < 0.1) {
        // Gotas de sudor
        particles.push(new Particle(
          this.x + (Math.random() - 0.5) * 10,
          this.y - 20,
          '#64b5f6',
          0,
          0.8,
          20,
          3
        ));
      }
    } else if (this.xpiBoostTimer > 0) {
      this.xpiBoostTimer--;
      this.speed = 4.6; // ¡Super velocidad tras beber Xpi!
      
      if (Math.random() < 0.3) {
        particles.push(new Particle(
          this.x + (Math.random() - 0.5) * 12,
          this.y + 5,
          '#ffea00',
          -dx * 1.5,
          -dy * 1.5,
          15,
          3
        ));
      }
    } else {
      this.speed = this.baseSpeed;
    }

    if (dx !== 0 || dy !== 0) {
      this.isMoving = true;
      this.x += dx * this.speed;
      this.y += dy * this.speed;

      if (Math.abs(dx) > Math.abs(dy)) {
        this.dir = 'side';
        this.flipX = dx < 0;
      } else {
        this.dir = dy > 0 ? 'down' : 'up';
        this.flipX = false;
      }

      this.walkAnimTimer += 0.2;
      this.frame = (Math.floor(this.walkAnimTimer) % 2) + 1;

      this.x = Math.max(35, Math.min(MAP_WIDTH - 35, this.x));
      this.y = Math.max(35, Math.min(MAP_HEIGHT - 35, this.y));

      // Colisión con árboles
      for (const obs of obstacles) {
        if (obs.type === 'tree') {
          const distanceX = this.x - obs.x;
          const distanceY = this.y - obs.y;
          const distance = Math.hypot(distanceX, distanceY);
          const minDistance = this.radius + obs.radius;
          
          if (distance < minDistance) {
            const angle = Math.atan2(distanceY, distanceX);
            this.x = obs.x + Math.cos(angle) * minDistance;
            this.y = obs.y + Math.sin(angle) * minDistance;
          }
        }
      }
    } else {
      this.frame = 0;
    }
  }

  draw() {
    const sprite = SPRITES.anggie[this.dir][this.frame];
    drawPixelSprite(sprite, this.x - 15, this.y - 30, this.flipX, 2.5);
  }
}

// --- GENERACIÓN DEL BOSQUE ---
function generateMap() {
  obstacles = [];
  snakes = [];
  particles = [];
  
  // Árboles
  let attempts = 0;
  while (obstacles.filter(o => o.type === 'tree').length < 30 && attempts < 200) {
    const rx = Math.random() * (MAP_WIDTH - 200) + 100;
    const ry = Math.random() * (MAP_HEIGHT - 200) + 100;
    if (Math.hypot(rx - MAP_WIDTH/2, ry - MAP_HEIGHT/2) > 120) {
      if (!obstacles.some(o => Math.hypot(o.x - rx, o.y - ry) < 65)) {
        obstacles.push(new Obstacle(rx, ry, 'tree'));
      }
    }
    attempts++;
  }

  // Arbustos
  for (let i = 0; i < 20; i++) {
    const rx = Math.random() * (MAP_WIDTH - 200) + 100;
    const ry = Math.random() * (MAP_HEIGHT - 200) + 100;
    obstacles.push(new Obstacle(rx, ry, 'bush'));
  }

  // Spawn inicial de Bothrops diurnas
  spawnBothropsBatch(false, 4);
}

// Spawnea serpientes filtrando diurnas o nocturnas
function spawnBothropsBatch(isNocturnal = false, count = 3) {
  const available = BOTHROPS_SPECIES.filter(s => isNocturnal ? s.nocturnal : !s.nocturnal);
  
  for (let i = 0; i < count; i++) {
    const species = available[Math.floor(Math.random() * available.length)];
    const rx = Math.random() * (MAP_WIDTH - 200) + 100;
    const ry = Math.random() * (MAP_HEIGHT - 200) + 100;
    snakes.push(new BothropsSnake(rx, ry, species));
  }
}

// --- SISTEMA DE CORUTINAS Y DIÁLOGOS NARRATIVOS ---
const DIALOGS = {
  pefaur1: [
    {
      speaker: 'Jaime Péfaur',
      title: 'Herpetólogo Senior',
      text: '¡Hola Anggie! Veo que has estado buscando Bothrops sin descanso y estás muy cansada.'
    },
    {
      speaker: 'Jaime Péfaur',
      title: 'Herpetólogo Senior',
      text: 'Toma esta lata helada de Xpi amarilla. Te devolverá las energías para continuar el muestreo.'
    },
    {
      speaker: 'Anggie',
      title: 'Investigadora Herpetóloga',
      text: '¡Muchas gracias, Jaime! Esta Xpi helada es justo lo que necesitaba.'
    }
  ],
  victory: [
    {
      speaker: 'Jaime Péfaur',
      title: 'Herpetólogo Senior',
      text: '¡Excelente trabajo, Anggie! Ya tenemos suficiente material biológico para la investigación.'
    },
    {
      speaker: 'Anggie',
      title: 'Investigadora Herpetóloga',
      text: '¡Genial! Hemos registrado especímenes valiosos del género Bothrops. ¡Rumbo al laboratorio!'
    }
  ]
};

let currentDialogQueue = [];
let currentDialogIndex = 0;
let dialogCallback = null;

function startCutsceneDialog(dialogKey, callback) {
  currentDialogQueue = DIALOGS[dialogKey];
  currentDialogIndex = 0;
  dialogCallback = callback;
  
  showNextDialogStep();
  document.getElementById('dialog-modal').classList.remove('hidden');
}

function showNextDialogStep() {
  if (currentDialogIndex >= currentDialogQueue.length) {
    document.getElementById('dialog-modal').classList.add('hidden');
    if (dialogCallback) dialogCallback();
    return;
  }

  const step = currentDialogQueue[currentDialogIndex];
  document.getElementById('dialog-speaker-name').textContent = step.speaker;
  document.getElementById('dialog-speaker-title').textContent = step.title;
  document.getElementById('dialog-text').textContent = step.text;
  
  // Icono del retrato según hablante
  const portraitEl = document.getElementById('dialog-portrait');
  portraitEl.textContent = step.speaker.includes('Jaime') ? '🕶️' : '👩‍🔬';
  
  audio.playDialogBeep();
}

document.getElementById('btn-dialog-next').addEventListener('click', () => {
  currentDialogIndex++;
  showNextDialogStep();
});

// --- LÓGICA DE ACTUALIZACIÓN DEL JUEGO (TICK) ---
function updateGame() {
  if (gameState !== 'playing') return;

  // Transición suave de luz de noche
  nightOpacity += (targetNightOpacity - nightOpacity) * 0.05;

  // 1. Actualizar Jugadora
  player.update();

  // 2. Cámara suave
  camera.x += ((player.x - canvasWidth / 2) - camera.x) * 0.12;
  camera.y += ((player.y - canvasHeight / 2) - camera.y) * 0.12;
  camera.x = Math.max(0, Math.min(MAP_WIDTH - canvasWidth, camera.x));
  camera.y = Math.max(0, Math.min(MAP_HEIGHT - canvasHeight, camera.y));

  // 3. Lógica de PNJ Jaime Péfaur si está activo
  if (pefaurNPC) {
    const distToPefaur = Math.hypot(player.x - pefaurNPC.x, player.y - pefaurNPC.y);
    
    // Si Anggie está cansada y se acerca a Jaime Péfaur
    if (storyState === 'phase1_tired' && distToPefaur < 45) {
      storyState = 'cutscene_pefaur1';
      startCutsceneDialog('pefaur1', () => {
        // Bebida Xpi entregada
        pefaurNPC.hasItem = false;
        player.isTired = false;
        player.xpiBoostTimer = 600; // 10 segundos de super impulso
        audio.playXpiDrink();
        
        storyState = 'phase2_afternoon';
        updateObjectiveText("¡Energía al 100%! Captura 2 serpientes Bothrops más");
        spawnBothropsBatch(false, 3);
      });
    } 
    else if (storyState === 'phase4_night_done' && distToPefaur < 45) {
      storyState = 'cutscene_victory';
      startCutsceneDialog('victory', () => {
        finishGameVictory();
      });
    }
  }

  // 4. Lógica de Cofre con Linterna
  if (chestEntity && !chestEntity.isOpen) {
    const distToChest = Math.hypot(player.x - chestEntity.x, player.y - chestEntity.y);
    if (distToChest < 40) {
      chestEntity.isOpen = true;
      hasHeadlamp = true;
      audio.playChestOpen();
      
      storyState = 'phase4_night';
      updateObjectiveText("¡Linterna de cabeza equipada! Captura 3 Bothrops nocturnas");
      spawnBothropsBatch(true, 4); // Serpientes de noche (bilineatus, taeniatus, etc.)
    }
  }

  // 5. Actualizar Serpientes y Capturas
  for (let i = snakes.length - 1; i >= 0; i--) {
    const snake = snakes[i];
    snake.update();

    const dist = Math.hypot(player.x - snake.x, player.y - snake.y);
    if (dist < player.catchRadius) {
      catchBothrops(snake, i);
    }
  }

  // 6. Actualizar Partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life <= 0) particles.splice(i, 1);
  }
}

// --- CAPTURA DE BOTHROPS Y PROGRESIÓN NARRATIVA ---
function catchBothrops(snake, index) {
  snakes.splice(index, 1);
  caughtSpeciesCount++;
  score += snake.species.points;
  
  if (!capturedSpeciesCatalog.some(s => s.id === snake.species.id)) {
    capturedSpeciesCatalog.push(snake.species);
  }

  document.getElementById('hud-score').textContent = caughtSpeciesCount;
  audio.playCatch();

  if (navigator.vibrate) navigator.vibrate(50);

  // Mostrar Banner Flotante de Especie
  showSpeciesDiscovery(snake.species);

  // Partículas científicas de éxito
  for (let i = 0; i < 14; i++) {
    const angle = Math.random() * Math.PI * 2;
    particles.push(new Particle(
      snake.x, snake.y, snake.species.color,
      Math.cos(angle) * 2, Math.sin(angle) * 2,
      30, 4
    ));
  }

  // --- TRANSICIONES DE LA HISTORIA ---
  
  // FASE 1: Tras capturar 3 serpientes diurnas, Anggie se cansa
  if (storyState === 'phase1_day' && caughtSpeciesCount >= 3) {
    storyState = 'phase1_tired';
    player.isTired = true;
    updateObjectiveText("¡Anggie está exhausta! Encuentra a Jaime Péfaur");
    
    // Aparece Jaime Péfaur cerca
    pefaurNPC = new PefaurNPC(player.x + 120, player.y - 50);
  }
  
  // FASE 2: Tras capturar 2 serpientes más (5 total), se anochece
  else if (storyState === 'phase2_afternoon' && caughtSpeciesCount >= 5) {
    storyState = 'phase3_chest';
    targetNightOpacity = 0.88; // Noche cerrada
    audio.playNightTransition();
    
    updateObjectiveText("¡Se hizo de noche! Encuentra el cofre con la linterna");
    
    // Aparece cofre con linterna
    chestEntity = new ChestEntity(player.x - 140, player.y + 100);
  }

  // FASE 4: Tras capturar 3 serpientes nocturnas (8 total), Jaime aparece para finalizar
  else if (storyState === 'phase4_night' && caughtSpeciesCount >= 8) {
    storyState = 'phase4_night_done';
    updateObjectiveText("¡Muestreo completo! Habla con Jaime Péfaur");
    
    // Aparece Jaime Péfaur de nuevo
    pefaurNPC = new PefaurNPC(player.x + 100, player.y);
  }
}

// Banner de Especie Capturada
function showSpeciesDiscovery(species) {
  const banner = document.getElementById('species-banner');
  document.getElementById('species-name').textContent = species.name;
  document.getElementById('species-common').textContent = `(${species.common})`;
  
  banner.classList.remove('hidden');
  
  setTimeout(() => {
    banner.classList.add('hidden');
  }, 2800);
}

function updateObjectiveText(text) {
  document.getElementById('obj-text').textContent = text;
}

// --- RENDERIZADO Y LUZ NOCTURNA ---
function drawGame() {
  ctx.fillStyle = '#1b3f27';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  // Cuadrícula sutil
  ctx.strokeStyle = 'rgba(29, 82, 44, 0.4)';
  ctx.lineWidth = 2;
  for (let x = 0; x <= MAP_WIDTH; x += 100) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, MAP_HEIGHT); ctx.stroke();
  }
  for (let y = 0; y <= MAP_HEIGHT; y += 100) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(MAP_WIDTH, y); ctx.stroke();
  }

  // Bordes del mapa
  ctx.fillStyle = '#0f2214';
  ctx.fillRect(0, 0, MAP_WIDTH, 20);
  ctx.fillRect(0, MAP_HEIGHT - 20, MAP_WIDTH, 20);
  ctx.fillRect(0, 0, 20, MAP_HEIGHT);
  ctx.fillRect(MAP_WIDTH - 20, 0, 20, MAP_HEIGHT);

  // Entidades Y-Sorted
  const renderQueue = [];
  renderQueue.push(player);
  snakes.forEach(s => renderQueue.push(s));
  obstacles.forEach(o => renderQueue.push(o));
  if (pefaurNPC) renderQueue.push(pefaurNPC);
  if (chestEntity) renderQueue.push(chestEntity);

  renderQueue.sort((a, b) => a.y - b.y);
  renderQueue.forEach(entity => entity.draw());

  ctx.restore();

  // Partículas
  particles.forEach(pt => pt.draw());

  // --- EFECTO DE NOCHE Y LINTERNA FRONTAL ---
  if (nightOpacity > 0.05) {
    ctx.save();
    
    // Crear capa de oscuridad nocturna
    const nightCanvas = document.createElement('canvas');
    nightCanvas.width = canvasWidth;
    nightCanvas.height = canvasHeight;
    const nCtx = nightCanvas.getContext('2d');
    
    nCtx.fillStyle = `rgba(5, 12, 8, ${nightOpacity})`;
    nCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (hasHeadlamp) {
      // Recortar haz de luz de la linterna frontal de Anggie
      nCtx.globalCompositeOperation = 'destination-out';
      
      const px = player.x - camera.x;
      const py = player.y - camera.y - 10;
      
      // Cono de luz frontal
      const lightGrad = nCtx.createRadialGradient(px, py, 15, px, py, 140);
      lightGrad.addColorStop(0, 'rgba(0,0,0,1)');
      lightGrad.addColorStop(1, 'rgba(0,0,0,0)');
      
      nCtx.fillStyle = lightGrad;
      nCtx.beginPath();
      nCtx.arc(px, py, 140, 0, Math.PI * 2);
      nCtx.fill();
    }

    ctx.drawImage(nightCanvas, 0, 0);
    ctx.restore();
  }
}

function gameLoop() {
  updateGame();
  drawGame();
  if (gameState === 'playing' || gameState === 'paused') {
    requestAnimationFrame(gameLoop);
  }
}

// --- CONTROLES DE LA EXPEDICIÓN ---
function startGame() {
  gameState = 'playing';
  storyState = 'phase1_day';
  score = 0;
  caughtSpeciesCount = 0;
  capturedSpeciesCatalog = [];
  targetNightOpacity = 0.0;
  nightOpacity = 0.0;
  hasHeadlamp = false;
  pefaurNPC = null;
  chestEntity = null;

  document.getElementById('hud-score').textContent = '0';
  updateObjectiveText("Misión: Captura 3 serpientes Bothrops");

  player = new AnggiePlayer(MAP_WIDTH / 2, MAP_HEIGHT / 2);
  generateMap();

  camera.x = player.x - canvasWidth / 2;
  camera.y = player.y - canvasHeight / 2;

  showScreen('game-screen');

  audio.init();
  audio.resume();
  audio.startMusic();

  requestAnimationFrame(gameLoop);
}

function finishGameVictory() {
  gameState = 'gameover';
  audio.stopMusic();
  audio.playVictory();

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('bothrops_hunt_highscore', highScore);
    document.getElementById('menu-highscore').textContent = highScore;
  }

  document.getElementById('go-score').textContent = score;
  document.getElementById('go-caught').textContent = caughtSpeciesCount;

  // Llenar lista de especies
  const listEl = document.getElementById('species-list');
  listEl.innerHTML = '';
  capturedSpeciesCatalog.forEach(sp => {
    const li = document.createElement('li');
    li.innerHTML = `<span>🐍 <em>${sp.name}</em></span><span>${sp.common}</span>`;
    listEl.appendChild(li);
  });

  showScreen('gameover-screen');
}

function pauseGame() {
  if (gameState !== 'playing') return;
  gameState = 'paused';
  audio.stopMusic();
  document.getElementById('pause-screen').classList.add('active');
}

function resumeGame() {
  if (gameState !== 'paused') return;
  gameState = 'playing';
  document.getElementById('pause-screen').classList.remove('active');
  audio.startMusic();
  requestAnimationFrame(gameLoop);
}

function quitToMenu() {
  gameState = 'menu';
  audio.stopMusic();
  document.getElementById('pause-screen').classList.remove('active');
  showScreen('menu-screen');
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(scr => scr.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// --- TECLADO Y JOYSTICK ---
window.addEventListener('keydown', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (keys.hasOwnProperty(key)) {
    keys[key] = true;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
  }
});

window.addEventListener('keyup', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (keys.hasOwnProperty(key)) keys[key] = false;
});

// Joystick Virtual
const joystickContainer = document.getElementById('joystick-container');
const joystickBase = document.getElementById('joystick-base');
const joystickStick = document.getElementById('joystick-stick');

function handleJoystickStart(e) {
  e.preventDefault();
  joystickActive = true;
  const touch = e.touches ? e.touches[0] : e;
  const rect = joystickBase.getBoundingClientRect();
  joystickStartPos.x = rect.left + rect.width / 2;
  joystickStartPos.y = rect.top + rect.height / 2;
  updateJoystickPos(touch);
}

function handleJoystickMove(e) {
  if (!joystickActive) return;
  e.preventDefault();
  const touch = e.touches ? e.touches[0] : e;
  updateJoystickPos(touch);
}

function handleJoystickEnd() {
  joystickActive = false;
  touchInputX = 0;
  touchInputY = 0;
  joystickStick.style.transform = 'translate(0px, 0px)';
}

function updateJoystickPos(touch) {
  const dx = touch.clientX - joystickStartPos.x;
  const dy = touch.clientY - joystickStartPos.y;
  const distance = Math.hypot(dx, dy);
  
  let angle = Math.atan2(dy, dx);
  let stickX = dx;
  let stickY = dy;
  
  if (distance > JOYSTICK_MAX_RADIUS) {
    stickX = Math.cos(angle) * JOYSTICK_MAX_RADIUS;
    stickY = Math.sin(angle) * JOYSTICK_MAX_RADIUS;
  }
  
  joystickStick.style.transform = `translate(${stickX}px, ${stickY}px)`;
  touchInputX = stickX / JOYSTICK_MAX_RADIUS;
  touchInputY = stickY / JOYSTICK_MAX_RADIUS;
}

joystickContainer.addEventListener('touchstart', handleJoystickStart, { passive: false });
window.addEventListener('touchmove', handleJoystickMove, { passive: false });
window.addEventListener('touchend', handleJoystickEnd);

// BOTONES E INTERFAZ DOM
function toggleMuteUI() {
  const isMuted = audio.toggleMute();
  const label = isMuted ? '🔇' : '🔊';
  document.getElementById('btn-mute-menu').textContent = label;
  document.getElementById('btn-mute').textContent = label;
}

document.getElementById('btn-mute-menu').addEventListener('click', (e) => { e.stopPropagation(); audio.init(); toggleMuteUI(); });
document.getElementById('btn-mute').addEventListener('click', (e) => { e.stopPropagation(); toggleMuteUI(); });
document.getElementById('btn-play').addEventListener('click', () => { audio.playClick(); startGame(); });
document.getElementById('btn-pause').addEventListener('click', () => { audio.playClick(); pauseGame(); });

const instructionsModal = document.getElementById('instructions-modal');
document.getElementById('btn-instructions').addEventListener('click', () => { audio.init(); audio.playClick(); instructionsModal.classList.add('active'); });
document.getElementById('btn-close-instructions').addEventListener('click', () => { audio.playClick(); instructionsModal.classList.remove('active'); });

document.getElementById('btn-resume').addEventListener('click', () => { audio.playClick(); resumeGame(); });
document.getElementById('btn-restart').addEventListener('click', () => { audio.playClick(); document.getElementById('pause-screen').classList.remove('active'); startGame(); });
document.getElementById('btn-quit').addEventListener('click', () => { audio.playClick(); quitToMenu(); });

document.getElementById('btn-play-again').addEventListener('click', () => { audio.playClick(); startGame(); });
document.getElementById('btn-menu').addEventListener('click', () => { audio.playClick(); showScreen('menu-screen'); });

function resize() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = false;

  if (gameState === 'playing' || gameState === 'paused') drawGame();
}

window.addEventListener('resize', resize);
window.addEventListener('load', () => {
  document.getElementById('menu-highscore').textContent = highScore;
  resize();
});
