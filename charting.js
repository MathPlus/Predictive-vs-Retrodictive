google.charts.load( 'current' ,  { 'packages' : [ 'corechart' ] } ) ;
google.charts.setOnLoadCallback(chartLoadCallback) ;


function chartLoadCallback()
{
    drawChart() ;
    window.onresize = function(event) { drawChart() ; } ;
}


var chartOptions =
{
    'title'             : 'Loan Chart' ,
    'curveType'         : 'function' ,
    'hAxis'             : { 'title'          : 'x' ,
                            'titleTextStyle' : { 'italic' : false ,
                                                 'bold'   : true } ,
                            'format'         : 'percent' ,
                            'textStyle'      : { 'bold' : true } } ,
    'vAxis'             : { 'format'    : 'percent' ,
                            'textStyle' : { 'bold' : true } } ,
    'legend'            : { 'position'  : 'top' ,
                            'textStyle' : { 'bold' : true } } ,
    'lineWidth'         : 3 ,
    'colors'            : [ 'green' , 'red' ] ,
    'chartArea'         : { 'width' : '80%' , 'height' : '80%' } ,
    'selectionMode'     : 'multiple' ,
    'tooltip'           : { 'trigger' : 'both' } ,
    'aggregationTarget' : 'none' ,
    'focusTarget'       : 'category' ,
    'explorer'          : { 'axis'    : 'horizontal' ,
                            'actions' : [ 'dragToZoom' , 'rightClickToReset' ] } ,
    'crosshair'         : { 'trigger'     : 'both' ,
                            'orientation' : 'vertical' ,
                            'color'       : 'grey' }
} ;


function drawChart() 
{
    var chartData = [ [ 'x' , 'z1' , 'z2' ] ] ;
    
    for ( let i = 0 ; i <= n ; i++ )
    {
        chartData[i+1] = [] ;
        chartData[i+1][0] = x[i] ;
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