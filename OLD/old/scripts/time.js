const timeDiv = document.getElementById("time-div")

function setTime() {
    time = new Date()
    //timeDiv.innerHTML = time.getHours() + " " + time.getMinutes() + " " + time.getSeconds()
    timeDiv.innerHTML = time.toLocaleTimeString()
}

setTime()
setInterval(setTime, 1000)