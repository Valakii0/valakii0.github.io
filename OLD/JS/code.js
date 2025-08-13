const code = document.getElementById("code-pre")

code.innerHTML = code.innerHTML.replaceAll("for", "<span class='for'>for</span>")
code.innerHTML = code.innerHTML.replaceAll("while", "<span class='for'>while</span>")
code.innerHTML = code.innerHTML.replaceAll("foreach", "<span class='for'>foreach</span>")

code.innerHTML = code.innerHTML.replaceAll("int", "<span class='var'>int</span>")
code.innerHTML = code.innerHTML.replaceAll("float", "<span class='var'>float</span>")
code.innerHTML = code.innerHTML.replaceAll("double", "<span class='var'>double</span>")