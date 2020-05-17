"use strict";

/**
 * File used to draw the "focus" and "context" graphics.
 **/

/**
 * Creates an SVG line using the specified X and Y domains.
 * This function is used by the "focus" and "context" graphics.
 *
 * @param x               Domain X.
 * @param y               The Y domain.
 * @return d3.svg.line    An SVG line.
 *
 * @see https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89      (voir line generator)
 */
function createLine(x, y) {
  /**
  * Creating a line is as simple as calling the d3 line() function..!
  * but we are interested in the curve so..
  * lets use "curveBasisOpen" provided by d3
  ***/
  return d3.line()
           .x(function(d) { return x(d.date)})
           .y(function(d) { return y(d.count)})
           .curve(d3.curveBasisOpen)
}

/**
 * Create a line which will be added to a graph *
 * @param g  The SVG group in which the graphic is to be drawn.
 * @param id The identifier given to the LineChart.
 * @param datum Data linked to this LineChart.
 * @param line The function allowing to draw the lines of the graph.
 * @param color The color scale with a color associated with a street name.
 * @param name Name to give to the LineChart.
 */
function createLineChart(g, id, datum, line, color, name) {
/**
* here we need to set the detum,
* assign the id , class and d atrributes,
* then ready to draw, but we will assign static color black to mean column
**/
  return g.append("path")
    .datum(datum)
    .attr("id", id).attr("class", "line").attr("d", line)
    .style("stroke", name ===  "Moyenne" ? "#000000": color(name))
    .style("stroke-width", name ===  "Moyenne" ? 3 : 1);
}

/**
 * Creates the focus chart.
 *
 * @param g         The SVG group in which the graphic is to be drawn.
 * @param sources   The data to use.
 * @param line      The function for drawing the lines of the graph.
 * @param color    The color scale having a color associated with a street name.
 */
function createFocusLineChart(g, sources, line, color) {
  /*
  * Just a simple for loop
  * call the createLineChart, append
  * the attribute clipPath**
  */
  for(var index in sources) {
    createLineChart(g, sources[index].name, sources[index].values, line, color, sources[index].name)
    .attr("clip-path", "url(#clip)");
  }
}


/**
 * Creates the "context" line chart
 *
 * @param g         The SVG group where you draw the graphic. 
 * @param sources   The data to use. 
 * @param line      The function to draw the lines of the graphic. 
 * @param color     Color scale with street names associated to colors
 */
function createContextLineChart(g, sources, line, color) {
  /**
  * just loop through the source
  * and call the function to create the line..
  * then we should be good to go..
  */
  for(var index in sources) {
    createLineChart(g, sources[index].name + "Context", sources[index].values, line, color, sources[index].name)
  }
}
