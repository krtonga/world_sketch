console.log("It (map_topoJSON) exists!")

// var fancyMap = function(){
//   var m_width = $("#map").width(),
//       width = 938,
//       height = 500,
//       country,
//       state;

//     var projection = d3.geo.mercator()
//                        .scale(150)
//                        .translate([width / 2, height / 1.5]);

//     var path = d3.geo.path()
//                  .projection(projection);

//     var svgMap = d3.select("#map").append("svg")
//                 .attr("preserveAspectRatio", "xMidYMid")
//                 .attr("viewBox", "0 0 " + width + " " + height)
//                 .attr("width", m_width)
//                 .attr("height", m_width * height / width);

//     svgMap.append("rect")
//        .attr("class", "background")
//        .attr("width", width)
//        // .attr("click", country_clicked);

//     var g = svgMap.append("g");

//     d3.json("json/countries.topo.json", function(error, us) {
//       g.append("g")
//        .attr("id", "countries")
//        .selectAll("path")
//        .attr("id", function(d) { return d.id; })
//        .attr("d", path)
//        // .on("click", country_clicked)
//     });

//     function zoom(xyz) {
//       g.transition()
//        .duration(750)
//        .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[1] +")")
//        .selectAll(["#countries", "#states", "#cities"])
//        .style("stroke-width", 1.0 / xyz[2] + "px")
//        .selectAll(".city")
//        .attr("d", path.pointRadius(20.0 / xyz[2]));
//     };

//     function get_xyz(d) {
//       var bounds = path.bounds(d);
//       var w_scale = (bounds[1][0] - bounds[0][0]) / width;
//       var h_scale = (bounds[1][1] - bounds[0][1]) / height;
//       var z = .96 / Math.max(w_scale, h_scale);
//       var X = (bounds[1][0] + bounds [0][0]) / 2;
//       var y = (bounds[1][1] + bounds [0][1]) / 2 + (height / z / 6);
//       return [z, y, z]
//     };

//     function country_clicked(d) {
//       g.selectAll(["#states", "#cities"]).remove();
//       state = null;

//       if (country) {
//         g.selectAll("#" + country.id).style('display', null);
//       }
//       if (d && country !== d) {
//         var xyz = get_xyz(d);
//         country = d;

//         if (d.id == 'USA') {
//           d3.json("/json/states_" + d.id.toLowerCase() + ".topo.json", function(error, us) {
//             g.append("g")
//              .attr("id", "states")
//              .selectAll("path")
//              .data(topojson.feature(us, us.objects.states).features)
//              .enter()
//              .append("path")
//              .attr("id", function(d) { return d.id; })
//              .attr("d", path)
//              .on("click", state_clicked);
//             zoom(xyz);
//             g.selectAll("#" + d.id).style('display', 'none');
//           });
//         } else {
//           zoom(xyz);
//         }
//       } else {
//         var xyz = [width / 2, height /1.5, 1];
//         country = null;
//         zoom(xyz);
//       }
//     }

//   function state_clicked(d) {
//     g.selectAll("#cities").remove();
//     if (d && state !==d) {
//       var xyz = get_xyz(d);
//       state = d;

//       country_code = state.id.substring(0,3).toLowerCase();
//       state_name = state.properties.name;

//       d3.json("/json/cities_" + country_code + ".topo.json", function(error, us){
//         g.append ("g")
//          .attr("id", "cities")
//          .selectAll("path")
//          .data(totojson.feature(us, us.objects.cities).features.filter(function(d) { return state_name == d.properties.state; }))
//          .enter()
//          .append("path")
//          .attr("id", function(d) { return d.properties.name; })
//          .attr("class", "city")
//          .attr("d", path.pointRadius(20 / xyz[2]));
//         zoom(xyz);
//       });
//     } else {
//       state = null;
//       country_clicked(country);
//     }
//   }

//   $(window).resize(function() {
//     var w = $("#map").width();
//     svgMap.attr("width", w);
//     svgMap.attr("height", w * height / width);
//   });

// }

var littleMap = function(){
  var width = 500,
    height = 500;

  // creates projection, determines type(orth=sphere), translate (pixel coord of center), scale(distance btween proj points, defaults to 150), clipAngle(hides behind), precision(how much can be lost)
  var projection = d3.geo.orthographic()
                     .scale(250)
                     .translate([ width/2, height/2 ])
                     .clipAngle(90)
                     .precision(.1);

  var path = d3.geo.path()
               .projection(projection);

  var graticule = d3.geo.graticule();

// controls E/W rotation
  var rotate1 = d3.scale.linear()
                  .domain([0, width])
                  .range([-180, 180]);


// controls N/S rotation
  var rotate2 = d3.scale.linear()
                  .domain([0, height])
                  .range([0, 0]);

  // should put world topo.json map on globe
  d3.json('json/countries.topo.json', function(error, world) {
    svg.append('path')
       .datum(topojson.feature(world, world.objects.countries))
       .attr('class', 'countries')
       .attr('d', path);
  });

  // without lines don't appear
  var svg = d3.select(".globe-container").append("svg")
              .attr("width", width)
              .attr("height", height);

  // without this fill and stroke won't appear
  svg.append("defs").append("path")
     .datum({type: "Sphere"})
     .attr("id", "sphere")
     .attr("d", path);

  // stroke around
  svg.append("use")
     .attr("class", "stroke")
     .attr("xlink:href", "#sphere");

  // background fill
  svg.append("use")
     .attr("class", "fill")
     .attr("xlink:href", "#sphere");

  // lat and long lines. order is for layering.
  svg.append("path")
     .datum(graticule)
     .attr("class", "graticule")
     .attr("d", path);

   svg.on("mousemove", function() {
    var p = d3.mouse(this);
    projection.rotate([rotate1(p[0]), rotate2(p[1])]);
    svg.selectAll("path").attr("d", path);
  })


  // d3.json("/d/4090846/world-110m.json", function(error, world) {
  //   svg.append("path")
  //      .datum(topojson.feature(world, world.objects.land))
  //      .attr("class", "land")
  //      .attr("d", path);
  // });
};
