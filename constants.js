//Aqui van totes les constants
const generadors = [
  {nom: "test", cost: 0, quantitat: 0, efecte: 0},
  {nom: "gen1", cost: 1, quantitat: 0, efecte: 1},
  {nom: "gen2", cost: 10, quantitat: 0, efecte: 5},
  {nom: "gen3", cost: 100, quantitat: 0, efecte: 25},
  {nom: "gen4", cost: 1000, quantitat: 0, efecte: 125},
  {nom: "gen5", cost: 10000, quantitat: 0, efecte: 625},
]

const millores = [
  {nom: "test", cost: 0, nombreRequisits: 0, efecte: "Test"},
  {nom: "millora1", cost: 5, nombreRequisits: 0, efecte: "Desbloqueja el combat per 5 diners"},
  {nom: "millora2", cost: 50, nombreRequisits: 1, requisit: 1, efecte: "x1.25 Vida per 50 diners"},
  {nom: "millora3", cost: 200, nombreRequisits: 1, requisit: 2, efecte: "x2 Vida per 200 diners"},
  {nom: "millora4", cost: 1000, nombreRequisits: 1, requisit: 3, efecte: "x4 Vida per 1000 diners"},
  {nom: "millora5", cost: 5000, nombreRequisits: 1, requisit: 4, efecte: "x5 Vida per 5000 diners"},
  {nom: "millora6", cost: 20000, nombreRequisits: 1, requisit: 5, efecte: "x10 Vida per 20k diners"},
  {nom: "millora7", cost: 50, nombreRequisits: 1, requisit: 1, efecte: "x1.25 Mal per 50 diners"},
  {nom: "millora8", cost: 200, nombreRequisits: 1, requisit: 7, efecte: "x2 Mal per 200 diners"},
  {nom: "millora9", cost: 1000, nombreRequisits: 1, requisit: 8, efecte: "x3 Mal per 1000 diners"},
  {nom: "millora10", cost: 5000, nombreRequisits: 1, requisit: 9, efecte: "x4 Mal per 5000 diners"},
  {nom: "millora11", cost: 20000, nombreRequisits: 1, requisit: 10, efecte: "x5 Mal per 20k diners"},
  {nom: "millora12", cost: 1000, nombreRequisits: 2, requisits: [3, 8], efecte: "Desbloquejar els nivells per 1000 diners"},
  {nom: "millora13", cost: 2000, nombreRequisits: 1, requisit: 12, efecte: "x1.25 Monedes per 2000 diners"},
  {nom: "millora14", cost: 10000, nombreRequisits: 1, requisit: 13, efecte: "x1.5 Monedes per 10k diners"},
  {nom: "millora15", cost: 50000, nombreRequisits: 1, requisit: 14, efecte: "x2 Monedes per 50k diners"},
  {nom: "millora16", cost: 2000, nombreRequisits: 1, requisit: 12, efecte: "x1.25 Exp per 2000 diners"},
  {nom: "millora17", cost: 10000, nombreRequisits: 1, requisit: 16, efecte: "x1.5 Exp per 10k diners"},
  {nom: "millora18", cost: 50000, nombreRequisits: 1, requisit: 17, efecte: "x2 Exp per 50k diners"},
  {nom: "millora19", cost: 20000, nombreRequisits: 4, requisits: [5, 10, 14, 17], efecte: "Desbloqueja el prestigi per 20k diners"},
  {nom: "millora20", cost: 1000000, nombreRequisits: 1, requisit: 19, efecte: "x1.5 Vida/Mal per 1m diners (permanent)"},
  {nom: "millora21", cost: 10000000, nombreRequisits: 1, requisit: 20, efecte: "x4 Vida/Mal per 10m diners (permanent)"},
  {nom: "millora22", cost: 100000000, nombreRequisits: 1, requisit: 21, efecte: "x10 Vida/Mal per 100m diners (permanent)"},
  {nom: "millora23", cost: 1000000, nombreRequisits: 1, requisit: 19, efecte: "x1.5 Monedes/Exp per 1m diners (permanent)"},
  {nom: "millora24", cost: 10000000, nombreRequisits: 1, requisit: 23, efecte: "x2 Monedes/Exp per 10m diners (permanent)"},
  {nom: "millora25", cost: 100000000, nombreRequisits: 1, requisit: 24, efecte: "x3 Monedes/Exp per 100m diners (permanent)"},
]

const milloresPrestigi = [
  {nom: "prestigi", cost: 0, nombreRequisits: 0, efecte: "Reinicia els generadors i les millores per obtenir punts de prestigi (pp)"},
  {nom: "prestigi1", cost: 4, nombreRequisits: 0, efecte: "x(2^0.5) Producció dels generadors per 4 pp"},
  {nom: "prestigi2", cost: 8, nombreRequisits: 1, requisit: 1, efecte: "x2 Producció dels generadors per 8 pp"},
  {nom: "prestigi3", cost: 20, nombreRequisits: 1, requisit: 2, efecte: "x(2^1.5) Producció dels generadors per 20 pp"},
  {nom: "prestigi4", cost: 50, nombreRequisits: 1, requisit: 3, efecte: "x4 Producció dels generadors per 50 pp"},
  {nom: "prestigi5", cost: 100, nombreRequisits: 1, requisit: 4, efecte: "x8 Producció dels generadors per 100 pp"},
  {nom: "prestigi6", cost: 200, nombreRequisits: 1, requisit: 5, efecte: "x16 Producció dels generadors per 200 pp"},
]

const enemics = [
  {nom: "test", recompensa: 0, vida: 0.1, mal: 0.1, nivell: 1, imatge: 0},
  {nom: "Basic", recompensa: 1, vida: 1.2, mal: 0.5, nivell: 1, imatge: 1},
  {nom: "Basic 2", recompensa: 3, vida: 3, mal: 1, nivell: 1, imatge: 1},
  {nom: "Basic 3", recompensa: 7, vida: 8, mal: 2, nivell: 2, imatge: 1},
  {nom: "Basic 4", recompensa: 19, vida: 60, mal: 5, nivell: 3, imatge: 1},
  {nom: "Basic 5", recompensa: 50, vida: 500, mal: 30, nivell: 4, imatge: 1},
  {nom: "Enfadat 1", recompensa: 100, vida: 1000, mal: 100, nivell: 5, imatge: 2},
  {nom: "Enfadat 2", recompensa: 200, vida: 2500, mal: 250, nivell: 6, imatge: 2},
  {nom: "Enfadat 3", recompensa: 500, vida: 5000, mal: 500, nivell: 7, imatge: 2},
  {nom: "Enfadat 4", recompensa: 1000, vida: 50000, mal: 1000, nivell: 8, imatge: 2},
  {nom: "Enfadat 5", recompensa: 2000, vida: 100000, mal: 2500, nivell: 10, imatge: 2},
]