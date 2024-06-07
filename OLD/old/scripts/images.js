const imagesDiv = document.getElementById("images-div")

for (let i = 1; i < 7; i++) {
    imagesDiv.innerHTML += 

    `<div>
        <img src="../images/gallery${i}.png" alt="logo.png">
    </div>`
}