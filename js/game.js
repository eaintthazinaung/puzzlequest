'use strict';

/* ============================================================
   game.js — PuzzleQuest
   Puzzle Engine · Tiles · Timer · Confetti · Modals
   ============================================================ */

// ─── PUZZLE LOGIC ────────────────────────────────────────────
const Puzzle = {
  solved(n) {
    return [...Array(n * n - 1).keys()].map(i => i + 1).concat(0);
  },

  shuffle(tiles, n) {
    const arr = [...tiles];
    do {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    } while (!this.solvable(arr, n) || this.isSolved(arr));
    return arr;
  },

  solvable(tiles, n) {
    const nums = tiles.filter(t => t !== 0);
    let inv = 0;
    for (let i = 0; i < nums.length - 1; i++)
      for (let j = i + 1; j < nums.length; j++)
        if (nums[i] > nums[j]) inv++;
    if (n % 2 === 1) return inv % 2 === 0;
    const blankRow = Math.floor(tiles.indexOf(0) / n);
    return (n - blankRow) % 2 === 1 ? inv % 2 === 0 : inv % 2 === 1;
  },

  isSolved(tiles) {
    for (let i = 0; i < tiles.length - 1; i++) if (tiles[i] !== i + 1) return false;
    return tiles[tiles.length - 1] === 0;
  },

  adjacentToBlank(tiles, n) {
    const blank = tiles.indexOf(0);
    const row   = Math.floor(blank / n);
    const col   = blank % n;
    const adj   = [];
    if (row > 0)     adj.push(blank - n);
    if (row < n - 1) adj.push(blank + n);
    if (col > 0)     adj.push(blank - 1);
    if (col < n - 1) adj.push(blank + 1);
    return adj;
  },

  move(tiles, idx, n) {
    const adj = this.adjacentToBlank(tiles, n);
    if (!adj.includes(idx)) return null;
    const next  = [...tiles];
    const blank = next.indexOf(0);
    [next[blank], next[idx]] = [next[idx], next[blank]];
    return next;
  },
};

// ─── CONFETTI ────────────────────────────────────────────────
const Confetti = {
  _canvas: null,
  _ctx: null,
  _particles: [],
  _animId: null,
  _colors: ['#f59e0b','#ef4444','#22c55e','#3b82f6','#ec4899','#8b5cf6','#06b6d4'],

  start() {
    if (!this._canvas) {
      this._canvas = document.createElement('canvas');
      Object.assign(this._canvas.style, {
        position: 'fixed', inset: '0', width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: '9999',
      });
      document.body.appendChild(this._canvas);
      this._ctx = this._canvas.getContext('2d');
    }
    this._canvas.width  = innerWidth;
    this._canvas.height = innerHeight;
    this._particles = Array.from({ length: 140 }, () => ({
      x:    Math.random() * innerWidth,
      y:    Math.random() * innerHeight - innerHeight,
      w:    Math.random() * 10 + 5,
      h:    Math.random() * 5  + 3,
      col:  this._colors[Math.floor(Math.random() * this._colors.length)],
      sp:   Math.random() * 3.5 + 2,
      ang:  Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.18,
      dx:   (Math.random() - 0.5) * 1.5,
    }));
    this._draw();
    setTimeout(() => this.stop(), 4000);
  },

  _draw() {
    const { _canvas: cv, _ctx: cx, _particles: p } = this;
    cx.clearRect(0, 0, cv.width, cv.height);
    p.forEach(q => {
      q.y   += q.sp;
      q.x   += q.dx;
      q.ang += q.spin;
      cx.save();
      cx.translate(q.x, q.y);
      cx.rotate(q.ang);
      cx.fillStyle = q.col;
      cx.fillRect(-q.w / 2, -q.h / 2, q.w, q.h);
      cx.restore();
    });
    this._animId = requestAnimationFrame(() => this._draw());
  },

  stop() {
    cancelAnimationFrame(this._animId);
    this._canvas?.remove();
    this._canvas = null;
    this._particles = [];
  },
};

// ─── GAME STATE ──────────────────────────────────────────────
const G = {
  cat:      null,
  imgId:    1,
  imgName:  '',
  grid:     3,
  tiles:    [],
  moves:    0,
  maxMoves: 100,
  pts:      10,
  elapsed:  0,
  startTime: null,
  timerID:  null,
  paused:   false,
  over:     false,
  _pausedAt: null,
};

// ─── DOM HELPERS ─────────────────────────────────────────────
const $ = id => document.getElementById(id);

// ─── GAME CONTROLLER ─────────────────────────────────────────
const Game = {
  init() {
    const params = new URLSearchParams(location.search);
    G.cat    = params.get('cat')  || 'animals';
    G.imgId  = +(params.get('img')  || 1);
    G.grid   = +(params.get('grid') || 3);

    if (!PQ.Auth.loggedIn()) { location.href = 'login.html'; return; }

    G.maxMoves = PQ.CONFIG.GRID_MOVES[G.grid];
    G.pts      = PQ.CONFIG.GRID_POINTS[G.grid];
    G.tiles    = Puzzle.shuffle(Puzzle.solved(G.grid), G.grid);

    const imgList = PQ.IMAGES[G.cat] ?? [];
    G.imgName     = (imgList.find(i => i.id === G.imgId) ?? imgList[0])?.name ?? '';

    this._setupPreview();
    this._renderStatusBar();
    this._renderGrid();
    this._startTimer();
    this._bindControls();

    setTimeout(() => {
      if (!PQ.Store.get('pq_muted', false)) PQ.Sound._startBg?.();
    }, 1000);
  },

  // ── STATUS BAR ──────────────────────────────────────────────
  _renderStatusBar() {
    const pr    = PQ.Auth.current();
    const lives = PQ.Lives.get();
    const livesEl = $('game-lives');
    const ptsEl   = $('game-pts');
    if (livesEl) livesEl.innerHTML = PQ.heartsHTML(lives);
    if (ptsEl)   ptsEl.textContent = `⭐ ${pr?.points ?? 0}`;
    this._renderMoveBar();
  },

  _renderMoveBar() {
    const pct     = Math.min((G.moves / G.maxMoves) * 100, 100);
    const counter = $('move-counter');
    const bar     = $('move-bar');
    if (counter) counter.textContent = `${G.moves} / ${G.maxMoves} moves`;
    if (bar) {
      bar.style.width = `${pct}%`;
      bar.className   = 'game-bar__fill'
        + (pct >= 85 ? ' game-bar__fill--danger' : pct >= 60 ? ' game-bar__fill--warn' : '');
    }
  },

  // ── GRID ────────────────────────────────────────────────────
  _renderGrid() {
    const el = $('puzzle-grid');
    if (!el) return;
    el.style.setProperty('--gs', G.grid);
    el.classList.remove('grid--solved');
    el.innerHTML = '';

    G.tiles.forEach((val, idx) => {
      const tile = document.createElement('div');
      tile.dataset.idx = idx;

      if (val === 0) {
        tile.className = 'tile tile--blank';
      } else {
        tile.className = 'tile';
        const row = Math.floor((val - 1) / G.grid);
        const col = (val - 1) % G.grid;
        const pct = 100 / (G.grid - 1);
        tile.style.cssText = `
          background-image: url('assets/images/${G.cat}/${G.imgId}.png');
          background-size: ${G.grid * 100}%;
          background-position: ${col * pct}% ${row * pct}%;`;
        tile.setAttribute('aria-label', `Tile ${val}`);
        tile.addEventListener('click', () => this._handleTileClick(idx));
      }
      el.appendChild(tile);
    });
  },

  // ── PREVIEW PANEL ───────────────────────────────────────────
  _setupPreview() {
    const img  = $('preview-img');
    const cat  = $('preview-category');
    const name = $('preview-name');
    if (img)  img.src = `assets/images/${G.cat}/${G.imgId}.png`;
    if (cat)  cat.textContent = PQ.CATEGORIES.find(c => c.id === G.cat)?.label ?? G.cat;
    if (name) name.textContent = G.imgName;

    $('preview-toggle')?.addEventListener('click', () => {
      $('game-preview')?.classList.toggle('collapsed');
    });
  },

  // ── TILE CLICK ──────────────────────────────────────────────
  _handleTileClick(idx) {
    if (G.paused || G.over) return;

    const next = Puzzle.move(G.tiles, idx, G.grid);
    if (!next) {
      PQ.Sound.wrong();
      const tile = $('puzzle-grid')?.querySelector(`[data-idx="${idx}"]`);
      tile?.classList.add('tile--shake');
      setTimeout(() => tile?.classList.remove('tile--shake'), 380);
      return;
    }

    G.tiles = next;
    G.moves++;
    PQ.Sound.tile();
    this._renderMoveBar();
    this._renderGrid();

    if (Puzzle.isSolved(G.tiles)) { this._onWin(); return; }
    if (G.moves >= G.maxMoves)    { this._onLose(); }
  },

  // ── TIMER ───────────────────────────────────────────────────
  _startTimer() {
    G.startTime = Date.now();
    G.timerID   = setInterval(() => {
      if (!G.paused) {
        G.elapsed = Math.floor((Date.now() - G.startTime) / 1000);
        const el  = $('game-timer');
        if (el) el.textContent = `⏱️ ${PQ.fmtTime(G.elapsed)}`;
      }
    }, 1000);
  },

  _stopTimer() {
    clearInterval(G.timerID);
    G.timerID = null;
  },

  // ── PAUSE ───────────────────────────────────────────────────
  _togglePause() {
    G.paused = !G.paused;
    PQ.Sound.click();
    const pauseBtn     = $('pause-btn');
    const pauseOverlay = $('pause-overlay');
    if (pauseBtn)     pauseBtn.textContent = G.paused ? '▶️ Resume' : '⏸️ Pause';
    if (pauseOverlay) pauseOverlay.style.display = G.paused ? 'flex' : 'none';
    if (G.paused)      G._pausedAt = Date.now();
    else if (G._pausedAt) { G.startTime += Date.now() - G._pausedAt; G._pausedAt = null; }
  },

  // ── RESTART ─────────────────────────────────────────────────
  _restart() {
    G.tiles   = Puzzle.shuffle(Puzzle.solved(G.grid), G.grid);
    G.moves   = 0;
    G.elapsed = 0;
    G.over    = false;
    G.paused  = false;

    const pauseBtn     = $('pause-btn');
    const pauseOverlay = $('pause-overlay');
    if (pauseBtn)     pauseBtn.textContent = '⏸️ Pause';
    if (pauseOverlay) pauseOverlay.style.display = 'none';

    this._renderStatusBar();
    this._renderGrid();
    if (G.timerID) this._stopTimer();
    this._startTimer();
  },

  // ── WIN ─────────────────────────────────────────────────────
  _onWin() {
    G.over = true;
    this._stopTimer();
    PQ.Sound.complete();
    Confetti.start();

    const pr = PQ.Auth.current();
    PQ.Auth.update({
      points:           (pr.points          ?? 0) + G.pts,
      puzzlesSolved:    (pr.puzzlesSolved    ?? 0) + 1,
      totalTime:        (pr.totalTime        ?? 0) + G.elapsed,
      bestTime:         pr.bestTime === null || G.elapsed < pr.bestTime ? G.elapsed : pr.bestTime,
      categoriesPlayed: [...new Set([...(pr.categoriesPlayed ?? []), G.cat])],
    });

    const facts = PQ.FACTS[G.cat] ?? [];
    const card  = facts.find(f => f.name === G.imgName) ?? facts[0];
    if (card) PQ.Auth.addCard(G.cat, card);
    PQ.Auth.checkAchievements({ time: G.elapsed, grid: G.grid });

  const world = G.cat;
  const levelId = G.imgId;
  if (window.completeSubMapLevel) {
    window.completeSubMapLevel(world, levelId);
  } else {
    // Store completion to be processed when returning to submap
    localStorage.setItem('pendingCompletion_' + world, levelId);
  }

    $('puzzle-grid')?.classList.add('grid--solved');
    setTimeout(() => this._showCompleteModal(card), 600);
  },

  _showCompleteModal(card) {
    const modal = $('complete-modal');
    if (!modal) return;
    const cat = PQ.CATEGORIES.find(c => c.id === G.cat);

    modal.querySelector('#cm-moves').textContent = `${G.moves} / ${G.maxMoves}`;
    modal.querySelector('#cm-time').textContent  = PQ.fmtTime(G.elapsed);
    modal.querySelector('#cm-pts').textContent   = `+${G.pts} ⭐`;

    const cardEl = modal.querySelector('#cm-card');
    if (cardEl && card) {
      cardEl.innerHTML = `
        <div class="kcard" style="--cc:${cat?.color ?? '#6366f1'}">
          <div class="kcard__head">${cat?.icon ?? '📖'} ${cat?.label ?? ''} · ${card.name}</div>
          <p>${card.fact}</p>
        </div>`;
    }
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));
  },
  

  // ── LOSE ────────────────────────────────────────────────────
  _onLose() {
    G.over = true;
    this._stopTimer();
    PQ.Sound.lifeLost();
    const remaining = PQ.Lives.lose();

    const livesEl = $('game-lives');
    if (livesEl) livesEl.innerHTML = PQ.heartsHTML(remaining);

    const modal = $('gameover-modal');
    if (!modal) return;
    modal.querySelector('#gm-lives').innerHTML     = PQ.heartsHTML(remaining);
    modal.querySelector('#gm-remaining').textContent = `${remaining} ${remaining === 1 ? 'life' : 'lives'} remaining`;
    const noLives = modal.querySelector('#gm-nolives');
    if (noLives) noLives.style.display = remaining === 0 ? 'block' : 'none';
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));
  },

  // ── CONTROLS BINDING ────────────────────────────────────────
 // In game.js - Update the _bindControls method (remove music button)
_bindControls() {
  // Pause
  $('pause-btn')?.addEventListener('click', () => this._togglePause());
  $('pause-resume')?.addEventListener('click', () => this._togglePause());

  // Restart
  $('restart-btn')?.addEventListener('click', async () => {
    PQ.Sound.click();
    const ok = await PQ.Dialog.confirm('Restart the puzzle? Your current progress will be reset.', {
      title: 'Restart Puzzle',
      icon: '🔀',
      okLabel: 'Restart',
    });
    if (ok) this._restart();
  });

  // Sound button only (music button removed)
  $('sound-btn')?.addEventListener('click', () => PQ.Sound.toggle());

  // Quit
  $('quit-btn')?.addEventListener('click', async () => {
    PQ.Sound.click();
    const ok = await PQ.Dialog.confirm('Quit this puzzle? Your progress will be lost.', {
      title: 'Quit Game',
      icon: '🚪',
      okLabel: 'Quit',
      danger: true,
    });
    if (ok) { this._stopTimer(); location.href = 'worldmap.html'; }
  });

  // Complete modal buttons
  $('cm-again')?.addEventListener('click', () => {
    PQ.Sound.click();
    const modal = $('complete-modal');
    modal?.classList.remove('show');
    setTimeout(() => { if (modal) modal.style.display = 'none'; Confetti.stop(); this._restart(); }, 320);
  });
  $('cm-hub')?.addEventListener('click', () => {
    PQ.Sound.click(); this._stopTimer(); location.href = 'worldmap.html';
  });
  $('cm-library')?.addEventListener('click', () => {
    PQ.Sound.click(); this._stopTimer(); location.href = 'library.html';
  });

  // Game-over modal buttons
  $('gm-retry')?.addEventListener('click', () => {
    PQ.Sound.click();
    if (PQ.Lives.get() <= 0) { PQ.toast('No lives left! Wait or buy one.', 'error'); return; }
    const modal = $('gameover-modal');
    modal?.classList.remove('show');
    setTimeout(() => { if (modal) modal.style.display = 'none'; this._restart(); }, 320);
  });
  $('gm-hub')?.addEventListener('click', () => {
    PQ.Sound.click(); this._stopTimer(); location.href = 'worldmap.html';
  });

  // Keyboard arrow keys
  document.addEventListener('keydown', e => {
    if (G.paused || G.over) return;
    const blank  = G.tiles.indexOf(0);
    const keyMap = {
      ArrowUp:    blank + G.grid,
      ArrowDown:  blank - G.grid,
      ArrowLeft:  blank + 1,
      ArrowRight: blank - 1,
    };
    const target = keyMap[e.key];
    if (target !== undefined && target >= 0 && target < G.tiles.length) {
      e.preventDefault();
      this._handleTileClick(target);
    }
  });
},
};

// ─── BOOT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.dataset.theme = PQ.Store.get('pq_theme', 'light');
  if (window.Nav) Nav.build();
  Game.init();
  document.addEventListener('click', () => {
    PQ.Sound.ctx?.state === 'suspended' && PQ.Sound.ctx.resume();
  }, { once: true });
});

// ============================================================
// Knowledge Card Flip Override for Complete Modal
// Moved from game.html inline script
// ============================================================

(function setupKnowledgeCardFlip() {
  // Wait for Game to be initialized
  const initializeFlipCard = () => {
    if (typeof Game === 'undefined' || !Game._showCompleteModal) return;
    
    // Store original method
    const originalShowCompleteModal = Game._showCompleteModal.bind(Game);
    
    // Override method
    Game._showCompleteModal = function(card) {
      const modal = document.getElementById('complete-modal');
      if (!modal) return;
      
      const cat = PQ.CATEGORIES.find(c => c.id === G.cat);
      
      // Update stats
      const movesEl = modal.querySelector('#cm-moves');
      const timeEl = modal.querySelector('#cm-time');
      const ptsEl = modal.querySelector('#cm-pts');
      
      if (movesEl) movesEl.textContent = `${G.moves} / ${G.maxMoves}`;
      if (timeEl) timeEl.textContent = PQ.fmtTime(G.elapsed);
      if (ptsEl) ptsEl.textContent = `+${G.pts} ⭐`;

      // Create flip card
      const cardEl = modal.querySelector('#cm-card');
      if (cardEl && card) {
        cardEl.innerHTML = `
          <div class="kcard-flip" style="--cc:${cat?.color ?? '#6366f1'}" tabindex="0">
            <div class="kcard-flip__inner">
              <div class="kcard-flip__front">
                <span class="kf-icon">${cat?.icon ?? '📖'}</span>
                <div class="kf-name">${escapeHtml(card.name)}</div>
                <div class="kf-hint">↩ Flip to reveal the fact</div>
              </div>
              <div class="kcard-flip__back">
                <div class="kf-head">${cat?.icon ?? ''} ${cat?.label ?? ''} · Knowledge Card</div>
                <p class="kf-fact">${escapeHtml(card.fact)}</p>
              </div>
            </div>
          </div>`;
        
        // Add click event for flip
        const flipCard = cardEl.querySelector('.kcard-flip');
        if (flipCard) {
          flipCard.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('flipped');
          });
        }
      }
      
      // Show modal
      modal.style.display = 'flex';
      requestAnimationFrame(() => modal.classList.add('show'));
    };
  };
  
  // Helper function to escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  
  // Try to initialize immediately if Game exists, otherwise wait
  if (typeof Game !== 'undefined') {
    initializeFlipCard();
  } else {
    // Wait for Game to be defined
    const checkInterval = setInterval(() => {
      if (typeof Game !== 'undefined') {
        clearInterval(checkInterval);
        initializeFlipCard();
      }
    }, 100);
  }
})();