class Graph{
    constructor(title, parentElement, width, height, color){
        this.title = title;
        this.parentElement = parentElement;
        this.width = width;
        this.height = height;
        this.color = color;

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

        for (let i = 0; i < this.values.length; i++){
            let x = this.map(i + 1, 0, this.values.length, 10, this.canvas.width - 10);
            let y = this.map(this.values[i], 0, 4096, 10, this.canvas.height - 10);

            if (i == 0){
                this.context.moveTo(x, y);
            }
            else{
                this.context.lineTo(x, y);
            }
        }

        this.context.stroke();
    }

    append(item){
        this.values.push(item);
        if (this.values.length > this.width){
            this.values.splice(0, 1);
        }
    }

    map(x, inMin, inMax, outMin, outMax){
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    }
}