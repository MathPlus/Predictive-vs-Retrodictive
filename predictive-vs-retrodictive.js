

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


function test__rTPR_rFPR__to__pTPR_pFNR( n , rTPR , rFPR , id_display_area )
{
    const x = get_x(n) ;
    const prop_obsv_pos_cl = x.prop_pos_cl ;
    const odds_obsv_neg_cl = x.odds_neg_cl ;
    const [ pTPR , pFNR ] = rTPR_rFPR__to__pTPR_pFNR( odds_obsv_neg_cl , rTPR , rFPR ) ;
    document.getElementById(id_display_area).innerHTML
        = "n = " + n + "<br/><br/>" +
          "prop_obsv_pos_cl = " + prop_obsv_pos_cl + "<br/>" +
          "odds_obsv_neg_cl = " + odds_obsv_neg_cl + "<br/><br/>" +
          "rTPR = " + rTPR + "<br/>" +
          "rFPR = " + rFPR + "<br/><br/>" +
          "pTPR = " + pTPR + "<br/>" +
          "pFNR = " + pFNR ;
}


function test__pTPR_pFNR__to__rTPR_rFPR( n , pTPR , pFNR , id_display_area )
{
    const x = get_x(n) ;
    const prop_pred_pos_cl = x.prop_pos_cl ;
    const odds_pred_neg_cl = x.odds_neg_cl ;
    const [ rTPR , rFPR ] = pTPR_pFNR__to__rTPR_rFPR( odds_pred_neg_cl , pTPR , pFNR ) ;
    document.getElementById(id_display_area).innerHTML
        = "n = " + n + "<br/><br/>" +
          "prop_pred_pos_cl = " + prop_pred_pos_cl + "<br/>" +
          "odds_pred_neg_cl = " + odds_pred_neg_cl + "<br/><br/>" +
          "pTPR = " + pTPR + "<br/>" +
          "pFNR = " + pFNR + "<br/><br/>" +
          "rTPR = " + rTPR + "<br/>" +
          "rFPR = " + rFPR ;
}