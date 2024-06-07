const modelsDiv = document.getElementById("models-div")

models = JSON.parse(`{
    "models": [
      {
        "name": "Rolls-Royce Phantom I",
        "description": "Az eredeti Phantom, amelyet 1925-ben mutattak be, a Rolls-Royce kivételes luxusautók gyártásának hagyományának kezdetét jelentette. Ez állította be az igényesség és a mérnöki kiválóság mércéjét a korában.",
        "image": "../images/model1.png"
      },
      {
        "name": "Rolls-Royce Phantom II",
        "description": "A Phantom II, 1929-ben bemutatva, folytatta a luxus és az elegancia hagyományát. Javított vázszerkezettel és motorkialakítással rendelkezett, ami a 20. század elején a szofisztikáltság szimbólumává tette.",
        "image": "../images/model2.png"
      },
      {
        "name": "Rolls-Royce Phantom III",
        "description": "A Phantom III, amelyet 1936-ban vezettek be, a háború előtti luxusautózás csúcsát képviselte. A V12 motorja és a fejlett technológiája révén megszilárdította a Rolls-Royce hírnevét a mérnöki kiválóság terén.",
        "image": "../images/model3.png"
      },
      {
        "name": "Rolls-Royce Phantom IV",
        "description": "A Phantom IV, amelyet 1950 és 1956 között korlátozott számban gyártottak, egyedi modell volt, kizárólag a királyi családok és államfők részére készült. Exkluzivitása és pompa jelképévé vált.",
        "image": "../images/model4.png"
      },
      {
        "name": "Rolls-Royce Phantom V",
        "description": "A Phantom V, amelyet 1959-ben mutattak be, népszerű választás volt a hírességek és méltóságok körében. Tágas belső tere és luxusfelszereltsége a 60-as években az autóvezető elegancia csúcsát jelentette.",
        "image": "../images/model5.png"
      },
      {
        "name": "Rolls-Royce Phantom VI",
        "description": "A Phantom VI, amelyet 1968-tól 1990-ig gyártottak, folytatta a luxus és a grandiózum hagyományát. Gyakran használták állami eseményekhez és az autóipar kiválóságának csúcsát képviselte abban az időszakban.",
        "image": "../images/model6.png"
      },
      {
        "name": "Rolls-Royce Phantom VII",
        "description": "A Phantom VII, amelyet 2003-ban mutattak be, egy modern reneszánsz volt a Phantom sorozat számára. Klasszikus dizájn elemeit kombinálta a kortárs technológiával, megerősítve a Rolls-Royce pozícióját a luxusautózás élén.",
        "image": "../images/model7.png"
      },
      {
        "name": "Rolls-Royce Phantom VIII",
        "description": "Az ikonikus luxus szedán legújabb változata. Ismert a páratlan kézműves munkájáról, a Phantom VIII lenyűgöző vezetési élményt kínál pompás belső terekkel és élvonalbeli technológiával. Folytatja a Phantom sorozat örökségét, mint az autóipar luxusának csúcsa.",
        "image": "../images/model8.png"
      }
    ]
}`).models

models.forEach(model => {
    
    modelsDiv.innerHTML += 
        `<div>
            <img src="${model.image}" alt="car.png">
            <div>
                <h1>${model.name}</h1>
                <p>${model.description}</p>
            </div>
        </div>`
        })