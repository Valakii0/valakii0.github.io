const rangeInput = document.getElementById("range-input")
const p = document.getElementById("wip-p")

const percentageA = document.getElementById("percentage-a")
const percentageB = document.getElementById("percentage-b")

function changeValue(value) {
    percentageA.innerHTML = rangeInput.value
    percentageB.innerHTML = 100 - rangeInput.value
}

function CheckAnswers() {
    p.style.visibility = "visible"
}