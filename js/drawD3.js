var line;
var lineColor="slateblue";
var lineWidth="1";

function blankCanvas() {
  var canvas = d3.select("body").append("svg")
    .on("mousedown", mousedown)
    .on("mouseup", mouseup);

  function mousedown() {
    var mouse = d3.mouse(this);
    line = canvas.append("line")
      .attr("x1", mouse[0])
      .attr("y1", mouse[1])
      .attr("x2", mouse[0])
      .attr("y2", mouse[1])
      .attr("style", "stroke-width: "+ lineWidth + "px; stroke: "+ lineColor +";");
    canvas.on("mousemove", mousemove);
  };

  function mousemove() {
    var mouse = d3.mouse(this);
    var stopX = (parseInt(line.attr("x1")) + parseInt(mouse[0]))/2;
    var stopY = (parseInt(line.attr("y1")) + parseInt(mouse[1]))/2;

    line.attr("x2", stopX)
        .attr("y2", stopY)
        .attr("style", "stroke-width: "+ lineWidth +"px; stroke: "+ lineColor +";");

    var circle = canvas.append("circle")
                      .attr("cx", stopX)
                      .attr("cy", stopY)
                      .attr("r", lineWidth/2)
                      .style("fill", lineColor);

    line = canvas.append("line")
                .attr("x1", stopX)
                .attr("y1", stopY)
                .attr("x2", stopX)
                .attr("y2", stopY)
                .attr("style", "stroke-width: "+ lineWidth +"px; stroke: "+ lineColor +";");
  };

  function mouseup() {
    var mouse = d3.mouse(this);
    line.attr("x2", mouse[0])
        .attr("y2", mouse[1]);
    canvas.on("mousemove", null)
  };


  //Paintbrush Options
  function changeColor(square){
    lineColor = square.getAttribute("thisColor")
    console.log(lineColor)
  };

  function changeWidth(square){
    lineWidth = square.getAttribute("thisRad")
    console.log(lineWidth)
  }

  function displayColorPalette(x, y, radius, sqColor) {
    var square = canvas.append("rect")
                       .attr("x", x)
                       .attr("y", y)
                       .attr("width", radius)
                       .attr("height", radius)
                       .attr("thisColor", sqColor)
                       .style("fill", sqColor);
    square.on("mousedown", function() { changeColor(this) })
  };

  function displayBrushSizes(x, y, radius){
    sqColor = "lightgray"
    var square = canvas.append("circle")
                       .attr("cx", x)
                       .attr("cy", y)
                       .attr("r", radius)
                       .attr("thisRad", radius*2)
                       .style("fill", sqColor);
    square.on("mousedown", function() { changeWidth(this) });
  };

  var scaleAll = 1;
  var y = 75 * scaleAll;
  var x = 5 * scaleAll;
  displayBrushSizes(scaleAll*3+x, y+7*scaleAll, 3*scaleAll);
  displayBrushSizes(scaleAll*18+x, y+7*scaleAll, 10*scaleAll);
  displayBrushSizes(scaleAll*50+x, y+7*scaleAll, 20*scaleAll);



  var radius = 23*scaleAll;
  var y = 25 * scaleAll;
  var x = 5 * scaleAll;
  displayColorPalette(scaleAll*0+x, y, radius, 'yellow');
  displayColorPalette(scaleAll*25+x, y, radius, 'lime');
  displayColorPalette(scaleAll*50+x, y, radius, 'darkgreen');
  displayColorPalette(scaleAll*75+x, y, radius, 'teal');
  displayColorPalette(scaleAll*100+x, y, radius, 'blue');
  displayColorPalette(scaleAll*125+x, y, radius, 'navy');
  displayColorPalette(scaleAll*150+x, y, radius, 'purple');
  displayColorPalette(scaleAll*175+x, y, radius, 'fuchsia');
  displayColorPalette(scaleAll*200+x, y, radius, 'tomato');
  displayColorPalette(scaleAll*225+x, y, radius, 'darkred');
  displayColorPalette(scaleAll*250+x, y, radius, 'maroon');
  displayColorPalette(scaleAll*275+x, y, radius, 'black');
  displayColorPalette(scaleAll*300+x, y, radius, 'lightgrey');




}
