/*
Gantt chart with axis markers.
Learn how to:
- Create a gantt chart with axis markers.
*/
// JS

var data = [
{
    name: 'one',
    points: []
}
];

var promises = [
d3.csv("./people_info.csv", function(csv_data) {
// console.log("asd")
// for (var i = 0; i < csv_data.length; i++) {
var temp = {};
temp["name"] = csv_data.name;
temp["y"] = [csv_data.y1, csv_data.y2];
data[0].points.push(temp);
// }
})
];

Promise.all(promises).then(function(){
ready();
}).catch(function(error){
console.log(error);
});

function ready(){
var chart = JSC.chart('chartDiv', {
debug: true,
type: 'horizontalColumn',
zAxisScaleType: 'stacked',
yAxis_scale_type: 'time',
xAxis_visible: true,
title_label_text: ' <b>Lifetime Historians</b>',
legend_visible: false,
defaultPoint: {
  label_text: '%name',
  tooltip: '<b>%name</b> <br/>%low - %high',
  tooltipFormat: 'YYYY',
},
yAxis: {
  
},
series: data
});}