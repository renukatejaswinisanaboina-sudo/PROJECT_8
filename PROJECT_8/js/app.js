//get all ids from html 
const colorPicker=document.getElementById("color");
const brushSizeSelector=document.getElementById("BrushSize");
const penTool=document.getElementById("pen");
const eraserTool=document.getElementById("eraser");
const drawSquareBtn=document.getElementById("square");
const clearCanvasBtn=document.getElementById("clean");
const DownloadDrawingBtn=document.getElementById("download");
const canvas=document.getElementById("canvas");

//prepare the canvas content
const ctx=canvas.getContext("2d");
//setting canvas size 
canvas.height=420;
canvas.width=800;

//set state variables (app memory)
let isDrawing=false; //currently drawing anything with freehand
let currentTool="pen"; // "pen" or "eraser"
let isDrawingSquare=false; //if true , then square /rectangle mode is enable 

//setting default brush styles 
ctx.strokeStyle=colorPicker.value; //line color
ctx.lineWidth=brushSizeSelector.value;//brush thickness
ctx.lineCap="round" // makes line ends rounded (smoother drawing)

//variable for rectangle start points
let startX=0;
let startY=0;

//Drawing function 

function startDraw(e)//when mouse is pressed down
{
   if(isDrawingSquare){
       startX=e.offsetX;
       startY=e.offsetY;
       return;
   }
   isDrawing=true;
   ctx.beginPath();//start a new path 
   ctx.moveTo(e.offsetX,e.offsetY)
}

function draw(e)//when mouse moves
{
   if(!isDrawing) return; 
   ctx.strokeStyle=currentTool=="eraser"?"#ffffff":colorPicker.value;
   ctx.lineWidth=brushSizeSelector.value;
   ctx.lineTo(e.offsetX,e.offsetY);
   ctx.stroke();
   ctx.beginPath();
   ctx.moveTo(e.offsetX,e.offsetY);
}
function stopDrawing(e)//when mouse is released
{
  if(isDrawingSquare){
    let endX=e.offsetX;
    let endY=e.offsetY;
    let width=endX-startX;
    let height=endY-startY;
    ctx.strokeStyle=colorPicker.value
    ctx.lineWidth=brushSizeSelector.value 
    ctx.beginPath();
    ctx.rect(startX,startY,width,height);
    ctx.stroke();
    return;
  }
  isDrawing=false;
}
//tool buttons (event listeners)
eraserTool.addEventListener("click",()=>{
    isDrawingSquare=false;
    penTool.classList.remove("active")
    eraserTool.classList.add("active")
    drawSquareBtn.classList.remove("active")
    currentTool="eraser";
    console.log(currentTool)
})
penTool.addEventListener("click",()=>{
    isDrawingSquare=false;
    penTool.classList.add("active")
    eraserTool.classList.remove("active")
    drawSquareBtn.classList.remove("active")
    currentTool="pen";
})
drawSquareBtn.addEventListener("click",()=>{
    penTool.classList.remove("active")
    eraserTool.classList.remove("active")
    drawSquareBtn.classList.add("active")
   isDrawingSquare=true;
})
clearCanvasBtn.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
})
DownloadDrawingBtn.addEventListener("click",()=>{
   let canvasImage=canvas.toDataURL("image/png");//convert canvas to an image string 
   let anchorEle=document.createElement("a");
   anchorEle.href=canvasImage;
   anchorEle.download="WhiteBoard.png"
   document.body.appendChild(anchorEle)
   anchorEle.click()
   document.body.removeChild(anchorEle)
})

// Mouse events on tha canvas 
canvas.addEventListener("mousedown",startDraw)
canvas.addEventListener("mousemove",draw)
canvas.addEventListener("mouseup",stopDrawing)