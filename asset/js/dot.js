class Dot {
    constructor(app, row, col, color, ctx) {
        this.app = app;
        this.row = row;
        this.col = col;
        this.color = color;
        this.size = DOT_SIZE;
        this.ctx = ctx;
    }

    isHitLeft() {
        return this.col === 0;
    }

    canMoveLeft(){
        if (this.isHitLeft()) return false;
        if (!this.app.board.isEmptyShell(this.row, this.col - 1)) return false;
        return true;
    }

    moveLeft(){
        if (this.canMoveLeft()){
            this.col--;
        }
    }

    isHitRight() {
        return this.col === COL - 1;
    }

    canMoveRight(){
        if (this.isHitRight()) return false;
        if (!this.app.board.isEmptyShell(this.row, this.col + 1)) return false;
        return true;
    }

    moveRight() {
        if (this.canMoveRight()){
            this.col++;
        }
    }

    isHitBottom() {
        return this.row === ROW - 1;
    }

    canFall(){
        if (this.isHitBottom()) return false;
        if (!this.app.board.isEmptyShell(this.row + 1, this.col)) return false;
        return true;
    }

    fall(){
        if (this.canFall()){
            this.row++;
        }
    }

    draw(){
        const x = this.col * this.size;
        const y = this.row * this.size;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(x + 1, y + 1, this.size - 2, this.size - 2)
    }
}