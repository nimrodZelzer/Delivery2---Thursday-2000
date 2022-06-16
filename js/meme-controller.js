
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']





function renderEditor() {
    var strHtml = `<div class="meme-container">`
    strHtml += `    <canvas onclick="getEvPos(event)">
    </canvas>
    <div class="edit-container">
        <input type="text" onkeyup="setLineTxt(this.value)" class="input">
        <div class="line-container">
            <button onclick="onSwitchLine(this)" class="edit-btn">switch line</button>
            <button onclick="onAddLine(this)" class="edit-btn">add line</button>
            <button onclick="onDeleteLine(this)" class="edit-btn">delete line</button>
        </div>
        <div class="text-container">
            <button onclick="onChangeTextSize(this)" class="plus-btn">+</button>
            <button onclick="onChangeTextSize(this)" class="minus-btn">-</button>
            <button onclick="onChangeTextAlign(this)" name="start">&#x2192;</button>
            <button onclick="onChangeTextAlign(this)" name="end">&#x2190;</button>
            <button onclick="onChangeTextAlign(this)" name="center">center</button>
            <label for="color">fill</label>
            <input id="color" type="color" onchange="onGetColor(this)">
            <select name="fonts" id="">
                <option value="impact">impact</option>
            </select>


        </div>
        <div class="emoji-container">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
        </div>
        <div class="down-container">
            <button>1</button>
            <button>2</button>
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
    console.log(isTextClicked(pos))

    return pos
}