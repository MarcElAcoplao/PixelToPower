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
    generadors: [0,0,0,0,0,0],
    costGeneradors: [0,1,10,100,1000,10000],
    efecteGeneradors: [0,1,5,25,125,625],
    produccioGeneradors: 0,
    milloresComprades: [1,0,0,0,0,0],
    ultimaGeneracio: Date.now(),
    enemic: 1,
    potPujar: 1,
    potBaixar: 0,
    exp: 0,
    nivell: 1,
    tempsLluita: 0,
    monedesMulti: 1,
    expMulti: 1,
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
  if (game.monedes >= game.costGeneradors[x]) {
    game.monedes -= game.costGeneradors[x]
    game.generadors[x]++
    game.costGeneradors[x] = formulaCost(x)
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
    if (game.monedes < game.costGeneradors[i]) document.getElementById(generadors[i].nom).disabled = true
    else document.getElementById(generadors[i].nom).disabled = false
    document.getElementById(generadors[i].nom).innerHTML = "Tens " + numberShort(game.generadors[i]) + " Generadors " + i + " amb producció total de " + numberShort(game.generadors[i] * game.efecteGeneradors[i]) + "/s<br>Cost: " + numberShort(game.costGeneradors[i]) + " Monedes"
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
  if (game.tempsLluita == 0) {
    document.getElementById("enemic").disabled = false
    document.getElementById("enemic").innerHTML = "Lluitar amb un enemic " + enemics[game.enemic].nom
  } 
  else {
    document.getElementById("enemic").disabled = true
    document.getElementById("enemic").innerHTML = "Temps per a lluitar: " + numberToTime(game.tempsLluita)
  }
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

function generarDiners() { //S'activa 20 vegades per segon i determina la quantitat produida respecte la última vegada, per evitar perdre producció al tancar la pàgina
  let producció = 0
  for (i=1;i<generadors.length;i++) {producció += (game.generadors[i] * game.efecteGeneradors[i])}
  game.diners += producció * ((Date.now() - game.ultimaGeneracio)/1000)
  game.produccioGeneradors = producció
  if (game.tempsLluita > 0) {game.tempsLluita -= ((Date.now() - game.ultimaGeneracio)/1000)} else {game.tempsLluita = 0}
  game.ultimaGeneracio = Date.now()
}
setInterval(generarDiners, 50)

function textInfo() { //Actualitza el text dels diferents elements
  document.getElementById("nextUnlockLevel").innerHTML = "Hola a tothom"
  document.getElementById("selectedPetText").innerHTML = "<img src='img/shop/23.png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/enemies/0.png';\"><br>" + stats(game.desbloqueig)
  document.getElementById("enemyImage").innerHTML = "<img src='img/enemies/" + enemics[game.enemic].imatge + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/enemies/0.png';\"><br>Vida: " + numberShort(enemics[game.enemic].vida) + "<br>Mal: " + numberShort(enemics[game.enemic].mal) + "<br>Recompensa: " + numberShort(enemics[game.enemic].recompensa)
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
  if (x >= 2) {
    result += "Monedes x" + numberShort(game.monedesMulti) + "<br>"
    result += "Exp x" + numberShort(game.expMulti) + "<br>"
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
  game.monedesMulti = 1 * (game.milloresComprades[13] * 0.25 + 1) * (game.milloresComprades[14] * 0.5 + 1) * (game.milloresComprades[15] * 1 + 1)
  game.expMulti = 1 * (game.milloresComprades[16] * 0.25 + 1) * (game.milloresComprades[17] * 0.5 + 1) * (game.milloresComprades[18] * 1 + 1)
}
setInterval(efectesMillores, 50)

function lluitar(x) {
   let copsGuanyar = enemics[x].vida / game.mal 
   let copsPerdre = game.vida / enemics[x].mal
   if (copsGuanyar <= copsPerdre) {
    game.monedes += enemics[x].recompensa * game.monedesMulti
    if (game.desbloqueig >= 2) game.exp += enemics[x].recompensa * game.expMulti
  }
  game.tempsLluita = enemics[x].temps
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

function XPToLevel(x) {return Math.floor((x / 5) ** 0.25) + 1}
function levelToXP(x) {return Math.ceil((x-1) ** (1/0.25) * 5)}
function formulaCost(x) {
  let base = generadors[x].cost
  let quantitat = game.generadors[x]
  return ((base) * (1 + (quantitat)/5 + (quantitat ** 2)/25)) 
}

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

function numberToTime(x) {
  if (typeof x === 'number' && !isNaN(x)) {
  xCeil = Math.ceil(x)
  result = ""
  if (xCeil>=172800) result += Math.floor(xCeil/86400) + " dies "
  else if (xCeil>=86400) result += Math.floor(xCeil/86400) + " dia "
  if (Math.floor(xCeil/3600)%24 == 1) result += (Math.floor(xCeil/3600)%24) + " hora "
  else if (Math.floor(xCeil/3600)%24 != 0) result += (Math.floor(xCeil/3600)%24) + " hores "
  if (Math.floor(xCeil/60)%60 == 1) result += (Math.floor(xCeil/60)%60) + " minut "
  else if (Math.floor(xCeil/60)%60 != 0) result += (Math.floor(xCeil/60)%60) + " minuts "
  if (xCeil%60 == 1) result += Math.floor(xCeil%60) + " segon "
  else if (xCeil%60 != 0) result += Math.floor(xCeil%60) + " segons "
  return result
  }
}

function tab(x) { //Determina la pantalla en la qual es troba el jugador
  game.pantalla = x
}