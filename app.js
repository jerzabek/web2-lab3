const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ENTITY_WIDTH = 32;
const ENTITY_HEIGHT = 32;
const ENTITY_SPEED = 7;
const NUM_OF_ENTITIES = 10;

function drawRect(x, y, w, h, color) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function getRandom(max) {
  return Math.floor(Math.random() * max)
}

function getRandomSpeed() {
  return Math.floor(Math.random() * ENTITY_SPEED - ENTITY_SPEED / 2) || ENTITY_SPEED / 2
}

function generateEntity() {
  return {
    x: getRandom(window.innerWidth),
    y: getRandom(window.innerHeight),
    dx: getRandomSpeed(),
    dy: getRandomSpeed(),
    color: "#FF0000",
  }
}

function collisionDetection(entity) {
  if (entity.x < 0) {
    entity.x = 0;
    entity.dx *= -1;
  } else if (entity.x + ENTITY_WIDTH > window.innerWidth) {
    entity.x = window.innerWidth - ENTITY_WIDTH;
    entity.dx *= -1;
  }
  if (entity.y < 0) {
    entity.y = 0;
    entity.dy *= -1;
  } else if (entity.y + ENTITY_HEIGHT > window.innerHeight) {
    entity.y = window.innerHeight - ENTITY_HEIGHT;
    entity.dy *= -1;
  }
}

const entities = Array.from({ length: NUM_OF_ENTITIES }, () => generateEntity())

function clickEvent(event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top


  for (entity of entities) {
    if (entity.x <= x && entity.x + ENTITY_WIDTH >= x &&
      entity.y <= y && entity.y + ENTITY_HEIGHT >= y
    ) {
      // Clicked on rectangle
      entity.dead = true;
    }
  }
}

canvas.addEventListener('mousedown', function (e) {
  clickEvent(e)
})

let win = false;

function render() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;


  ctx.font = '32px serif';

  const numOfHits = entities.filter(({ dead }) => dead === true).length

  ctx.fillText(`Targets hit: ${numOfHits}`, window.innerWidth - 230, 50);
  ctx.fillText(`# of targets: ${NUM_OF_ENTITIES}`, window.innerWidth - 230, 90);
  
  if (win) return;

  if (numOfHits === NUM_OF_ENTITIES) {
    win = true
    alert('You win!')
  }

  for (entity of entities) {
    if (entity.dead) continue;

    drawRect(entity.x, entity.y, ENTITY_WIDTH, ENTITY_HEIGHT, entity.color)

    entity.x += entity.dx;
    entity.y += entity.dy;

    collisionDetection(entity);
  }
}

setInterval(render, 10);