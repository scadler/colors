const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var dots = {
    xy : [[],[]],
    v : [[],[]],
    step : [],
    color : [[],[]],
}
/*dots.xy[0 or 1][i] = [x,y], dots.v[0 or 1][i] = [vx,vy], 
dots.color[0 or 1] = [color,opacity]
dots.step is num of interations since creation
*/
function spawnDots(xCoor,yCoor){
    var i =  dots.xy[0].length
    while(i < 25){
        dots.xy[0][i] = xCoor;
        dots.xy[1][i] = yCoor;
        var velocity = 8+Math.random()
        var sign = (Math.random() < 0.5) ? -1 : 1;
        dots.v[0][i] = (Math.random()*20)-velocity;
        dots.v[1][i] = sign*Math.sqrt( (velocity*velocity) - (dots.v[0][i]*dots.v[0][i]))
        dots.step[i] = 80+(Math.random()*100)
        dots.color[0][i] = Math.random() * 360
        dots.color[1][i] = dots.step[i]
        i++   
    }
}
// function spawnDots(xCoor,yCoor, i){
//     if(i < 25){
    
//     setTimeout(function(){ spawnDots(xCoor,yCoor, i)}, Math.random()*8);
//     }
// }
function drawDots(x, y, color, opacity){
    context.fillStyle = "hsla(" + color+ ", 100%, 75%, " +opacity+")";
    context.beginPath();
    context.arc(x, y, 4, 0, Math.PI*2, false);
    context.lineWidth = 1.5;
    context.strokeStyle = "hsla(" + color+ ", 100%, 75%, " +opacity+")";
    context.closePath();
    context.fill();
    context.stroke();
}
document.getElementById("canvas").addEventListener('click', (event) => {
    spawnDots(event.clientX-10,event.clientY-10)
});
function render(){
    if(dots.xy[0].length > 0){
        var i = 0
        ctx.fillStyle = "#000000"
        ctx.fillRect(0,0,700,700)
        while(i<dots.xy[0].length){
            dots.xy[0][i] += dots.v[0][i]/10
            dots.xy[1][i] += dots.v[1][i]/10
            dots.v[0][i] *= 0.998
            dots.v[1][i] += 0.1
            dots.step[i] -= 1
            if(dots.step[i] <= 0){
                dots.step.splice(i,1)
                dots.xy[0].splice(i,1)
                dots.xy[1].splice(i,1)
                dots.v[0].splice(i,1)
                dots.v[1].splice(i,1)
                dots.color[0][i].splice(i,1)
                dots.color[1][i].splice(i,1)
            }
            console.log(dots.step[i]/dots.color[1][i])
            drawDots(dots.xy[0][i], dots.xy[1][i], dots.color[0][i], Math.pow(dots.step[i]/dots.color[1][i], 0.25))
            i++
        }
    }
}
setInterval(render,)