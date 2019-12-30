var tileDimensionPixel;
var tuilePositionX=0;
var tuilePositionY=0;
var ajustementSelonDeplacementX=0;
var ajustementSelonDeplacementY=0;
var nbTileWidth;
var nbTileHeight;
var tileInventaireDimensionPixel=100;
var nbTileInventaireWidth=5;
var nbTileInventaireHeight;
var ctx = null;
var ctxInventaire=null;
var gameMap = [];
var inventaireMap=[];
var canvas;
var canvasInventaire;
var changementTextureMap=false;
var drawInitial=true;
var btnWall;
var btnFloor;
var btnGoblin;
var btnHero1;
var btnHero2;
var btnHero3;
var btnHero4;
var couleur;
var self;
var imgSource='textures/';




function creerMap(){
    drawInitial=true;
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
    drawInitial=true;
    ctx=canvas.getContext("2d");
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
function loadInventaire(){
    ctx=canvasInventaire.getContext("2d");
    var file= document.getElementById("inventaireFile").files[0];
    if(file){
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            if(JSON.parse(evt.target.result).className!="inventory"){
                return;
            }
            inventaireMap= JSON.parse(evt.target.result).inventaire;
            nbTileInventaireHeight=Math.ceil(inventaireMap.length/nbTileInventaireWidth);
            //A etudier afin de mieux comprendre (pk pas mettre ctx.canvasInventaire)
            ctx.canvas.width=nbTileInventaireWidth*tileInventaireDimensionPixel;
            ctx.canvas.height=nbTileInventaireHeight*tileInventaireDimensionPixel;
            requestAnimationFrame(drawInventaire);
        };
        reader.onerror = function (evt) {
            document.getElementById("fileContents").innerHTML = "error reading file";
        };
    }
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
    drawInitial=false;
}
function drawInventaire(){
    if(ctx==null){return;}
    for(var y=0; y<nbTileInventaireHeight;y++){
        for(var x=0;x<nbTileInventaireWidth;x++){
            switch(inventaireMap[((y*nbTileInventaireWidth)+x)]){
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
            case undefined:
                ctx.fillStyle="#328cc1";
                ctx.strokeStyle="#328cc1";
                break;
            }
            ctx.fillRect(x*tileInventaireDimensionPixel, y*tileInventaireDimensionPixel, tileInventaireDimensionPixel, tileInventaireDimensionPixel);
            ctx.strokeRect(x*tileInventaireDimensionPixel, y*tileInventaireDimensionPixel, tileInventaireDimensionPixel, tileInventaireDimensionPixel);
        }
    }
}
function setChoix(choix,x,y){
    console.log(choix);
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
        ctx.strokeStyle="#abcdef";
        break;
    default:
        couleur=null;
        break;
    }
    ctx.strokeRect(x*tileInventaireDimensionPixel, y*tileInventaireDimensionPixel, tileInventaireDimensionPixel, tileInventaireDimensionPixel);
}
window.addEventListener("load", ()=>{
    document.getElementById("defaultOpen").click();
    canvas= document.getElementById("game");
    canvasInventaire= document.getElementById("canvasInventaire");
    canvas.addEventListener("mousedown", startPositionChangementTextureMap);
    canvas.addEventListener("mouseup", endPositionChangementTextureMap);
    canvas.addEventListener("mousemove", draw);
    document.addEventListener("mousedown", startChangemenfPasEncoreDansCanvas);
    document.addEventListener("mouseup", endChangemenfPasEncoreDansCanvas);
    canvasInventaire.addEventListener("click", function(e){
        analyseInventaire(e);
    });
});
function startPositionChangementTextureMap(e){
    changementTextureMap=true;
    //serait supposer capable de dessiner a un seul clic mais ne fonctionne pas
    if(ctx!=null && drawInitial && couleur!=null){
        draw(e);
    }
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
    if(!changementTextureMap || canvas==null){
        return;
    }
    //holy grail pour Canvas
    
    canvas=document.getElementById("game");
    ctx=canvas.getContext("2d");
    var BB=canvas.getBoundingClientRect();
    var tx=e.clientX-BB.left;
    var ty=e.clientY-BB.top;
    console.log("tx: "+tx);
    console.log("ty: "+ty);
    console.log("BBleft: "+BB.left+" BBtop: "+BB.top);
    //fin du holy grail
    numTuile=scanMap(tx,ty);
    gameMap[numTuile]=couleur;
    requestAnimationFrame(drawGame);
}
function scanMap(tx, ty){
    tuilePositionX=tx/tileDimensionPixel;
    tuilePositionY=ty/tileDimensionPixel;
    var tuileXFloor=Math.floor(tuilePositionX);
    var tuileYFloor=Math.floor(tuilePositionY);
    var numTuile=tuileYFloor*nbTileWidth+tuileXFloor;
    return numTuile;
}
function analyseInventaire(e){
    //holy grail pour Canvas
    var BBInventaire=canvasInventaire.getBoundingClientRect();
    var txInventaire=e.clientX-BBInventaire.left;
    var tyInventaire=e.clientY-BBInventaire.top;
    //fin du holy grail
    numTuileInventaire=scanInventaire(txInventaire,tyInventaire);
    setChoix(numTuileInventaire);
}
function scanInventaire(txInventaire, tyInventaire){
    var tuileInventairePositionX=txInventaire/tileInventaireDimensionPixel;
    var tuileInventairePositionY=tyInventaire/tileInventaireDimensionPixel;
    var tuileInventaireXFloor=Math.floor(tuileInventairePositionX);
    var tuileInventaireYFloor=Math.floor(tuileInventairePositionY);
    var numTuileInventaire=tuileInventaireYFloor*nbTileInventaireWidth+tuileInventaireXFloor;
    return numTuileInventaire;
}
function openNav() {
    document.getElementById("mySidebar").style.width = "600px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}
function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
} 
