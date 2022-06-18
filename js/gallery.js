'use strict'

var gNumOfImages = 18
var gKeyWords = ['president', 'baby', 'funny'];





renderGallery()
renderNavBar()

function renderNavBar() {
    var keywords = [...gKeyWords].join(" ")
    var strHtml = ""
    strHtml += `<input type="search" placeholder ="search" class="search-bar" onkeyup="setImageFilter(this.value)">`
    strHtml += `<p class="keywords">${keywords}</p> `
    strHtml += `<button class="btn-more">more</button> `
    document.querySelector('.nav-gallery').innerHTML = strHtml
}

function renderGallery(images = getImages()) {
    var strHtml = ""
    strHtml += `<div class="gallery">`
    for (var i = 0; i < images.length; i++) {
        strHtml += `<img src ="${images[i].url}" onclick ="renderMeme(${images[i].id})"> `
    }
    strHtml += `</div > `
    document.querySelector('.gallery-container').innerHTML = strHtml
}


function onSetFilterBy(filterBy) {
    filterBy = setImageFilter(filterBy)
    renderGallery()
}

function setImageFilter(text = "") {
    var images = getImages()
    console.log(images[1].keywords)
    console.log(images)
    if (text === "") {
        renderGallery(images)
        return
    }
    var sortedImages = images.filter(image => image.keywords.join(" ").includes(text));
    console.log(text)
    console.log(sortedImages)
    renderGallery(sortedImages)
    document.querySelector('.search-bar').value = text
}



