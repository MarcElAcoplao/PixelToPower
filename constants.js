//Aqui van totes les constants
const generadors = [
  {nom: "test", cost: 0, quantitat: 0, efecte: 0},
  {nom: "gen1", cost: 1, quantitat: 0, efecte: 1},
  {nom: "gen2", cost: 10, quantitat: 0, efecte: 2},
  {nom: "gen3", cost: 100, quantitat: 0, efecte: 3},
  {nom: "gen4", cost: 1000, quantitat: 0, efecte: 4},
  {nom: "gen5", cost: 10000, quantitat: 0, efecte: 5},
]

const millores = [
  {nom: "test", cost: 0, nombreRequisits: 0, efecte: "Test"},
  {nom: "millora1", cost: 5, nombreRequisits: 0, efecte: "Desbloqueja el combat per 5 diners"},
  {nom: "millora2", cost: 50, nombreRequisits: 1, requisit: 1, efecte: "x1.25 Vida per 50 diners"},
  {nom: "millora3", cost: 200, nombreRequisits: 1, requisit: 2, efecte: "x2 Vida per 200 diners"},
  {nom: "millora4", cost: 1000, nombreRequisits: 1, requisit: 3, efecte: "x4 Vida per 1000 diners"},
  {nom: "millora5", cost: 5000, nombreRequisits: 1, requisit: 4, efecte: "x5 Vida per 5000 diners"},
  {nom: "millora6", cost: 20000, nombreRequisits: 1, requisit: 5, efecte: "x10 Vida per 20000 diners"},
  {nom: "millora7", cost: 50, nombreRequisits: 1, requisit: 1, efecte: "x1.25 Mal per 50 diners"},
  {nom: "millora8", cost: 200, nombreRequisits: 1, requisit: 7, efecte: "x2 Mal per 200 diners"},
  {nom: "millora9", cost: 1000, nombreRequisits: 1, requisit: 8, efecte: "x4 Mal per 1000 diners"},
  {nom: "millora10", cost: 5000, nombreRequisits: 1, requisit: 9, efecte: "x5 Mal per 5000 diners"},
  {nom: "millora11", cost: 20000, nombreRequisits: 1, requisit: 10, efecte: "x10 Mal per 20000 diners"},
  {nom: "millora12", cost: 1000, nombreRequisits: 2, requisits: [3, 8], efecte: "Desbloquejar els nivells per 1000 diners"},
]

const enemics = [
  {nom: "test", recompensa: 0, vida: 0.1, mal: 0.1, nivell: 1},
  {nom: "basic", recompensa: 1, vida: 1, mal: 1, nivell: 1},
  {nom: "basic 2", recompensa: 2, vida: 1.25, mal: 1.25, nivell: 2},
  {nom: "basic 3", recompensa: 4, vida: 2, mal: 2, nivell: 3},
  {nom: "basic 4", recompensa: 8, vida: 10, mal: 10, nivell: 4},
  {nom: "basic 5", recompensa: 16, vida: 100, mal: 100, nivell: 5},
]