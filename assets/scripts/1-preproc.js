"use strict";

/**
 * Fichier permettant de traiter les données provenant du fichier CSV.
 */


/**
 * Précise le domaine en associant un nom de rue à une couleur précise.
 *
 * @param color   Échelle de 10 couleurs.
 * @param data    Données provenant du fichier CSV.
 */
function domainColor(color, data) {
  // reader the header and exclude the date column..
  var header = Object.keys(data[0]).filter(header => header != "Date"); // On prend comme noms de lieux toutes les colonnes sauf "Date"
  color.domain(header);
}

/**
 * Convertit les dates se trouvant dans le fichier CSV en objet de type Date.
 *
 * @param data    Données provenant du fichier CSV.
 * @see https://www.w3schools.com/jsref/jsref_obj_date.asp
 */
function parseDate(data) {
  // TODO: Convertir les dates du fichier CSV en objet de type Date.
  var parser = d3.timeParse("%d/%m/%y")
  // simply loop through every Date row and parse the data
  data.forEach(row => {
    row.Date = parser(row.Date)
  });
}

/**
 * Trie les données par nom de rue puis par date.
 *
 * @param color     Échelle de 10 couleurs (son domaine contient les noms de rues).
 * @param data      Données provenant du fichier CSV.
 *
 * @return Array    Les données triées qui seront utilisées pour générer les graphiques.
 *                  L'élément retourné doit être un tableau d'objets comptant 10 entrées, une pour chaque rue
 *                  et une pour la moyenne. L'objet retourné doit être de la forme suivante:
 *
 *                  [
 *                    {
 *                      name: string      // Le nom de la rue,
 *                      values: [         // Le tableau compte 365 entrées, pour les 365 jours de l'année.
 *                        date: Date,     // La date du jour.
 *                        count: number   // Le nombre de vélos compté ce jour là (effectuer une conversion avec parseInt)
 *                      ]
 *                    },
 *                     ...
 *                  ]
 */
function createSources(color, data) {
  //We will sort the data and return the results to the caller
  var sortResults = [];
  var domain = color.domain();
  domain.forEach(name => {
    sortResults.push({name:name, values:[]});
  })
  // sort by date then by street name..
  // parse the street values to the integer..
  data.forEach(rows => {
    for(var name in rows) {
      if(name !== "Date") {
        var rowValues = sortResults.find(obj => obj.name == name);
        rowValues.values.push({date:rows["Date"], count:parseInt(rows[name], 10)});
      }
    }
  })
  return sortResults
}

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe X.
 *
 * @param xFocus      Échelle en X utilisée avec le graphique "focus".
 * @param xContext    Échelle en X utilisée avec le graphique "contexte".
 * @param data        Données provenant du fichier CSV.
 */
function domainX(xFocus, xContext, data) {
  // TODO: Préciser les domaines pour les variables "xFocus" et "xContext" pour l'axe X.
  var dateSize = data.length;
  var range = [data[0].Date, data[dateSize-1].Date];
  xFocus.domain(range);
  xContext.domain(range);
}

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe Y.
 *
 * @param yFocus      Échelle en Y utilisée avec le graphique "focus".
 * @param yContext    Échelle en Y utilisée avec le graphique "contexte".
 * @param sources     Données triées par nom de rue et par date (voir fonction "createSources").
 */
function domainY(yFocus, yContext, sources) {
  var maxVal = d3.max(sources.map(source => d3.max(source.values.map(value => value.count))))
  yFocus.domain([0, maxVal])
  yContext.domain([0, maxVal])
}
