// Use D3 to read in the csv data
d3.csv("./assets/data/data.csv").then(function(censusData) {
console.log(censusData);
});


d3.select('#scatter').style('border', '2px solid black');

var width = parseFloat(d3.select('#scatter').style('width'));
var height = .66*width;

var svg = d3.select('#scatter').append('svg')
    .style('width',width)
    .style('height',height);

var xText = svg.append('g')
    .attr('r',10)
    .attr('transform', `translate(${width/2},${height*.98})`)
    .attr("text.anchor", "middle");

xText
    .append('text')
    .text('Household Income (Median)')
    .attr('class', 'aText inactive x')
    .attr('data-name', 'income')
    .attr('data-axis', 'x')

xText
    .append('text')
    .attr('y',-20)
    .text('Age (Median)')
    .attr('class', 'aText inactive x')
    .attr('data-name', 'age')
    .attr('data-axis', 'x')

xText
    .append('text')
    .attr('y',-40)
    .text('In Poverty (%)')
    .attr('class', 'aText active x')
    .attr('data-name', 'poverty')
    .attr('data-axis', 'x')

var yText = svg.append('g')
    .attr('r',10)
    .attr('transform', `translate(${width*.02},${height/2})rotate(-90)`)
    .attr("text.anchor", "middle");

yText
    .append('text')
    .text('Obese (%)')
    .attr('class', 'aText inactive y')
    .attr('data-name', 'obesity')
    .attr('data-axis', 'y')

yText
    .append('text')
    .attr('y',20)
    .text('Smokers (%)')
    .attr('class', 'aText inactive y')
    .attr('data-name', 'smokes')
    .attr('data-axis', 'y')

yText
    .append('text')
    .attr('y',40)
    .text('Lacks Healthcare (%)')
    .attr('class', 'aText active y')
    .attr('data-name', 'healthcare')
    .attr('data-axis', 'y')

