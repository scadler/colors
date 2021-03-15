const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var dots = {
    xy : [[],[]],
    v : [[],[]],
    step : [],
    color : [],
}
/*dots.xy[0 or 1][i] = [x,y], dots.v[0 or 1][i] = [vx,vy],
dots.step is num of interations since creation
*/
function spawnDots(xCoor,yCoor){
    var i = dots.xy[0].length
    while(i < 20){
        dots.xy[0][i] = xCoor;
        dots.xy[1][i] = yCoor;
        var sign = (Math.random() < 0.5) ? -1 : 1;
        dots.v[0][i] = (Math.random()*20)-10;
        dots.v[1][i] = sign*Math.sqrt( 100 - (dots.v[0][i]*dots.v[0][i]))
        dots.step[i] = 50+(Math.random()*100)
        // var red   = Math.sin((Math.PI*(90+Math.random()*10))+2+1)*127+128
        // var green  = Math.sin((Math.PI*(90+Math.random()*10))+1)*127+128
        // var blue   = Math.sin((Math.PI*(90+Math.random()*10))+4+1)*127+128
        dots.color[i] = "hsl(" + Math.random() * 360 + ", 100%, 75%, " +1+")";
        //  "rgba("+red+", "+green+", "+blue+", "+1+")"
        i++
    }
}
function drawDots(x, y, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, 2, 0, Math.PI*2, false);
    context.lineWidth = 1.5;
    context.strokeStyle = color;
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
            dots.step[i] -= 1
            if(dots.step[i] <= 0){
                dots.step.splice(i,1)
                dots.xy[0].splice(i,1)
                dots.xy[1].splice(i,1)
                dots.v[0].splice(i,1)
                dots.v[1].splice(i,1)
                dots.color.splice(i,1)
            }
            drawDots(dots.xy[0][i], dots.xy[1][i], dots.color[i])
            i++
        }
    }
}
setInterval(render,)