const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let options = [ ];

let rotation = 0;
let spinning = false;

const colors = [
"#a82424",
"#184d85",
"#930a8f",
"#c0cd17",
"#cf5781",
"#ac4816",
"#9b691e",
"#855e84",
"#0c125d",
"#669449"
];

function drawWheel(){

    ctx.clearRect(0,0,500,500);

    const cx = 250;
    const cy = 250;
    const r = 240;

    const angle = 2 * Math.PI / options.length;

    for(let i=0;i<options.length;i++){

        ctx.beginPath();
        ctx.moveTo(cx,cy);

        ctx.fillStyle = colors[i % colors.length];

        ctx.arc(
            cx,
            cy,
            r,
            angle * i + rotation,
            angle * (i+1) + rotation
        );

        ctx.fill();

        ctx.save();

const textAngle = angle * i + angle / 2 + rotation;

const textX = cx + Math.cos(textAngle) * 180;
const textY = cy + Math.sin(textAngle) * 180;

ctx.translate(textX, textY);

ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "wite";
ctx.font = "bold 24px Arial";

ctx.fillText(options[i], 0, 0);

ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(cx,cy,40,0,Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    // Flecha superior
    ctx.beginPath();

    ctx.moveTo(cx, 60);
    ctx.lineTo(cx - 25, 5);
    ctx.lineTo(cx + 25, 5);

    ctx.closePath();

    ctx.fillStyle = "purple";
    ctx.fill();


    updateList();
}

function updateList(){

    const ul = document.getElementById("list");

    ul.innerHTML = "";

    options.forEach(o => {

        const li = document.createElement("li");

        li.textContent = o;

        ul.appendChild(li);
    });
}

function addOption(){

    const input = document.getElementById("option");

    if(input.value.trim() === ""){
        return;
    }

    options.push(input.value);

    input.value = "";

    drawWheel();
}

function removeOption(){

    if(options.length > 2){

        options.pop();

        drawWheel();
    }
}
function removeAllOptions(){
    options = [];
    drawWheel();

    document.getElementById("winner").innerHTML =
        "TU RETO SERÁ:";
}
function spin(){

    if(spinning) return;

    spinning = true;

    let extra =
        Math.random() * Math.PI * 10 +
        Math.PI * 12;

    let target = rotation + extra;

    animate(target);
}

function animate(target){

    function frame(){

        rotation += (target - rotation) * 0.05;

        drawWheel();

        if(Math.abs(target - rotation) > 0.002){

            requestAnimationFrame(frame);

        }else{

            rotation = target;

            drawWheel();

            showWinner();

            spinning = false;
        }
    }

    frame();
}

function showWinner(){

    const angle = (2 * Math.PI) / options.length;

    // Posición de la flecha (arriba)
    let pointerAngle = (Math.PI * 1.5 - rotation) % (Math.PI * 2);

    if(pointerAngle < 0){
        pointerAngle += Math.PI * 2;
    }

    let index = Math.floor(pointerAngle / angle);

    document.getElementById("winner").innerHTML =
        "TU RETO SERÁ: " + options[index];


}

drawWheel();
