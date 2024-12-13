var autosaveStarted = false
//Sets all variables to their base values
function reset() {
	game = {
    pantalla: 1,
    diners: 0,
    monedes: 1,
    vida: 1,
    mal: 1,
    desbloqueig: 0,
    generadors: [0,0,0,0,0],
    efecteGeneradors: [1,2,3,4,5],
    produccioGeneradors: 0,
    milloresComprades: [1,0,0,0,0,0],
    ultimaGeneracio: Date.now(),
    enemic: 1,
    potPujar: 1,
    potBaixar: 0,
    exp: 0,
    nivell: 1,
  }
}
reset()

//If the user confirms the hard reset, resets all variables, saves and refreshes the page
function hardReset() {
  if (confirm("Are you sure you want to reset? You will lose everything!")) {
    reset()
    save()
    location.reload()
  }
}

function save() {
  //console.log("saving")
  game.lastSave = Date.now();
  localStorage.setItem("testGameSave", JSON.stringify(game));
}

function setAutoSave() {
  setInterval(save, 5000);
  autosaveStarted = true;
}
//setInterval(save, 5000)

function load() {
	reset()
	let loadgame = JSON.parse(localStorage.getItem("testGameSave"))
	if (loadgame != null) {loadGame(loadgame)}
}

load()

function exportGame() {
  save()
  navigator.clipboard.writeText(btoa(JSON.stringify(game))).then(function() {
    alert("Copied to clipboard!")
  }, function() {
    alert("Error copying to clipboard, try again...")
  });
}

function importGame() {
  loadgame = JSON.parse(atob(prompt("Input your save here:")))
  if (loadgame && loadgame != null && loadgame != "") {
    reset()
    loadGame(loadgame)
    save()
    location.reload()
  }
  else {
    alert("Invalid input.")
  }
}

function loadGame(loadgame) {
  //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
  let loadKeys = Object.keys(loadgame);
  for (i=0; i<loadKeys.length; i++) {
    if (loadgame[loadKeys[i]] != "undefined") {
      let thisKey = loadKeys[i];
      if (Array.isArray(loadgame[thisKey])) {
        game[loadKeys[i]] = loadgame[thisKey].map((x) => {return x})
      }
      //else {game[Object.keys(game)[i]] = loadgame[loadKeys[i]]}
      else {game[loadKeys[i]] = loadgame[loadKeys[i]]}
    }
  }
  changeTheme()
}

function changeTheme() {
  document.getElementById("themeLink").href = "themes/themeDark.css"
}

nombreEntrades()
function nombreEntrades() {
  for (i=0;i<millores.length;i++) {if (!game.milloresComprades[i]) {game.milloresComprades[i] = 0}}
}

function comprarGenerador(x) {
  if (game.monedes >= generadors[x].cost) {
    game.monedes -= generadors[x].cost
    generadors[x].quantitat++
  }
}

function comprarMillora(x) {
  if (game.diners >= millores[x].cost) {
    game.diners -= millores[x].cost
    game.milloresComprades[x]++
  }
}

function textGeneradors() { //Actualitza el text dels generadors i si els podem comprar. A més, els amaga/mostra dependent de la pantalla
  if (game.pantalla == 1)
  for (i=1;i<generadors.length;i++) {
    document.getElementById(generadors[i].nom).style.display = "block"
    if (game.monedes < generadors[i].cost) document.getElementById(generadors[i].nom).disabled = true
    else document.getElementById(generadors[i].nom).disabled = false
    document.getElementById(generadors[i].nom).innerHTML = "Tens " + generadors[i].quantitat + " Generadors " + i + " amb producció total de " + (generadors[i].quantitat * generadors[i].efecte) + "/s<br>Cost: " + generadors[i].cost + " Monedes"
  }
  else {for (i=1;i<generadors.length;i++) {document.getElementById(generadors[i].nom).style.display = "none"}
 }
}
setInterval(textGeneradors, 50)

function textMillores() {
  if (game.pantalla == 2)
  for (i=1;i<millores.length;i++) {
   if (milloraDisponible(i) == true) {
    document.getElementById(millores[i].nom).style.display = "block"
    document.getElementById(millores[i].nom).innerHTML = millores[i].efecte
    if (game.diners < millores[i].cost) document.getElementById(millores[i].nom).disabled = true
    else document.getElementById(millores[i].nom).disabled = false
   }
   else document.getElementById(millores[i].nom).style.display = "none"
  }
  else {for (i=1;i<millores.length;i++) {document.getElementById(millores[i].nom).style.display = "none"}
 }
}
setInterval(textMillores, 50)

function textEnemics() {
  if (game.pantalla == 3) {
  document.getElementById("enemic").style.display = "block"
  document.getElementById("enemicAmunt").style.display = "block"
  if (game.potPujar == 1) {document.getElementById("enemicAmunt").disabled = false} else {document.getElementById("enemicAmunt").disabled = true}
  document.getElementById("enemicAvall").style.display = "block"
  if (game.potBaixar == 1) {document.getElementById("enemicAvall").disabled = false} else {document.getElementById("enemicAvall").disabled = true}
  document.getElementById("enemyImage").style.display = "block"
  }
  else {
  document.getElementById("enemic").style.display = "none"
  document.getElementById("enemicAmunt").style.display = "none"
  document.getElementById("enemicAvall").style.display = "none"
  document.getElementById("enemyImage").style.display = "none"
  }
}
setInterval(textEnemics, 50)

function milloraDisponible(x) {
  if (game.milloresComprades[x] == 1) {return false}
  else {
    if (millores[x].nombreRequisits == 0) return true
    if (millores[x].nombreRequisits == 1) {
    if (game.milloresComprades[millores[x].requisit] == 1) {return true}
    else return false
    }
    if (millores[x].nombreRequisits >= 2) {
      let array = millores[x].requisits
      console.log("Test 1")
      for (a=0;a<millores[x].nombreRequisits;a++) {
      if (game.milloresComprades[array[a]] == 0) return false
    }
    return true
  }
 }
}

function assignarValors() { //Jo entenc lo que això fa...
  for (i=1;i<generadors.length;i++) {
    if (game.generadors[i-1] < generadors[i].quantitat) game.generadors[i-1] = generadors[i].quantitat
    else generadors[i].quantitat = game.generadors[i-1]
  }
}
setInterval(assignarValors, 50)

function generarDiners() { //S'activa 20 vegades per segon i determina la quantitat produida respecte la última vegada, per evitar perdre producció al tancar la pàgina
  let producció = 0
  for (i=1;i<generadors.length;i++) {producció += (generadors[i].quantitat * generadors[i].efecte)}
  game.diners += producció * ((Date.now() - game.ultimaGeneracio)/1000)
  game.produccioGeneradors = producció
  game.ultimaGeneracio = Date.now()
}
setInterval(generarDiners, 50)

function textInfo() { //Actualitza el text dels diferents elements
  document.getElementById("nextUnlockLevel").innerHTML = "Hola a tothom"
  document.getElementById("selectedPetText").innerHTML = "<img src='img/shop/23.png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/enemies/0.png';\"><br>" + stats(game.desbloqueig)
  document.getElementById("enemyImage").innerHTML = "<img src='img/enemies/" + game.enemic + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/enemies/0.png';\"><br>"
}
setInterval(textInfo, 50)

function stats(x) { //Retorna tots els possibles valors per als atributs
  let result = ""
  result += "Diners: " + numberShort(game.diners) + "<br>"
  result += "Producció: " + numberShort(game.produccioGeneradors) + "/s<br>"
  if (x >= 1) {
    result += "Monedes: " + numberShort(game.monedes) + "<br>"
    result += "Vida: " + numberShort(game.vida) + "<br>"
    result += "Mal: " + numberShort(game.mal) + "<br>"
  }

  return result
}

function desbloqueig() { //Determina si certs elements han sigut desbloquejats
  if (game.desbloqueig >= 1) {document.getElementById("combatTab").style.display = "block"} else {document.getElementById("combatTab").style.display = "none"}
}
setInterval(desbloqueig, 50)

function efectesMillores() {
  game.desbloqueig = 0 + Math.min(game.milloresComprades[1], 1) + Math.min(game.milloresComprades[12], 1)
  game.vida = 1 * (game.milloresComprades[2] * 0.25 + 1) * (game.milloresComprades[3] * 1 + 1) * (game.milloresComprades[4] * 3 + 1) * (game.milloresComprades[5] * 4 + 1) * (game.milloresComprades[6] * 9 + 1)
  game.mal = 1 * (game.milloresComprades[7] * 0.25 + 1) * (game.milloresComprades[8] * 1 + 1) * (game.milloresComprades[9] * 3 + 1) * (game.milloresComprades[10] * 4 + 1) * (game.milloresComprades[11] * 9 + 1) 
}
setInterval(efectesMillores, 50)

function lluitar(x) {
   let copsGuanyar = enemics[x].vida / game.mal 
   let copsPerdre = game.vida / enemics[x].mal
   if (copsGuanyar <= copsPerdre) {
    game.monedes += enemics[x].recompensa
    if (game.desbloqueig >= 2) game.exp += enemics[x].recompensa
  }
}

function nivellEnemic(x) { //1 - Pujar, 2 - Baixar
  if (x == 1 && game.potPujar == 1) {game.enemic += 1}
  if (x == 2 && game.potBaixar == 1) {game.enemic -= 1}
}

function canviEnemic() {
  if (game.enemic == 1) {game.potBaixar = 0} else {game.potBaixar = 1}
  let max = 0
  for (i=1;i<enemics.length;i++) {if (game.nivell >= enemics[i].nivell) max++}
  if (game.enemic < max) {game.potPujar = 1} else {game.potPujar = 0}
}
setInterval(canviEnemic, 50)

function XPToLevel(x) {return Math.floor((x / 5) ** 0.4) + 1}
function levelToXP(x) {return Math.ceil((x-1) ** (1/0.4) * 5)}

function nivells() {
  game.nivell = XPToLevel(Math.max(Math.floor(game.exp), 0))
  XPToNextLevel = levelToXP(game.nivell + 1) - levelToXP(game.nivell)
  ProgressToNextLevel = game.exp - levelToXP(game.nivell)
  document.getElementById("XPBarText").innerHTML = "EXP per pujar de nivell: " + numberShort(ProgressToNextLevel) + "/" + numberShort(XPToNextLevel)
  document.getElementById("XPBarBack").style.width = (ProgressToNextLevel / XPToNextLevel * 100) + "%"
  document.getElementById("level").innerHTML = "Nivell " + (game.nivell).toFixed(0)
}
setInterval(nivells, 50)


function numberShort(x) { //He agafat aquesta part del codi del meu joc, determina l'exponent del nombre i el resumeix com "K (mil)", "M (milió)", "B (bilió)" o "notació científica (3.12e14)". Entra un nombre (38443) i retorna el text resumit (38.4k)
  if (typeof x === 'number' && !isNaN(x)) {
xCeil = Math.ceil(x)
exponent = Math.floor(Math.log10(Math.abs(xCeil)))
result = ""
if (exponent >= 12) result = (xCeil / 10 ** exponent).toFixed(2) + "e" + exponent
else if (exponent >= 9) result = (xCeil/10 ** 9).toFixed(1) + "&nbsp;B"
else if (exponent >= 6) result = (xCeil/10 ** 6).toFixed(1) + "&nbsp;M"
else if (exponent >= 3) result = (xCeil/10 ** 3).toFixed(1) + "&nbsp;K"
else if (x == 0) result = x
else if (x < 1 && x > -1) result = (x).toFixed(3)
else result = (x).toFixed(2)
return result
  }
}

function tab(x) { //Determina la pantalla en la qual es troba el jugador
  game.pantalla = x
}