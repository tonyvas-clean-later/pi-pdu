let socket = io();
let graphs = {};

let times = [];
let ppcs = [];
let mainDiv = document.getElementById('main_div');

socket.on('data', data => {
    times.push(new Date().getTime());
    if (times.length >= 100){
        times.splice(0, 1);
    }

    let diff = times[times.length - 1] - times[0];
    let msPerPoint = diff / times.length;
    let pointsPerSec = 1000 / msPerPoint;
    let ppc = pointsPerSec / 60;
    ppcs.push(ppc);

    if (ppcs.length >= 100){
        ppcs.splice(0, 1);
    }
    
    let sum = 0;
    for (let ppc of ppcs){
        sum += ppc
    }

    let avg = Math.floor(sum / ppcs.length)
    if (!graphs['ppc']){
        graphs['ppc'] = new Graph('ppc', mainDiv, 100, 20, 'red', true);
    }
    graphs['ppc'].append(avg)

    for (let name in data){
        let value = data[name];
        
        if (!graphs[name]){
            graphs[name] = new Graph(name, mainDiv, 250, 1024, 'red', true);
        }

        graphs[name].append(value)
    }
})