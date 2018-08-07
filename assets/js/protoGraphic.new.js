// Seed data to populate the donut pie chart
var interiorSeedData = [{
  "label": "To think",
  "value": 25,
  "data": "think"
}, {
  "label": "To do",
  "value": 25,
  "data": "do"
}, {
  "label": "To tell",
  "value": 25,
  "data": "tell"
}];

var exteriorSeedData = [{
  "label": "Products",
  "value": 25,
  "link": "#infoProducts",
  "datatell": "Tell Products. We identify the needs <br/> second line alasd aslf afklsd ajfs",
  "datathink": "Think Products. We identify the...",
  "datado": "Do Products. We identify the..."
}, {
  "label": "Tribes",
  "value": 25,
  "link": "#infoTribes",
  "datatell": "Tell Tribes. We identify the...",
  "datathink": "Think Tribes. We identify the...",
  "datado": "Do Tribes. We identify the..."
}, {
  "label": "Brands",
  "value": 25,
  "link": "#infoBrands",
  "datatell": "Tell Brands. We identify the...",
  "datathink": "Think Brands. We identify the...",
  "datado": "Do Brands. We identify the..."
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
//Interior data
var g = svg.selectAll(".arc")
  .data(pie(interiorSeedData)) //Get interior data array
  .enter().append("g")
  .attr("class", "arc inner-arc")

  // Make each arc clickable
  .on("click", function(d, i) {

    //Is this arc active?
    if ($(this).is('.arc-active')) {

      //Remove this active arc
      $(this).removeClass('arc-active');
      //Deactivating exterior arcs
      $(".exterior-arc").addClass('inactive-arc');
      //Activating inner arcs
      $(".inner-arc").removeClass('inactive-arc')

    } else {

      //Remove all arcs actives
      $(".inner-arc")
        .removeClass('inactive-arc')
        .removeClass('arc-active')
        .not($(this))
        .addClass('inactive-arc');

      //Active this arc
      $(this).addClass('arc-active');
      //Activating exterior arcs, inactives by default
      $(".exterior-arc.inactive-arc").removeClass('inactive-arc');

    }

  })
  .on("mouseenter", function() {
    const textElem = "." + $(this).attr('class').split(' ')[1];

    $(this)
      .find('text')
      .clearQueue()
      .animate({opacity: 1}, "fast");

    $(textElem)
      .not($(this))
      .find('text')
      .clearQueue()
      .stop(true, true)
      .animate({opacity:0.3}, 'fast')
  })
  .on("mouseleave", function(i) {
    const textElem = "." + $(this).attr('class').split(' ')[1];

    $(textElem)
      .find('text')
      .clearQueue()
      .stop(true, true)
      .delay(200)
      .animate({opacity:1}, 'fast')
  });

//Exterior Data
var g2 = svg2.selectAll(".arc")
  .data(pie(exteriorSeedData))
  .enter().append("g")
  .attr("class", "arc exterior-arc inactive-arc")

  // Make each arc clickable
  // When click get the data info into the info block and show it
  .on("click", function(d, i) {

    //Are exterior arcs actives?
    if (!$('.exterior-arc').is('.inactive-arc')) {

      //If this arc is active >> Deactivate and hide info
      if ($(this).is('.arc-active')) {

        //Deactivate exterior arcs and hide center info
        $(".exterior-arc").removeClass('arc-active');
        $('.info__block').hide();

      //If not active >> Activate this and show this info
      } else {

        //Get selection from inner arc data and get the data
        //from this exterior arc and put it on the info line
        //It splits on line breaks
        const innerOption = $(".inner-arc.arc-active").data('select');
        const lines = $(this).data(innerOption).split('<br/>');
        $('#info-text-line1').text(lines[0]);
        if (lines.length > 1) {
          $('#info-text-line2').text(lines[1]);
        } else {
          //If there aren't breaks, line2 is empty
          $('#info-text-line2').text(" ");
        }

        //Show info block and remove all arcs actives and active this arc
        $('.info__block').show();
        $(".exterior-arc").removeClass('arc-active');
        $(this).addClass('arc-active');

      }
    }

  })
  .on("mouseenter", function() {

    //If this arc is not inactive
    if (!$(this).is('.inactive-arc')) {
      const textElem = "." + $(this).attr('class').split(' ')[1];
      $(this).find('text').clearQueue().animate({opacity: 1}, "fast");
      $(textElem)
        .not($(this))
        .find('text')
        .clearQueue()
        .stop(true, true)
        .animate({opacity:0.3}, 'fast')
    }

  })
  .on("mouseleave", function(i) {
    const textElem = "." + $(this).attr('class').split(' ')[1];
    $(textElem)
      .find('text')
      .clearQueue()
      .stop(true, true)
      .delay(200)
      .animate({opacity:1}, 'fast')
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
  .attr("data-select",function(d,i) { return interiorSeedData[i].data; })

svg2.selectAll(".arc")
  .attr("data-tell",function(d,i) { return exteriorSeedData[i].datatell; })
  .attr("data-think",function(d,i) { return exteriorSeedData[i].datathink; })
  .attr("data-do",function(d,i) { return exteriorSeedData[i].datado; })

svg2.append("text")
  .style("text-anchor", "middle")
  .attr("id", "info-text-line1")
  .attr("class", "info__block")
  .attr("fill", "#FFF")
  .attr("transform","rotate(60)")
  .text("Text Info about this option");

svg2.append("text")
  .style("text-anchor", "middle")
  .attr("dy", 20)
  .attr("id", "info-text-line2")
  .attr("class", "info__block")
  .attr("fill", "#FFF")
  .attr("transform","rotate(60)")
  .text("Text Info about this option");

svg2.append("text")
  .style("text-anchor", "middle")
  .attr("dy", 40)
  .attr("id", "close__info__block")
  .attr("class", "info__block")
  .attr("fill", "#555")
  .attr("transform","rotate(60)")
  .text("Close")
  .on("click", function(d, i) {
    //Hide info block
    $('.info__block').hide();
    //Hide close button
    $(this).hide();
    //Remove all arcs actives
    $(".exterior-arc").removeClass('arc-active');
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
