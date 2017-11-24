var map = L.map('map').setView([18.5204,73.8567], 9);


var basemap=L.tileLayer('https://api.mapbox.com/styles/v1/asdashpute/cjadpk9a25g1d2so9b0txq733/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNkYXNocHV0ZSIsImEiOiJjajV1bGNmejAxc293MzJwOTYwbWJ2em1nIn0.d6PQSf8T0xlE6GXwltHzdQ', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.zoomControl.setPosition('topleft');



// var pincodeLayer = L.tileLayer.wms('http://40.71.28.98:8080/geoserver/pincode/wms?', {
//     layers: 'pincode:pune_banglore',
//     format: 'image/png',
//     version: '1.1.0',
//     transparent: true,
//     attribution: "",
//     tiled:true,
//     crossOrigin:null
// }).addTo(map);

// var pincode=null;
// var html=null;

var pincodeLayer = 'http://40.71.28.98:8080/geoserver/pincode/ows';

var defaultParameters = {
    service : 'WFS',
    version : '1.0.0',
    request : 'GetFeature',
    typeName : 'pincode:pune_banglore',
    outputFormat : 'text/javascript',
    format_options : 'callback:getJson'
    // SrsName : 'EPSG:4326'
};

var parameters = L.Util.extend(defaultParameters);
var URL = pincodeLayer + L.Util.getParamString(parameters);

var WFSLayer = null;
var ajax = $.ajax({
    url : URL,
    dataType : 'jsonp',
    jsonpCallback : 'getJson',
    success : function (response) {
        WFSLayer = L.geoJson(response, {
            style: function (feature) {
                return {
                    stroke: true,
                    fillColor: '#2880ba'
                    
                };
            },
            onEachFeature: function (feature, layer) {
               var label = L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'label',
         iconAnchor:   [0, 0],
         color: '#2880ba',
        html: feature.properties.pincode
      })
    }).addTo(map);

                popupOptions = {maxWidth: 200};
                
                layer.bindPopup(feature.properties.pincode
                    ,popupOptions);
            }
        }).addTo(map);
        
    WFSLayer.on("click",onMarkerClick);

    }

});


function onMarkerClick(e){
  
// $('#infoDiv').html('');
// $('#infoDiv').html(e.layer.feature.properties.pincode);

        var data = "http://40.71.28.98:8080/geoserver/pincode/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pincode:pune_banglore&outputFormat=application%2Fjson";
       var endx = crossfilter(data);
    var pin  = endx.dimension(function (d) {
          return d.pincode;
        });
var sidewaysGroup = [ 'tot_m', 'tot_f'];
   var expchart   = dc.rowChart('#infoDiv');
            

            expchart.width(500)
.height(500)
.dimension(pin)
.group(sidewaysGroup);
            
          //    .elasticX(true)
          //     .brushOn(false)
          //     .elasticY(true)
          //     .height(275)
          // .margins({
          //   top: 10,
          //   right: 30,
          //   bottom: 30,
          //   left: 50
          // })
          //              .y(d3.scale.linear().domain([0, 100]))
          //     // .yAxisLabel("Total Expenditure in Lakhs")
          //     .dimension(pin)
          //     .group(sidewaysGroup)           
          //      .x(d3.scale.ordinal().domain(['tot_m', 'tot_f']))
          //     .xUnits(dc.units.ordinal)
          //     .on('renderlet', function(chart) {
          //         chart.selectAll('rect').on("click", function(d) {
          //             console.log("click!", d);
          //         });
          //     });


 expchart.render();

  $("#sidebar-wrapper").show();
 $("#sidebar-wrapper").addClass("active");


}



// var basemapsobj = { 'Street View': basemap, 'Satellite View': Esri_WorldImagery };

// var overlays = {
//   "<img class='activeImg' src='img/green.png' />Current Locations": park,
//   "<img class='activeImg' src='img/blue.png' />Future Locations": future,
//   "<img class='activeImg' src='img/garage.png' />Garage Locations": garage
// };

 
// Lcontrol = L.control.layers(overlays ,null, {collapsed:false}).addTo(map);

// map.on('overlayadd', function(eo) {
//   if (eo.name === 'Active No Parking Signs') {
//     setTimeout(function() {
//       map.removeLayer(future)
//     }, 10);
//   } else if (eo.name === 'Future No Parking Signs') {
//     setTimeout(function() {
//       map.removeLayer(park)
//     }, 10);
//   }
// });



// var male = e.layer.feature.properties.tot_m;
// var female = e.layer.feature.properties.tot_f;
//   var chart = new CanvasJS.Chart("infoDiv",
//   {
//     title:{
//       text: "Population"
//     },
//     // legend: {
//     //   maxWidth: 350,
//     //   itemWidth: 120
//     // },
//     data: [
//     {
//       type: "pie",
//       showInLegend: true,
//      // legendText: "{indexLabel}",
//       dataPoints: [
//         { y: male, indexLabel: "Male Population" },
//         { y: female, indexLabel: "Female Population" }
//       ]
//     }
//     ]
//   });
//   chart.render();