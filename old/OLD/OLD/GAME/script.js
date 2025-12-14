const firstDiv =  document.getElementById('first-player-div')
const secondDiv =  document.getElementById('second-player-div')

var svgObject
var selectedPiece
var selectedPlace

trios = ['abc', 'ahg', 'gfe', 'cde', 'ijk', 'ipo', 'onm', 'klm', 'qrs', 'qxw', 'wvu', 'stu', 'bjr', 'hpx', 'vnf', 'dlt']
trioArchive = [[], []]

window.addEventListener('load', function() {
    svgObject = document.getElementById('board-object').contentDocument
    Array.from(svgObject.querySelectorAll('circle')).forEach((element) => {
        element.addEventListener('click', (e) => {
            placeClicked(e.target)
        })
    })
})

for (let i = 0; i < 9; i++) {
   firstDiv.innerHTML += '<div></div>' 
   secondDiv.innerHTML += '<div></div>'
}

var winner = ''
var turnNumber = 0
var placedAll = false
var haveTrio = false
var canJump = [false, false]

function placeClicked(object) {

    if (haveTrio || winner != '') return
    if (!placedAll) {

        let piece = document.createElementNS('http://www.w3.org/2000/svg','circle')
        piece.setAttribute('cx', object.getAttribute('cx'))
        piece.setAttribute('cy', object.getAttribute('cy') - 5)
        piece.setAttribute('r', '20')
        piece.setAttribute('id', turnNumber)
        piece.setAttribute('class', (turnNumber % 2) ? 'dark' : 'light')

        piece.addEventListener('click', (e) => {
            pieceClicked(e.target)
        })

        if (turnNumber % 2) secondDiv.removeChild(secondDiv.lastChild)
        else firstDiv.removeChild(firstDiv.lastChild)

        svgObject.querySelector('svg').appendChild(piece)
        turnNumber++

        if (turnNumber > 17) placedAll = true
        checkTrio()
    }
    else {

        if (selectedPiece != null) {
            if (object.getAttribute('neighbours').includes(selectedPlace.id) || canJump[turnNumber % 2]) {
                
                selectedPiece.setAttribute('cx', object.getAttribute('cx'))
                selectedPiece.setAttribute('cy', object.getAttribute('cy') - 5)

                selectedPiece = null
                selectedPlace = null

                Array.from(svgObject.querySelectorAll('.selected')).forEach(piece => {
                    piece.classList.remove('selected')
                })

                turnNumber++
                checkTrio()
            }
        }
    }
}

function pieceClicked(object) {

    if (winner != '') return
    if (haveTrio) {

        if (object.classList.contains('removable')) {
            object.remove()
            haveTrio = false

            Array.from(svgObject.querySelectorAll('.removable')).forEach(piece => {
                piece.classList.remove('removable')
            })

            if (placedAll) checkWinner()
        }
    }
    else {

        if ((turnNumber - parseInt(object.id)) % 2 == 0 && placedAll) {
        
            Array.from(svgObject.querySelectorAll('.selected')).forEach(piece => {
                piece.classList.remove('selected')
            })
            
            object.classList.add('selected')
            selectedPiece = object
            selectedPlace = pieceToPlace(object) 
        }
    }
}

function checkTrio() {

    positions = []
    Array.from(svgObject.querySelectorAll(`.${(turnNumber % 2) ? 'light' : 'dark'}`)).forEach(piece => {
        positions.push(pieceToPlace(piece).id)
    })

    currentTrio = []
    trios.forEach(trio => {

        if (positions.includes(trio[0]) && positions.includes(trio[1]) && positions.includes(trio[2])) {
            currentTrio.push(trio)
        }
    })

    currentTrio.forEach(trio => {
        if (!trioArchive[turnNumber % 2].includes(trio)) {
            trioArchive[turnNumber % 2] = currentTrio
            takePiece()
        }    
    })

    trioArchive[turnNumber % 2] = currentTrio
}

function takePiece() {

    haveTrio = true
    let pieces = svgObject.querySelectorAll(`.${(turnNumber % 2) ? 'dark' : 'light'}`)

    if (pieces.length == trioArchive[turnNumber % 2 ? 0 : 1].length * 3) {
        pieces.forEach(piece => {
            piece.classList.add('removable')
        })

        return
    }
    
    pieces.forEach(piece => {
        if (!trioArchive[turnNumber % 2 ? 0 : 1].join('').includes(pieceToPlace(piece).id)) piece.classList.add('removable')
    })
}

function checkWinner() {

    let darkPieces = svgObject.querySelectorAll('.dark').length
    let lightPieces = svgObject.querySelectorAll('.light').length

    if (darkPieces <= 2) winner = 'light'
    else if (lightPieces <= 2) winner = 'dark'

    if (lightPieces <= 3) canJump[0] = true
    else if (darkPieces <= 3) canJump[1] = true
}

function pieceToPlace(piece) {
    return svgObject.querySelector(`circle[cx="${piece.getAttribute('cx')}"][cy="${parseInt(piece.getAttribute('cy')) + 5}"]`)
}