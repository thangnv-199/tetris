class SubBoard {
    constructor(brick) {
        this.brick = brick;
        this.dots = [];
        this.data = brick.data;
    }

    createDot() {
        this.dots = [];
        for (let row = 0; row < this.data.length; row++){
            for (let col = 0; col < this.data[0].length; col++){
                if (this.data[row][col] !== _){
                    let dot = new Dot(this.app, row, col, this.data[row][col], ctx2);
                    this.dots.push(dot);
                }
            }
        }
    }

    draw() {
        canvas2.width = DOT_SIZE * this.data[0].length;
        canvas2.height = DOT_SIZE * this.data.length;
        this.createDot();
        this.dots.forEach(dot => dot.draw());
    }
}