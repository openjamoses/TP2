"use strict";

/**
 * Fichier permettant de dessiner les graphiques "focus" et "contexte".
 */


/**
 * Crée une ligne SVG en utilisant les domaines X et Y spécifiés.
 * Cette fonction est utilisée par les graphiques "focus" et "contexte".
 *
 * @param x               Le domaine X.
 * @param y               Le domaine Y.
 * @return d3.svg.line    Une ligne SVG.
 *
 * @see https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89      (voir line generator)
 */
function createLine(x, y) {
  return d3.line()
           .x(function(d) { return x(d.date)})
           .y(function(d) { return y(d.count)})
           .curve(d3.curveBasisOpen)
}

/**
 * Crée une ligne qui sera ajouté à un graphique
 *
 * @param g         Le groupe SVG dans lequel le graphique doit être dessiné.
 * @param id        L'identifiant donné à la LineChart.
 * @param datum     Données liées à cette LineChart.
 * @param line      La fonction permettant de dessiner les lignes du graphique.
 * @param color     L'échelle de couleurs ayant une couleur associée à un nom de rue.
 * @param name      Nom à donner à la LineChart.
 */
function createLineChart(g, id, datum, line, color, name) {
  return g.append("path")
    .datum(datum)
    //assign the id
    .attr("id", id)
    // give it a class atrribute line
    .attr("class", "line")
    // ready to draw
    .attr("d", line)
    // set black line if the line if for the mean column
    .style("stroke", name ===  "Moyenne" ? "#000000": color(name))
    .style("stroke-width", name ===  "Moyenne" ? 3 : 1);
}

/**
 * Crée le graphique focus.
 *
 * @param g         Le groupe SVG dans lequel le graphique doit être dessiné.
 * @param sources   Les données à utiliser.
 * @param line      La fonction permettant de dessiner les lignes du graphique.
 * @param color     L'échelle de couleurs ayant une couleur associée à un nom de rue.
 */
function createFocusLineChart(g, sources, line, color) {
  for(var index in sources) {
    var street = sources[index];
    createLineChart(g, street.name, street.values, line, color, street.name)
    .attr("clip-path", "url(#clip)");
  }
}


/**
 * Crée le graphique contexte.
 *
 * @param g         Le groupe SVG dans lequel le graphique doit être dessiné.
 * @param sources   Les données à utiliser.
 * @param line      La fonction permettant de dessiner les lignes du graphique.
 * @param color     L'échelle de couleurs ayant une couleur associée à un nom de rue.
 */
function createContextLineChart(g, sources, line, color) {
  // just loop through the dataset
  for(var index in sources) {
    var street = sources[index];
    /// call the function to create the line..
    createLineChart(g, street.name + "Context", street.values, line, color, street.name)
  }
}
