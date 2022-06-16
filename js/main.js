var gNumOfImages = 18
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gKeyWords = ['hello', 'wowo', 'yesss'];





renderGallery()



function renderGallery() {
    var images = getImages()
    var keywords = [...gKeyWords].join(" ")
    console.log(keywords)
    var strHtml = `<div class="gallery-container">`
    strHtml += `<div class="nav-gallery">`
    strHtml += `<input type="search" class="search-bar">`
    strHtml += `<p class="keywords">${keywords}</p> `
    strHtml += `<button class="btn-more">more</button> `
    strHtml += `</div > `
    strHtml += `<div class="gallery">`
    for (var i = 0; i < images.length; i++) {
        strHtml += `<img src ="${images[i].url}" onclick ="renderMeme(${images[i].id})"> `
    }
    strHtml += `</div > `
    strHtml += `</div > `
    document.querySelector('.container').innerHTML = strHtml
}



function addListeners() {
    addMouseListeners()
    addTouchListeners()
    addResizeListener()
}

function addResizeListener() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}


