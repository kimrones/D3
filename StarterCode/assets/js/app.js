//Define area dimensions
var svgWidth = 960;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);;

var chartGroup = svg.append("g");
 

// Retrieve data from the CSV file and execute everything below
//d3.csv("assets/data/data.csv", function(error, censusData) {
d3.csv("data.csv").then(function(error, censusData) {
  if (error) throw error;
  //console.log(data);
  // parse data
  censusData.forEach(function(data) {
    data.obesity = +data.obesity;
    data.healthcare = +data.healthcare;
    data.abbr = +data.abbr;
  });


  // Create scale functions
  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);


  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  //Scale the domain.
	xLinearScale.domain([0, d3.max(data, function(data){
		return +data.obesity;
	})]);

	yLinearScale.domain([0, d3.max(data,function(data){
		return +data.healthcare;
  })]);
  
  
  // append initial circles
  //var circlesGroup = chartGroup.selectAll("circle")
  chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    //.attr("cx", d => xLinearScale(d.obesity))
    //.attr("cy", d => yLinearScale(d.healthcare))
    .attr("cx", function(data, index) {
      //console.log(data.poverty);
      return xLinearScale(data.obesity);
    })
    .attr("cy", function(data, index) {
      console.log(data.healthcare);
      return yLinearScale(data.healthcare);
    })
    .attr("r", 20)
    .attr("fill", "skyblue")
    .attr("opacity", ".5");

  // Create group for  2 x- axis labels
  //var labelsGroup = chartGroup.append("g")
  chartGroup.append("g")
    .attr("transform", `translate(${width}, ${height})`);

  //
  chartGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    //.attr("value", "obesity") // value to grab for event listener
    //.classed("active", true)
    .attr("class", "active")
    .text("Obesity (%)");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height))
    .attr("dy", "1em")
    //.classed("aText", true)
    .attr("class", "aText")
    .text("Lacks Healthcare (%)");

});

