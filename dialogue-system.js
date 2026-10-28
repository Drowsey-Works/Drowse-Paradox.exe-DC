class DialogueEngine {
    constructor() {
        this.active = false;
        this.lines = [];
        this.currentLine = 0;
        this.charTimer = 0;
        this.charsPerSecond = 40;
        this.clock = 0;
        this.rafId = null;
        this.lastTime = 0;
        this.onComplete = null;
        this.awaitingChoice = false;
        this.shownAtLeastOnce = false;

        this.overlay = document.getElementById('dialogueOverlay');
        this.textEl = document.getElementById('dialogueText');
        this.arrowEl = document.getElementById('dialogueArrow');
        this.choicesEl = document.getElementById('dialogueChoices');

        document.querySelector('.dialogue-box').addEventListener('click', (e) => {
            if (e.target.closest('.dialogue-choices')) return;
            this.advance();
        });
        document.addEventListener('keydown', (e) => {
            if (!this.active) return;
            if (e.key === ' ' || e.key === 'Enter' || e.key === 'e' || e.key === 'E') {
                if (!this.awaitingChoice) this.advance();
            }
        });
    }

    // Normalize line.text -> array of {text, effect}
    getSegments(line) {
        if (!line) return [];
        if (typeof line.text === 'string') return [{ text: line.text, effect: line.effect || 'normal' }];
        return line.text;
    }

    lineLength(line) {
        return this.getSegments(line).reduce((sum, seg) => sum + seg.text.length, 0);
    }

    start(lines, onComplete) {
        this.lines = lines;
        this.currentLine = 0;
        this.charTimer = 0;
        this.active = true;
        this.onComplete = onComplete || null;
        this.awaitingChoice = false;
        this.shownAtLeastOnce = false;
        this.overlay.classList.add('active');
        this.textEl.innerHTML = '';
        this.choicesEl.innerHTML = '';
        this.choicesEl.classList.remove('active');
        this.lastTime = performance.now();
        this.loop();
    }

    loop() {
        if (!this.active) return;
        const now = performance.now();
        const dt = Math.min((now - this.lastTime) / 1000, 0.1);
        this.lastTime = now;
        this.update(dt);
        this.rafId = requestAnimationFrame(() => this.loop());
    }

    update(dt) {
        this.charTimer += dt;
        this.clock += dt;
        this.render();
    }

    visibleChars() {
        const line = this.lines[this.currentLine];
        if (!line) return 0;
        const total = this.lineLength(line);
        const shown = Math.floor(this.charTimer * this.charsPerSecond);
        return Math.min(shown, total);
    }

    lineFullyShown() {
        const line = this.lines[this.currentLine];
        if (!line) return true;
        return this.visibleChars() >= this.lineLength(line);
    }

    advance() {
        if (!this.active || this.awaitingChoice) return;
        if (!this.lineFullyShown()) { this.charTimer = 999; return; }

        const line = this.lines[this.currentLine];
        if (line.choices && line.choices.length) {
            this.awaitingChoice = true;
            this.render(); // ensure choices render
            return;
        }

        this.currentLine++;
        this.charTimer = 0;
        this.shownAtLeastOnce = false;
        this.textEl.innerHTML = '';
        this.arrowEl.style.display = 'none';

        if (this.currentLine >= this.lines.length) this.end();
    }

    choose(choice) {
        if (!this.awaitingChoice) return;
        this.awaitingChoice = false;
        this.choicesEl.innerHTML = '';
        this.choicesEl.classList.remove('active');
        this.currentLine++;
        this.charTimer = 0;
        this.shownAtLeastOnce = false;
        this.textEl.innerHTML = '';
        this.arrowEl.style.display = 'none';
        if (choice.onSelect) choice.onSelect();
        if (this.currentLine >= this.lines.length) this.end();
    }

    end() {
        this.active = false;
        this.overlay.classList.remove('active');
        if (this.rafId) cancelAnimationFrame(this.rafId);
        if (this.onComplete) this.onComplete();
    }

    render() {
        const line = this.lines[this.currentLine];
        if (!line) return;

        const shown = this.visibleChars();
        const segments = this.getSegments(line);

        // Flatten into individual characters with effects
        let flat = [];
        segments.forEach(seg => {
            for (const ch of seg.text) flat.push({ ch, effect: seg.effect });
        });

        const visChars = flat.slice(0, shown);
        let html = '';
        visChars.forEach((c, i) => {
            if (c.ch === ' ') { html += ' '; return; }
            html += `<span class="char ${c.effect}" style="--i:${i}">${c.ch}</span>`;
        });
        this.textEl.innerHTML = html;

        if (this.lineFullyShown() && !this.awaitingChoice) {
            this.arrowEl.style.display = 'block';
            if (!this.shownAtLeastOnce) {
                this.shownAtLeastOnce = true;
                if (line.onShow) line.onShow();
            }
        } else {
            this.arrowEl.style.display = 'none';
        }

        if (this.awaitingChoice && line.choices) {
            this.choicesEl.classList.add('active');
            if (!this.choicesEl.innerHTML.trim()) {
                this.choicesEl.innerHTML = '';
                line.choices.forEach((choice, idx) => {
                    const btn = document.createElement('button');
                    btn.className = 'choice-btn';
                    btn.innerHTML = choice.label;
                    btn.style.animationDelay = `${idx * 0.1}s`;
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.choose(choice);
                    });
                    this.choicesEl.appendChild(btn);
                });
            }
        }
    }
}
