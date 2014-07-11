var line;
var line_color='lightgray';
var line_width='1';


function drawing_paper() {

    var paper = d3.select("body").append("svg")
        .on("mousedown", mousedown)
        .on("mouseup", mouseup);

    function mousedown() {

        var mouse = d3.mouse(this);
        line = paper.append("line")
            .attr("x1", mouse[0])
            .attr("y1", mouse[1])
            .attr("x2", mouse[0])
            .attr("y2", mouse[1])
            .attr("style", 'stroke-width: '+ line_width + 'px; stroke: '+line_color+';');

        paper.on("mousemove", mousemove);
    }

    function mousemove() {

        var mouse = d3.mouse(this);

        var stop_x = (parseInt(line.attr("x1")) + parseInt(mouse[0]))/2;
        var stop_y = (parseInt(line.attr("y1")) + parseInt(mouse[1]))/2;



        line.attr("x2", stop_x)
            .attr("y2", stop_y)
            .attr("style", 'stroke-width: '+ line_width + 'px; stroke: '+line_color+';');


    var circle = paper.append("circle")
                        .attr("cx", stop_x)
                        .attr("cy", stop_y)
                        .attr("r", line_width/2)
                        .style("fill", line_color);


        line = paper.append("line")
            .attr("x1", stop_x)
            .attr("y1", stop_y)
            .attr("x2", stop_x)
            .attr("y2", stop_y)
            .attr("style", 'stroke-width: '+ line_width + 'px; stroke: '+line_color+';');

    };

    function mouseup() {

        var mouse = d3.mouse(this);

        line.attr("x2", mouse[0])
            .attr("y2", mouse[1]);

        paper.on("mousemove", null);

    };







//  Drawing tools


    function change_color(ball){
        line_color = ball.getAttribute('color_me')
        console.log(line_color)
    }


    function change_width(ball){
        line_width = ball.getAttribute('rad_me')
        console.log(line_width)
    }



    function gen_color_circle(x, y, rad, cir_col){

        var circle = paper.append("circle")
                            .attr("cx", x)
                            .attr("cy", y)
                            .attr("r", rad)
                            .attr("color_me", cir_col)
                            .style("fill", cir_col);

        circle.on('mousedown', function(){change_color(this)})
    }




        function gen_width_circle(x, y, rad){

        cir_col = 'lightgray'

        var circle = paper.append("circle")
                            .attr("cx", x)
                            .attr("cy", y)
                            .attr("r", rad)
                            .attr("rad_me", rad/4)
                            .style("fill", cir_col);

        circle.on('mousedown', function(){change_width(this)})
    }


    var scale_all = 2

    var y = 42 * scale_all;
    var x = 5 * scale_all;
    gen_width_circle(scale_all*12+x, y+7*scale_all, 3*scale_all)
    gen_width_circle(scale_all*32+x, y+5*scale_all, 5*scale_all)
    gen_width_circle(scale_all*52+x, y+3*scale_all, 7*scale_all)
    gen_width_circle(scale_all*72+x, y+1*scale_all, 9*scale_all)


    var rad = 13 * scale_all;
    var y = 25 * scale_all;
    var x = 5 * scale_all;
    gen_color_circle(scale_all*12+x, y, rad, 'darkred')
    gen_color_circle(scale_all*32+x, y, rad, 'darkgreen')
    gen_color_circle(scale_all*52+x, y, rad, 'darkblue')
    gen_color_circle(scale_all*72+x, y, rad, 'black')

    var rad = 13 * scale_all;
    var y = 24.5 * scale_all;
    var x = 4.5 * scale_all;
    gen_color_circle(scale_all*12+x, y, rad, 'red')
    gen_color_circle(scale_all*32+x, y, rad, 'green')
    gen_color_circle(scale_all*52+x, y, rad, 'blue')
    gen_color_circle(scale_all*72+x, y, rad, 'black')

    var rad = 5 * scale_all;
    var y = 31 * scale_all;
    var x = 5 * scale_all;
    gen_color_circle(scale_all*12+x, y, rad, 'pink')
    gen_color_circle(scale_all*32+x, y, rad, 'lightgreen')
    gen_color_circle(scale_all*52+x, y, rad, 'lightblue')

    gen_color_circle(scale_all*72+x, y, rad+1*scale_all, 'gray')
    gen_color_circle(scale_all*72+x, y, rad-2*scale_all, 'lightgray')
    gen_color_circle(scale_all*72+x, y-11*scale_all, rad-2*scale_all, 'white')
