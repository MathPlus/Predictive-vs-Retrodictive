google.charts.load( 'current' ,  { 'packages' : [ 'corechart' ] } ) ;
google.charts.setOnLoadCallback(chartLoadCallback) ;


function chartLoadCallback()
{
    drawChart() ;
    window.onresize = function(event) { drawChart() ; } ;
}


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

    var chartOptions = {
        'title'             : 'Loan Chart' ,
        'curveType'         : 'function' ,
        'legend'            : { 'position' : 'top' } ,
        'chartArea'         : { 'width' : '80%' , 'height' : '80%' } ,
        'selectionMode'     : 'multiple' ,
        'tooltip'           : { 'trigger' : 'both'} ,
        'aggregationTarget' : 'none' ,
        'focusTarget'       : 'category' ,
        'explorer'          : {
                                  'axis'    : 'horizontal' ,
                                  'actions' : ['dragToZoom', 'rightClickToReset']
                              } ,
        'crosshair'         : { 
                                  'trigger'     : 'both' ,
                                  'orientation' : 'vertical' 
                              }
    } ;

    var dispArea = document.getElementById('retro-to-pred') ;
    var chart = new google.visualization.LineChart(dispArea) ;
    chart.draw( dataTable , chartOptions) ;
}