
function f( t , r )
{
    let y = 1 / ( 1 + t * r ) ;
    return y ;
}


function g( t , u , v )
{
    const r = v / u ;
    let y = [] ;
    for ( let i = 0 ; i < t.length ; i++ )
    {
        y[i] = f( t[i] , r ) ;
    }
    return y ;
}


function h( t , y1 , y2 )
{
    let z = {} ;
    z._1 = g( t , y1     , y2     ) ;
    z._2 = g( t , 1 - y1 , 1 - y2 ) ;
    return z ;
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
    const z = h( t , y1 , y2 ) ;
    const z1 = z._1 ;
    const z2 = z._2 ;
    
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
