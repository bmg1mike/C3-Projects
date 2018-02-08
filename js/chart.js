/************************************************ Draw graph ***********************************/

var chart = c3.generate({
    
    padding: {
  right: 20,
        top:50
},


   
    /************************************************ Import data to plot graph ***********************************/
    
    
    data: {
        type:'line',
        url:'/data/data.csv',

        colors: {
            youtube: '#ff0000',
            facebook: '#0000ff',
            remarketing: '#ffff00'
        },
       
        x:'date'
    },
    
    point:{show:false},
    
    legend:{
        y:20
        
    },
    /************************************************ Make the X-axis Display Dates ***********************************/
    
    axis: {
        x: {
            type: 'timeseries',
                  tick: {
                        culling: true,
                        format: '%m/%y',
                        fit:true,
                        outer: false,
                        culling: {
                            max: window.innerWidth > 800 ? 8 : 4
                				}
            }
        },
        
        /************************************************ Modify the Y-axis  ***********************************/
        
        y:{ 
            
            min:0,
            padding: {top: 0, bottom: 0}
          }
    },
    
    legend:{
        width:1000
    },
    
    /************************************************ Modify the tooltip title to show date ***********************************/
    tooltip:{
            format:{
                title:function(d){
                                 return d.toLocaleString("en", { day: "numeric"  }) +" / "+d.toLocaleString("en", { month: "long"  }) +" / "+d.toLocaleString("en", { year: "numeric"  })
                                 }
            }
            
        },
    
    /**************************************** Responsive Code ******************************/
     onresized: function () {
    
                window.innerWidth > 800 ? chart.internal.config.axis_x_tick_culling_max = 8 : chart.internal.config.axis_x_tick_culling_max = 4;
            }
}); 


/***************************************    Calculate the total for every Key  ************************************/


//'/data/data.csv'
var data =d3.csv('/data/data.csv',function(Error,data){
    if(Error) throw Error;
    
    var totalSum = [d3.sum(data.map(function(d){ return d.youtube}))];
    d3.select('.c3-legend-item-youtube text').style('fill','#ff0000').text('Google/Youtube Clicks ')
    d3.select('.c3-legend-item-youtube').insert('text').attr('class','total').text(totalSum).attr('x',670.5).attr('y',9).style('fill','#ff0000')
    console.log(totalSum);
    
})

var data1 =d3.csv('/data/data.csv',function(Error,data){
    if(Error) throw Error;
    
    var totalSum = [d3.sum(data.map(function(d){ return d.facebook}))];
    d3.select('.c3-legend-item-facebook text').style('fill','#0000ff').text('Facebook Clicks')
    d3.select('.c3-legend-item-facebook').insert('text').attr('class','total').text(totalSum).style('fill','#0000ff').attr('x',340).attr('y',9)
    console.log(totalSum);
    
})

var data2 =d3.csv('/data/data.csv',function(Error,data){
    if(Error) throw Error;
    
    var totalSum = [d3.sum(data.map(function(d){ return d.remarketing}))];
    d3.select('.c3-legend-item-remarketing').insert('text').attr('class','total').text(totalSum).style('fill','#ffff00').attr('x',920).attr('y',9)
    d3.select('.c3-legend-item-remarketing text').text("Remarketing Clicks").style('fill','#ffff00')
    console.log(totalSum);
    
})

d3.selectAll('g').style('backgrround-color','#ffff00')


