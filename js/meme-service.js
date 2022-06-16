'use strict'
var gCtx
var gCanvas
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
            positionY: 30
        }
    ]
}

var gImgs = [
    { id: 1, url: 'styles/images/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'styles/images/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'styles/images/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'styles/images/4.jpg', keywords: ['funny', 'cat'] }
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
        gCtx.font = gMeme.lines[i].size + 'px' + ' sans-serif'
        gCtx.color = gMeme.lines[i].color
        gCtx.fillStyle = gMeme.lines[i].color
        gCtx.fillText(gMeme.lines[i].txt, 150, gMeme.lines[i].positionY)

        console.log(gMeme.lines[i].txt);
    }
}

function setLineTxt(text = gMeme.lines[gMeme.selectedLineIdx].txt, x = 20) {
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

function getColor(elColor) {
    const val = elColor.value;
    gMeme.lines[gMeme.selectedLineIdx].color = val
    console.log('here')
    renderMeme()
}

function addLine() {
    if (gMeme.selectedLineIdx === 0 && gMeme.lines[gMeme.selectedLineIdx].txt === "") return
    console.log('here')
    gMeme.selectedLineIdx++
    gMeme.lines.push(createLine())
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    renderMeme()
}
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
    console.log(gMeme.selectedLineIdx)
    if (!gMeme.lines.length) addLine()
    console.log(gMeme.selectedLineIdx)
    renderMeme()
}


function getImageById(imgId) {
    var imageObj = gImgs.find(image => imgId === image.id)
    var image = new Image()
    image.src = imageObj.url
    return image
}

function createLine() {
    return {
        txt: '',
        txtSize: 20,
        size: 20,
        align: '',
        color: 'black',
        positionY: gMeme.lines[gMeme.lines.length - 1].positionY + 30
    }
}

function isTextClicked(clickedPos) {
    // Calc the distance between two dots
    for (var i = 0; i < gMeme.lines.length; i++) {
        const distance = (clickedPos.y - gMeme.lines[i].positionY)
        console.log('distance', distance);
        console.log('clickedPos.positionY', clickedPos.y);
        console.log('gMeme.lines[i].positionY', gMeme.lines[i].positionY);
        console.log('range', gMeme.lines[i].size * 2 + gMeme.lines[i].positionY);
        if (distance <= (gMeme.lines[i].size) + gMeme.lines[i].positionY) {
            gMeme.selectedLineIdx = i
            console.log(gMeme.lines[i].txt)
            return true
        }
    }
    return false
}

function getMeme() {
    return gMeme
}