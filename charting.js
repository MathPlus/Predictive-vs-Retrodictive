google.charts.load( 'current' ,  { 'packages' : [ 'corechart' ] } ) ;
google.charts.setOnLoadCallback(chartLoadCallback) ;


function chartLoadCallback()
{
    drawChart() ;
    window.onresize = function(event) { drawChart() ; } ;
}


function init_chartOptions()
{
    var chartOptions_init = {} ;
    
    chartOptions_init.title = 'Chart title TBD' ;
    chartOptions_init.curveType = 'function' ;
    chartOptions_init.selectionMode = 'multiple' ;
    
    chartOptions_init.hAxis = {} ;
    chartOptions_init.hAxis.title = 'Horizontal axis title TBD' ;
    chartOptions_init.hAxis.titleTextStyle = {} ;
    chartOptions_init.hAxis.titleTextStyle.italic = false ;
    chartOptions_init.hAxis.titleTextStyle.bold = true ;
    chartOptions_init.hAxis.format = 'percent' ;
    chartOptions_init.hAxis.textStyle = {} ;
    chartOptions_init.hAxis.textStyle.bold = true ;
    
    chartOptions_init.vAxis = {} ;
    chartOptions_init.vAxis.format = 'percent' ;
    chartOptions_init.vAxis.textStyle = {} ;
    chartOptions_init.vAxis.textStyle.bold = true ;
    
    chartOptions_init.legend = {} ;
    chartOptions_init.legend.position = 'top' ;
    chartOptions_init.legend.textStyle = {} ;
    chartOptions_init.legend.textStyle.bold = true ;
    
    chartOptions_init.lineWidth = 3 ;
    chartOptions_init.colors = [ 'green' , 'red' ] ;
    
    chartOptions_init.chartArea = {} ;
    chartOptions_init.chartArea.width = '60%' ;
    chartOptions_init.chartArea.height = '80%' ;
    
    chartOptions_init.tooltip = {} ;
    chartOptions_init.tooltip.trigger = 'both' ;
    
    chartOptions_init.aggregationTarget = 'none' ;
    chartOptions_init.focusTarget = 'category' ;
    
    chartOptions_init.explorer = {} ;
    chartOptions_init.explorer.axis = 'horizontal' ;
    chartOptions_init.explorer.actions = [ 'dragToZoom' , 'rightClickToReset' ] ;
    
    chartOptions_init.crosshair = {} ;
    chartOptions_init.crosshair.trigger = 'both' ;
    chartOptions_init.crosshair.orientation = 'vertical' ;
    chartOptions_init.crosshair.color = 'grey' ;
    
    chartOptions_init.my_options = {} ;
    chartOptions_init.my_options.dataColHdr = [] ;
    chartOptions_init.my_options.dataColHdr[0] = 'Col hdr 0 TBD' ;
    chartOptions_init.my_options.dataColHdr[1] = 'Col hdr 1 TBD' ;
    chartOptions_init.my_options.dataColHdr[2] = 'Col hdr 2 TBD' ;
    
    return chartOptions_init ;
}


function setup_retrodictive_to_predictive(chartOptions_in)
{
    var chartOptions_out = chartOptions_in ;
    chartOptions_out.title = 'Metrics of binary classifier performance: from Retrodictive to Predictive' ;
    chartOptions_out.hAxis.title = 'Proportion of observed positive class' ;
    chartOptions_out.my_options.dataColHdr[0] = 'ObsvPosCl' ;
    chartOptions_out.my_options.dataColHdr[1] = 'pTPR' ;
    chartOptions_out.my_options.dataColHdr[2] = 'pFNR' ;
    return chartOptions_out ;
}


function setup_predictive_to_retrodictive(chartOptions_in)
{
    var chartOptions_out = chartOptions_in ;
    chartOptions_out.title = 'Metrics of binary classifier performance: from Predictive to Retrodictive' ;
    chartOptions_out.hAxis.title = 'Proportion of predicted positive class' ;
    chartOptions_out.my_options.dataColHdr[0] = 'PredPosCl' ;
    chartOptions_out.my_options.dataColHdr[1] = 'TPR' ;
    chartOptions_out.my_options.dataColHdr[2] = 'FPR' ;
    return chartOptions_out ;
}


function init_chartData()
{
    var chartData_init = [ chartOptions.my_options.dataColHdr ] ;
    
    for ( let i = 0 ; i <= n ; i++ )
    {
        chartData_init[i+1] = [] ;
        chartData_init[i+1][0] = x[i] ;
    }
    
    return chartData_init ;
}


var chartOptions = init_chartOptions() ;
chartOptions = setup_retrodictive_to_predictive(chartOptions) ;
//chartOptions = setup_predictive_to_retrodictive(chartOptions) ;

var chartData = init_chartData() ;


function drawChart()
{
    for ( let i = 0 ; i <= n ; i++ )
    {
        chartData[i+1][1] = z1[i] ;
        chartData[i+1][2] = z2[i] ;
    }

    var dataTable = google.visualization.arrayToDataTable(chartData) ;
    
    var pct_formatter = new google.visualization.NumberFormat( { fractionDigits : 3 , pattern : '#.#%' } ) ;
    pct_formatter.format( dataTable , 0 ) ;
    pct_formatter.format( dataTable , 1 ) ;
    pct_formatter.format( dataTable , 2 ) ;

    var dispArea = document.getElementById('retro-to-pred') ;
    var chart = new google.visualization.LineChart(dispArea) ;
    chart.draw( dataTable , chartOptions) ;
}