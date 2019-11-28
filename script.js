var tileDimensionPixel;
var nbTileWidth;
var nbTileHeight;
var ctx= null;
var gameMap=[];
var canvas;
var changementTextureMap=false;
var btnWall;
var btnFloor;
var btnGoblin;
var btnHero1;
var btnHero2;
var btnHero3;
var btnHero4;
var couleur;




function creerMap(){
    tileDimensionPixel=document.getElementById("tileDimensionPixel").value;
    nbTileWidth=document.getElementById("nbTileWidth").value;
    nbTileHeight=document.getElementById("nbTileHeight").value;
    ctx=document.getElementById('game').getContext('2d');
    ctx.canvas.width=nbTileWidth*tileDimensionPixel;
    ctx.canvas.height=nbTileHeight*tileDimensionPixel;
    for(var y=0; y<nbTileHeight;y++){
        for(var x=0;x<nbTileWidth;x++){
            gameMap[(y*nbTileWidth)+x]=1;
        }

    }
    requestAnimationFrame(drawGame);
}


function loadMap(){
    var file = document.getElementById("mapFile").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            gameMap=JSON.parse(evt.target.result).map;
            tileDimensionPixel=JSON.parse(evt.target.result).tileDimensionPixel;
            nbTileWidth=JSON.parse(evt.target.result).nbTileWidth;
            nbTileHeight=JSON.parse(evt.target.result).nbTileHeight;
            ctx.canvas.width=nbTileWidth*tileDimensionPixel;
            ctx.canvas.height=nbTileHeight*tileDimensionPixel;
            requestAnimationFrame(drawGame);
        };
        reader.onerror = function (evt) {
            document.getElementById("fileContents").innerHTML = "error reading file";
        };
    }
}

function scanMap(tx, ty){
    var tuilePositionX=(tx-5)/tileDimensionPixel;
    var tuilePositionY=ty/tileDimensionPixel;
    var tuileXFloor=Math.floor(tuilePositionX);
    var tuileYFloor=Math.floor(tuilePositionY);
    var numTuile=tuileYFloor*nbTileWidth+tuileXFloor;
    console.log(numTuile);
    return numTuile;
}

function drawGame(){
    if(ctx==null){return;}
    for(var y=0; y<nbTileHeight;y++){
        for(var x=0;x<nbTileWidth;x++){
            switch(gameMap[((y*nbTileWidth)+x)]){
            case 0://mur
                ctx.fillStyle="#999999";
                ctx.strokeStyle="#000000";
                break;
            case 1://marchable
                ctx.fillStyle="#eeeeee";
                ctx.strokeStyle="#000000";
                break;
            case 2://goblin
                ctx.fillStyle="#00ff00";
                ctx.strokeStyle="#000000";
                break;
            case 3://hero 1
                ctx.fillStyle="#ff5622";
                ctx.strokeStyle="#000000";
                break;
            case 4://hero 2
                ctx.fillStyle="#ffc524";
                ctx.strokeStyle="#000000";
                break;
            case 5://hero 3
                ctx.fillStyle="#ff33d3";
                ctx.strokeStyle="#000000";
                break;
            case 6://hero 4
                ctx.fillStyle="#823528";
                ctx.strokeStyle="#000000";
                break;
            }
            ctx.fillRect(x*tileDimensionPixel, y*tileDimensionPixel, tileDimensionPixel, tileDimensionPixel);
            ctx.globalAlpha=0.2;
            ctx.strokeRect(x*tileDimensionPixel, y*tileDimensionPixel, tileDimensionPixel, tileDimensionPixel);
            ctx.globalAlpha=1;
        }
    }
    ctx.fillStyle="#ff0000";
}

window.addEventListener("load", ()=>{
    canvas= document.getElementById("game");
    ctx=canvas.getContext("2d");
    canvas.addEventListener("mousedown", startPositionChangementTextureMap);
    canvas.addEventListener("mouseup", endPositionChangementTextureMap);
    canvas.addEventListener("mousemove", draw);
    document.addEventListener("mousedown", startChangemenfPasEncoreDansCanvas);
    document.addEventListener("mouseup", endChangemenfPasEncoreDansCanvas);
    btnWall=document.getElementById("wall");
    btnGoblin=document.getElementById("goblin");
    var nomWall=document.getElementById("wall").name;
    btnWall.addEventListener("click", setChoix(nomWall));
    var nomGoblin=document.getElementById("goblin").name;
    btnWall.addEventListener("click", setChoix(nomGoblin));
    
});

function startPositionChangementTextureMap(e){
    changementTextureMap=true;
    //serait supposer capable de dessiner a un seul clic mais ne fonctionne pas
    draw(e);
}
function endPositionChangementTextureMap(){
    changementTextureMap=false;
    ctx.beginPath();
}
function startChangemenfPasEncoreDansCanvas(){
    changementTextureMap=true;
}
function endChangemenfPasEncoreDansCanvas(){
    changementTextureMap=false;
}
function tuileSelectionne(e){
    if(!changementTextureMap){
        return;
    }
}
function draw(e){
    if(!changementTextureMap){
        return;
    }
    //holy grail pour Canvas
    var BB=canvas.getBoundingClientRect();
    var tx=e.clientX-BB.left;
    var ty=e.clientY-BB.top;
    //fin du holy grail
    numTuile=scanMap(tx,ty);
    gameMap[numTuile]=couleur;
    drawGame();
}

function setChoix(choix){
    switch(choix){
    case 0://mur
        couleur=0;
        ctx.strokeStyle="#29fdff";
        break;
    case 1://marchable
        couleur=1;
        ctx.strokeStyle="#29fdff";
        break;
    case 2://goblin
        couleur=2;
        ctx.strokeStyle="#29fdff";
        break;
    case 3://hero 1
        couleur=3;
        ctx.strokeStyle="#29fdff";
        break;
    case 4://hero 2
        couleur=4;
        ctx.strokeStyle="#29fdff";
        break;
    case 5://hero 3
        couleur=5;
        ctx.strokeStyle="#29fdff";
        break;
    case 6://hero 4
        couleur=6;
        ctx.strokeStyle="#29fdff";
        break;
    }
}
function openNav() {
    document.getElementById("mySidebar").style.width = "500px";
    document.getElementById("pourSidebar").style.marginRight = "500px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("pourSidebar").style.marginRight= "0";
}
