'use strict'
var gCtx
var gCanvas
var gFont
var gMeme = {
    selectedImg: -1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            txtSize: 20,
            size: 20,
            align: '',
            color: 'black',
            strokeColor: 'black',
            positionY: 30,
            positionX: 130,
            isDrag: false
        }
    ]
}


var gImgs = [
    { id: 1, url: 'styles/images/1.jpg', keywords: ['president', 'funny'] },
    { id: 2, url: 'styles/images/2.jpg', keywords: ['funny', 'dogs', 'animal'] },
    { id: 3, url: 'styles/images/3.jpg', keywords: ['cute', 'baby'] },
    { id: 4, url: 'styles/images/4.jpg', keywords: ['funny', 'cat', 'animal'] },
    { id: 5, url: 'styles/images/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'styles/images/6.jpg', keywords: ['smart', 'human'] },
    { id: 7, url: 'styles/images/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'styles/images/8.jpg', keywords: ['smart', 'human'] },
    { id: 9, url: 'styles/images/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'styles/images/10.jpg', keywords: ['president', 'funny'] },
    { id: 11, url: 'styles/images/11.jpg', keywords: ['funny', 'human'] },
    { id: 12, url: 'styles/images/12.jpg', keywords: ['human', 'israel'] },
    { id: 13, url: 'styles/images/13.jpg', keywords: ['funny', 'famous'] },
    { id: 14, url: 'styles/images/14.jpg', keywords: ['funny', 'famous'] },
    { id: 15, url: 'styles/images/15.jpg', keywords: ['tv show', 'smart'] },
    { id: 16, url: 'styles/images/16.jpg', keywords: ['funny', 'human', 'tv show'] },
    { id: 17, url: 'styles/images/17.jpg', keywords: ['funny', 'president'] },
    { id: 18, url: 'styles/images/18.jpg', keywords: ['toys', 'movie'] }
];

function getImages() {
    return gImgs
}

function renderMeme(imgId = gMeme.selectedImg) {
    if (gMeme.selectedImg === -1) renderEditor() // first time
    gMeme.selectedImg = imgId
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    var image = getImageById(imgId)
    gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
    drawText()
    console.log(gMeme.lines[gMeme.selectedLineIdx].positionY)
}

function drawText() {
    for (var i = 0; i <= gMeme.lines.length - 1; i++) {
        if (!gMeme.lines[i].txt) continue
        gCtx.textAlign = gMeme.lines[i].align
        gCtx.font = `${gMeme.lines[i].size}px ${gFont}`
        gCtx.color = gMeme.lines[i].color
        gCtx.fillStyle = gMeme.lines[i].color
        gCtx.strokeStyle = gMeme.lines[i].strokeColor;
        gCtx.fillText(gMeme.lines[i].txt, gMeme.lines[i].positionX, gMeme.lines[i].positionY)
        gCtx.strokeText(gMeme.lines[i].txt, gMeme.lines[i].positionX, gMeme.lines[i].positionY)
        console.log(gMeme.lines[i].txt);
    }
}

function setLineTxt(text = gMeme.lines[gMeme.selectedLineIdx].txt) {
    console.log('line length', gMeme.lines.length)
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    console.log(text);
    renderMeme()
}


function changeTextSize(elBtn) {
    if (elBtn.classList.contains('plus-btn')) {
        gMeme.lines[gMeme.selectedLineIdx].size += 2
    } else gMeme.lines[gMeme.selectedLineIdx].size -= 2
    renderMeme()
}

function changeTextAlignment(elBtn) {
    gMeme.lines[gMeme.selectedLineIdx].align = elBtn.name
    renderMeme()
}

function changeFont(value) {
    console.log(value)
    gFont = value
}


function getColor(elColor) {
    const val = elColor.value;
    if (elColor.classList.contains("stroke")) { gMeme.lines[gMeme.selectedLineIdx].strokeColor = val }
    else { gMeme.lines[gMeme.selectedLineIdx].color = val }
    console.log('here')
    renderMeme()
}

function addLine(positionX = 120, txt = '') {
    if (gMeme.selectedLineIdx === 0 && gMeme.lines[gMeme.selectedLineIdx].txt === "") return
    console.log('txt', txt)
    gMeme.selectedLineIdx++
    gMeme.lines.push(createLine(positionX, txt))
    console.log(gMeme.lines)
    renderMeme()
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    renderMeme()
}
function deleteLine() {
    if (!gMeme.lines.length || gMeme.lines[gMeme.selectedLineIdx].txt === "") return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
    if (gMeme.selectedLineIdx === -1) addLine()
    renderMeme()
}


function getImageById(imgId) {
    var imageObj = gImgs.find(image => imgId === image.id)
    var image = new Image()
    image.src = imageObj.url
    return image
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/png')// image/jpeg the default format
    elLink.href = imgContent
}

function lineMove(elBtn) {
    if (elBtn.classList.contains('move-up')) { gMeme.lines[gMeme.selectedLineIdx].positionY -= 20 }
    else { gMeme.lines[gMeme.selectedLineIdx].positionY += 20 }
    renderMeme()

}



function createLine(positionX, txt = '') {
    return {
        txt,
        txtSize: 20,
        size: 20,
        align: '',
        color: 'black',
        strokeColor: 'black',
        positionY: getRandom(30, 150),
        positionX: positionX,
        isDrag: false
    }
}

function isTextClicked(clickedPos) {
    // Calc the distance between two dots
    for (var i = 0; i < gMeme.lines.length; i++) {
        const distanceY = (clickedPos.y / 2 - gMeme.lines[i].positionY)
        console.log('clickedPos.positionY', clickedPos.y);
        console.log('positionY', gMeme.lines[i].positionY);
        console.log('size', gMeme.lines[i].size);
        // console.log('distanceY', distanceY)
        if (distanceY <= gMeme.lines[i].positionY) {
            gMeme.selectedLineIdx = i
            console.log(gMeme.lines[i].txt)
            return true
        }
    }
    console.log(gMeme.lines[i])
    return false
}


function onMove(ev) {
    if (gMeme.lines[gMeme.selectedLineIdx].isDrag) {
        const pos = getEvPos(ev)
        //Calc the delta , the diff we moved
        const dx = pos.x - gMeme.lines[gMeme.selectedLineIdx].positionX
        const dy = pos.y - gMeme.lines[gMeme.selectedLineIdx].positionY
        moveLine(dx, dy)
        //Save the last pos , we remember where we`ve been and move accordingly
        gStartPos = pos
        //The canvas is render again after every move
        renderMeme()
    }
}



function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].positionX += dx
    gMeme.lines[gMeme.selectedLineIdx].positionX += dy
}

function getMeme() {
    return gMeme
}
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}