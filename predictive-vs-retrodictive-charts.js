
google.charts.load( 'current' , { 'packages' : ['corechart'] } ) ;
google.charts.setOnLoadCallback(drawChart) ;

function get_x(n)
{
    let x = {} ;
    x.prop_pos_cl = [] ;
    x.odds_neg_cl = [] ;
    // x.odds_pos_cl = [] ;
    for ( let i = 0 ; i <= n ; i++ )
    {
        x.prop_pos_cl[i] = i / n ;
        x.odds_neg_cl[i] = ( n - i ) / i ;
        // x.odds_pos_cl[i] = i / ( n - i ) ;
    }
    return x ;
}


function f( a , u )
{
    let v = 1 / ( 1 + u * a ) ;
    return v ;
}


function g( odds_neg_cl , rate1_in , rate2_in )
{
    const rate_ratio = rate1_in / rate2_in ;
    let rate_out = [] ;
    for ( let i = 0 ; i < odds_neg_cl.length ; i++ )
    {
        rate_out[i] = f( rate_ratio , odds_neg_cl[i] ) ;
    }
    return rate_out ;
}


function rTPR_rFPR__to__pTPR_pFNR( odds_obsv_neg_cl , rTPR , rFPR )
{
    const rFNR = 1.0 - rTPR ;
    const rTNR = 1.0 - rFPR ;
    
    const pTPR = g( odds_obsv_neg_cl , rFPR , rTPR ) ;
    const pFNR = g( odds_obsv_neg_cl , rTNR , rFNR ) ;
    
    return [ pTPR , pFNR ] ;
}


function pTPR_pFNR__to__rTPR_rFPR( odds_pred_neg_cl , pTPR , pFNR )
{
    const pFPR = 1.0 - pTPR ;
    const pTNR = 1.0 - pFNR ;
    
    const rTPR = g( odds_pred_neg_cl , pFNR , pTPR ) ;
    const rFPR = g( odds_pred_neg_cl , pTNR , pFPR ) ;
    
    return [ rTPR , rFPR ] ;
}


function test__rTPR_rFPR__to__pTPR_pFNR( n , rTPR , rFPR , idArea1 , idArea2 )
{
    const x = get_x(n) ;
    const prop_obsv_pos_cl = x.prop_pos_cl ;
    const odds_obsv_neg_cl = x.odds_neg_cl ;
    const [ pTPR , pFNR ] = rTPR_rFPR__to__pTPR_pFNR( odds_obsv_neg_cl , rTPR , rFPR ) ;
    
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
    const [ rTPR , rFPR ] = pTPR_pFNR__to__rTPR_rFPR( odds_pred_neg_cl , pTPR , pFNR ) ;
    
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