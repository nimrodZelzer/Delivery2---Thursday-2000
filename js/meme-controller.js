
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']





function renderEditor() {
    var strHtml = `<div class="meme-container">`
    strHtml += `    <canvas onmousedown="getEvPos(event)">
    </canvas>
    <div class="edit-container">
        <input type="text" onkeyup="setLineTxt(this.value)" placeholder="write text" class="input">
        <div class="line-container">
        <button onclick="onLineMove(this)" class="edit-btn move-up up-down">&#8593;</button>
        <button onclick="onLineMove(this)" class="edit-btn up-down">&#8595;</button>
        <button onclick="onAddLine(this)" class="edit-btn add">+</button>
            <button onclick="onSwitchLine(this)" class="edit-btn switch">&#8593;&#8595;</button>
            <button onclick="onDeleteLine(this)" class="edit-btn delete">&#128465;</button>
        </div>
        <div class="text-container">
        <div class="text-size-btn">
            <button onclick="onChangeTextSize(this)" class="plus-btn"><img src="/styles/images/add.png" alt=""></button>
            <button onclick="onChangeTextSize(this)" class="minus-btn">-</button>
            <button onclick="onChangeTextAlign(this)" name="start"><img src="/styles/images/align-to-left.png" alt=""></button>
            <button onclick="onChangeTextAlign(this)" name="end"><img src="/styles/images/align-to-right.png" alt=""></button>
            <button onclick="onChangeTextAlign(this)" name="center" class="center-btn"><img src="/styles/images/center-text-alignment.png" alt=""></button>
            </div>
            <div class="text-font-btn">
            <select name="fonts" id="" onchange="onChangeFont(this.value)">
            <option value="impact">impact</option>
            <option value="poppins">poppins</option>
            <option value="sans-serif">sans serif</option>
            </select>
            <label for="colorStroke" >S</label>
            <input id="colorStroke" type="color" class="stroke" onchange="onGetColor(this)" hidden>
            <input id="color" type="color" onchange="onGetColor(this)">
            </div>
        </div>
        <div class="emoji-container">
            <span onclick = onEmoji(this)>&#128512;</span>
            <span onclick = onEmoji(this)>&#128513;</span>
            <span onclick = onEmoji(this)>&#128514;</span>
            <span onclick = onEmoji(this)>&#128515;</span>
        </div>
        <div class="down-container">
        <a href="#" class="btn" onclick="downloadImg(this)" download="my-img.png"
        >Download</a>
        <a class="fb" href="" onclick()="share()" >
         Share on Facebook
        </a>
        </div>
    </div>
    </div>`;
    document.querySelector('.container').innerHTML = strHtml

}


function onGetColor(elColor) {
    getColor(elColor)
}


function onChangeTextSize(elBtn) {
    changeTextSize(elBtn)
}

function onChangeTextAlign(elBtn) {
    changeTextAlignment(elBtn)
}

function onAddLine() {
    document.querySelector('.input').value = ""
    addLine()
}

function onSwitchLine() {
    meme = getMeme()
    switchLine()
    document.querySelector('.input').value = meme.lines[meme.selectedLineIdx].txt
}

function onDeleteLine() {
    document.querySelector('.input').value = ""
    deleteLine()
}

function onLineMove(elBtn) {
    lineMove(elBtn)
}

function onChangeFont(value) {
    changeFont(value)
}

function onEmoji(elSpan) {
    addLine(60, elSpan.innerText)
}


function getEvPos(ev) {
    //Gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (gTouchEvs.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    meme = getMeme()
    if (isTextClicked(pos)) meme.lines[meme.selectedLineIdx].isDrag = true
    // onMove(pos)
    document.querySelector('.input').value = meme.lines[meme.selectedLineIdx].txt
    return pos
}






// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}
//                               CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    //After we read the file
    reader.onload = function (event) {
        var img = new Image()// Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        //Run the callBack func , To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}
