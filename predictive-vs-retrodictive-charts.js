
google.charts.load( 'current' , { 'packages' : ['corechart'] } ) ;
google.charts.setOnLoadCallback(drawChart) ;

function get_x(n)
{
    let x = {} ;
    x.prop_pos_cl = [] ;
    x.odds_neg_cl = [] ;
    for ( let i = 0 ; i <= n ; i++ )
    {
        x.prop_pos_cl[i] = i / n ;
        x.odds_neg_cl[i] = ( n - i ) / i ;
    }
    return x ;
}


function f( x , r )
{
    let y = 1 / ( 1 + x * r ) ;
    return y ;
}


function g( x , u , v )
{
    const r = v / u ;
    let y = [] ;
    for ( let i = 0 ; i < x.length ; i++ )
    {
        y[i] = f( x[i] , r ) ;
    }
    return y ;
}


function h( x , y1 , y2 )
{
    let z = {} ;
    z._1 = g( x , y1     , y2     ) ;
    z._2 = g( x , 1 - y1 , 1 - y2 ) ;
    return z ;
}


function test__rTPR_rFPR__to__pTPR_pFNR( n , rTPR , rFPR , idArea1 , idArea2 )
{
    const x = get_x(n) ;
    const prop_obsv_pos_cl = x.prop_pos_cl ;
    const odds_obsv_neg_cl = x.odds_neg_cl ;
    const pTPR_pFNR = h( odds_obsv_neg_cl , rTPR , rFPR ) ;
    const pTPR = pTPR_pFNR._1 ;
    const pFNR = pTPR_pFNR._2 ;
    
    document.getElementById(idArea1).innerHTML
        = "n = " + n + "<br/>rTPR = " + rTPR + "<br/>rFPR = " + rFPR ;
     
    let col1_spec    = {} ;
    col1_spec.header = "prop_obsv_pos_cl" ;
    col1_spec.data   = prop_obsv_pos_cl ;
    
    let col2_spec    = {} ;
    col2_spec.header = "odds_obsv_neg_cl" ;
    col2_spec.data   = odds_obsv_neg_cl ;
    
    let col3_spec    = {} ;
    col3_spec.header = "pTPR" ;
    col3_spec.data   = pTPR ;
    
    let col4_spec    = {} ;
    col4_spec.header = "pFNR" ;
    col4_spec.data   = pFNR ;
    
    col_spec = [ col1_spec , col2_spec , col3_spec , col4_spec ] ;
    
    table = make_table_A(col_spec) ;
    
    document.getElementById(idArea2).appendChild(table) ;
}


function test__pTPR_pFNR__to__rTPR_rFPR( n , pTPR , pFNR , idArea1 , idArea2 )
{
    const x = get_x(n) ;
    const prop_pred_pos_cl = x.prop_pos_cl ;
    const odds_pred_neg_cl = x.odds_neg_cl ;
    const rTPR_rFPR = h( odds_pred_neg_cl , pTPR , pFNR ) ;
    const rTPR = rTPR_rFPR._1 ;
    const rFPR = rTPR_rFPR._2 ;
    
    document.getElementById(idArea1).innerHTML
        = "n = " + n + "<br/>pTPR = " + pTPR + "<br/>pFNR = " + pFNR ;
     
    let col1_spec    = {} ;
    col1_spec.header = "prop_pred_pos_cl" ;
    col1_spec.data   = prop_pred_pos_cl ;
    
    let col2_spec    = {} ;
    col2_spec.header = "odds_pred_neg_cl" ;
    col2_spec.data   = odds_pred_neg_cl ;
    
    let col3_spec    = {} ;
    col3_spec.header = "rTPR" ;
    col3_spec.data   = rTPR ;
    
    let col4_spec    = {} ;
    col4_spec.header = "rFPR" ;
    col4_spec.data   = rFPR ;
    
    col_spec = [ col1_spec , col2_spec , col3_spec , col4_spec ] ;
    
    table = make_table_A(col_spec) ;
    
    document.getElementById(idArea2).appendChild(table) ;
}