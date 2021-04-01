Chart.defaults.groupableHBar = Chart.helpers.clone(Chart.defaults.horizontalBar);

Chart.controllers.groupableHBar = Chart.controllers.horizontalBar.extend({
    calculateBarY: function(index, datasetIndex, ruler) {
        var me = this;
        var meta = me.getMeta();
        var yScale = me.getScaleForId(meta.yAxisID);
        var barIndex = me.getBarIndex(datasetIndex);
        var topTick = yScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
        topTick -= me.chart.isCombo ? (ruler.tickHeight / 2) : 0;
        var stackIndex = this.getMeta().stackIndex;

        if (yScale.options.stacked) {
            if(ruler.datasetCount>1) {
                var spBar=ruler.categorySpacing/ruler.datasetCount;
                var h=me.calculateBarHeight(ruler);
                
                return topTick + (((ruler.categoryHeight - h) / 2)+ruler.categorySpacing-spBar/2)+(h+spBar)*stackIndex;
            }
            return topTick + (ruler.categoryHeight / 2) + ruler.categorySpacing;
        }

        return topTick +
            (ruler.barHeight / 2) +
            ruler.categorySpacing +
            (ruler.barHeight * barIndex) +
            (ruler.barSpacing / 2) +
            (ruler.barSpacing * barIndex);
    },
    calculateBarHeight: function(ruler) {
        var returned=0;
        var me = this;
        var yScale = me.getScaleForId(me.getMeta().yAxisID);
        if (yScale.options.barThickness) {
            returned = yScale.options.barThickness;
        }
        else {
            returned= yScale.options.stacked ? ruler.categoryHeight : ruler.barHeight;
        }
        if(ruler.datasetCount>1) {
            returned=returned/ruler.datasetCount;
        }
        return returned;
    },
    getBarCount: function () {
        var stacks = [];

        // put the stack index in the dataset meta
        Chart.helpers.each(this.chart.data.datasets, function (dataset, datasetIndex) {
            var meta = this.chart.getDatasetMeta(datasetIndex);
            if (meta.bar && this.chart.isDatasetVisible(datasetIndex)) {
                var stackIndex = stacks.indexOf(dataset.stack);
                if (stackIndex === -1) {
                    stackIndex = stacks.length;
                    stacks.push(dataset.stack);
                }
                meta.stackIndex = stackIndex;
            }
        }, this);

        this.getMeta().stacks = stacks;

        return stacks.length;
    }
});


function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}




var data = {
  labels: [],
  datasets: [
    /*{
      label: "Dogs",
      backgroundColor: "rgba(255,0,0,0.2)",
      data: [20, 10, 25],
      stack: 1,
      xAxisID: 'x-axis-0',
      yAxisID: 'y-axis-0'
    },*/
    
  ]
};


var index = 0;

var promises = [
  d3.csv("./global_people_period.csv", function(csv_data) {
  index ++
  if (index == 1){
    data.labels = Object.keys(csv_data).filter((el,i) => {return i > 0}) 
  }
  // console.log("asd")
  // for (var i = 0; i < csv_data.length; i++) {
  var temp = {};
  temp["label"] = csv_data.name;
  temp["backgroundColor"] = random_rgba();
  temp["stack"] =  1;
  temp["xAxisID"] =  'x-axis-0';
  temp["yAxisID"] = 'y-axis-0';
  var bool = [];
  for (var el in Object.keys(csv_data)){
    if (el > 0){
      bool.push(Number(csv_data[Object.keys(csv_data)[el]]))
    }
  }



  temp["data"] = bool;
  data.datasets.push(temp);
  
  })
];



Promise.all(promises).then(function(){
ready();
}).catch(function(error){
console.log(error);
});

function ready(){
  console.log(data)
  var ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: 'groupableHBar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          stacked: true,
          type: 'category',
          id: 'y-axis-0',
        display: false,
        }],
        xAxes: [{
          stacked: true,
          type: 'linear',
          ticks: {
            beginAtZero:true
          },
          gridLines: {
            display: false,
            drawTicks: true,
          },
          id: 'x-axis-0',
display: false,
        },
        {
          stacked: true,
          position: 'top',
          type: 'linear',
        display: false,
          ticks: {
            beginAtZero:true
          },
          id: 'x-axis-1',
          gridLines: {
            display: true,
            drawTicks: true,
          },
          display: false
        }]
      }
    }

});}