/* ==========================================================================
   BOTHROPS HUNT: SELVA NUBLADA VENEZOLANA
   Motor de Juego Principal (game.js) – Versión Expandida
   ========================================================================== */

'use strict';

// ════════════════════════════════════════════════════════════════
//  BASE DE DATOS CIENTÍFICA DE BOTHROPS
// ════════════════════════════════════════════════════════════════
const BOTHROPS_DB = [
  // --- DIURNAS ---
  { id:'atrox',        name:'Bothrops atrox',        common:'Jergón del Oriente',       color:'#c4a882', bodyColor:'#8b6914', pts:100, speed:1.7, nocturnal:false },
  { id:'asper',        name:'Bothrops asper',         common:'Terciopelo / Barba Amarilla', color:'#a0845c', bodyColor:'#5a3e10', pts:120, speed:2.0, nocturnal:false },
  { id:'jararaca',     name:'Bothrops jararaca',      common:'Jararaca del Sur',         color:'#b8a070', bodyColor:'#6b5118', pts:110, speed:1.9, nocturnal:false },
  { id:'venezuelensis',name:'Bothrops venezuelensis', common:'Tigra Mariposa',           color:'#c8a028', bodyColor:'#855200', pts:150, speed:2.4, nocturnal:false },
  { id:'lanceolatus',  name:'Bothrops lanceolatus',   common:'Fer-de-lance',             color:'#d4a862', bodyColor:'#7c5010', pts:130, speed:2.1, nocturnal:false },
  // --- NOCTURNAS ---
  { id:'bilineatus',   name:'Bothrops bilineatus',    common:'Víbora de Palma Verde',    color:'#5aba42', bodyColor:'#216a0a', pts:200, speed:2.8, nocturnal:true  },
  { id:'taeniatus',    name:'Bothrops taeniatus',     common:'Jergón de Musgo',          color:'#78a640', bodyColor:'#3a5c10', pts:180, speed:2.5, nocturnal:true  },
  { id:'pictus',       name:'Bothrops pictus',        common:'Jergón de Costa',          color:'#c8b428', bodyColor:'#7a6800', pts:160, speed:2.3, nocturnal:true  },
  { id:'alternatus',   name:'Bothrops alternatus',    common:'Crucera / Urutú',          color:'#8a6040', bodyColor:'#422010', pts:190, speed:2.6, nocturnal:true  },
];

// ════════════════════════════════════════════════════════════════
//  PALETA DE COLORES DEL MOTOR PIXEL ART
// ════════════════════════════════════════════════════════════════
const C = {
  '.': null,                // transparente
  // Piel y cuerpo Anggie
  'P': '#e8b88a',           // piel base cálida
  'p': '#d09070',           // piel sombra
  'K': '#1a0e08',           // cabello negro
  'k': '#2a1810',           // cabello negro sombra
  // Maquillaje Anggie
  'G': '#39b54a',           // delineado verde
  'Y': '#f5e020',           // delineado amarillo
  // Ropa Anggie
  'T': '#c87858',           // camiseta terracota
  't': '#a05838',           // terracota sombra
  'J': '#e8dcc8',           // chaqueta beige
  'j': '#c8b8a0',           // chaqueta sombra
  'B': '#3060b8',           // pantalón azul campo
  'b': '#1e4080',           // pantalón sombra
  'R': '#c03020',           // botas rojas campo
  // Collar perlas Anggie
  'O': '#f0eee8',           // perlas blancas
  // Piel Péfaur
  'Q': '#d49060',           // piel olivácea Péfaur
  'q': '#a86838',           // piel sombra Péfaur
  // Cabello Péfaur
  'g': '#a0a0a0',           // cabello gris
  'w': '#c8c8c8',           // gris claro
  // Ropa Péfaur
  'C': '#7eb8d8',           // camisa azul claro
  'c': '#5090b0',           // camisa sombra
  // Lentes Péfaur
  'L': '#c8a030',           // montura dorada
  'l': '#804000',           // sombra montura
  'e': '#80cce830',         // lente tintado
  // Serpiente (overrideado dinámicamente)
  'S': '#b09060',           // escama base
  's': '#604020',           // escama sombra
  'X': '#000000',           // pupila
  'x': '#1a0800',           // boca/detalle
  // Entorno
  'D': '#1d5c2c',           // arbusto selva nublada
  'd': '#133d1d',           // arbusto sombra
  'F': '#2e7d32',           // árbol tronco musgo
  'f': '#1b4f21',           // árbol sombra
  'M': '#4caf50',           // hoja árbol
  'm': '#2e7d32',           // hoja sombra
  'E': '#8d6e63',           // cofre madera
  'A': '#e8b624',           // cofre dorado
  'H': '#0288d1',           // agua/orquídea
  'I': '#f8bbd0',           // orquídea rosa
  'N': '#5c3d11',           // tronco corteza
};

// ════════════════════════════════════════════════════════════════
//  SPRITES PIXEL ART (16×16 a 20 columnas, detallados)
// ════════════════════════════════════════════════════════════════
const SP = {

  // ── ANGGIE (Vista frontal, 14 cols × 16 filas @ 2.5px) ──────
  anggie_front: [
    [  // Frame 0: Quieta
      "....KKKKKK.....",
      "...KkKKKKkK....",
      "..KkPPPPPPkK...",
      "..KPPpPpPPPK...",
      "..KGYGYGPPpK...",   // cejas y delineado verde/amarillo
      "..KPPPPPPpPK...",
      "..KPpPpPPPPK...",   // nariz
      "...KpPPPpPK....",
      "...KOOPPOOOK...",   // collar perlas
      "..JjJTTTTJjJ...",  // chaqueta + camiseta terracota
      ".JjJTTTTTTJjJ..",
      "..JjJTtTTJjJ...",
      "...BBBBbBBB....",
      "..BbBBBBBbBB...",
      "...RRR.RRR.....",
      "...RRR.RRR....."
    ],
    [  // Frame 1: Caminando A
      "....KKKKKK.....",
      "...KkKKKKkK....",
      "..KkPPPPPPkK...",
      "..KPPpPpPPPK...",
      "..KGYGYGPPpK...",
      "..KPPPPPPpPK...",
      "..KPpPpPPPPK...",
      "...KpPPPpPK....",
      "...KOOPPOOOK...",
      "..JjJTTTTJjJ...",
      ".JjJTTTTTTJjJ..",
      "..JjJTtTTJjJ...",
      "...BBBBbBBB....",
      "..BbBBB.BbBB...",   // pierna levantada
      "...RRR..RRR....",
      "...RR...RRR....."
    ],
    [  // Frame 2: Caminando B
      "....KKKKKK.....",
      "...KkKKKKkK....",
      "..KkPPPPPPkK...",
      "..KPPpPpPPPK...",
      "..KGYGYGPPpK...",
      "..KPPPPPPpPK...",
      "..KPpPpPPPPK...",
      "...KpPPPpPK....",
      "...KOOPPOOOK...",
      "..JjJTTTTJjJ...",
      ".JjJTTTTTTJjJ..",
      "..JjJTtTTJjJ...",
      "...BBBBbBBB....",
      "..BbBBBBB.BbB..",
      "...RRR..RRR....",
      "...RRR...RR....."
    ]
  ],

  // ── ANGGIE (Vista lateral, 12 cols × 16 filas) ──────────────
  anggie_side: [
    [  // Frame 0 lado
      "...KKKKK......",
      "..KkKKKkKK....",
      "..KkPPPPpK....",
      "..KPPPPpPK....",
      "..KGYGPPpK....",
      "..KPPPPpPK....",
      "..KPpPPPPK....",
      "...KpPPpK.....",
      "...KOOPOjK....",
      "..JjJTTTjJ....",
      ".JjJTTTTjJJ...",
      "..JjJTtJjJ....",
      "...BBBbBBB.....",
      "..BbBBBBbB.....",
      "...RRR.RR......",
      "...RRR.RRR....."
    ],
    [  // Frame 1 lado
      "...KKKKK......",
      "..KkKKKkKK....",
      "..KkPPPPpK....",
      "..KPPPPpPK....",
      "..KGYGPPpK....",
      "..KPPPPpPK....",
      "..KPpPPPPK....",
      "...KpPPpK.....",
      "...KOOPOjK....",
      "..JjJTTTjJ....",
      ".JjJTTTTjJJ...",
      "..JjJTtJjJ....",
      "...BBBbBBB.....",
      "..BbBBBB.......",
      "...RRR.........",
      "...RRRR......RR"
    ]
  ],

  // ── ANGGIE (Vista trasera, 14 cols × 16 filas) ──────────────
  anggie_back: [
    [
      "....KKKKKK.....",
      "...KkKKKKkK....",
      "..KkKKKKKKkK...",
      "..KKKKKKKKkK...",
      "..KkKKKKKKkK...",
      "...KKkKKkKK....",
      "....KKKKkKK....",  // Coleta visible por detrás
      "...kKKKKKKK....",
      "..JjJTTTTJjJ...",
      ".JjJTTTTTTJjJ..",
      "..JjJTtTTJjJ...",
      "...BBBBbBBB....",
      "..BbBBBBBbBB...",
      "...RRR.RRR.....",
      "...RRR.RRR....."
    ]
  ],

  // ── PÉFAUR (Vista frontal, 14 cols × 14 filas) ──────────────
  pefaur_front: [
    [ // Frame 0
      "...gwggwwgg....",   // cabello gris, entradas
      "..gQQQQQQQgQ...",
      ".gQQqQqQQQqQg..",
      ".gQLlLlLlLQQg..",  // lentes dorados
      ".gQLeLeLeLQQg..",  // lentes con cristal
      ".gQQLlLlQQQg...",
      "..gQQQQQQQg....",
      "...gQqQQqQg....",
      "..CcCCCCCcC....",  // camisa azul
      ".CcCCCCCCCcC...",
      "..CcCcCCcCcC...",
      "...CcCCCcCC....",
      "...BBBbBBBB....",
      "...BBBBbBBB...."
    ],
    [ // Frame 1 (ligeramente diferente para animación)
      "...gwggwwgg....",
      "..gQQQQQQQgQ...",
      ".gQQqQqQQQqQg..",
      ".gQLlLlLlLQQg..",
      ".gQLeLeLeLQQg..",
      ".gQQLlLlQQQg...",
      "..gQQQQQQQg....",
      "...gQqQQqQg....",
      "..CcCCCCCcC....",
      ".CcCCCCCCCcC...",
      "..CcCcCCcCcC...",
      "...CcCCCcCC....",
      "...BBBbBBBB....",
      "...BBBBbBBB...."
    ]
  ],

  // ── SERPIENTE BOTHROPS (Cuerpo en S, 14 cols × 10 filas) ─────
  snake: [
    [  // Frame 0
      "....SsSSSsS...",
      "...SSSsSSSSS..",
      "..SSXsXsSSS...",   // ojos y cabeza triangular
      "..SSSxSSSSS...",
      "...SSSSsSSSS..",
      "....SSSSsSSS.",
      "..sSSSSSSSs..",
      ".sSSSSSSSs...",
      "..sSSSSs.....",
      "...sSSs......"
    ],
    [  // Frame 1
      "...SsSSSsS....",
      "..SSSsSSSSS...",
      ".SSXsXsSSS....",
      ".SSSxSSSSS....",
      "..SSSSsSSSS...",
      "...SSSSsSSS...",
      "....sSSSSs...",
      "...sSSSSSs...",
      "..sSSSSSs....",
      "...sSSs......"
    ]
  ],

  // ── COFRE CON LINTERNA (encontrado de sorpresa) ───────────────
  chest_closed: [
    "...EAAAAAE...",
    "..EAAAAAAAAE.",
    ".EAAAAAAAAAE.",
    ".EAAAAALAAAE.",   // candado dorado L
    "EAAAAAALAAAE.",
    ".EEEEEEEEEE.",
    "..EEEEEEEE..",
    "..EEEEEEEE..",
    "..EEEEEEEE.."
  ],
  chest_open: [
    "..YAAAAAYY...",
    ".YYAAAAAYYYY.",
    "YYYYAAAAYYYYY",
    ".YYYYYYYYYYYYY", // destello de apertura
    "..EEEEEEEE...",
    "..EAEAEAEE...",
    "..EEEEEEEE...",
    "..EEEEEEEE...",
    "..EEEEEEEE..."
  ],

  // ── ÁRBOL SELVA NUBLADA (con musgo y bromeliads) ─────────────
  tree: [
    "........MMMM........",
    ".......MmMMMmM......",
    ".....IMmMMMMmMMI....",   // bromeliada I (rosa-azul)
    "....IMMmMMMmMMMMI...",
    "...MMMMmMMMmMMMMM...",
    "...MmMMMmMMMmMMMM...",
    "....MMMmMMMmMMMMM...",
    "....FMMmMMMmMMMF....",
    "......NNNNNNNN......",   // tronco con corteza N
    ".....NNdNdNNNNN.....",   // musgo en tronco
    ".....NNNNdNNNNN.....",
    "....NNNNNNNNNNNN...."
  ],

  // ── ARBUSTO SELVA NUBLADA (con orquídea y helechos) ──────────
  bush: [
    "....DDDI...ID...",
    "..DDDdDDDdDdD...",
    ".DDdDDIDDDdDDD..",
    "DDDdDDDIDDdDDDD.",
    "DDDdDDDDDdDDDDD.",
    ".DDdDDDDDdDDDD..",
    "..DDdDDDdDDD...",
    "...DDDdDDD....."
  ],

  // ── LATA XPI (amarilla, brillante) ────────────────────────────
  xpi: [
    "...YYYY...",
    "..YYYYYY..",
    ".YwYYwYYY.",   // 'w' blanco brillo
    ".YYYYYYYY.",
    ".YXYXYYYY.",   // 'X' letras Xpi
    ".YYYYYYYY.",
    ".YYYYYYYY.",
    "..YYYYYY..",
    "...YYYY..."
  ],

  // ── LINTERNA FRONTAL (en el suelo) ───────────────────────────
  headlamp: [
    "...AAAAA...",
    "..AWWWWWA..",
    ".AWWYYYWWA.",
    "AWWWYYYYWWA",
    ".AWWYYYWWA.",
    "..AWWWWWA..",
    "...AAAAA...",
    "...LLLLLL..",   // banda de cabeza
    "..LLLLLLLL.",
    "...LLLLLL..."
  ]
};

// ════════════════════════════════════════════════════════════════
//  CANVAS Y ESTADO GLOBAL
// ════════════════════════════════════════════════════════════════
const canvas   = document.getElementById('gameCanvas');
const ctx      = canvas.getContext('2d');
let canvasW    = window.innerWidth;
let canvasH    = window.innerHeight;

const MAP_W    = 1800;
const MAP_H    = 1800;

// Estado del juego
let gameState  = 'menu';          // menu | playing | paused | gameover
let storyPhase = 'phase1_day';    // Ver STORY_PHASES
let score      = 0;
let pts        = 0;
let highScore  = parseInt(localStorage.getItem('bothrops_hs')) || 0;
let caught     = 0;
let catalog    = [];               // especies únicas capturadas

// Energía de Anggie (100 → 0 → cansada → Péfaur llega)
let energy     = 100;
let energyTarget = 100;
let isTired    = false;

// Noche
let nightAlpha = 0.0;
let nightTarget= 0.0;
let hasHeadlamp= false;

// Progreso de fase actual
let phaseGoal  = 4;
let phaseCaught= 0;

// Entities
let player     = null;
let pefaurNPC  = null;
let chestItem  = null;
let snakes     = [];
let obstacles  = [];
let particles  = [];
let mistClouds = [];
const camera   = { x:0, y:0 };

// Niebla ambiental en el lienzo
let tick = 0;

// ════════════════════════════════════════════════════════════════
//  ENTRADA (TECLADO & JOYSTICK)
// ════════════════════════════════════════════════════════════════
const keys = { w:false, a:false, s:false, d:false,
               ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false };

let joystickActive = false;
let joyStartPos    = { x:0, y:0 };
const JOYSTICK_R   = 50;
let touchInputX    = 0;
let touchInputY    = 0;

// ════════════════════════════════════════════════════════════════
//  UTILIDAD: DIBUJAR SPRITE
// ════════════════════════════════════════════════════════════════
function drawSprite(sprite, wx, wy, scale, flipX=false, colorOverride={}) {
  const rows = sprite.length;
  const cols  = sprite[0].length;

  ctx.save();
  ctx.translate(wx - camera.x, wy - camera.y);
  if (flipX) { ctx.scale(-1,1); ctx.translate(-cols*scale, 0); }

  for (let r=0; r<rows; r++) {
    for (let c=0; c<cols; c++) {
      const ch = sprite[r][c];
      if (ch === '.') continue;
      const col = colorOverride[ch] || C[ch];
      if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(c*scale, r*scale, scale+0.5, scale+0.5);
    }
  }
  ctx.restore();
}

// ════════════════════════════════════════════════════════════════
//  PARTÍCULAS
// ════════════════════════════════════════════════════════════════
class Particle {
  constructor(x,y,col,vx,vy,life,size=4,type='dot') {
    Object.assign(this, {x,y,col,vx,vy,life,maxLife:life,size,type,text:''});
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.type==='text') { this.vy-=0.05; this.vx*=0.96; }
    else { this.vy+=0.04; this.vx*=0.98; }  // gravedad suave
    this.life--;
  }
  draw() {
    const a = this.life/this.maxLife;
    ctx.save(); ctx.globalAlpha = a;
    const sx = this.x-camera.x, sy = this.y-camera.y;
    if (this.type==='dot') {
      ctx.fillStyle = this.col;
      ctx.fillRect(sx, sy, this.size, this.size);
    } else if (this.type==='text') {
      ctx.font = `bold 13px "Press Start 2P", monospace`;
      ctx.strokeStyle='#000'; ctx.lineWidth=3;
      ctx.strokeText(this.text, sx, sy);
      ctx.fillStyle = this.col;
      ctx.fillText(this.text, sx, sy);
    } else if (this.type==='ring') {
      ctx.strokeStyle=this.col; ctx.lineWidth=3;
      ctx.beginPath();
      ctx.arc(sx, sy, (1-a)*this.size, 0, Math.PI*2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function burst(x,y,col,count=14,speed=2.2) {
  for (let i=0;i<count;i++) {
    const a=Math.random()*Math.PI*2, sp=Math.random()*speed+0.8;
    particles.push(new Particle(x,y,col,Math.cos(a)*sp,Math.sin(a)*sp,
      Math.floor(Math.random()*20+20), Math.random()>0.5?4:3));
  }
}

function floatText(x,y,text,col='#fff') {
  const p = new Particle(x,y-20,col,0,-1.2,55,0,'text');
  p.text = text;
  particles.push(p);
}

// ════════════════════════════════════════════════════════════════
//  NUBES DE NIEBLA AMBIENTAL EN EL MAPA
// ════════════════════════════════════════════════════════════════
class MistCloud {
  constructor() { this.reset(true); }
  reset(init=false) {
    this.x    = Math.random()*MAP_W;
    this.y    = init ? Math.random()*MAP_H : (Math.random()>0.5 ? -60 : MAP_H+60);
    this.w    = Math.random()*200+120;
    this.h    = Math.random()*35+20;
    this.vx   = (Math.random()-0.5)*0.3;
    this.vy   = (Math.random()-0.5)*0.15;
    this.alpha= Math.random()*0.18+0.06;
    this.life = Math.random()*600+300;
  }
  update() {
    this.x+=this.vx; this.y+=this.vy; this.life--;
    if (this.life<=0 || this.x<-200 || this.x>MAP_W+200) this.reset();
  }
  draw() {
    const sx=this.x-camera.x, sy=this.y-camera.y;
    ctx.save();
    ctx.globalAlpha = this.alpha*(0.5+0.5*Math.sin(tick*0.02));
    ctx.fillStyle='#c8e8e0';
    ctx.beginPath();
    ctx.ellipse(sx,sy,this.w,this.h,0,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

// ════════════════════════════════════════════════════════════════
//  ENTIDADES OBSTÁCULOS
// ════════════════════════════════════════════════════════════════
class Obstacle {
  constructor(x,y,type) {
    this.x=x; this.y=y; this.type=type;
    this.radius = type==='tree' ? 16 : 0;
  }
  draw() {
    if (this.type==='tree')
      drawSprite(SP.tree, this.x-25, this.y-30*2.2, 2.2);
    else
      drawSprite(SP.bush, this.x-20, this.y-20, 2.0);
  }
}

// ════════════════════════════════════════════════════════════════
//  PÉFAUR NPC
// ════════════════════════════════════════════════════════════════
class PefaurNPC {
  constructor(x,y) { this.x=x; this.y=y; this.radius=20; this.hasXpi=true; this.frame=0; this.animT=0; }
  update() { this.animT+=0.06; this.frame=Math.floor(this.animT)%2; }
  draw() {
    drawSprite(SP.pefaur_front[this.frame], this.x-17, this.y-35, 2.5);
    if (this.hasXpi) {
      const fy = Math.sin(tick*0.08)*3;
      drawSprite(SP.xpi, this.x+22, this.y-28+fy, 2.0);
      // Indicador de interacción
      const r=22+Math.sin(tick*0.1)*4;
      ctx.save();
      ctx.strokeStyle=`rgba(255,234,0,${0.5+0.4*Math.sin(tick*0.1)})`;
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.arc(this.x-camera.x, this.y-camera.y-40, r, 0, Math.PI*2);
      ctx.stroke();
      ctx.fillStyle='rgba(255,234,0,0.9)';
      ctx.font='14px sans-serif';
      ctx.textAlign='center';
      ctx.fillText('!', this.x-camera.x, this.y-camera.y-34);
      ctx.restore();
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  COFRE / LINTERNA (SORPRESA)
// ════════════════════════════════════════════════════════════════
class ChestItem {
  constructor(x,y) { this.x=x; this.y=y; this.radius=22; this.isOpen=false; this.glowT=0; }
  update() { this.glowT+=0.07; }
  draw() {
    const sprite = this.isOpen ? SP.chest_open : SP.chest_closed;
    drawSprite(sprite, this.x-14, this.y-22, 2.2);

    if (!this.isOpen) {
      // Haz de luz dorada hacia arriba
      const sx=this.x-camera.x, sy=this.y-camera.y;
      ctx.save();
      const grad = ctx.createLinearGradient(sx,sy,sx,sy-90);
      grad.addColorStop(0, `rgba(255,220,50,${0.25+0.12*Math.sin(this.glowT)})`);
      grad.addColorStop(1, 'rgba(255,220,50,0)');
      ctx.fillStyle=grad;
      ctx.beginPath();
      ctx.moveTo(sx-12, sy);
      ctx.lineTo(sx+12, sy);
      ctx.lineTo(sx+22, sy-90);
      ctx.lineTo(sx-22, sy-90);
      ctx.fill();
      ctx.restore();
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  SERPIENTE BOTHROPS
// ════════════════════════════════════════════════════════════════
class BothropsSnake {
  constructor(x,y,species) {
    this.x=x; this.y=y; this.species=species; this.radius=16;
    this.speed=species.speed; this.frame=0; this.animT=0; this.flipX=false;
    const a=Math.random()*Math.PI*2;
    this.vx=Math.cos(a)*this.speed; this.vy=Math.sin(a)*this.speed;
    this.stateT=Math.floor(Math.random()*120);
    this.tongueOut=false; this.tongueT=0;
  }
  update() {
    this.animT+=0.1; this.frame=Math.floor(this.animT)%2;
    this.stateT--; this.tongueT++;

    // Lengua viperina
    if (this.tongueT%90===0) { this.tongueOut=true; setTimeout(()=>{ this.tongueOut=false; },300); }

    // Cambio de dirección suave
    if (this.stateT<=0) {
      const a=Math.random()*Math.PI*2;
      this.vx=Math.cos(a)*this.speed; this.vy=Math.sin(a)*this.speed;
      this.stateT=Math.floor(Math.random()*120+60);
    }

    this.x+=this.vx; this.y+=this.vy;
    if (this.x<50||this.x>MAP_W-50) this.vx*=-1;
    if (this.y<50||this.y>MAP_H-50) this.vy*=-1;
    this.x=Math.max(50,Math.min(MAP_W-50,this.x));
    this.y=Math.max(50,Math.min(MAP_H-50,this.y));
    this.flipX=this.vx<0;
  }
  draw() {
    // Sobreescribir colores de escama con los de la especie
    const oc={ 'S':this.species.color, 's':this.species.bodyColor };
    drawSprite(SP.snake[this.frame], this.x-18, this.y-14, 2.2, this.flipX, oc);

    // Lengua bífida
    if (this.tongueOut) {
      const sx=this.x-camera.x, sy=this.y-camera.y-4;
      const dir=this.flipX?-1:1;
      ctx.save();
      ctx.strokeStyle='#ff4444'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sx+dir*14,sy);
      ctx.moveTo(sx+dir*14,sy); ctx.lineTo(sx+dir*20,sy-4);
      ctx.moveTo(sx+dir*14,sy); ctx.lineTo(sx+dir*20,sy+4);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  ANGGIE (PROTAGONISTA)
// ════════════════════════════════════════════════════════════════
class AnggiePlayer {
  constructor(x,y) {
    this.x=x; this.y=y; this.radius=15;
    this.baseSpeed=3.2; this.speed=this.baseSpeed;
    this.dir='front'; this.flipX=false;
    this.frame=0; this.walkT=0; this.isMoving=false;
    this.xpiBoostT=0;
    this.catchRadius=28;
    this.stepSound=0;
  }
  update() {
    this.isMoving=false;
    let dx=0, dy=0;

    if (joystickActive) {
      dx=touchInputX; dy=touchInputY;
    } else {
      if (keys.w||keys.ArrowUp)    dy=-1;
      if (keys.s||keys.ArrowDown)  dy=+1;
      if (keys.a||keys.ArrowLeft)  dx=-1;
      if (keys.d||keys.ArrowRight) dx=+1;
      if (dx!==0&&dy!==0) { const l=Math.hypot(dx,dy); dx/=l; dy/=l; }
    }

    // Velocidad
    if (isTired) {
      this.speed=1.3;
    } else if (this.xpiBoostT>0) {
      this.xpiBoostT--;
      this.speed=4.8;
      if (Math.random()<0.25) {
        particles.push(new Particle(this.x+(Math.random()-0.5)*14, this.y+4,
          '#ffea00',-dx*1.5,-dy*1.5,14,3));
      }
    } else {
      this.speed=this.baseSpeed;
    }

    // Efecto de cansancio (sudor)
    if (isTired && Math.random()<0.08) {
      particles.push(new Particle(this.x+(Math.random()-0.5)*12, this.y-28,
        '#64b5f6', 0, 0.6, 22, 3));
    }

    if (dx!==0||dy!==0) {
      this.isMoving=true;
      const px=this.x, py=this.y;
      this.x+=dx*this.speed; this.y+=dy*this.speed;

      // Determinar sprite
      if (Math.abs(dx)>0.4) { this.dir='side'; this.flipX=dx<0; }
      else { this.dir = dy>0?'front':'back'; this.flipX=false; }

      this.walkT+=0.22;
      this.frame=(Math.floor(this.walkT)%2)+1;
      this.stepSound++;

      // Sonido de pasos
      if (this.stepSound%22===0) audio.playStep();

      this.x=Math.max(35,Math.min(MAP_W-35,this.x));
      this.y=Math.max(35,Math.min(MAP_H-35,this.y));

      // Colisión con árboles
      for (const ob of obstacles) {
        if (ob.type!=='tree') continue;
        const dx2=this.x-ob.x, dy2=this.y-ob.y;
        const d=Math.hypot(dx2,dy2), min=this.radius+ob.radius;
        if (d<min) {
          const a=Math.atan2(dy2,dx2);
          this.x=ob.x+Math.cos(a)*min;
          this.y=ob.y+Math.sin(a)*min;
        }
      }
    } else {
      this.frame=0;
    }

    // Partículas de pisadas en musgo/niebla
    if (this.isMoving && Math.random()<0.06) {
      particles.push(new Particle(this.x, this.y+8,'#4a7c50',
        (Math.random()-0.5)*0.5, -Math.random()*0.3, 18, 3));
    }
  }

  draw() {
    let sprite;
    if (this.dir==='side')  sprite=SP.anggie_side[this.frame===0?0:1];
    else if (this.dir==='back') sprite=SP.anggie_back[0];
    else sprite=SP.anggie_front[this.frame];

    drawSprite(sprite, this.x-17, this.y-40, 2.5, this.flipX);

    // Aura de boost Xpi
    if (this.xpiBoostT>0) {
      ctx.save();
      const a=0.3+0.2*Math.sin(tick*0.2);
      ctx.strokeStyle=`rgba(255,234,0,${a})`;
      ctx.lineWidth=3;
      ctx.beginPath();
      ctx.ellipse(this.x-camera.x, this.y-camera.y-5, 22, 28, 0, 0, Math.PI*2);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  GENERACIÓN DEL MAPA (SELVA NUBLADA)
// ════════════════════════════════════════════════════════════════
function generateMap() {
  obstacles=[]; snakes=[]; particles=[]; mistClouds=[];
  chestItem=null; pefaurNPC=null;

  // Árboles
  let tries=0;
  while (obstacles.filter(o=>o.type==='tree').length<40&&tries<400) {
    const rx=Math.random()*(MAP_W-200)+100, ry=Math.random()*(MAP_H-200)+100;
    if (Math.hypot(rx-MAP_W/2, ry-MAP_H/2)>140) {
      if (!obstacles.some(o=>Math.hypot(o.x-rx,o.y-ry)<70)) {
        obstacles.push(new Obstacle(rx,ry,'tree'));
      }
    }
    tries++;
  }

  // Arbustos (con orquídeas)
  for (let i=0;i<30;i++) {
    obstacles.push(new Obstacle(
      Math.random()*(MAP_W-180)+90,
      Math.random()*(MAP_H-180)+90,
      'bush'
    ));
  }

  // Nubes de niebla
  for (let i=0;i<16;i++) mistClouds.push(new MistCloud());

  // Serpientes iniciales (diurnas)
  spawnSnakes(false, 5);
}

function spawnSnakes(nocturnal, count) {
  const pool = BOTHROPS_DB.filter(s=>s.nocturnal===nocturnal);
  for (let i=0;i<count;i++) {
    const sp=pool[Math.floor(Math.random()*pool.length)];
    let rx,ry,ok=false, att=0;
    while (!ok&&att<50) {
      rx=Math.random()*(MAP_W-200)+100; ry=Math.random()*(MAP_H-200)+100;
      const nearTree=obstacles.some(o=>o.type==='tree'&&Math.hypot(o.x-rx,o.y-ry)<50);
      const nearPlayer=player&&Math.hypot(player.x-rx,player.y-ry)<220;
      if (!nearTree&&!nearPlayer) ok=true;
      att++;
    }
    if (ok) snakes.push(new BothropsSnake(rx,ry,sp));
  }
}

// ════════════════════════════════════════════════════════════════
//  SISTEMA NARRATIVO: DIÁLOGOS
// ════════════════════════════════════════════════════════════════
const STORY = {
  pefaur_arrives: [
    { who:'Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'¡Anggie! Te ves agotada... ¡has estado buscando Bothrops sin parar!' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'Péfaur... sí, ya no puedo más. ¡Pero hay tantas especies que registrar!' },
    { who:'Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'Toma esta Xpi bien helada. ¡Recarga energías y continuamos el muestreo!' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Ah, perfecta! ¡Ya me siento como nueva! ¡Sigamos buscando Bothrops!' },
  ],
  night_falling: [
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Vaya... está anocheciendo! Las especies nocturnas van a salir ahora.' },
    { who:'Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'¡Exacto, Anggie! Las Bothrops bilineatus y taeniatus son más activas de noche.' },
  ],
  found_headlamp: [
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Oh! ¡Hay algo en el suelo...! ¡Es una linterna frontal! ¡Qué suerte!' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Con esto puedo seguir buscando Bothrops nocturnas! ¡Vamos!' },
  ],
  victory: [
    { who:'Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'¡Extraordinario trabajo, Anggie! Hemos completado el muestreo de campo.' },
    { who:'Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'Ya tenemos especímenes de varias especies del género Bothrops. ¡Material invaluable!' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Sí, Péfaur! Entre la colección diurna y nocturna tenemos datos excepcionales.' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Esta investigación en la Selva Nublada venezolana va a ser histórica! ¡Volvamos al lab!' },
  ],
};

let dialogQueue=[]; let dialogIdx=0; let dialogCB=null;
let dialogTypewriterInterval=null; let dialogFull=''; let dialogTyped='';

function showDialog(key, cb) {
  dialogQueue = STORY[key];
  dialogIdx   = 0;
  dialogCB    = cb;
  nextDialogStep();
  document.getElementById('dialog-modal').classList.remove('hidden');
}

function nextDialogStep() {
  if (dialogIdx>=dialogQueue.length) {
    document.getElementById('dialog-modal').classList.add('hidden');
    if (dialogCB) dialogCB();
    return;
  }
  const step = dialogQueue[dialogIdx];
  document.getElementById('dialog-portrait-name').textContent = step.who;
  document.getElementById('dialog-portrait-img').src = step.img;

  // Typewriter animado
  clearInterval(dialogTypewriterInterval);
  dialogFull  = step.text;
  dialogTyped = '';
  document.getElementById('dialog-text').textContent = '';
  let ci = 0;
  dialogTypewriterInterval = setInterval(()=>{
    dialogTyped += dialogFull[ci++];
    document.getElementById('dialog-text').textContent = dialogTyped;
    audio.playDialogBeep();
    if (ci>=dialogFull.length) clearInterval(dialogTypewriterInterval);
  }, 35);
}

document.getElementById('btn-dialog-next').addEventListener('click', ()=>{
  // Si typewriter no ha terminado, mostrarlo todo inmediatamente
  if (dialogTyped.length<dialogFull.length) {
    clearInterval(dialogTypewriterInterval);
    dialogTyped=dialogFull;
    document.getElementById('dialog-text').textContent=dialogFull;
    return;
  }
  dialogIdx++;
  nextDialogStep();
  audio.playClick();
});

// ════════════════════════════════════════════════════════════════
//  HUD – ENERGÍA Y PROGRESO DE FASE
// ════════════════════════════════════════════════════════════════
function updateEnergyBar() {
  const bar = document.getElementById('energy-bar');
  const pct = Math.max(0,energyTarget);
  bar.style.width = pct+'%';
  bar.className = 'energy-fill';
  if (pct<40) bar.classList.add('low');
  if (pct<15) bar.classList.add('tired');
}

function setPhaseUI(icon, phase, desc, goal) {
  document.getElementById('obj-phase-icon').textContent = icon;
  document.getElementById('obj-phase-label').textContent = phase;
  document.getElementById('obj-text').textContent = desc;
  phaseGoal=goal; phaseCaught=0;
  updatePhaseProgress();
}

function updatePhaseProgress() {
  const pct = Math.min(100, (phaseCaught/phaseGoal)*100);
  document.getElementById('obj-progress-bar').style.width = pct+'%';
  document.getElementById('obj-counter').textContent = `${phaseCaught} / ${phaseGoal}`;
}

// ════════════════════════════════════════════════════════════════
//  CAPTURA DE SERPIENTE Y PROGRESIÓN NARRATIVA
// ════════════════════════════════════════════════════════════════
function catchSnake(snake, idx) {
  snakes.splice(idx,1);
  caught++; phaseCaught++;
  pts += snake.species.pts * (caught<=10?1:Math.floor(caught/5));
  score=pts;

  document.getElementById('hud-score').textContent = caught;
  document.getElementById('hud-pts').textContent   = pts;
  updatePhaseProgress();

  audio.playCatch();
  if (navigator.vibrate) navigator.vibrate(45);

  // Reducir energía al capturar
  energyTarget = Math.max(0, energyTarget-12);
  updateEnergyBar();

  // Panel de captura
  showCatchPanel(snake.species);

  // Partículas
  burst(snake.x, snake.y, snake.species.color, 18, 2.5);
  floatText(snake.x, snake.y, '+'+snake.species.pts+' pts',
    caught>1?'#a8e063':'#fff');

  if (!catalog.some(s=>s.id===snake.species.id)) catalog.push(snake.species);

  // ── PROGRESIÓN NARRATIVA ──────────────────────────────────────
  // FASE 1: 4 serpientes → se cansa → Péfaur llega
  if (storyPhase==='phase1_day' && caught>=4) {
    storyPhase='cutscene_tired';
    isTired=true; energyTarget=8; updateEnergyBar();
    setTimeout(()=>{
      pefaurNPC = new PefaurNPC(player.x+130, player.y-40);
      setPhaseUI('🥤','PÉFAUR HA LLEGADO',
        'Habla con Péfaur para recuperar energías',1);
    }, 1400);
  }

  // FASE 2 (tras Xpi): 3 serpientes más (7 total) → anochece
  else if (storyPhase==='phase2_afternoon' && caught>=7) {
    storyPhase='phase3_dusk';
    setPhaseUI('🌙','ATARDECER','¡Explora la selva al anochecer!', 3);

    // Anochecer progresivo
    nightTarget=0.75;
    audio.playNightTransition();

    setTimeout(()=>{
      showDialog('night_falling', ()=>{
        storyPhase='phase3_night';
        nightTarget=0.92;
      });
    }, 2500);
  }

  // FASE 3: de noche, de repente aparece la linterna en el camino de Anggie
  else if (storyPhase==='phase3_night' && caught>=10) {
    storyPhase='phase4_lamp_spawn';
    // La linterna aparece cerca de Anggie (sorpresa)
    chestItem = new ChestItem(player.x + (Math.random()>0.5?1:-1)*90,
                               player.y + (Math.random()>0.5?1:-1)*60);
    setPhaseUI('🔦','¡ALGO BRILLA ENTRE LOS HELECHOS!',
      'Anggie nota un destello en el suelo...', 0);
    burst(chestItem.x, chestItem.y, '#ffea00', 20, 1.5);
    floatText(chestItem.x, chestItem.y-10, '???', '#ffea00');
  }

  // FASE 4 nocturna: 4 serpientes más con linterna (14 total) → Péfaur finaliza
  else if (storyPhase==='phase4_night_lamp' && caught>=14) {
    storyPhase='cutscene_victory';
    pefaurNPC = new PefaurNPC(player.x+110, player.y-30);
    setPhaseUI('🏁','¡MUESTREO COMPLETADO!',
      'Habla con Péfaur para finalizar la expedición', 0);
  }
}

// Panel de especie capturada (con foto serpiente)
let catchPanelTimer=null;
function showCatchPanel(sp) {
  document.getElementById('catch-species-name').textContent = sp.name;
  document.getElementById('catch-species-common').textContent = '('+sp.common+')';
  document.getElementById('catch-points').textContent = '+'+sp.pts+' pts cient.';
  const panel = document.getElementById('catch-panel');
  panel.classList.remove('hidden');
  clearTimeout(catchPanelTimer);
  catchPanelTimer=setTimeout(()=>panel.classList.add('hidden'), 3000);
}

// ════════════════════════════════════════════════════════════════
//  BUCLE PRINCIPAL: UPDATE
// ════════════════════════════════════════════════════════════════
function updateGame() {
  if (gameState!=='playing') return;
  tick++;

  // Transición de noche suave
  nightAlpha += (nightTarget - nightAlpha)*0.008;

  // Actualizar energía
  energy += (energyTarget - energy)*0.05;

  // Player
  player.update();

  // Cámara suave
  camera.x += (player.x - canvasW/2 - camera.x)*0.1;
  camera.y += (player.y - canvasH/2 - camera.y)*0.1;
  camera.x = Math.max(0, Math.min(MAP_W-canvasW, camera.x));
  camera.y = Math.max(0, Math.min(MAP_H-canvasH, camera.y));

  // Niebla
  for (const m of mistClouds) m.update();

  // Péfaur NPC
  if (pefaurNPC) {
    pefaurNPC.update();

    // Interacción con Péfaur (Xpi)
    if (storyPhase==='cutscene_tired' &&
        Math.hypot(player.x-pefaurNPC.x, player.y-pefaurNPC.y)<50) {
      storyPhase='dialog_pefaur1';
      showDialog('pefaur_arrives', ()=>{
        pefaurNPC.hasXpi=false;
        isTired=false; energyTarget=100; updateEnergyBar();
        player.xpiBoostT=480;
        audio.playXpiDrink();
        storyPhase='phase2_afternoon';
        setPhaseUI('🌤️','FASE 2: TARDECER',
          'Captura 3 Bothrops más antes de que anochezca', 3);
        spawnSnakes(false,4);
      });
    }

    // Interacción con Péfaur (Victoria)
    if (storyPhase==='cutscene_victory' &&
        Math.hypot(player.x-pefaurNPC.x, player.y-pefaurNPC.y)<50) {
      storyPhase='dialog_victory';
      showDialog('victory', ()=>{
        finishVictory();
      });
    }
  }

  // Cofre / Linterna (el jugador lo encuentra andando cerca)
  if (chestItem && !chestItem.isOpen) {
    chestItem.update();
    if (Math.hypot(player.x-chestItem.x, player.y-chestItem.y)<50) {
      chestItem.isOpen=true;
      hasHeadlamp=true;
      audio.playChestOpen();
      storyPhase='dialog_headlamp';
      showDialog('found_headlamp', ()=>{
        storyPhase='phase4_night_lamp';
        setPhaseUI('🔦','FASE 4: NOCHE CON LINTERNA',
          'Captura 4 Bothrops nocturnas', 4);
        spawnSnakes(true, 5);
      });
    }
  }

  // Serpientes
  if (gameState!=='playing') return;
  for (let i=snakes.length-1;i>=0;i--) {
    snakes[i].update();
    if (Math.hypot(player.x-snakes[i].x, player.y-snakes[i].y)<player.catchRadius) {
      catchSnake(snakes[i],i);
      break; // Una por tick para evitar bugs
    }
  }

  // Restock de serpientes
  if (snakes.length<5 && Math.random()<0.012) {
    spawnSnakes(storyPhase.includes('night')||storyPhase.includes('lamp'), 1);
  }

  // Partículas
  for (let i=particles.length-1;i>=0;i--) {
    particles[i].update();
    if (particles[i].life<=0) particles.splice(i,1);
  }
}

// ════════════════════════════════════════════════════════════════
//  RENDERIZADO
// ════════════════════════════════════════════════════════════════
function drawMap() {
  // Fondo base: verde selva nublada
  ctx.fillStyle='#0f2416';
  ctx.fillRect(0,0,canvasW,canvasH);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  // Suelo con textura
  ctx.fillStyle='#132b18';
  ctx.fillRect(0,0,MAP_W,MAP_H);

  // Patrón de pasto
  for (let gx=0;gx<MAP_W;gx+=32) {
    for (let gy=0;gy<MAP_H;gy+=32) {
      const shade = ((gx/32+gy/32)%2===0) ? '#142e19' : '#163420';
      ctx.fillStyle=shade;
      ctx.fillRect(gx,gy,32,32);
    }
  }

  // Flores de selva nublada
  const flowers=[
    {c:'#c0587e',s:4},{c:'#e8b624',s:3},{c:'#80cce8',s:3}
  ];
  for (let i=0;i<80;i++) {
    const fx=(i*347+i*i*11)%(MAP_W-100)+50;
    const fy=(i*443+i*7)%(MAP_H-100)+50;
    const nearTree=obstacles.some(o=>o.type==='tree'&&Math.hypot(o.x-fx,o.y-fy)<40);
    if (!nearTree) {
      const fl=flowers[i%flowers.length];
      ctx.fillStyle=fl.c;
      ctx.fillRect(fx,fy,fl.s,fl.s);
      ctx.fillStyle='#c8f0b0';
      ctx.fillRect(fx-2,fy+3,2,2);
    }
  }

  // Límites del mapa (oscuro)
  ctx.fillStyle='#070f08';
  ctx.fillRect(0,0,MAP_W,25);
  ctx.fillRect(0,MAP_H-25,MAP_W,25);
  ctx.fillRect(0,0,25,MAP_H);
  ctx.fillRect(MAP_W-25,0,25,MAP_H);

  ctx.restore();
}

function drawEntities() {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  // Y-sort: todos los objetos del mundo
  const queue=[];
  if (player) queue.push(player);
  snakes.forEach(s=>queue.push(s));
  obstacles.forEach(o=>queue.push(o));
  if (pefaurNPC) queue.push(pefaurNPC);
  if (chestItem)  queue.push(chestItem);
  queue.sort((a,b)=>a.y-b.y);
  queue.forEach(e=>e.draw());

  // Niebla sobre entidades (da profundidad)
  for (const m of mistClouds) m.draw();

  ctx.restore();
}

function drawParticles() {
  for (const p of particles) p.draw();
}

function drawNightOverlay() {
  if (nightAlpha<0.02) return;

  // Capa de oscuridad
  const offscreen = document.createElement('canvas');
  offscreen.width = canvasW; offscreen.height = canvasH;
  const oc = offscreen.getContext('2d');

  oc.fillStyle=`rgba(4,10,5,${nightAlpha})`;
  oc.fillRect(0,0,canvasW,canvasH);

  if (hasHeadlamp && player) {
    // Cono de luz de la linterna frontal
    oc.globalCompositeOperation='destination-out';
    const px=player.x-camera.x, py=player.y-camera.y-10;

    const lightGrad=oc.createRadialGradient(px,py,12,px,py,160);
    lightGrad.addColorStop(0,'rgba(0,0,0,1)');
    lightGrad.addColorStop(0.6,'rgba(0,0,0,0.7)');
    lightGrad.addColorStop(1,'rgba(0,0,0,0)');
    oc.fillStyle=lightGrad;
    oc.beginPath(); oc.arc(px,py,160,0,Math.PI*2); oc.fill();

    // Brillo cálido de la linterna
    oc.globalCompositeOperation='source-over';
    oc.globalAlpha=0.15;
    oc.fillStyle='rgba(255,240,180,0.4)';
    oc.beginPath(); oc.arc(px,py,80,0,Math.PI*2); oc.fill();
  }

  ctx.drawImage(offscreen,0,0);

  // Efecto de niebla nocturna adicional
  ctx.save();
  ctx.globalAlpha=nightAlpha*0.3;
  ctx.fillStyle='rgba(30,60,80,0.4)';
  ctx.fillRect(0,0,canvasW,canvasH);
  ctx.restore();

  // Luciérnagas nocturnas
  if (nightAlpha>0.3 && tick%3===0 && Math.random()<0.15) {
    const fx=Math.random()*canvasW, fy=Math.random()*canvasH;
    ctx.save();
    ctx.globalAlpha=Math.random()*0.6+0.2;
    ctx.fillStyle='#b8ff60';
    ctx.beginPath();
    ctx.arc(fx,fy,Math.random()*2+1,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

function drawFrame() {
  drawMap();
  drawEntities();
  drawParticles();
  drawNightOverlay();

  // Efecto de advertencia energía baja
  if (isTired) {
    const a=0.1+0.07*Math.sin(tick*0.15);
    ctx.save();
    ctx.strokeStyle=`rgba(255,50,50,${a})`;
    ctx.lineWidth=10;
    ctx.strokeRect(0,0,canvasW,canvasH);
    ctx.restore();
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME LOOP
// ════════════════════════════════════════════════════════════════
let rafId=null;
function gameLoop() {
  updateGame();
  drawFrame();
  if (gameState==='playing'||gameState==='paused') rafId=requestAnimationFrame(gameLoop);
}

// ════════════════════════════════════════════════════════════════
//  INICIO / PAUSA / FIN
// ════════════════════════════════════════════════════════════════
function startGame() {
  cancelAnimationFrame(rafId);

  gameState='playing'; storyPhase='phase1_day';
  score=0; pts=0; caught=0; catalog=[];
  isTired=false; energyTarget=100; energy=100;
  nightAlpha=0; nightTarget=0; hasHeadlamp=false;
  pefaurNPC=null; chestItem=null; tick=0;

  document.getElementById('hud-score').textContent='0';
  document.getElementById('hud-pts').textContent='0';
  document.getElementById('catch-panel').classList.add('hidden');
  document.getElementById('dialog-modal').classList.add('hidden');
  document.getElementById('energy-bar').style.width='100%';
  document.getElementById('energy-bar').className='energy-fill';
  setPhaseUI('☀️','FASE 1: MUESTREO DIURNO','Captura 4 serpientes Bothrops',4);

  player=new AnggiePlayer(MAP_W/2, MAP_H/2);
  generateMap();

  camera.x=player.x-canvasW/2;
  camera.y=player.y-canvasH/2;

  showScreen('game-screen');
  audio.init(); audio.resume(); audio.startMusic();
  rafId=requestAnimationFrame(gameLoop);
}

function pauseGame() {
  if (gameState!=='playing') return;
  gameState='paused';
  audio.stopMusic();
  document.getElementById('pause-screen').classList.add('active');
}

function resumeGame() {
  if (gameState!=='paused') return;
  gameState='playing';
  document.getElementById('pause-screen').classList.remove('active');
  audio.startMusic();
  rafId=requestAnimationFrame(gameLoop);
}

function quitToMenu() {
  cancelAnimationFrame(rafId);
  gameState='menu'; audio.stopMusic();
  document.getElementById('pause-screen').classList.remove('active');
  showScreen('menu-screen');
}

function finishVictory() {
  cancelAnimationFrame(rafId);
  gameState='gameover';
  audio.stopMusic(); audio.playVictory();

  if (pts>highScore) {
    highScore=pts;
    localStorage.setItem('bothrops_hs', highScore);
    document.getElementById('menu-highscore').textContent=highScore;
    document.getElementById('new-record-banner').classList.remove('hidden');
  } else {
    document.getElementById('new-record-banner').classList.add('hidden');
  }

  document.getElementById('go-score').textContent=pts;
  document.getElementById('go-caught').textContent=caught;

  const list=document.getElementById('species-list');
  list.innerHTML='';
  catalog.forEach(sp=>{
    const li=document.createElement('li');
    li.innerHTML=`<span>🐍 <em>${sp.name}</em></span><span style="color:var(--text-muted)">${sp.common}</span>`;
    list.appendChild(li);
  });

  showScreen('gameover-screen');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ════════════════════════════════════════════════════════════════
//  INPUT: TECLADO
// ════════════════════════════════════════════════════════════════
window.addEventListener('keydown', e=>{
  const k=e.key.length===1 ? e.key.toLowerCase() : e.key;
  if (keys.hasOwnProperty(k)) { keys[k]=true; }
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
});
window.addEventListener('keyup', e=>{
  const k=e.key.length===1 ? e.key.toLowerCase() : e.key;
  if (keys.hasOwnProperty(k)) keys[k]=false;
});

// ════════════════════════════════════════════════════════════════
//  INPUT: JOYSTICK VIRTUAL
// ════════════════════════════════════════════════════════════════
const joyContainer=document.getElementById('joystick-container');
const joyBase=document.getElementById('joystick-base');
const joyStick=document.getElementById('joystick-stick');

function joyStart(e) {
  e.preventDefault(); joystickActive=true;
  const t=e.touches?e.touches[0]:e;
  const r=joyBase.getBoundingClientRect();
  joyStartPos.x=r.left+r.width/2; joyStartPos.y=r.top+r.height/2;
  joyMove_inner(t);
}
function joyMove(e) {
  if (!joystickActive) return; e.preventDefault();
  joyMove_inner(e.touches?e.touches[0]:e);
}
function joyMove_inner(t) {
  const dx=t.clientX-joyStartPos.x, dy=t.clientY-joyStartPos.y;
  const d=Math.hypot(dx,dy);
  const sx=d>JOYSTICK_R?(dx/d*JOYSTICK_R):dx;
  const sy=d>JOYSTICK_R?(dy/d*JOYSTICK_R):dy;
  joyStick.style.transform=`translate(${sx}px,${sy}px)`;
  touchInputX=sx/JOYSTICK_R; touchInputY=sy/JOYSTICK_R;
}
function joyEnd() {
  joystickActive=false; touchInputX=0; touchInputY=0;
  joyStick.style.transform='translate(0,0)';
}

joyContainer.addEventListener('touchstart', joyStart, {passive:false});
window.addEventListener('touchmove',  joyMove,  {passive:false});
window.addEventListener('touchend',   joyEnd);
joyContainer.addEventListener('mousedown', joyStart);
window.addEventListener('mousemove', e=>{ if(joystickActive&&!e.touches) joyMove(e); });
window.addEventListener('mouseup',   ()=>{ if(joystickActive) joyEnd(); });

// ════════════════════════════════════════════════════════════════
//  BOTONES DOM
// ════════════════════════════════════════════════════════════════
function muteToggle() {
  const m=audio.toggleMute();
  const t=m?'🔇':'🔊';
  document.getElementById('btn-mute-menu').textContent=t;
  document.getElementById('btn-mute').textContent=t;
}
document.getElementById('btn-mute-menu').addEventListener('click',e=>{e.stopPropagation();audio.init();muteToggle();});
document.getElementById('btn-mute').addEventListener('click',e=>{e.stopPropagation();muteToggle();});

document.getElementById('btn-play').addEventListener('click',()=>{audio.playClick();startGame();});
document.getElementById('btn-pause').addEventListener('click',()=>{audio.playClick();pauseGame();});

const instrModal=document.getElementById('instructions-modal');
document.getElementById('btn-instructions').addEventListener('click',()=>{audio.init();audio.playClick();instrModal.classList.add('active');});
document.getElementById('btn-close-instructions').addEventListener('click',()=>{audio.playClick();instrModal.classList.remove('active');});

document.getElementById('btn-resume').addEventListener('click',()=>{audio.playClick();resumeGame();});
document.getElementById('btn-restart').addEventListener('click',()=>{audio.playClick();document.getElementById('pause-screen').classList.remove('active');startGame();});
document.getElementById('btn-quit').addEventListener('click',()=>{audio.playClick();quitToMenu();});

document.getElementById('btn-play-again').addEventListener('click',()=>{audio.playClick();startGame();});
document.getElementById('btn-menu').addEventListener('click',()=>{audio.playClick();showScreen('menu-screen');});

// ════════════════════════════════════════════════════════════════
//  RESIZE / INIT
// ════════════════════════════════════════════════════════════════
function resize() {
  canvasW=window.innerWidth; canvasH=window.innerHeight;
  const dpr=window.devicePixelRatio||1;
  canvas.width=canvasW*dpr; canvas.height=canvasH*dpr;
  ctx.scale(dpr,dpr);
  ctx.imageSmoothingEnabled=false;
  if (gameState==='playing'||gameState==='paused') drawFrame();
}
window.addEventListener('resize',resize);
window.addEventListener('load',()=>{
  document.getElementById('menu-highscore').textContent=highScore;
  resize();
  document.addEventListener('touchstart',e=>{if(e.touches.length>1)e.preventDefault();},{passive:false});
  document.addEventListener('gesturestart',e=>e.preventDefault());
});
