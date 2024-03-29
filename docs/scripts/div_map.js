// Size ?
let width_b = 400
let height_b = 400

// The svg
let svg_b = d3.select("#div_map")
  .append("svg")
  .attr("width", width_b)
  .attr("height", height_b)

// Map and projection
let projection = d3.geoMercator()
  .center([4, 47]) // GPS of location to zoom on
  .scale(1020) // This is like the zoom
  .translate([width_b / 2, height_b / 2])

// Create data for circles:
let markers = [{
    long: 9.083,
    lat: 42.149,
    name: "Corsica"
  }, // corsica
  {
    long: 7.26,
    lat: 43.71,
    name: "Nice"
  }, // nice
  {
    long: 2.349,
    lat: 48.864,
    name: "Paris"
  }, // Paris
  {
    long: -1.397,
    lat: 43.664,
    name: "Hossegor"
  }, // Hossegor
  {
    long: 3.075,
    lat: 50.640,
    name: "Lille"
  }, // Lille
  {
    long: -3.83,
    lat: 58,
    name: "Morlaix"
  }, // Morlaix
];

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
  function(data) {
  // Filter data
  data.features = data.features.filter(function(d) {
    //return d.properties.name == "USA"
    return d.properties.name == "France"
  })

  // Draw the map
  svg_b.append("g")
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("fill", "#b8b8b8")
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    .style("stroke", "black")
    .style("opacity", .3)

  // create a tooltip
  let Tooltip_b = d3.select("#div_map")
    .append("div")
    .attr("class", "tooltip_b")
    .style("opacity", 1)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  let mouseover = function(d) {
    Tooltip_b.style("opacity", 1)
  }
  let mousemove = function(d) {
    Tooltip_b
      .html(d.name + "<br>" + "long: " + d.long + "<br>" + "lat: " + d.lat)
      .style("left", (d3.mouse(this)[0] + 10) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  let mouseleave = function(d) {
    Tooltip_b.style("opacity", 0)
  }

  // Add circles:
  svg_b
    .selectAll("myCircles")
    .data(markers)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return projection([d.long, d.lat])[0]
    })
    .attr("cy", function(d) {
      return projection([d.long, d.lat])[1]
    })
    .attr("r", 14)
    .attr("class", "circle")
    .style("fill", "69b3a2")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 3)
    .attr("fill-opacity", .4)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

}

)
