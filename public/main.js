let socket = io();
let graphs = {};

let mainDiv = document.getElementById('main_div');

socket.on('data', data => {
    for (let name in data){
        let value = data[name];
        
        if (!graphs[name]){
            graphs[name] = new Graph(name, mainDiv, 100, 1024, 'red');
        }

        graphs[name].append(value)
    }
})