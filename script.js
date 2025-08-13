const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = 1000;
const height = canvas.height = 1000;

let seed = Math.random();
noise.seed(seed);

let size = 100;
let unit = width / size;
let sharpness = 1;

let offsetX = 0;
let offsetY = 0;

document.addEventListener("keydown", movement);
document.addEventListener("wheel", pixelate)

function drawMap() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < size; i++) {
        for (let e = 0; e < size; e++) {
            let height = noise.simplex2((i + offsetX) / size * sharpness, (e + offsetY) / size * sharpness);

            ctx.fillStyle = `rgb(0, ${256 - Math.abs(height % 0.4) * 150}, 0)`
            if (height > 0) ctx.fillStyle = `rgb(0, ${256 - Math.abs(height % 0.25) * 150}, 0)`
            if (height < -0.4) ctx.fillStyle = `rgb(0, 0, ${256 + height * 150})`

            ctx.beginPath();
            ctx.rect(i * unit, e * unit, Math.ceil(unit), Math.ceil(unit));
            ctx.fill();
        }
    }
}

function movement(e) {
    if (e.key == "ArrowLeft") offsetX -= size / 2;
    if (e.key == "ArrowRight") offsetX += size /2;
    if (e.key == "ArrowUp") offsetY -= size / 2;
    if (e.key == "ArrowDown") offsetY += size / 2;

    drawMap();
}

function pixelate(e) {
    if (e.wheelDeltaY > 0 && size > 15) {
        size -= 5;
        offsetRatio = size / (size + 5);

    } else if (e.wheelDeltaY < 0 && size < 100) {
        size += 5;
        offsetRatio = size / (size - 5);

    } else return
    
    offsetX *= offsetRatio;
    offsetY *= offsetRatio;

    unit = width / size;
    drawMap();
}

drawMap();