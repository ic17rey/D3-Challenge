// ============
// Set up of the chart and svg 
// ============

// Set up the chart and margins
var svgWidth = 1200;
var svgHeight = 800;

var margin = {
  top: 40,
  right: 100,
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

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// ============
// ID initial parameters for chart and the functions for updates to happen on click of axis labels
// ============

// Initial Parameters
var chosenX = "poverty"
var chosenY = "healthcare"

// For updating x-scale var upon click on axis label
function xScale(censusData, chosenX) {
    
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenX]) * 0.9,
    d3.max(censusData, d => d[chosenX]) * 1.1])
    .range([0, width]);

  return xLinearScale;
}

// For updating y-scale var upon click on axis label
function yScale(censusData, chosenY) {
    
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenY] * 0.8), 
    d3.max(censusData, d => d[chosenY] + 1)])
    .range([height, 0]);

  return yLinearScale;
}

// For updating xAxis var upon click on x-axis label
function renderX(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  
  return xAxis;
}

// For updating yAxis var upon click on an y-axis label
function renderY(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
  
    return yAxis;
}

// For updating circles group and labels for a click event on x-axis label
function renderCircles(circlesGroup, newXScale, chosenX) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenX]));

  return circlesGroup;
  }

function renderCirclesLabels(circlesLabels, newXScale, chosenX) {
  circlesLabels.transition()
    .duration(1000)
    .attr('x', d => newXScale(d[chosenX]));

  return circlesLabels;
}

// For updating circles group and labels for a click event on y-axis label
function renderCirclesY(circlesGroup, newYScale, chosenY) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenY]));

  return circlesGroup;
}

function renderCirclesLabelsY(circlesLabels, newYScale, chosenY) {
  circlesLabels.transition()
    .duration(1000)
    .attr('y', d => newYScale(d[chosenY]) + 6);

  return circlesLabels;
}
  
// For updating circles group with new tooltip (for a selection on x-axis)
function updateToolTip(chosenX, circlesGroup) {

  var label;

  if (chosenX === "poverty") {
    label = "Poverty (%):";
  }
  else if (chosenX === "age") {
    label = "Age (Median):";
  }
  else {
    label = "Household Income:";
  }

  var labelY;

  if (chosenY === "healthcare") {
    labelY = "Lacks Healthcare (%):";
  }
  else if (chosenY === "smokes") {
    labelY = "Smokes (%):";
  }
  else {
    labelY = "Obesity (%):";
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    //.offset([80, -60])
    .html(function(d) {
  return (`${d.state}<br>${label} ${d[chosenX]}<br>${labelY} ${d[chosenY]}`);
  });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data, this);
  })
    
  .on("mouseout", function(data) {
    toolTip.hide(data, this);
  });
  return circlesGroup;
}

// For updating circles group with new tooltip for a selection on y-axis
function updateToolTipY(chosenY, circlesGroup) {

  var label;

  if (chosenX === "poverty") {
    label = "Poverty (%):";
  }
  else if (chosenX === "age") {
    label = "Age (Median):";
  }
  else {
    label = "Household Income:";
  }

  var labelY;

  if (chosenY === "healthcare") {
    labelY = "Lacks Healthcare (%):";
  }
  else if (chosenY === "smokes") {
    labelY = "Smokes (%):";
  }
  else {
    labelY = "Obesity (%):";
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    //.offset([80, -60])
    .html(function(d) {
  return (`${d.state}<br>${label} ${d[chosenX]}<br>${labelY} ${d[chosenY]}`);
  });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data, this);
  })
  
  .on("mouseout", function(data) {
    toolTip.hide(data, this);
  });
  return circlesGroup;
}


// ============
// Read in Data from CSV and use it to load all initial info to the scatter plot 
// ============

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
      //console.log(censusData);
});

// xLinearScale function above csv import
var xLinearScale = xScale(censusData, chosenX);

// Create y scale function
var yLinearScale = yScale(censusData, chosenY);

// Create initial axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append initial circles
var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d[chosenX]))
  .attr("cy", d => yLinearScale(d[chosenY]))
  .attr("r", 15)
  .classed("stateCircle", true);
    

// Create labels for circles on initial plot
var circlesLabels = chartGroup.selectAll("text")    
  .data(censusData)
  .enter()
  .append("text")
  .attr("x", d => xLinearScale(d[chosenX]))
  .attr("y", d => yLinearScale(d[chosenY]) + 6)
  .text(d => d.abbr)
  .classed("stateText", true)


// append x axis
var xAxis = chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

// append y axis
var yAxis = chartGroup.append("g")
  .call(leftAxis);

// Create group for three x-axis labels
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

// Create group for three y-axis labels
var labelsGroupY = chartGroup.append("g")
  .attr("transform", `translate(${-40}, ${height / 2})`);

var healthcareLabel = labelsGroupY.append("text")
  .attr("transform", "rotate(-90)")
  .attr("value", "healthcare")
  .classed("aText active", true)
  .text("Lacks Healthcare (%)");

var smokesLabel = labelsGroupY.append("text")
  .attr("transform", "rotate(-90)")
  .attr("dy", "-1.2em")
  .attr("value", "smokes")
  .classed("aText inactive", true)
  .text("Smokes (%)");

var obesityLabel = labelsGroupY.append("text")
  .attr("transform", "rotate(-90)")
  .attr("dy", "-2.4em")
  .attr("value", "obesity")
  .classed("aText inactive", true)
  .text("Obesity (%)");
 
var circlesGroup = updateToolTip(chosenX, circlesGroup);


// ============
// Event listeners, for changes x or y axis labels 
// (if factors other than initial poverty and healthcare are being examined)
// ============

// X-axis labels event listener
labelsGroup.selectAll("text")
  .on("click", function() {
  // get value of selection and if different than original code the updates
  var value = d3.select(this).attr("value");
  if (value !== chosenX) {

    chosenX = value;
    
    // Updates x scale for new data
    xLinearScale = xScale(censusData, chosenX);

    // Updates x axis with transition
    xAxis = renderX(xLinearScale, xAxis);

    // updates circles with new x values
    circlesLabels = renderCirclesLabels(circlesLabels, xLinearScale, chosenX);
    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenX);
    
    // Updates tooltips with new info
    circlesGroup = updateToolTip(chosenX, circlesGroup);

    // Change classes to change bold text
    if (chosenX === "poverty") {
      povertyLabel
      .classed("active", true)
      .classed("inactive", false);
      ageLabel
      .classed("active", false)
      .classed("inactive", true);
      incomeLabel
      .classed("active", false)
      .classed("inactive", true);
    }
    else if (chosenX === "age") {
      povertyLabel
      .classed("active", false)
      .classed("inactive", true);
      ageLabel
      .classed("active", true)
      .classed("inactive", false);
      incomeLabel
      .classed("active", false)
      .classed("inactive", true);
    }
    else {
      povertyLabel
      .classed("active", false)
      .classed("inactive", true);
      ageLabel
      .classed("active", false)
      .classed("inactive", true);
      incomeLabel
      .classed("active", true)
      .classed("inactive", false);
      }
    }
      
});

labelsGroupY.selectAll("text")
  .on("click", function() {
  // get value of selection and if different than original code the update
  var value = d3.select(this).attr("value");

  if (value !== chosenY) {
    
    chosenY = value;

    // Updates y scale for new data
    yLinearScale = yScale(censusData, chosenY);

    // Updates y axis with transition
    yAxis = renderY(yLinearScale, yAxis);
    //console.log(yAxis);

    // updates circles with new y values
    circlesLabels = renderCirclesLabelsY(circlesLabels, yLinearScale, chosenY);
    circlesGroup = renderCirclesY(circlesGroup, yLinearScale, chosenY);
    
    // updates tooltips with new info
    circlesGroup = updateToolTipY(chosenY, circlesGroup);

    // Change classes to change bold text
    if (chosenY === "healthcare") {
      healthcareLabel
      .classed("active", true)
      .classed("inactive", false);
      smokesLabel
      .classed("active", false)
      .classed("inactive", true);
      obesityLabel
      .classed("active", false)
      .classed("inactive", true);
    }
    else if (chosenY === "smokes") {
      healthcareLabel
      .classed("active", false)
      .classed("inactive", true);
      smokesLabel
      .classed("active", true)
      .classed("inactive", false);
      obesityLabel
      .classed("active", false)
      .classed("inactive", true);
    }
    else {
      healthcareLabel
      .classed("active", false)
      .classed("inactive", true);
      smokesLabel
      .classed("active", false)
      .classed("inactive", true);
      obesityLabel
      .classed("active", true)
      .classed("inactive", false);
    }
  }
});
  

}).catch(function(error) {
    console.log(error);
});

