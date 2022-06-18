'use strict'
var gTouchEvs = ['onmousedown', 'onmouseup']

function renderEditor() {
    var strHtml = `<div class="meme-container">`
    strHtml += `  <div class="canvas-container">  <canvas  onmousedown="getEvPos(event)">
    </canvas>
    </div>
    <div class="edit-container">
        <input type="text" onkeyup="setLineTxt(this.value)" placeholder="write text" class="input">
        <div class="line-container">
        <button onclick="onLineMove(this)" class="edit-btn move-up up-down">&#8593;</button>
        <button onclick="onLineMove(this)" class="edit-btn up-down">&#8595;</button>
        <button onclick="onAddLine(this)" class="edit-btn add">+</button>
            <button onclick="onSwitchLine()" class="edit-btn switch">&#8593;&#8595;</button>
            <button onclick="onDeleteLine()" class="edit-btn delete">&#128465;</button>
        </div>
        <div class="text-container">
        <div class="text-size-btn">
            <button onclick="onChangeTextSize(this)" class="plus-btn"><img src="styles/images/add.png" alt=""></button>
            <button onclick="onChangeTextSize(this)" class="minus-btn">-</button>
            <button onclick="onChangeTextAlign(this)" name="start"><img src="styles/images/align-to-left.png" alt=""></button>
            <button onclick="onChangeTextAlign(this)" name="end"><img src="styles/images/align-to-right.png" alt=""></button>
            <button onclick="onChangeTextAlign(this)" name="center" class="center-btn"><img src="styles/images/center-text-alignment.png" alt=""></button>
            </div>
            <div class="text-font-btn">
            <select name="fonts" id="" onclick="onChangeFont(this.value)">
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
        <a href="#" class="btn" onclick="onDownloadImg(this)" download="my-img.png"
        >Download</a>
        <a class="share-btn" onclick="shareImg(this)"
            href="" target="#"
            rel="noopener">
         Share on Facebook
        </a>
        </div>
    </div>
    </div>`;
    document.querySelector('.container').innerHTML = strHtml

}

function onDownloadImg(elLink) {
    downloadImg(elLink)
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
    var meme = getMeme()
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
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    var meme = getMeme()
    if (isTextClicked(pos)) meme.lines[meme.selectedLineIdx].isDrag = true
    // onMove(pos)
    document.querySelector('.input').value = meme.lines[meme.selectedLineIdx].txt
    return pos
}




