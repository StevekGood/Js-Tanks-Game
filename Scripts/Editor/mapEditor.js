const SCALE_FACTOR = 2.5;
const CANVAS = document.getElementById("game-canvas");
const CTX = CANVAS.getContext("2d");
const TILE_SELECT = document.getElementById("tile-select");
const ERASE_CHECKBOX = document.getElementById("erase-checkbox");
const CODE = document.getElementById("map-code");

const CANVAS_WIDTH = 256;
const CANVAS_HEIGHT = 256;
const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;

let MapContent = [];
let SelectedTile = 0;
let EraseMode = false;
let SpriteSheet = new Image();
SpriteSheet.src = "../../Sprites/Sprites.png";
let SpritesOffsets = [
    [1, 0],
    [2, 0],
    [1, 4],
]
let PlayerSpawnsColors = [
    "rgb(0, 255, 0)",
    "rgb(255, 0, 0)",
    "rgb(0, 255, 255)",
    "rgb(255, 255, 0)"
]
let PlayerCount = 0;

const EDITOR_DARKER_TILE_COLOR = "rgb(120, 120, 120)";

CODE.value = JSON.stringify(MapContent);
colorizeCanvas();

function copyTextToClipboard(text)
{
    let textArea = document.createElement("textarea");
  
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
  
    textArea.value = text;
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try 
    {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } 
    catch (err) 
    {
        alert('Oops, unable to copy');
    }
  
    document.body.removeChild(textArea);
}
  
function load()
{
    MapContent = JSON.parse(CODE.value);
    PlayerCount = 0;
    for (let i = 0; i < MapContent.length; i++)
        if (MapContent[i].id >= SpritesOffsets.length)
            PlayerCount++;

    updateMap();
}

function copy()
{
    copyTextToClipboard(JSON.stringify(MapContent));
}

function colorizeCanvas()
{
    CTX.fillStyle = EDITOR_DARKER_TILE_COLOR;
    for (let x = 0; x < CANVAS_WIDTH / TILE_WIDTH; x++)
    {
        for (let y = 0; y < CANVAS_HEIGHT / TILE_HEIGHT; y++)
        {
            if ((x + y) % 2 !== 0)
                continue;

            CTX.fillRect(x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
        }
    }
}

function updateMap()
{
    CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    colorizeCanvas();

    let playerCount = 0;
    for (let i = 0; i < MapContent.length; i++)
    {
        let tile = MapContent[i];
        let id = tile.id;
        if (id < SpritesOffsets.length)
        {
            CTX.drawImage(
                SpriteSheet,
                SpritesOffsets[id][0] * TILE_WIDTH, SpritesOffsets[id][1] * TILE_HEIGHT,
                TILE_WIDTH, TILE_HEIGHT,
                tile.x * TILE_WIDTH, tile.y * TILE_HEIGHT,
                TILE_WIDTH, TILE_HEIGHT
                );
            }
        else
        {
            CTX.fillStyle = PlayerSpawnsColors[playerCount];
            CTX.fillRect(tile.x * TILE_WIDTH, tile.y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
            playerCount++;
        }
    }
    CODE.value = JSON.stringify(MapContent);
}

function onTileChange()
{
    SelectedTile = Number(TILE_SELECT.value);
}

function onEraseChange()
{   
    EraseMode = ERASE_CHECKBOX.checked;
}

function clearMap()
{
    MapContent = [];
    PlayerCount = 0;
    updateMap();
}

function placeTile(id, x, y)
{
    let temp;
    let index = -1;
    for (let i = 0; i < MapContent.length; i++)
    {
        if (MapContent[i].x === x && MapContent[i].y === y)
        {
            temp = MapContent[i];
            index = i;
            break;
        }
    }

    if (temp)
    {
        if (temp.id === id)
            return;

        if (id >= SpritesOffsets.length)
        {
            MapContent.splice(index, 1);
            MapContent.push({
                id: id,
                x: x,
                y: y
            });

            return;
        }
        else if (temp.id >= SpritesOffsets.length)
            PlayerCount--;
        
        MapContent[index].id = id;
        MapContent[index].x = x;
        MapContent[index].y = y;
    }
    else
    {
        MapContent.push({
            id: id,
            x: x,
            y: y
        });
    }
}

function onClick(event)
{
    const rect = CANVAS.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / SCALE_FACTOR / TILE_WIDTH);
    const y = Math.floor((event.clientY - rect.top) / SCALE_FACTOR / TILE_HEIGHT);

    if (EraseMode)
    {
        for (let i = 0; i < MapContent.length; i++)
        {
            if (MapContent[i].x === x && MapContent[i].y === y)
            {
                if (MapContent[i].id >= SpritesOffsets.length)
                    PlayerCount--;
            
                MapContent.splice(i, 1)
                break;
            }
        }
    }
    else
    {
        if (SelectedTile >= SpritesOffsets.length)
        {
            if (PlayerCount === 4)
                return;
            else
                PlayerCount++;
        }
        
        placeTile(SelectedTile, x, y);
    }

    updateMap();
}

CANVAS.addEventListener('mousedown', onClick);
window.addEventListener('keyup', (e) => {
    if (e.code === "KeyE")
    {
        EraseMode = !EraseMode;
        ERASE_CHECKBOX.checked = EraseMode;
    }
});