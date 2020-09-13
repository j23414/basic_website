
// set the dimensions and margins of the graph
var margin_a = {top: 80, right: 25, bottom: 30, left: 40},
  width_a = 450 - margin_a.left - margin_a.right,
  height_a = 450 - margin_a.top - margin_a.bottom;

// append the svg object to the body of the page
var svg_a = d3.select("#div_heatmap")
.append("svg")
  .attr("width", width_a + margin_a.left + margin_a.right)
  .attr("height", height_a + margin_a.top + margin_a.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin_a.left + "," + margin_a.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {

  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3.map(data, function(d){return d.group;}).keys()
  var myVars = d3.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([ 0, width_a ])
    .domain(myGroups)
    .padding(0.05);
  svg_a.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height_a + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ height_a, 0 ])
    .domain(myVars)
    .padding(0.05);
  svg_a.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1,100])

  // create a tooltip
  var tooltip_a = d3.select("#div_heatmap")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip_a")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip_a
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
      .style("top", (d3.event.pageY + 16) + "px")
      .style("left", (d3.event.pageX + 16) + "px");
  }
  var mousemove = function(d) {
    tooltip_a
      .html("The exact value of<br>this cell is: " + d.value)
      //.style("left", (d3.mouse(this)[0]+70) + "px")
      //.style("top", (d3.mouse(this)[1]) + "px")
      .style("top", (d3.event.pageY + 16) + "px")
      .style("left", (d3.event.pageX + 16) + "px");
  }
  var mouseleave = function(d) {
    tooltip_a
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svg_a.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

// Add title to graph
svg_a.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("A d3.js heatmap");

// Add subtitle to graph
//svg_a.append("text")
//        .attr("x", 0)
//        .attr("y", -20)
//        .attr("text-anchor", "left")
//        .style("font-size", "14px")
//        .style("fill", "grey")
//        .style("max-width", 400)
//        .text("A short description of the take-away message of this chart.");
