class Brick {
    constructor(app, color, random, data) {


        this.app = app;
        this.color = color;
        this.random = random;
        this.dots = [];

        if (data) {
            this.prevData = data.data;
            this.data = data.data;
            this.col = data.col;
            this.row = data.row;
        } else {
            this.prevData = [];
            this.data = [];
            this.tempData = [];
            this.rotateTimes = Math.floor(Math.random() * 4);
            
            this.createData();
            this.posStart = this.getPosStart(this.rotateTimes);
            this.row = this.posStart.row;
            this.col = this.posStart.col;
            this.rotate(this.rotateTimes);
        }

        this.createDots(this.data);
        
    }

    createData() {
        const x = this.color;
        const baseData = [
            [
                [x,x,_],
                [_,x,x],
            ],[
                [x,x,x],
                [_,x,_],
            ],[
                [x,x],
                [x,x],
            ],[
                [x, x, x, x]
            ],[
                [x,x,x],
                [x,_,_],
            ],[
                [x,x,x],
                [_,_,x],
            ],[
                [_,x,x],
                [x,x,_],
            ]
        ];

        this.data = baseData[this.random];
        this.tempData = baseData[this.random];
    }

    canMoveLeft(){
        return this.dots.every(dot => dot.canMoveLeft())
    }

    moveLeft(){
        if (this.canMoveLeft()){
            this.dots.forEach(dot => dot.moveLeft());
            this.col--;
        }
    }

    canMoveRight(){
        return this.dots.every(dot => dot.canMoveRight())
    }

    moveRight(){
        if (this.canMoveRight()){
            this.dots.forEach(dot => dot.moveRight());
            this.col++;
        }
    }

    moveDown(){
        while(this.canFall()){
            this.fall();
        }
    }

    canFall(){
        return this.dots.every(dot => dot.canFall())
    }

    fall(){
        if (this.canFall()){
            this.dots.forEach(dot => dot.fall());
            this.row++;
        }else {
            this.appendToBoard();
            this.app.board.checkFullRow();
            this.app.createBrick();
            fallAudio.play();
        }
    }

    getPosStart(times){
        for (let time = 0 ; time < times; time++) {

            let newData = [];

            for (let i = 0; i < this.tempData[0].length; i++){
                let row = [];
                for (let j = this.tempData.length - 1; j >= 0 ; j--){
                    row.push(this.tempData[j][i])
                }
                newData.push(row);
            }
            this.tempData = newData;
        }
        return {
            row: 4 - this.tempData.length,
            col: 6 - this.tempData[0].length,
        };
    }

    rotate(times = 0){
        for (let time = 0 ; time < times; time++) {

            let newData = [];

            for (let i = 0; i < this.data[0].length; i++){
                let row = [];
                for (let j = this.data.length - 1; j >= 0 ; j--){
                    row.push(this.data[j][i])
                }
                newData.push(row);
            }
            this.prevData = [...this.data];
            this.data = [...newData];
            this.createDots(this.data);

            let isValid = this.dots.every(dot => this.app.board.data[dot.row][dot.col] === _ )
            
            if (!isValid){
                this.data = [...this.prevData];
                this.createDots(this.data);
            }
        }
    }

    appendToBoard(){
        this.dots.forEach(dot => {
            this.app.board.data[dot.row][dot.col] = this.color;
        })
    }
    
    createDots(data) {
        this.dots = [];
        for (let row = 0; row < data.length; row++){
            for (let col = 0; col < data[0].length; col++){
                if (data[row][col] !== _){
                    let dot = new Dot(this.app, row + this.row, col + this.col, this.color, ctx);
                    this.dots.push(dot);
                }
            }
        }
    }

    draw() {
        this.dots.forEach(dot => dot.draw());
    }
}