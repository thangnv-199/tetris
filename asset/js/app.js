
const app = {

    init: function() {
        this.gameSpeed = tetrisStorage.get('speed') || GAME_SPEED_DEFAULT;
        this.totalLineRemove = 0;
        this.currentLineRemove = 0;
        this.score = 0;
        this.highscore = JSON.parse(localStorage.getItem('tetrisHighscore')) || 0;
        this.board = new Board(this);
        this.currentBrick = new Brick(this, Color[this.random()], this.random());
        this.nextBrick = new Brick(this, Color[this.random()], this.random());
        
        this.createBrick();
        this.listenerEvents();

        highscore.innerHTML = this.highscore;
    },
    init2: function(line, score, board, currentBrick, nextBrick) {
        
        this.gameSpeed = tetrisStorage.get('speed') || GAME_SPEED_DEFAULT;
        this.totalLineRemove = line;
        this.currentLineRemove = 0;
        this.score = score;
        this.highscore = JSON.parse(localStorage.getItem('tetrisHighscore')) || 0;
        this.board = new Board(this, board);
        this.board.draw();
        this.currentBrick = new Brick(this, currentBrick.color, this.random(), currentBrick);
        this.nextBrick = new Brick(this, nextBrick.color, this.random(), nextBrick);
        
        this.currentBrick.draw();
        this.createBrick();
        this.listenerEvents();

        highscore.innerHTML = this.highscore;
    },

    listenerEvents: function() {
        boardNav.addEventListener('click', (e) => {
            const _this = e.target;
            const isStartButton = _this.closest('.start-button');
            const isResumeButton = _this.closest('.resume-button');
            
            if (isStartButton) {
                this.newGame();
            }
            else if (isResumeButton) {
                this.resumeGame();
            }
        })
        
        document.addEventListener('keydown', (e) => {
            switch(e.key){
                case 'ArrowLeft':
                case 'a':
                    this.brick.moveLeft();
                    break;
                case 'ArrowRight':
                case 'd':
                    this.brick.moveRight();
                    break;
                case 'ArrowDown':
                case 's':
                    this.brick.moveDown();
                    break;
                case 'ArrowUp':
                case 'w':
                    this.brick.rotate(1);
                    break;
                case ' ':
                    const status = tetrisStorage.get('status');
                    switch(status){
                        case 'pause':
                            this.resumeGame()
                            break;
                        case 'running':
                            this.pauseGame()
                            break;
                        case 'end':
                            this.newGame();
                            break;
                    }
                    break;
            }
        })

        background.addEventListener('load', function() {
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            
        })
    },

    random: function(){
        return Math.floor(Math.random() * 7);
    },

    setScore() {
        this.score = this.score + Math.pow(2, this.currentLineRemove) * 1000;
        score.innerHTML = this.score;
    },

    setHighscore: function() {
        if (this.score <= this.highscore) return;
        this.highscore = this.score;
        localStorage.setItem('tetrisHighscore', JSON.stringify(this.highscore));
        highscore.innerHTML = this.highscore;
    },

    setCountLine: function(){
        this.currentLineRemove++;
        this.totalLineRemove++;
        lineScore.innerHTML = this.totalLineRemove;
        if (
            this.totalLineRemove >= 500 &&
            this.totalLineRemove <= 503
            
        ){
            this.gameSpeed = 100;
            this.setGameSpeed(this.gameSpeed);
        }
        else if (
            this.totalLineRemove >= 400 &&
            this.totalLineRemove <= 403
            
        ){
            this.gameSpeed = 150;
            this.setGameSpeed(this.gameSpeed);

        }
        else if (
            this.totalLineRemove >= 300 &&
            this.totalLineRemove <= 303
        ){
            this.gameSpeed = 200;
            this.setGameSpeed(this.gameSpeed);

        }
        else if (
            this.totalLineRemove >= 200 &&
            this.totalLineRemove <= 203
        ){
            this.gameSpeed = 300;
            this.setGameSpeed(this.gameSpeed);

        }
        else if (
            this.totalLineRemove >= 100 &&
            this.totalLineRemove <= 103
        ){
            this.gameSpeed = 400;
            this.setGameSpeed(this.gameSpeed);

        }

    },

    setGameSpeed(NEW_GAME_SPEED) {
        clearInterval(this.running)
        this.run(NEW_GAME_SPEED);
    },

    createBrick() {
        this.brick = this.currentBrick;
        !this.brick.canFall() && this.endGame();
        this.currentLineRemove !== 0 && this.setScore();
        this.currentLineRemove = 0;
        this.subBoard = new SubBoard(this.nextBrick);
        this.subBoard.draw();
        this.currentBrick = this.nextBrick;
        this.nextBrick = new Brick(this, Color[this.random()], this.random());
    },

    newGame: function(){
        this.score = 0;
        this.totalLineRemove = 0;
        boardNav.innerHTML = '';
        score.innerHTML = 0;
        lineScore.innerHTML = 0;
        overlay.classList.remove('--active');
        this.gameSpeed = GAME_SPEED_DEFAULT;
        this.board.clear();
        this.unsave('running');
        this.start();
    },

    endGame: function(){
        overlay.classList.add('--active');
        boardNav.innerHTML = navComponent(2);
        // gameoverAudio.play();
        this.setHighscore();
        this.unsave('end');
        this.stop();
    },

    pauseGame: function(){
        if (tetrisStorage.get('pausegame')) return;
        tetrisStorage.set('status', 'pause');
        tetrisStorage.set('board', this.board.data);
        tetrisStorage.set('line', this.totalLineRemove);
        tetrisStorage.set('score', this.score);
        tetrisStorage.set('speed', this.gameSpeed);
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
        this.stop();
    },

    resumeGame: function(){
        boardNav.innerHTML = '';
        overlay.classList.remove('--active');
        this.unsave('running');
        this.start();
    },

    unsave: function(status){
        tetrisStorage.removeAll();
        tetrisStorage.set('status', status);
    },
    
    clear: function() {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    },

    draw: function(){
        this.clear();
        this.board.draw();
        this.brick.draw();
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
        this.run(this.gameSpeed);
    },

    stop: function(){
        clearTimeout(this.looping);
        clearInterval(this.running);
    },
}

if (tetrisStorage.get('status') === 'pause') {
    const currentBrick = tetrisStorage.get('currentBrick');
    const nextBrick = tetrisStorage.get('nextBrick');
    const currentLine = tetrisStorage.get('line');
    const currentScore = tetrisStorage.get('score');
    const currentBoard = tetrisStorage.get('board');
    score.innerHTML = currentScore;
    lineScore.innerHTML = currentLine;
    overlay.classList.add('--active');
    boardNav.innerHTML = navComponent(3);
    app.init2(currentLine, currentScore, currentBoard, currentBrick, nextBrick);
    
}else{
    tetrisStorage.removeAll();
    tetrisStorage.set('status', 'end');
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