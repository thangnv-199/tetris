
const app = {

    init: function() {
        this.totalLineRemove = 0;
        this.currentLineRemove = 0;
        this.score = 0;
        this.board = new Board(this);
        this.currentBrick = new Brick(this, Color[this.random()], this.random());
        this.nextBrick = new Brick(this, Color[this.random()], this.random());
        
        this.createBrick();
        this.listenerEvents();
    },
    init2: function(line, score, board) {
        const currentBrick = tetrisStorage.get('currentBrick');
        const nextBrick = tetrisStorage.get('nextBrick');
        this.totalLineRemove = line;
        this.currentLineRemove = 0;
        this.score = score;
        this.board = new Board(this, board);
        this.board.draw();
        this.currentBrick = new Brick(this, currentBrick.color, this.random(), currentBrick);
        this.nextBrick = new Brick(this, nextBrick.color, this.random(), nextBrick);
        
        this.currentBrick.draw();
        this.createBrick();
        this.listenerEvents();
    },

    listenerEvents: function() {
        boardNav.addEventListener('click', function(e) {
            const _this = e.target;
            const isStartButton = _this.closest('.start-button');
            const isResumeButton = _this.closest('.resume-button');
            
            if (isStartButton) {
                this.innerHTML = '';
                score.innerHTML = 0;
                lineScore.innerHTML = 0;
                overlay.classList.remove('--active');
                app.newGame();
            }
            else if (isResumeButton) {
                this.innerHTML = '';
                overlay.classList.remove('--active');
                app.resumeGame();
            }
        })
        
        document.addEventListener('keydown', (e) => {
            switch(e.key){
                case 'ArrowLeft':
                case 'a':
                    app.brick.moveLeft();
                    break;
                case 'ArrowRight':
                case 'd':
                    app.brick.moveRight();
                    break;
                case 'ArrowDown':
                case 's':
                    app.brick.moveDown();
                    break;
                case 'ArrowUp':
                case 'w':
                    app.brick.rotate(1);
                    break;
                case ' ':
                    app.pauseGame();
                    break;
            }
        })
    },

    random: function(){
        return Math.floor(Math.random() * 7);
    },

    setScore() {
        this.score = this.score + Math.pow(2, this.currentLineRemove) * 1000;
        score.innerHTML = this.score;
    },

    setCountLine: function(){
        this.currentLineRemove++;
        this.totalLineRemove++;
        lineScore.innerHTML = this.totalLineRemove;
        if (
            this.totalLineRemove === 500 ||
            this.totalLineRemove === 501 ||
            this.totalLineRemove === 502 ||
            this.totalLineRemove === 503
            
        ){
            this.setGameSpeed(100);
        }
        else if (
            this.totalLineRemove === 400 ||
            this.totalLineRemove === 401 ||
            this.totalLineRemove === 402 ||
            this.totalLineRemove === 403
            
        ){
            this.setGameSpeed(150);
        }
        else if (
            this.totalLineRemove === 300 ||
            this.totalLineRemove === 301 ||
            this.totalLineRemove === 302 ||
            this.totalLineRemove === 303
        ){
            this.setGameSpeed(200);
        }
        else if (
            this.totalLineRemove === 200 ||
            this.totalLineRemove === 201 ||
            this.totalLineRemove === 202 ||
            this.totalLineRemove === 203
        ){
            this.setGameSpeed(300);
        }
        else if (
            this.totalLineRemove === 100 ||
            this.totalLineRemove === 101 ||
            this.totalLineRemove === 102 ||
            this.totalLineRemove === 103
        ){
            this.setGameSpeed(400);
        }

    },

    setGameSpeed(NEW_GAME_SPEED) {
        clearInterval(this.running)
        this.run(NEW_GAME_SPEED);
    },

    createBrick() {
        this.brick = this.currentBrick;
        !this.brick.canFall() && app.endGame();
        this.currentLineRemove !== 0 && this.setScore();
        this.currentLineRemove = 0;
        this.subBoard = new SubBoard(this.nextBrick);
        this.subBoard.draw();
        this.currentBrick = this.nextBrick;
        this.nextBrick = new Brick(this, Color[this.random()], this.random());
    },

    clear: function() {
        ctx.fillStyle = GAME_BGCOLOR;
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    },

    draw: function(){
        this.clear();
        this.board.draw();
        this.brick.draw();
    },

    newGame: function(){
        this.board.clear();
        app.start();
    },

    endGame: function(){
        overlay.classList.add('--active');
        boardNav.innerHTML = navComponent(2);
        app.stop();
    },

    pauseGame: function(){
        if (tetrisStorage.get('pausegame')) return;
        tetrisStorage.set('pausegame', true);
        tetrisStorage.set('board', this.board.data);
        tetrisStorage.set('line', this.totalLineRemove);
        tetrisStorage.set('score', this.score);
        tetrisStorage.set('currentBrick', {
            data: this.brick.data,
            row: this.brick.row,
            col: this.brick.col,
            color: this.brick.color,
        });
        tetrisStorage.set('nextBrick', {
            data: this.currentBrick.data,
            row: this.currentBrick.row,
            col: this.currentBrick.col,
            color: this.currentBrick.color,
        });
        overlay.classList.add('--active');
        boardNav.innerHTML = navComponent(3);
        app.stop();
    },

    resumeGame: function(){
        tetrisStorage.removeAll();
        tetrisStorage.set('pausegame', false);
        app.start();
    },

    loop: function(){
        this.draw();
        this.looping = setTimeout(() =>  this.loop(), GAME_FRAME);
    },

    run: function(GAME_SPEED){
        this.running = setInterval(() => {
            this.brick.fall();
        }, GAME_SPEED)

    },

    start: function(){
        this.loop();
        this.run(GAME_SPEED_DEFAULT);
    },

    stop: function(){
        clearTimeout(this.looping);
        clearInterval(this.running);
    },
}

if (tetrisStorage.get('pausegame')) {
    const currentLine = tetrisStorage.get('line');
    const currentScore = tetrisStorage.get('score');
    const currentBoard = tetrisStorage.get('board');
    score.innerHTML = currentScore;
    lineScore.innerHTML = currentLine;
    overlay.classList.add('--active');
    boardNav.innerHTML = navComponent(3);
    app.init2(currentLine, currentScore, currentBoard);
}else{
    tetrisStorage.removeAll();
    tetrisStorage.set('pausegame', false);
    app.init();
}

function navComponent(num) {
    switch(num){
        case 1: 
            return `
                <button class="start-button button">Bắt đầu</button>
            `
        case 2: 
            return `
                <h3 class="nav-title">Thua rùi :(</h3>
                <button class="start-button button">Chơi lại</button>
            `
            
        case 3: 
            return `
                <h3 class="nav-title">Đã tạm dừng</h3>
                <button class="resume-button button">Tiếp tục</button>
            `
            
    }
}