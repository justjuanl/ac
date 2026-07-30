/* ==========================================================================
   BOTHROPS HUNT: SELVA NUBLADA VENEZOLANA
   Motor de Juego Principal (game.js) – Versión Terreno Detallado y Cámara Centrada
   ========================================================================== */

'use strict';

// ════════════════════════════════════════════════════════════════
//  BASE DE DATOS CIENTÍFICA DE BOTHROPS (Velocidad ajustada más lenta)
// ════════════════════════════════════════════════════════════════
const BOTHROPS_DB = [
  // --- DIURNAS ---
  { id:'atrox',        name:'Bothrops atrox',        common:'Jergón del Oriente',       color:'#c4a882', bodyColor:'#8b6914', pts:100, speed:0.85, nocturnal:false },
  { id:'asper',        name:'Bothrops asper',         common:'Terciopelo / Barba Amarilla', color:'#a0845c', bodyColor:'#5a3e10', pts:120, speed:1.0,  nocturnal:false },
  { id:'jararaca',     name:'Bothrops jararaca',      common:'Jararaca del Sur',         color:'#b8a070', bodyColor:'#6b5118', pts:110, speed:0.9,  nocturnal:false },
  { id:'venezuelensis',name:'Bothrops venezuelensis', common:'Tigra Mariposa',           color:'#c8a028', bodyColor:'#855200', pts:150, speed:1.15, nocturnal:false },
  { id:'lanceolatus',  name:'Bothrops lanceolatus',   common:'Fer-de-lance',             color:'#d4a862', bodyColor:'#7c5010', pts:130, speed:1.05, nocturnal:false },
  // --- NOCTURNAS ---
  { id:'bilineatus',   name:'Bothrops bilineatus',    common:'Víbora de Palma Verde',    color:'#5aba42', bodyColor:'#216a0a', pts:200, speed:1.3,  nocturnal:true  },
  { id:'taeniatus',    name:'Bothrops taeniatus',     common:'Jergón de Musgo',          color:'#78a640', bodyColor:'#3a5c10', pts:180, speed:1.2,  nocturnal:true  },
  { id:'pictus',       name:'Bothrops pictus',        common:'Jergón de Costa',          color:'#c8b428', bodyColor:'#7a6800', pts:160, speed:1.1,  nocturnal:true  },
  { id:'alternatus',   name:'Bothrops alternatus',    common:'Crucera / Urutú',          color:'#8a6040', bodyColor:'#422010', pts:190, speed:1.25, nocturnal:true  },
];

// ════════════════════════════════════════════════════════════════
//  PALETA DE COLORES DEL MOTOR PIXEL ART
// ════════════════════════════════════════════════════════════════
const C = {
  '.': null,
  // Piel y cuerpo Anggie
  'P': '#e8b88a', 'p': '#d09070', 'K': '#1a0e08', 'k': '#2a1810',
  // Maquillaje Anggie
  'G': '#39b54a', 'Y': '#f5e020',
  // Ropa Anggie
  'T': '#c87858', 't': '#a05838', 'J': '#e8dcc8', 'j': '#c8b8a0',
  'B': '#3060b8', 'b': '#1e4080', 'R': '#c03020', 'O': '#f0eee8',
  // Piel Péfaur
  'Q': '#d49060', 'q': '#a86838', 'g': '#a0a0a0', 'w': '#c8c8c8',
  'C': '#7eb8d8', 'c': '#5090b0', 'L': '#c8a030', 'l': '#804000', 'e': '#80cce830',
  // Serpiente
  'S': '#b09060', 's': '#604020', 'X': '#000000', 'x': '#1a0800',
  // Entorno / Terreno RPG
  'D': '#1d5c2c', 'd': '#133d1d', 'F': '#2e7d32', 'f': '#1b4f21',
  'M': '#4caf50', 'm': '#2e7d32', 'E': '#8d6e63', 'A': '#e8b624',
  'H': '#0288d1', 'I': '#f8bbd0', 'N': '#5c3d11',
  // Roca y camino
  'r': '#8d99ae', 'R2': '#4a5568', 'W2': '#edf2f7',
  'w2': '#d4a373', 'w3': '#bc6c25', 'w4': '#dda15e'
};

// ════════════════════════════════════════════════════════════════
//  SPRITES PIXEL ART (Escala aumentada a 3.8x para mayor detalle)
// ════════════════════════════════════════════════════════════════
const SP = {

  // ── ANGGIE ──────────────────────────────────────────────────
  anggie_front: [
    [
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
      "..BbBBBBBbBB...",
      "...RRR.RRR.....",
      "...RRR.RRR....."
    ],
    [
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
      "..BbBBB.BbBB...",
      "...RRR..RRR....",
      "...RR...RRR....."
    ],
    [
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

  anggie_side: [
    [
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
    [
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

  anggie_back: [
    [
      "....KKKKKK.....",
      "...KkKKKKkK....",
      "..KkKKKKKKkK...",
      "..KKKKKKKKkK...",
      "..KkKKKKKKkK...",
      "...KKkKKkKK....",
      "....KKKKkKK....",
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

  // ── PROFESOR PÉFAUR ─────────────────────────────────────────
  pefaur_front: [
    [
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
    ],
    [
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

  // ── BOTHROPS ────────────────────────────────────────────────
  snake: [
    [
      "....SsSSSsS...",
      "...SSSsSSSSS..",
      "..SSXsXsSSS...",
      "..SSSxSSSSS...",
      "...SSSSsSSSS..",
      "....SSSSsSSS.",
      "..sSSSSSSSs..",
      ".sSSSSSSSs...",
      "..sSSSSs.....",
      "...sSSs......"
    ],
    [
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

  // ── ELEMENTOS DEL ENTORNO ──────────────────────────────────
  chest_closed: [
    "...EAAAAAE...",
    "..EAAAAAAAAE.",
    ".EAAAAAAAAAE.",
    ".EAAAAALAAAE.",
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
    ".YYYYYYYYYYYYY",
    "..EEEEEEEE...",
    "..EAEAEAEE...",
    "..EEEEEEEE...",
    "..EEEEEEEE...",
    "..EEEEEEEE..."
  ],

  tree: [
    "........MMMM........",
    ".......MmMMMmM......",
    ".....IMmMMMMmMMI....",
    "....IMMmMMMmMMMMI...",
    "...MMMMmMMMmMMMMM...",
    "...MmMMMmMMMmMMMM...",
    "....MMMmMMMmMMMMM...",
    "....FMMmMMMmMMMF....",
    "......NNNNNNNN......",
    ".....NNdNdNNNNN.....",
    ".....NNNNdNNNNN.....",
    "....NNNNNNNNNNNN...."
  ],

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

  rock: [
    "....rrrr....",
    "..rrR2R2rr..",
    ".rR2R2R2R2r.",
    ".rR2dDdDR2r.",
    "..rrR2R2rr..",
    "....rrrr...."
  ],

  log: [
    "..NNNNNNNNNN..",
    ".NdNNNNNNNnNN.",
    "NNNNNnNNNNNNNN",
    ".NdNNNNNNNnNN.",
    "..NNNNNNNNNN.."
  ],

  xpi: [
    "...YYYY...",
    "..YYYYYY..",
    ".YwYYwYYY.",
    ".YYYYYYYY.",
    ".YXYXYYYY.",
    ".YYYYYYYY.",
    ".YYYYYYYY.",
    "..YYYYYY..",
    "...YYYY..."
  ]
};

// ════════════════════════════════════════════════════════════════
//  CANVAS Y ESTADO GLOBAL
// ════════════════════════════════════════════════════════════════
const canvas   = document.getElementById('gameCanvas');
const ctx      = canvas.getContext('2d');
let canvasW    = window.innerWidth;
let canvasH    = window.innerHeight;

const MAP_W    = 2000;
const MAP_H    = 2000;

// Estado del juego
let gameState  = 'menu';
let storyPhase = 'phase1_day';
let score      = 0;
let pts        = 0;
let highScore  = parseInt(localStorage.getItem('bothrops_hs')) || 0;
let caught     = 0;
let catalog    = [];

// Energía de Anggie
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
let terrainProps = []; // rocas, troncos, hongos, flores
let pathNodes  = [];  // nodos de camino orgánico de tierra
let particles  = [];
let mistClouds = [];
const camera   = { x:0, y:0 };

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
//  UTILIDAD: DIBUJAR SPRITE (Escala por defecto 3.8x)
// ════════════════════════════════════════════════════════════════
function drawSprite(sprite, wx, wy, scale = 3.8, flipX = false, colorOverride = {}) {
  const rows = sprite.length;
  const cols = sprite[0].length;

  ctx.save();
  ctx.translate(wx - camera.x, wy - camera.y);
  if (flipX) { ctx.scale(-1, 1); ctx.translate(-cols * scale, 0); }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = sprite[r][c];
      if (ch === '.') continue;
      const col = colorOverride[ch] || C[ch];
      if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(c * scale, r * scale, scale + 0.4, scale + 0.4);
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
    else { this.vy+=0.03; this.vx*=0.98; }
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
    }
    ctx.restore();
  }
}

function burst(x,y,col,count=16,speed=2.5) {
  for (let i=0;i<count;i++) {
    const a=Math.random()*Math.PI*2, sp=Math.random()*speed+0.8;
    particles.push(new Particle(x,y,col,Math.cos(a)*sp,Math.sin(a)*sp,
      Math.floor(Math.random()*20+20), Math.random()>0.5?5:4));
  }
}

function floatText(x,y,text,col='#fff') {
  const p = new Particle(x,y-25,col,0,-1.2,55,0,'text');
  p.text = text;
  particles.push(p);
}

// ════════════════════════════════════════════════════════════════
//  NIEBLA AMBIENTAL
// ════════════════════════════════════════════════════════════════
class MistCloud {
  constructor() { this.reset(true); }
  reset(init=false) {
    this.x    = Math.random()*MAP_W;
    this.y    = init ? Math.random()*MAP_H : (Math.random()>0.5 ? -60 : MAP_H+60);
    this.w    = Math.random()*220+140;
    this.h    = Math.random()*40+25;
    this.vx   = (Math.random()-0.5)*0.3;
    this.vy   = (Math.random()-0.5)*0.15;
    this.alpha= Math.random()*0.16+0.06;
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
//  ENTIDADES Y ELEMENTOS DEL TERRENO
// ════════════════════════════════════════════════════════════════
class Obstacle {
  constructor(x,y,type) {
    this.x=x; this.y=y; this.type=type;
    this.radius = type==='tree' ? 24 : 0;
  }
  draw() {
    if (this.type==='tree')
      drawSprite(SP.tree, this.x-36, this.y-45*3.8, 3.8);
    else
      drawSprite(SP.bush, this.x-28, this.y-28, 3.5);
  }
}

class TerrainProp {
  constructor(x,y,type) {
    this.x=x; this.y=y; this.type=type; // rock, log, flower, mushroom
  }
  draw() {
    if (this.type==='rock') {
      drawSprite(SP.rock, this.x-20, this.y-16, 3.2);
    } else if (this.type==='log') {
      drawSprite(SP.log, this.x-24, this.y-14, 3.2);
    } else if (this.type==='mushroom') {
      const sx=this.x-camera.x, sy=this.y-camera.y;
      ctx.save();
      ctx.fillStyle='#e63946';
      ctx.beginPath(); ctx.arc(sx,sy,6,0,Math.PI,true); ctx.fill();
      ctx.fillStyle='#fff';
      ctx.fillRect(sx-2,sy,4,6);
      ctx.fillRect(sx-3,sy-4,2,2); ctx.fillRect(sx+1,sy-5,2,2);
      ctx.restore();
    } else if (this.type==='flower') {
      const sx=this.x-camera.x, sy=this.y-camera.y;
      ctx.save();
      ctx.fillStyle='#ffb703';
      ctx.beginPath(); ctx.arc(sx,sy,4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#ff006e';
      ctx.beginPath(); ctx.arc(sx-3,sy,3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(sx+3,sy,3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(sx,sy-3,3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(sx,sy+3,3,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  PROFESOR PÉFAUR NPC
// ════════════════════════════════════════════════════════════════
class PefaurNPC {
  constructor(x,y) { this.x=x; this.y=y; this.radius=26; this.hasXpi=true; this.frame=0; this.animT=0; }
  update() { this.animT+=0.06; this.frame=Math.floor(this.animT)%2; }
  draw() {
    drawSprite(SP.pefaur_front[this.frame], this.x-26, this.y-48, 3.8);
    if (this.hasXpi) {
      const fy = Math.sin(tick*0.08)*4;
      drawSprite(SP.xpi, this.x+32, this.y-36+fy, 3.0);
      const r=28+Math.sin(tick*0.1)*5;
      ctx.save();
      ctx.strokeStyle=`rgba(255,234,0,${0.6+0.4*Math.sin(tick*0.1)})`;
      ctx.lineWidth=3;
      ctx.beginPath();
      ctx.arc(this.x-camera.x, this.y-camera.y-55, r, 0, Math.PI*2);
      ctx.stroke();
      ctx.fillStyle='rgba(255,234,0,0.95)';
      ctx.font='bold 18px sans-serif';
      ctx.textAlign='center';
      ctx.fillText('!', this.x-camera.x, this.y-camera.y-48);
      ctx.restore();
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  COFRE / LINTERNA (SORPRESA)
// ════════════════════════════════════════════════════════════════
class ChestItem {
  constructor(x,y) { this.x=x; this.y=y; this.radius=30; this.isOpen=false; this.glowT=0; }
  update() { this.glowT+=0.07; }
  draw() {
    const sprite = this.isOpen ? SP.chest_open : SP.chest_closed;
    drawSprite(sprite, this.x-22, this.y-32, 3.5);

    if (!this.isOpen) {
      const sx=this.x-camera.x, sy=this.y-camera.y;
      ctx.save();
      const grad = ctx.createLinearGradient(sx,sy,sx,sy-120);
      grad.addColorStop(0, `rgba(255,220,50,${0.35+0.15*Math.sin(this.glowT)})`);
      grad.addColorStop(1, 'rgba(255,220,50,0)');
      ctx.fillStyle=grad;
      ctx.beginPath();
      ctx.moveTo(sx-18, sy);
      ctx.lineTo(sx+18, sy);
      ctx.lineTo(sx+35, sy-120);
      ctx.lineTo(sx-35, sy-120);
      ctx.fill();
      ctx.restore();
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  SERPIENTE BOTHROPS (Slower speeds)
// ════════════════════════════════════════════════════════════════
class BothropsSnake {
  constructor(x,y,species) {
    this.x=x; this.y=y; this.species=species; this.radius=22;
    this.speed=species.speed; this.frame=0; this.animT=0; this.flipX=false;
    const a=Math.random()*Math.PI*2;
    this.vx=Math.cos(a)*this.speed; this.vy=Math.sin(a)*this.speed;
    this.stateT=Math.floor(Math.random()*120);
    this.tongueOut=false; this.tongueT=0;
  }
  update() {
    this.animT+=0.08; this.frame=Math.floor(this.animT)%2;
    this.stateT--; this.tongueT++;

    if (this.tongueT%80===0) { this.tongueOut=true; setTimeout(()=>{ this.tongueOut=false; },350); }

    if (this.stateT<=0) {
      const a=Math.random()*Math.PI*2;
      this.vx=Math.cos(a)*this.speed; this.vy=Math.sin(a)*this.speed;
      this.stateT=Math.floor(Math.random()*140+70);
    }

    this.x+=this.vx; this.y+=this.vy;
    if (this.x<60||this.x>MAP_W-60) this.vx*=-1;
    if (this.y<60||this.y>MAP_H-60) this.vy*=-1;
    this.x=Math.max(60,Math.min(MAP_W-60,this.x));
    this.y=Math.max(60,Math.min(MAP_H-60,this.y));
    this.flipX=this.vx<0;
  }
  draw() {
    const oc={ 'S':this.species.color, 's':this.species.bodyColor };
    drawSprite(SP.snake[this.frame], this.x-26, this.y-20, 3.6, this.flipX, oc);

    if (this.tongueOut) {
      const sx=this.x-camera.x, sy=this.y-camera.y-5;
      const dir=this.flipX?-1:1;
      ctx.save();
      ctx.strokeStyle='#ff3333'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sx+dir*18,sy);
      ctx.moveTo(sx+dir*18,sy); ctx.lineTo(sx+dir*26,sy-5);
      ctx.moveTo(sx+dir*18,sy); ctx.lineTo(sx+dir*26,sy+5);
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
    this.x=x; this.y=y; this.radius=20;
    this.baseSpeed=3.4; this.speed=this.baseSpeed;
    this.dir='front'; this.flipX=false;
    this.frame=0; this.walkT=0; this.isMoving=false;
    this.xpiBoostT=0;
    this.catchRadius=38;
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

    if (isTired) {
      this.speed=1.4;
    } else if (this.xpiBoostT>0) {
      this.xpiBoostT--;
      this.speed=5.2;
      if (Math.random()<0.3) {
        particles.push(new Particle(this.x+(Math.random()-0.5)*18, this.y+6,
          '#ffea00',-dx*1.8,-dy*1.8,16,4));
      }
    } else {
      this.speed=this.baseSpeed;
    }

    if (isTired && Math.random()<0.1) {
      particles.push(new Particle(this.x+(Math.random()-0.5)*16, this.y-38,
        '#64b5f6', 0, 0.8, 24, 4));
    }

    if (dx!==0||dy!==0) {
      this.isMoving=true;
      this.x+=dx*this.speed; this.y+=dy*this.speed;

      if (Math.abs(dx)>0.4) { this.dir='side'; this.flipX=dx<0; }
      else { this.dir = dy>0?'front':'back'; this.flipX=false; }

      this.walkT+=0.22;
      this.frame=(Math.floor(this.walkT)%2)+1;
      this.stepSound++;

      if (this.stepSound%20===0) audio.playStep();

      this.x=Math.max(40,Math.min(MAP_W-40,this.x));
      this.y=Math.max(40,Math.min(MAP_H-40,this.y));

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

    if (this.isMoving && Math.random()<0.08) {
      particles.push(new Particle(this.x, this.y+12,'#4a7c50',
        (Math.random()-0.5)*0.6, -Math.random()*0.4, 20, 3));
    }
  }

  draw() {
    let sprite;
    if (this.dir==='side')  sprite=SP.anggie_side[this.frame===0?0:1];
    else if (this.dir==='back') sprite=SP.anggie_back[0];
    else sprite=SP.anggie_front[this.frame];

    drawSprite(sprite, this.x-26, this.y-58, 3.8, this.flipX);

    if (this.xpiBoostT>0) {
      ctx.save();
      const a=0.35+0.2*Math.sin(tick*0.2);
      ctx.strokeStyle=`rgba(255,234,0,${a})`;
      ctx.lineWidth=4;
      ctx.beginPath();
      ctx.ellipse(this.x-camera.x, this.y-camera.y-10, 32, 40, 0, 0, Math.PI*2);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  GENERACIÓN DEL TERRENO DETALLADO Y CAMINOS ORGÁNICOS
// ════════════════════════════════════════════════════════════════
function generateMap() {
  obstacles=[]; terrainProps=[]; snakes=[]; particles=[]; mistClouds=[]; pathNodes=[];
  chestItem=null; pefaurNPC=null;

  // Generar red de caminos de tierra orgánicos (inspirados en referencia.png)
  const mainWaypoints = [
    {x: MAP_W*0.2, y: MAP_H*0.2},
    {x: MAP_W*0.5, y: MAP_H*0.3},
    {x: MAP_W*0.8, y: MAP_H*0.25},
    {x: MAP_W*0.3, y: MAP_H*0.6},
    {x: MAP_W*0.5, y: MAP_H*0.5},
    {x: MAP_W*0.7, y: MAP_H*0.75},
    {x: MAP_W*0.2, y: MAP_H*0.85},
    {x: MAP_W*0.8, y: MAP_H*0.85}
  ];

  // Interpolar puntos a lo largo de caminos curvados
  for (let i = 0; i < mainWaypoints.length - 1; i++) {
    const p1 = mainWaypoints[i];
    const p2 = mainWaypoints[i+1];
    const steps = 25;
    for (let t = 0; t <= steps; t++) {
      const ratio = t / steps;
      const nx = p1.x + (p2.x - p1.x) * ratio + Math.sin(ratio * Math.PI * 3) * 40;
      const ny = p1.y + (p2.y - p1.y) * ratio + Math.cos(ratio * Math.PI * 2) * 40;
      pathNodes.push({x: nx, y: ny, r: Math.random()*25 + 35});
    }
  }

  // Árboles con musgo y raíces
  let tries=0;
  while (obstacles.filter(o=>o.type==='tree').length<45 && tries<500) {
    const rx=Math.random()*(MAP_W-220)+110, ry=Math.random()*(MAP_H-220)+110;
    if (Math.hypot(rx-MAP_W/2, ry-MAP_H/2)>160) {
      if (!obstacles.some(o=>Math.hypot(o.x-rx,o.y-ry)<80)) {
        obstacles.push(new Obstacle(rx,ry,'tree'));
      }
    }
    tries++;
  }

  // Arbustos
  for (let i=0; i<35; i++) {
    obstacles.push(new Obstacle(
      Math.random()*(MAP_W-200)+100,
      Math.random()*(MAP_H-200)+100,
      'bush'
    ));
  }

  // Rocas, troncos caídos, hongos y flores
  for (let i=0; i<25; i++) {
    terrainProps.push(new TerrainProp(Math.random()*(MAP_W-200)+100, Math.random()*(MAP_H-200)+100, 'rock'));
    terrainProps.push(new TerrainProp(Math.random()*(MAP_W-200)+100, Math.random()*(MAP_H-200)+100, 'log'));
    terrainProps.push(new TerrainProp(Math.random()*(MAP_W-200)+100, Math.random()*(MAP_H-200)+100, 'mushroom'));
    terrainProps.push(new TerrainProp(Math.random()*(MAP_W-200)+100, Math.random()*(MAP_H-200)+100, 'flower'));
  }

  // Nubes de niebla
  for (let i=0;i<18;i++) mistClouds.push(new MistCloud());

  // Serpientes diurnas iniciales
  spawnSnakes(false, 5);
}

function spawnSnakes(nocturnal, count) {
  const pool = BOTHROPS_DB.filter(s=>s.nocturnal===nocturnal);
  for (let i=0;i<count;i++) {
    const sp=pool[Math.floor(Math.random()*pool.length)];
    let rx,ry,ok=false, att=0;
    while (!ok&&att<60) {
      rx=Math.random()*(MAP_W-240)+120; ry=Math.random()*(MAP_H-240)+120;
      const nearTree=obstacles.some(o=>o.type==='tree'&&Math.hypot(o.x-rx,o.y-ry)<60);
      const nearPlayer=player&&Math.hypot(player.x-rx,player.y-ry)<250;
      if (!nearTree&&!nearPlayer) ok=true;
      att++;
    }
    if (ok) snakes.push(new BothropsSnake(rx,ry,sp));
  }
}

// ════════════════════════════════════════════════════════════════
//  SISTEMA NARRATIVO: DIÁLOGOS (Profesor Péfaur)
// ════════════════════════════════════════════════════════════════
const STORY = {
  pefaur_arrives: [
    { who:'Profesor Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'¡Anggie! Te ves agotada... ¡has estado buscando Bothrops sin parar por toda la selva!' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'Profesor Péfaur... sí, ya no puedo más... ¡pero hay tantas especies que registrar!' },
    { who:'Profesor Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'Toma esta Xpi bien helada. ¡Recarga energías y continuamos el muestreo!' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Muchas gracias, Profesor! Esta Xpi helada es justo lo que necesitaba.' },
  ],
  night_falling: [
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Vaya... está anocheciendo! Las especies nocturnas van a salir ahora.' },
    { who:'Profesor Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'¡Exacto, Anggie! Las Bothrops bilineatus y taeniatus son más activas en la oscuridad.' },
  ],
  found_headlamp: [
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Oh! ¡Hay algo brillando entre la vegetación! ¡Es una linterna frontal! ¡Qué suerte!' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Con esto puedo seguir buscando Bothrops nocturnas en la oscuridad! ¡Vamos!' },
  ],
  victory: [
    { who:'Profesor Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'¡Extraordinario trabajo, Anggie! Hemos completado el muestreo de campo.' },
    { who:'Profesor Péfaur', img:'assets/pefaur_portrait.jpg',
      text:'Ya tenemos especímenes de varias especies del género Bothrops. ¡Material invaluable!' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Sí, Profesor Péfaur! Entre la colección diurna y nocturna tenemos datos excepcionales.' },
    { who:'Anggie', img:'assets/anggie_portrait.jpg',
      text:'¡Esta investigación en la Selva Nublada venezolana va a ser histórica! ¡Volvamos al laboratorio!' },
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

  energyTarget = Math.max(0, energyTarget-12);
  updateEnergyBar();

  showCatchPanel(snake.species);

  burst(snake.x, snake.y, snake.species.color, 20, 2.8);
  floatText(snake.x, snake.y, '+'+snake.species.pts+' pts', caught>1?'#a8e063':'#fff');

  if (!catalog.some(s=>s.id===snake.species.id)) catalog.push(snake.species);

  // ── PROGRESIÓN NARRATIVA ──────────────────────────────────────
  if (storyPhase==='phase1_day' && caught>=4) {
    storyPhase='cutscene_tired';
    isTired=true; energyTarget=8; updateEnergyBar();
    setTimeout(()=>{
      pefaurNPC = new PefaurNPC(player.x+150, player.y-40);
      setPhaseUI('🥤','EL PROFESOR PÉFAUR HA LLEGADO',
        'Habla con el Profesor Péfaur para recuperar energías',1);
    }, 1400);
  }
  else if (storyPhase==='phase2_afternoon' && caught>=7) {
    storyPhase='phase3_dusk';
    setPhaseUI('🌙','ATARDECER EN LA SELVA','¡Explora la selva al anochecer!', 3);

    nightTarget=0.75;
    audio.playNightTransition();

    setTimeout(()=>{
      showDialog('night_falling', ()=>{
        storyPhase='phase3_night';
        nightTarget=0.92;
      });
    }, 2500);
  }
  else if (storyPhase==='phase3_night' && caught>=10) {
    storyPhase='phase4_lamp_spawn';
    // Linterna aparece de sorpresa cerca de Anggie
    chestItem = new ChestItem(player.x + (Math.random()>0.5?1:-1)*110,
                               player.y + (Math.random()>0.5?1:-1)*80);
    setPhaseUI('🔦','¡ALGO BRILLA ENTRE LA VEGETACIÓN!',
      'Anggie nota un destello en el suelo...', 0);
    burst(chestItem.x, chestItem.y, '#ffea00', 24, 2.0);
    floatText(chestItem.x, chestItem.y-10, '¡Linterna sorpresa!', '#ffea00');
  }
  else if (storyPhase==='phase4_night_lamp' && caught>=14) {
    storyPhase='cutscene_victory';
    pefaurNPC = new PefaurNPC(player.x+130, player.y-30);
    setPhaseUI('🏁','¡MUESTREO COMPLETADO!',
      'Habla con el Profesor Péfaur para finalizar la expedición', 0);
  }
}

let catchPanelTimer=null;
function showCatchPanel(sp) {
  document.getElementById('catch-species-name').textContent = sp.name;
  document.getElementById('catch-species-common').textContent = '('+sp.common+')';
  document.getElementById('catch-points').textContent = '+'+sp.pts+' pts cient.';
  const panel = document.getElementById('catch-panel');
  panel.classList.remove('hidden');
  clearTimeout(catchPanelTimer);
  catchPanelTimer=setTimeout(()=>panel.classList.add('hidden'), 3200);
}

// ════════════════════════════════════════════════════════════════
//  BUCLE PRINCIPAL: UPDATE Y CÁMARA CENTRADA
// ════════════════════════════════════════════════════════════════
function updateGame() {
  if (gameState!=='playing') return;
  tick++;

  nightAlpha += (nightTarget - nightAlpha)*0.008;
  energy += (energyTarget - energy)*0.05;

  // Player update
  player.update();

  // CÁMARA CENTRADA DE FORMA EXACTA Y SUAVE
  const targetCamX = player.x - canvasW / 2;
  const targetCamY = player.y - canvasH / 2;

  camera.x += (targetCamX - camera.x) * 0.15;
  camera.y += (targetCamY - camera.y) * 0.15;

  camera.x = Math.max(0, Math.min(MAP_W - canvasW, camera.x));
  camera.y = Math.max(0, Math.min(MAP_H - canvasH, camera.y));

  for (const m of mistClouds) m.update();

  if (pefaurNPC) {
    pefaurNPC.update();
    if (storyPhase==='cutscene_tired' && Math.hypot(player.x-pefaurNPC.x, player.y-pefaurNPC.y)<60) {
      storyPhase='dialog_pefaur1';
      showDialog('pefaur_arrives', ()=>{
        pefaurNPC.hasXpi=false;
        isTired=false; energyTarget=100; updateEnergyBar();
        player.xpiBoostT=500;
        audio.playXpiDrink();
        storyPhase='phase2_afternoon';
        setPhaseUI('🌤️','FASE 2: TARDECER',
          'Captura 3 Bothrops más antes de que anochezca', 3);
        spawnSnakes(false,4);
      });
    }

    if (storyPhase==='cutscene_victory' && Math.hypot(player.x-pefaurNPC.x, player.y-pefaurNPC.y)<60) {
      storyPhase='dialog_victory';
      showDialog('victory', ()=>{
        finishVictory();
      });
    }
  }

  if (chestItem && !chestItem.isOpen) {
    chestItem.update();
    if (Math.hypot(player.x-chestItem.x, player.y-chestItem.y)<60) {
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

  for (let i=snakes.length-1;i>=0;i--) {
    snakes[i].update();
    if (Math.hypot(player.x-snakes[i].x, player.y-snakes[i].y)<player.catchRadius) {
      catchSnake(snakes[i],i);
      break;
    }
  }

  if (snakes.length<5 && Math.random()<0.012) {
    spawnSnakes(storyPhase.includes('night')||storyPhase.includes('lamp'), 1);
  }

  for (let i=particles.length-1;i>=0;i--) {
    particles[i].update();
    if (particles[i].life<=0) particles.splice(i,1);
  }
}

// ════════════════════════════════════════════════════════════════
//  RENDERIZADO DEL TERRENO DETALLADO (INSPIRADO EN REFERENCIA.PNG)
// ════════════════════════════════════════════════════════════════
function drawMap() {
  ctx.fillStyle='#1b4332';
  ctx.fillRect(0,0,canvasW,canvasH);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  // 1. Capa de hierba base de 16-bit
  ctx.fillStyle='#2d6a4f';
  ctx.fillRect(0,0,MAP_W,MAP_H);

  // Patrón de parches de césped orgánicos duales
  for (let gx=0; gx<MAP_W; gx+=64) {
    for (let gy=0; gy<MAP_H; gy+=64) {
      if (((gx/64 + gy/64) % 2 === 0)) {
        ctx.fillStyle='#40916c';
        ctx.fillRect(gx, gy, 64, 64);
      }
    }
  }

  // 2. Caminos orgánicos de tierra (referencia.png)
  ctx.fillStyle='#dda15e';
  ctx.strokeStyle='#bc6c25';
  ctx.lineWidth=24;

  for (const node of pathNodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI*2);
    ctx.fill();
  }

  // Bordes verdes de hierba sobre el camino de tierra
  ctx.fillStyle='#1b4332';
  for (const node of pathNodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r + 6, 0, Math.PI*2);
    ctx.stroke();
  }

  // 3. Decoraciones del terreno (rocas, troncos, hongos, flores)
  for (const prop of terrainProps) {
    prop.draw();
  }

  // 4. Bordes oscuros del mapa
  ctx.fillStyle='#081c15';
  ctx.fillRect(0,0,MAP_W,30);
  ctx.fillRect(0,MAP_H-30,MAP_W,30);
  ctx.fillRect(0,0,30,MAP_H);
  ctx.fillRect(MAP_W-30,0,30,MAP_H);

  ctx.restore();
}

function drawEntities() {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  const queue=[];
  if (player) queue.push(player);
  snakes.forEach(s=>queue.push(s));
  obstacles.forEach(o=>queue.push(o));
  if (pefaurNPC) queue.push(pefaurNPC);
  if (chestItem)  queue.push(chestItem);

  queue.sort((a,b)=>a.y-b.y);
  queue.forEach(e=>e.draw());

  for (const m of mistClouds) m.draw();

  ctx.restore();
}

function drawParticles() {
  for (const p of particles) p.draw();
}

function drawNightOverlay() {
  if (nightAlpha<0.02) return;

  const offscreen = document.createElement('canvas');
  offscreen.width = canvasW; offscreen.height = canvasH;
  const oc = offscreen.getContext('2d');

  oc.fillStyle=`rgba(4,10,5,${nightAlpha})`;
  oc.fillRect(0,0,canvasW,canvasH);

  if (hasHeadlamp && player) {
    oc.globalCompositeOperation='destination-out';
    const px=player.x-camera.x, py=player.y-camera.y-10;

    const lightGrad=oc.createRadialGradient(px,py,15,px,py,200);
    lightGrad.addColorStop(0,'rgba(0,0,0,1)');
    lightGrad.addColorStop(0.6,'rgba(0,0,0,0.7)');
    lightGrad.addColorStop(1,'rgba(0,0,0,0)');
    oc.fillStyle=lightGrad;
    oc.beginPath(); oc.arc(px,py,200,0,Math.PI*2); oc.fill();

    oc.globalCompositeOperation='source-over';
    oc.globalAlpha=0.18;
    oc.fillStyle='rgba(255,240,180,0.45)';
    oc.beginPath(); oc.arc(px,py,100,0,Math.PI*2); oc.fill();
  }

  ctx.drawImage(offscreen,0,0);

  ctx.save();
  ctx.globalAlpha=nightAlpha*0.3;
  ctx.fillStyle='rgba(30,60,80,0.4)';
  ctx.fillRect(0,0,canvasW,canvasH);
  ctx.restore();

  if (nightAlpha>0.3 && tick%3===0 && Math.random()<0.18) {
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

  if (isTired) {
    const a=0.12+0.08*Math.sin(tick*0.15);
    ctx.save();
    ctx.strokeStyle=`rgba(255,50,50,${a})`;
    ctx.lineWidth=12;
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

  // CENTRAR CÁMARA INMEDIATAMENTE AL JUGADOR AL INICIAR
  camera.x = player.x - canvasW / 2;
  camera.y = player.y - canvasH / 2;

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
//  INPUT: TECLADO & JOYSTICK
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
