"use strict";

/**
 * File used for generating the legend and controlling the interactions with it.
 */


/**
 * Create a legend from the given source.
 *
 * @param svg       SVG element to use in order to create the legend.
 * @param sources   Data sorted by street name and by date.
 * @param color     The 10-color scale to use.
 */
function legend(svg, sources, color) {
  // TODO: Create the legend that supplements the graphic.
  var node = svg.node()
  var width = node.getAttribute("width")
  var height = node.getAttribute("height")

  var legend = svg.append("g")
    .selectAll("g")
    .data(sources)
    .enter()
    .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var heightCase = height / (sources.length*2)
        var x = width / 18;
        var y = 30 + i * heightCase;
        return 'translate(' + x + ',' + y + ')'
      })
      .on("click", function(d) {
        displayLine(this, color) 
      })

    legend.append("rect")
    .attr('width', 0.01*width)
    .attr('height', 0.025*height)
    .style('stroke', "black")
    .style('fill', function(d) {
      return d.name === "Moyenne" ? "#000000" : color(d.name)
    })
    legend.append('text')
    .attr('x', 20)
    .attr('y', 10)
    .text(function(d) { return d.name })
}

/**
 * Allows for show/hide whether the line that corresponding to the clicked square.
 *
 * By clicking on a square, we display/hide the corresponding line and the square's interior becomes white/goes back to its original color.
 *
 * @param element   The square that was clicked
 * @param color     The 10-color scale
 */
function displayLine(element, color) {
  // TODO: Complete the code to show or hide a line depending on the selected item
  var cell = element.childNodes[0]
  var text = element.childNodes[1].childNodes[0].data
  var whitenRect = "rgb(255, 255, 255)"
  var Focuslines = d3.select("#" + text).node().style 
  var Contextlines = d3.select("#" + text + "Context").node().style 
  if (cell.style.fill == whitenRect) {
    cell.style.fill = (text === "Moyenne" ? "#000000" : color(text))
    Focuslines.opacity = 1
    Contextlines.opacity = 1
  } else {
    cell.style.fill = whitenRect
    Focuslines.opacity = 0
    Contextlines.opacity = 0
  }
}
