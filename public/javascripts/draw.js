'use strict';
var myapp = angular.module('myapp', ["highcharts-ng"]);

// DOM Ready =============================================================
$(document).ready(function() {

                  var file, n;
                  
                  file = window.location.pathname;
                  n = file.lastIndexOf('/');
                  if (n >= 0) {
                  file = file.substring(n + 1);
                  }

                  
                  var options = {
                  chart: {
                  renderTo: 'container',
                  type: 'spline'
                  },
                  series: [{}]
                  };
                  
                  $.getJSON('/graph/id_list', function(gyaan) {
                            //alert(JSON.stringify(gyaan));
                            var tableContent = new Array;
                            $.each(gyaan, function() {
                                   //alert(this);
                                   tableContent.push(this.toString());
                                   });
                            var sel = document.getElementById('Old_IDs');
                            
                            for (var i = 0; i < tableContent.length; i++) {
                            
                            var opt = document.createElement('option');
                            opt.innerHTML = tableContent[i];
                            opt.value = tableContent[i];
                            sel.appendChild(opt);
                            }
                            
                            if (file.length > 1){
                            //alert(file);
                            var firstgraph = "/graph/get/" + (file).toString();
                            }
                            else{
                            var firstgraph = "/graph/get/" + (tableContent[0]).toString();
                            }
                            //alert(firstgraph);

                            $.getJSON(firstgraph, function(data) {
                                    //alert(JSON.stringify(data[0].chart_type));
                                    options.series[0].data = data[0].data[0].data;
                                    options.title={
                                      text: data[0].title+": "+data[0]._id
                                      };
                                    options.chart.type = (data[0].chart_type).toLowerCase();
                                    var chart = new Highcharts.Chart(options);
                                    });
                            });
                  });
// Functions =============================================================
function RedirectFunction() {
    var oldgraphs = "/graph/draw/" + ($('#Old_IDs').val()).toString();
    //alert(oldgraphs);
    document.location.href=oldgraphs
};

myapp.controller('myctrl', function($scope, preLoadData) {
                 
                 
                    });