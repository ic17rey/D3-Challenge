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

// Use D3 to read in the csv data
d3.csv("./assets/data/data.csv").then(function(censusData) {
    console.log(censusData);
 // Parse data, cast as numbers (For: Healthcare vs. Poverty)
    censusData.forEach(function(censusData) {
        censusData.healthcare = +censusData.healthcare;
        censusData.poverty = +censusData.poverty;
        console.log(censusData);
    });
    
    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(censusData, d => d.poverty) + 1])
      // .domain([0, d3.max(censusData, d => d.poverty)+2])
      .range([0, width]);
      
    var yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(censusData, d => d.healthcare) + 2])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    // Append circle to the chartGroup for the scatter circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        //.attr("class", "stateCircle");
        .classed("stateCircle", true);
    
    var circlesLabels = svg.selectAll("text")    
        .data(censusData)
        .enter()
        .append("text")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare) + 6)
        .text(d => d.abbr)
        .classed("stateText", true)
    
    
    // Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis)
      .attr("stroke", "gray");
    chartGroup.append("g")
      .call(leftAxis)
      .attr("stroke", "gray");

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("text.anchor", "middle")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        //.attr("dy", "1em")
        .attr("class", "active aText")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("text.anchor", "middle")
        .attr("class", "active aText")
        .text("In Poverty (%)");          

}).catch(function(error) {
    console.log(error);
});
   




//d3.select('#scatter').style('border', '2px solid black');

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

