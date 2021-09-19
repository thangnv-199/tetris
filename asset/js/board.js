class Board {
    constructor(app, data) {
        this.app = app;
        this.dots = [];
        this.data = data || this.baseData();
    }

    baseData() {
        let baseData = [];
        for (let row = 0; row < ROW; row++){
            let temp = [];
            for (let col = 0; col < COL; col++){
                temp.push(_);
            }
            baseData.push(temp);
        }
        return baseData;
    }

    isEmptyShell(row , col){
        return this.data[row][col] === _ ;
    }

    checkFullRow() {
        for (let i = this.data.length - 1; i >= 0  ;){
            if (this.data[i].every(element => element !== _)){
                this.removeRow(i);
                this.app.setCountLine();
            } else {
                i--;
            }
        }
    }

    removeRow(row) {
        this.data.splice(row, 1);
        this.data.unshift([_,_,_,_,_,_,_,_,_,_]);
    }

    createDot() {
        this.dots = [];
        for (let row = 0; row < ROW; row++){
            for (let col = 0; col < COL; col++){
                if (this.data[row][col] !== _){
                    let dot = new Dot(this.app, row, col, this.data[row][col], ctx);
                    this.dots.push(dot);
                }
            }
        }
    }

    clear() {
        for (let row = 0; row < this.data.length; row++){
            for (let col = 0; col < this.data[row].length; col++){
                this.data[row][col] = _;
            }
        }
    }

    draw() {
        this.createDot();
        this.dots.forEach(dot => dot.draw());
    }
}