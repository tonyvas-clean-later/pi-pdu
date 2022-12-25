class Graph{
    constructor(title, parentElement, width, height, color, autoresize = false){
        this.title = title;
        this.parentElement = parentElement;
        this.width = width;
        this.height = height;
        this.color = color;
        this.autoresize = autoresize;

        this.setup();
    }

    setup(){
        this.values = [];
        this.createTitle();
        this.createCanvas();

        this.handle = setInterval(() => {
            this.draw();
        }, 100);
    }

    createTitle(){
        this.h2 = this.parentElement.ownerDocument.createElement('h1');
        this.parentElement.appendChild(this.h2);

        this.h2.innerHTML = this.title;
    }

    createCanvas(){
        this.canvas = this.parentElement.ownerDocument.createElement('canvas');
        this.parentElement.appendChild(this.canvas);

        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.context = this.canvas.getContext('2d');
    }

    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBorder();
        this.drawGraph();
    }

    drawBorder(){
        this.context.strokeStyle = 'black';
        this.context.beginPath();

        this.context.moveTo(0, 0);
        this.context.lineTo(this.canvas.width, 0);
        this.context.lineTo(this.canvas.width, this.canvas.height);
        this.context.lineTo(0, this.canvas.height);
        this.context.lineTo(0, 0);
        
        this.context.stroke();
    }

    drawGraph(){
        this.context.strokeStyle = this.color;
        this.context.beginPath();

        let min = 0;
        let max = this.height;

        if (this.autoresize){
            let minmax = this.getMinMax();
            min = minmax.min;
            max = minmax.max;

            this.h2.innerHTML = `${this.title} (${min}-${max})`
        }

        for (let i = 0; i < this.values.length; i++){
            let x = this.map(i + 1, 0, this.values.length, 0, this.canvas.width);
            let y = this.map(this.values[i], min, max, this.canvas.height, 0);

            if (i == 0){
                this.context.moveTo(x, y);
            }
            else{
                this.context.lineTo(x, y);
            }
        }

        this.context.stroke();
    }

    getMinMax(){
        let min = null;
        let max = null;

        for (let value of this.values){
            if (min === null){
                min = value;
                max = value;
            }

            min = Math.min(min, value);
            max = Math.max(max, value);
        }

        min = Math.floor(min * 0.95)
        max = Math.floor(max * 1.05)

        return {min, max};
    }

    append(value){
        this.values.push(value);
        if (this.values.length > this.width){
            this.values.splice(0, 1);
        }
    }

    map(x, inMin, inMax, outMin, outMax){
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    }
}