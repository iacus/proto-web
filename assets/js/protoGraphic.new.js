// Seed data to populate the donut pie chart
var interiorSeedData = [{
  "label": "Products",
  "value": 25,
  "link": "#infoProducts",
  "tell": "Tell Products. We identify the..."
  "think": "Think Products. We identify the..."
  "do": "Do Products. We identify the..."
}, {
  "label": "Tribes",
  "value": 25,
  "link": "#infoTribes",
  "tell": "Tell Tribes. We identify the..."
  "think": "Think Tribes. We identify the..."
  "do": "Do Tribes. We identify the..."
}, {
  "label": "Brands",
  "value": 25,
  "link": "#infoBrands",
  "tell": "Tell Brands. We identify the..."
  "think": "Think Brands. We identify the..."
  "do": "Do Brands. We identify the..."
}];

var exteriorSeedData = [{
  "label": "To think",
  "value": 25,
  "link": "#infoThink",
}, {
  "label": "To do",
  "value": 25,
  "link": "#infoDo",
}, {
  "label": "To tell",
  "value": 25,
  "link": "#infoTell",
}];

// Define size & radius of donut pie chart
var width = 400,
    height = 400,
    radius = Math.min(width, height) / 3,
    radius2 = Math.min(width, height) / 2;

// Define arc ranges
var arcText = d3.scaleOrdinal()
  .range([0, width]);

// Determine size of arcs
//Interior
var arc = d3.arc()
  .innerRadius(radius - 60)
  .outerRadius(radius + 22);

//Exterior
var arc2 = d3.arc()
  .innerRadius(radius2 - 45)
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
  .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")rotate(-60)");

// Define inner circle
svg.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", radius - 60)
  .attr("class", "inner-circle")
  .attr("fill", "#000") ;

// Define info circle
svg2.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", radius + 22)
  .attr("class", "info__block")
  .attr("fill", "#000") ;

//Exterior stroke circle
svg.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", radius2)
  .attr("class", "exterior__circle")
  .attr("fill", "transparent") ;

// Calculate SVG paths
var g = svg.selectAll(".arc")
  .data(pie(interiorSeedData))
  .enter().append("g")
  .attr("class", "arc")

  // Make each arc clickable
  .on("click", function(d, i) {
    const textElem = "." + $(this).attr('class');
    $('#info-text').text($(this).data('info'));
    $('.info__block').show();
    $(this).find('text').addClass('focus');
    //$(textElem).find('text').not($(this)).removeClass('focus')
  })
  .on("mouseenter", function() {
    const textElem = "." + $(this).attr('class');
    console.log(textElem);
    $(this).find('text').clearQueue().animate({opacity: 1}, "fast");
    $(textElem).not($(this)).find('text').clearQueue().stop(true, true).animate({opacity:0.3}, 'fast')


  })
  .on("mouseleave", function(i) {
    const textElem = "." + $(this).attr('class');
    $(textElem).find('text').clearQueue().stop(true, true).delay(200).animate({opacity:1}, 'fast')
  });

var g2 = svg2.selectAll(".arc")
  .data(pie(exteriorSeedData))
  .enter().append("g")
  .attr("class", "arc")

  // Make each arc clickable
  // When click get the data info into the Info Block and Show it
  .on("click", function(d, i) {
    $('#info-text').text($(this).data('info'));
    const textElem = "." + $(this).attr('class');
    $('.info__block').show();
    $(this).find('text').addClass('focus');
    $(textElem).find('text').not($(this).find('text')).addClass('not-focus').removeClass('focus')
  })
  .on("mouseenter", function() {
    const textElem = "." + $(this).attr('class');
    console.log(textElem);
    $(this).find('text').clearQueue().animate({opacity: 1}, "fast");
    $(textElem).not($(this)).find('text').clearQueue().stop(true, true).animate({opacity:0.3}, 'fast')
  })
  .on("mouseleave", function(i) {
    const textElem = "." + $(this).attr('class');
    const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

    //Developing
    if ($(elemFirstClass).is('.focus')) {
      //$(textElem).find('text').clearQueue().stop(true, true).delay(100).animate({opacity:1}, 'fast')
    } else {
      //$(elemFirstClass).clearQueue().stop(true, true).delay(100).animate({opacity: 1}, "fast")
    }
  });

	// Append the path to each g
	g.append("path")
  	.attr("d", arc)

  g2.append("path")
      .attr("d", arc2)

	// Append text labels to each arc
	g.append("text")
  	.attr("transform", function(d,i) {
      if (i == 0) {
        return "translate(" + arc.centroid(d) + ")rotate(60)";
      } else if (i== 1) {
        return "translate(" + arc.centroid(d) + ")rotate(1)";
      } else if (i== 2) {
        return "translate(" + arc.centroid(d) + ")rotate(-60)";
      } else {
        return "translate(" + arc.centroid(d) + ")";
      }

  	})
  	.attr("dy", ".35em")
    .attr("fill","#FFF")
  	.style("text-anchor", "middle")
		.text(function(d,i) { return interiorSeedData[i].label; })

  g2.append("text")
    	.attr("transform", function(d,i) {
        if (i == 0) {
          return "translate(" + arc2.centroid(d) + ")rotate(60)";
        } else if (i== 1) {
          return "translate(" + arc2.centroid(d) + ")rotate(1)";
        } else if (i== 2) {
          return "translate(" + arc2.centroid(d) + ")rotate(120)";
        } else {
          return "translate(" + arc2.centroid(d) + ")";
        }
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
  .attr("fill", "#FFF")
  .text("Pro_to");

svg.selectAll(".arc")
  .attr("data-info",function(d,i) { return interiorSeedData[i].data; })

svg2.selectAll(".arc")
  .attr("data-info",function(d,i) { return exteriorSeedData[i].data; })

svg2.append("text")
  .style("text-anchor", "middle")
  .attr("id", "info-text")
  .attr("class", "info__block")
  .attr("fill", "#FFF")
  .attr("transform","rotate(60)")
  .text("Text Info about this option");

svg2.append("text")
  .style("text-anchor", "middle")
  .attr("dy", 40)
  .attr("id", "close__info__block")
  .attr("class", "info__block")
  .attr("fill", "#FFF")
  .attr("transform","rotate(60)")
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
