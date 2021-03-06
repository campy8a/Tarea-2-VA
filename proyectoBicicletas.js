

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
 
var myData = ['Usaquen','Chapinero','Santa Fe','San Cristobal','Usme','Tunjuelito','Bosa','Kennedy','Fontibon','Engativa','Suba','Barrios Unidos','Teusaquillo','Los Martires','Antonio Nariño','Puente Aranda','Candelaria','Rafael Uribe Uribe','Ciudad Bolivar','No Location'];


var x = d3.scaleOrdinal().domain(myData).range(['black','#ccc','#ccc']);

var y = d3.scaleLinear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/Data/Data.csv", function(d){
	return
	{
		Localidad: d.Localidad;
		Total_UPZ: +d.Total_UPZ;
	};

}, function(data)
{
	console.log(data[0]);
});
	
  x.domain(data.map(function(d) { return d.Localidad; }));
  y.domain([0, d3.max(data, function(d) { return d.Total_UPZ; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.Localidad); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Total_UPZ); })
      .attr("height", function(d) { return height - y(d.Total_UPZ); });


