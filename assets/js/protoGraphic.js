// Seed data to populate the donut pie chart
var interiorSeedData = [{
  "label": "Products",
  "value": 25,
  "link": "#infoProducts",
  "data": "Products. We identify the needs of..."
}, {
  "label": "Tribes",
  "value": 25,
  "link": "#infoTribes",
  "data": "Tribes. We identify the needs of..."
}, {
  "label": "Brands",
  "value": 25,
  "link": "#infoBrands",
  "data": "Brands. We identify the needs of..."
}];

var exteriorSeedData = [{
  "label": "To think",
  "value": 25,
  "link": "#infoThink",
  "data": "Think. We identify the needs of..."
}, {
  "label": "To do",
  "value": 25,
  "link": "#infoDo",
  "data": "Do. We identify the needs of..."
}, {
  "label": "To tell",
  "value": 25,
  "link": "#infoTell",
  "data": "Tell. We identify the needs of..."
}];

// Define size & radius of donut pie chart
var width = 450,
    height = 450,
    radius = Math.min(width, height) / 3,
    radius2 = Math.min(width, height) / 2;

// Define arc ranges
var arcText = d3.scaleOrdinal()
  .range([0, width]);

// Determine size of arcs
//Interior
var arc = d3.arc()
  .innerRadius(radius - 90)
  .outerRadius(radius);

//Exterior
var arc2 = d3.arc()
  .innerRadius(radius2 - 75)
  .outerRadius(radius2 );

// Create the donut pie chart layout
var pie = d3.pie()
  .value(function (d) { return d["value"]; })
  .sort(null);

// Append SVG attributes and append g to the SVG
var svg = d3.select("#proto-chart")
  .attr("width", '100%')
  .attr("class","outerPie")
  .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
  .attr('preserveAspectRatio','xMinYMin')
  .append("g")
  .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

var svg2 = d3.select(".outerPie")
  .append("svg")
  .attr("width", '100%')
  .attr("class","innerPie")
  .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
  .attr('preserveAspectRatio','xMinYMin')
  .append("g")
  .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

// Define inner circle
svg.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 100)
  .attr("class", "inner-circle")
  .attr("fill", "#fff") ;

// Define info circle
svg2.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", radius)
  .attr("class", "info__block")
  .attr("fill", "#fff") ;

// Calculate SVG paths
var g = svg.selectAll(".arc")
  .data(pie(interiorSeedData))
  .enter().append("g")
  .attr("class", "arc")

  // Make each arc clickable
  .on("click", function(d, i) {
    $('#info-text').text($(this).data('info'));
    $('.info__block').show();
  });

var g2 = svg2.selectAll(".arc")
  .data(pie(exteriorSeedData))
  .enter().append("g")
  .attr("class", "arc")

  // Make each arc clickable
  // When click get the data info into the Info Block and Show it
  .on("click", function(d, i) {
    $('#info-text').text($(this).data('info'));
    $('.info__block').show();
  });

	// Append the path to each g
	g.append("path")
  	.attr("d", arc)

  g2.append("path")
      .attr("d", arc2)

	// Append text labels to each arc
	g.append("text")
  	.attr("transform", function(d) {
    	return "translate(" + arc.centroid(d) + ")";
  	})
  	.attr("dy", ".35em")
    .attr("fill","#FFF")
  	.style("text-anchor", "middle")
		.text(function(d,i) { return interiorSeedData[i].label; })

  g2.append("text")
    	.attr("transform", function(d) {
      	return "translate(" + arc2.centroid(d) + ")";
    	})
    	.attr("dy", ".35em")
      .attr("fill","#FFF")
    	.style("text-anchor", "middle")
  		.text(function(d,i) { return exteriorSeedData[i].label; })

g.selectAll(".arc text").call(wrap, arcText.range([0, width]));
g2.selectAll(".arc text").call(wrap, arcText.range([0, width]));

// Append text to the inner circle
svg.append("text")
  .style("text-anchor", "middle")
  .attr("class", "inner-circle")
  .attr("fill", "#000")
  .text("Proto");

svg.selectAll(".arc")
  .attr("data-info",function(d,i) { return interiorSeedData[i].data; })

svg2.selectAll(".arc")
  .attr("data-info",function(d,i) { return exteriorSeedData[i].data; })

svg2.append("text")
  .style("text-anchor", "middle")
  .attr("id", "info-text")
  .attr("class", "info__block")
  .attr("fill", "#000")
  .text("Text Info about this option");

svg2.append("text")
  .style("text-anchor", "middle")
  .attr("dy", 40)
  .attr("id", "close__info__block")
  .attr("class", "info__block")
  .attr("fill", "#000")
  .text("Close")
  .on("click", function(d, i) {
    $('.info__block').hide();
    $(this).hide();
  });

// Wrap function to handle labels with longer text
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    console.log("tspan: " + tspan);
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > 90) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
