google.charts.load( 'current' ,  { 'packages' : [ 'corechart' ] } ) ;
google.charts.setOnLoadCallback(chartLoadCallback) ;


function g( t , u , v )
{
    let y = [] ;
    for ( let i = 0 ; i < t.length ; i++ )
    {
        y[i] = u / ( u + t[i] * v ) ;
    }
    return y ;
}


function h1( t , y1 , y2 )
{
    return g( t , y1 , y2 ) ;
}


function h2( t , y1 , y2 )
{
    return g( t , 1 - y1 , 1 - y2 ) ;
}


function get_x_and_t(n)
{
    let x_and_t = {} ;
    x_and_t.x = [] ;
    x_and_t.t = [] ;
    for ( let i = 0 ; i <= n ; i++ )
    {
        x_and_t.x[i] = i / n ;
        x_and_t.t[i] = ( n - i ) / i ;
    }
    return x_and_t ;
}


function test_h( n , y1 , y2 , idArea1 , idArea2 )
{
    const x_and_t = get_x_and_t(n) ;
    const x = x_and_t.x ;
    const t = x_and_t.t ;
    const z1 = h1( t , y1 , y2 ) ;
    const z2 = h2( t , y1 , y2 ) ;
    
    document.getElementById(idArea1).innerHTML
        = "n = " + n + "<br/>y1 = " + y1 + "<br/>y2 = " + y2 ;
     
    let col1_spec    = {} ;
    col1_spec.header = "x" ;
    col1_spec.data   = x ;
    
    let col2_spec    = {} ;
    col2_spec.header = "t" ;
    col2_spec.data   = t ;
    
    let col3_spec    = {} ;
    col3_spec.header = "z1" ;
    col3_spec.data   = z1 ;
    
    let col4_spec    = {} ;
    col4_spec.header = "z2" ;
    col4_spec.data   = z2 ;
    
    col_spec = [ col1_spec , col2_spec , col3_spec , col4_spec ] ;
    
    table = make_table_A(col_spec) ;
    
    document.getElementById(idArea2).appendChild(table) ;
}


function chartLoadCallback()
{
    drawChart() ;
    window.onresize = function(event) { drawChart() ; } ;
}


function init_chartOptions()
{
    let chartOptions_init = {} ;
    
    chartOptions_init.title = 'Chart title TBD' ;
    chartOptions_init.titlePosition = 'none' ;
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
    chartOptions_init.legend.alignment = 'center' ;
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
    
    chartOptions_init.my_options.sliderHdr = [] ;
    chartOptions_init.my_options.sliderHdr[0] = 'Sldr hdr 0 TBD' ;
    chartOptions_init.my_options.sliderHdr[1] = 'Sldr hdr 1 TBD' ;
    
    return chartOptions_init ;
}


function setup_retrodictive_to_predictive(chartOptions_in)
{
    let chartOptions_out = chartOptions_in ;
    
    chartOptions_out.title = 'Metrics of binary classifier performance: from Retrodictive to Predictive' ;
    chartOptions_out.hAxis.title = 'Proportion of observed positive class' ;
    
    chartOptions_out.my_options.dataColHdr[0] = 'ObsvPosCl' ;
    chartOptions_out.my_options.dataColHdr[1] = 'pTPR' ;
    chartOptions_out.my_options.dataColHdr[2] = 'pFNR' ;
    
    chartOptions_init.my_options.sliderHdr[0] = 'TPR' ;
    chartOptions_init.my_options.sliderHdr[1] = 'FPR' ;
    
    return chartOptions_out ;
}


function setup_predictive_to_retrodictive(chartOptions_in)
{
    let chartOptions_out = chartOptions_in ;
    
    chartOptions_out.title = 'Metrics of binary classifier performance: from Predictive to Retrodictive' ;
    chartOptions_out.hAxis.title = 'Proportion of predicted positive class' ;
    
    chartOptions_out.my_options.dataColHdr[0] = 'PredPosCl' ;
    chartOptions_out.my_options.dataColHdr[1] = 'TPR' ;
    chartOptions_out.my_options.dataColHdr[2] = 'FPR' ;
    
    chartOptions_init.my_options.sliderHdr[0] = 'pTPR' ;
    chartOptions_init.my_options.sliderHdr[1] = 'pFNR' ;
    
    return chartOptions_out ;
}


function init_chartData()
{
    let chartData_init = [ chartOptions.my_options.dataColHdr ] ;
    
    for ( let i = 0 ; i <= n ; i++ )
    {
        chartData_init[i+1] = [] ;
        chartData_init[i+1][0] = x[i] ;
    }
    
    return chartData_init ;
}


function drawChart()
{
    for ( let i = 0 ; i <= n ; i++ )
    {
        chartData[i+1][1] = z1[i] ;
        chartData[i+1][2] = z2[i] ;
    }

    let dataTable = google.visualization.arrayToDataTable(chartData) ;
    
    const pct_formatter = new google.visualization.NumberFormat
                              ( { fractionDigits : 3 , pattern : '#.#%' } ) ;
    
    pct_formatter.format( dataTable , 0 ) ;
    pct_formatter.format( dataTable , 1 ) ;
    pct_formatter.format( dataTable , 2 ) ;

    const dispArea = document.getElementById('div_chart') ;
    let chart = new google.visualization.LineChart(dispArea) ;
    chart.draw( dataTable , chartOptions ) ;
}


function get_slider_label( slider_header , slider_value , slider_value_display_area )
{
    const slider_label = "<b>" + slider_header + " = " + slider_value + "\%</b>" ;
    return slider_label ;
}


function slider_oninput( slider_header , slider_value , slider_value_display_area , which_slider )
{
    if ( ( which_slider != 1 ) && ( which_slider != 2 ) )
    {
        alert('slider_oninput:\nBad programmatic error:\nUnrecognized slider number ' + which_slider) ;
        return ;
    }
    
    slider_label = get_slider_label( slider_header , slider_value , slider_value_display_area ) ;
    slider_value_display_area.innerHTML = slider_label ;
    
    if ( which_slider == 1 )
    {
        y1 = slider_value / 100 ;
    }
    if ( which_slider == 2 )
    {
        y2 = slider_value / 100 ;
    }
    
    z1 = h1( t , y1 , y2 ) ;
    z2 = h2( t , y1 , y2 ) ;
    
    drawChart() ;
}
        
 
const n = 100 ;
const x_and_t = get_x_and_t(n) ;
const x = x_and_t.x ;
const t = x_and_t.t ;

const Y1 = 80 ;
const Y2 = 10 ;

let y1 = Y1 / 100 ;
let y2 = Y2 / 100 ;

let z1 = h1( t , y1 , y2 ) ;
let z2 = h2( t , y1 , y2 ) ;

const chartOptions_init = init_chartOptions() ;
let chartOptions = {} ;

switch (direction)
{
    case "retrodictive_to_predictive" :
        chartOptions = setup_retrodictive_to_predictive(chartOptions_init) ;
        break ;
    case "predictive_to_retrodictive" :
        chartOptions = setup_predictive_to_retrodictive(chartOptions_init) ;
        break ;
    default :
        alert("Unrecognized direction [" + direction + "]") ;
}

document.title = chartOptions.title ;

let chartData = init_chartData() ;

document.getElementById("span_title").textContent = chartOptions.title ;
document.getElementById("input_slider1").value = Y1 ;
document.getElementById("input_slider2").value = Y2 ;

let input_slider1 = document.getElementById("input_slider1") ;
let value_slider1 = document.getElementById("value_slider1") ;
value_slider1.innerHTML = get_slider_label( chartOptions.my_options.sliderHdr[0] , input_slider1.value , value_slider1 ) ;
input_slider1.oninput = function() { slider_oninput( chartOptions.my_options.sliderHdr[0] , input_slider1.value , value_slider1 , 1 ) ; } ;

let input_slider2 = document.getElementById("input_slider2") ;
let value_slider2 = document.getElementById("value_slider2") ;
value_slider2.innerHTML = get_slider_label( chartOptions.my_options.sliderHdr[1] , input_slider2.value , value_slider2 ) ;
input_slider2.oninput = function() { slider_oninput( chartOptions.my_options.sliderHdr[1] , input_slider2.value , value_slider2 , 2 ) ; } ;
