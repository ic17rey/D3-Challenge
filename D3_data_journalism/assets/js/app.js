// Set up the chart
var svgWidth = 1100;
var svgHeight = 850;

var margin = {
    top: 40,
    right: 40,
    bottom: 100,
    left: 100    
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create the SVG wrapper, append an SVG group to hold data, and shift the display area
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    //.style("border", "2px solid black")

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Parameters
var chosenX = "poverty"

// function used for updating x-scale var upon click on axis label
function xScale(censusData, chosenX) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(censusData, d => d[chosenX]) * 0.8,
        d3.max(censusData, d => d[chosenX]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderX(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
}

// function used for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenX) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenX]));
  
    return circlesGroup;
  }
  
  // function used for updating circles group with new tooltip
  function updateToolTip(chosenX, circlesGroup) {
  
    var label;
  
    if (chosenX === "poverty") {
      label = "Poverty (%):";
    }
    else if (chosenX === "age") {
      label = "Age (Median):";
    }
    else {
      label = "Household Income";
    }

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>${label} ${d[chosenX]}`);
      });

      circlesGroup.call(toolTip);

      circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });
      return circlesGroup;
    }


// Use D3 to read in the csv data
d3.csv("./assets/data/data.csv").then(function(censusData, err) {
  if (err) throw err;

  // parse the data
  censusData.forEach(function(censusData) {
    censusData.healthcare = +censusData.healthcare;
    censusData.poverty = +censusData.poverty;
    censusData.age = +censusData.age;
    censusData.income = +censusData.income;
    censusData.obesity = +censusData.obesity;
    censusData.smokes = +censusData.smokes;
    console.log(censusData);
});

 // xLinearScale function above csv import
 var xLinearScale = xScale(censusData, chosenX);

 // Create y scale function
 var yLinearScale = d3.scaleLinear()
   .domain([0, d3.max(censusData, d => d.healthcare)])
   .range([height, 0]);

 // Create initial axis functions
 var bottomAxis = d3.axisBottom(xLinearScale);
 var leftAxis = d3.axisLeft(yLinearScale);

// append x axis
var xAxis = chartGroup.append("g")
.classed("x-axis", true)
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

// append y axis
chartGroup.append("g")
.call(leftAxis);

// append initial circles
var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d[chosenX]))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", 15)
  .classed("stateCircle", true);
  

  // Create group for two x-axis labels
var labelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${width / 2}, ${height + 20})`);

var povertyLabel = labelsGroup.append("text")
  .attr("x", 0)
  .attr("y", 20)
  .attr("value", "poverty") // value to grab for event listener
  .classed("active aText", true)
  .text("In Poverty (%)");

 var ageLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive aText", true)
    .text("Age (Median)");

var incomeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive aText", true)
    .text("Household Income (Median)");
 
  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Number of Billboard 500 Hits");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);


  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Number of Billboard 500 Hits");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);




}).catch(function(error) {
    console.log(error);
  });

// Use D3 to read in the csv data
// d3.csv("./assets/data/data.csv").then(function(censusData) {
// console.log(censusData);
// });


// d3.select('#scatter').style('border', '2px solid black');

// var width = parseFloat(d3.select('#scatter').style('width'));
// var height = .66*width;

// var svg = d3.select('#scatter').append('svg')
//     .style('width',width)
//     .style('height',height);

// var xText = svg.append('g')
//     .attr('r',10)
//     .attr('transform', `translate(${width/2},${height*.98})`)
//     .attr("text.anchor", "middle");

// xText
//     .append('text')
//     .text('Household Income (Median)')
//     .attr('class', 'aText inactive x')
//     .attr('data-name', 'income')
//     .attr('data-axis', 'x')

// xText
//     .append('text')
//     .attr('y',-20)
//     .text('Age (Median)')
//     .attr('class', 'aText inactive x')
//     .attr('data-name', 'age')
//     .attr('data-axis', 'x')

// xText
//     .append('text')
//     .attr('y',-40)
//     .text('In Poverty (%)')
//     .attr('class', 'aText active x')
//     .attr('data-name', 'poverty')
//     .attr('data-axis', 'x')

// var yText = svg.append('g')
//     .attr('r',10)
//     .attr('transform', `translate(${width*.02},${height/2})rotate(-90)`)
//     .attr("text.anchor", "middle");

// yText
//     .append('text')
//     .text('Obese (%)')
//     .attr('class', 'aText inactive y')
//     .attr('data-name', 'obesity')
//     .attr('data-axis', 'y')

// yText
//     .append('text')
//     .attr('y',20)
//     .text('Smokers (%)')
//     .attr('class', 'aText inactive y')
//     .attr('data-name', 'smokes')
//     .attr('data-axis', 'y')

// yText
//     .append('text')
//     .attr('y',40)
//     .text('Lacks Healthcare (%)')
//     .attr('class', 'aText active y')
//     .attr('data-name', 'healthcare')
//     .attr('data-axis', 'y')

