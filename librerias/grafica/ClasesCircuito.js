Array.prototype.mostrar= function(){
	 var cad="[";
	 for( var i=0; i<this.length; i++ )
	  cad+= this[i]+", ";
	 cad+="]";
	 return cad;
	}
Array.prototype.mostrarPO= function(){
	 var cad="[";
	 for( var i=0; i<this.length; i++ )
	  cad+= this[i].mostrar()+", ";
	 cad+="]";
	 return cad;
	}
	
function ParOrdenado( x, y ){
 this.x= x;
 this.y= y;
}

ParOrdenado.prototype={
 mostrar: function(){
  var cad="("+ this.x+", "+this.y+")";
  return cad;
 }
}

function Cable( inicio, fin, not, anchoNot ){
	 this.inicio= inicio;
	 if( typeof(fin)== "undefined" )
	   this.fin= null;
	 else
	   this.setFin(fin);
	 this.not= not;
	 this.anchoNot= anchoNot;
	}
	
Cable.prototype={
	 setFin: function( fin ){
		   this.fin= fin;
		   if( this.fin.y== -1 ) 
		    this.fin.y= this.inicio.y;
		 },
		 
	 pintar: function(  ctx, color ){
		 ctx.strokeStyle=color;
		 ctx.beginPath();
		 ctx.moveTo( this.inicio.x, this.inicio.y );
		 ctx.lineTo( this.inicio.x, this.fin.y );
		 
		 //pintando not
		 if( this.not== 1 )
		 	ctx.lineTo( this.fin.x, this.fin.y );
		 else{
			  var ancho= (this.fin.x- this.inicio.x)*0.75;
			  ctx.lineTo( this.inicio.x+ ancho, this.fin.y );
			  ctx.lineTo( this.inicio.x+ ancho, this.fin.y+ this.anchoNot );
//			  alert("entreo");
			  ctx.lineTo( this.inicio.x+ ancho+ this.anchoNot, this.fin.y );
			  ctx.lineTo( this.inicio.x+ ancho, this.fin.y- this.anchoNot );
			  ctx.lineTo( this.inicio.x+ ancho, this.fin.y );
              
			  ctx.moveTo( this.inicio.x+ ancho+ this.anchoNot, this.fin.y );
			  ctx.lineTo( this.fin.x, this.fin.y );
			 }
		 ctx.stroke();
		 },
	
	 mostrar: function(){
		  var cad="";
		  cad+= this.inicio.mostrar()+"-----"+ this.fin.mostrar();
		  return cad;
		 }	 
	}

function Circuito( funcionLogica, anchoBase ){
	this.anchoBase= anchoBase;
	this.separacionCablesVerticales= this.anchoBase/2 ;
	this.separacionPadding= this.anchoBase;
	this.separacionComponentes= this.anchoBase* 0.75;
	this.funcionLogica= funcionLogica;
	this.numVariables= this.funcionLogica[0].length;
	this.numSumandos= this.funcionLogica.length;
	this.cablesVerticales= new Array();
	this.componentes= new Array();
	 this.crear();
	}

Circuito.prototype= {
	 crear: function(){
		 var panta= document.getElementById("pan")
		 
		  var posicionesHorizontalesVariables= new Array();
		  var x;
		  var yi= 0;
		  var yf= yi+ this.separacionPadding+ (2*this.numSumandos -1)* this.separacionComponentes + + this.separacionPadding;

		  for( var i= 0; i< this.numVariables; i++ ){
			   x= this.separacionCablesVerticales* i;
   			   posicionesHorizontalesVariables.push(x);
			   this.cablesVerticales.push( new Cable( new ParOrdenado(x, yi), new ParOrdenado(x, yf) ) );
			  }
			  
		  var colaAnd= new Array();
		  x= this.cablesVerticales[ this.cablesVerticales.length -1 ].inicio.x+ this.separacionPadding;
		  y= this.separacionPadding;

		  //Creamos los componentes And
		  for( var i= 0; i< this.numSumandos; i++ ){
			   var inicioCablesDeEntrada= this.generarPosicionesValidas( posicionesHorizontalesVariables, this.funcionLogica[i] );
			   var valoresNot= this.generarValoresNot( this.funcionLogica[i] );
			   var and=  new And(x, y, this.anchoBase, valoresNot, inicioCablesDeEntrada ); 
			   this.componentes.push( and );
			   colaAnd.push( and );
			   y+= 2*this.separacionComponentes;
			  }
		  
		  var compuertaPivote= colaAnd.shift();
		  
		  while( colaAnd.length!= 0 ){
			   var compuerta= colaAnd.shift();
			   compuerta.cableDeSalida.setFin( new ParOrdenado( compuertaPivote.getPuntoConeccion().x, -1 ) );
			   var compuertaNueva= this.crearCompuertaOrFusion( compuertaPivote, compuerta, this.separacionComponentes );
			   this.componentes.push( compuertaNueva );
			   compuertaPivote= compuertaNueva;
			  }	  
		 },
		 
	 pintar: function( x, y, ctx ){
		  ctx.clearRect( 0, 0, 500-1, 450-1);
		  ctx.save();
		  ctx.translate(x,y);
 		  //pintamos los cables verticales de los variables
		  for( var i= 0; i< this.cablesVerticales.length; i++ )
		   this.cablesVerticales[i].pintar( ctx, "#000");

 		  //pintamos los componentes
		  for( var i= 0; i< this.componentes.length; i++ )
		   this.componentes[i].pintar( ctx, "#000");
		   
		  ctx.restore();

		 },
		 
	 generarPosicionesValidas: function( posicionesHorizontales, terminos ){
		  var paresOrdenados= new Array();
		  
		  for( var i= 0; i< terminos.length; i++ )
			   if( terminos[i]!= 'x' )
				    paresOrdenados.push( new ParOrdenado(posicionesHorizontales[i], -1 ));
					
		  return paresOrdenados;		  
		 },
		 
	generarValoresNot: function( terminos ){
		  var valoresNot= new Array();
		  
		  for( var i= 0; i< terminos.length; i++ )
			   if( terminos[i]!= 'x' )
				    valoresNot.push( terminos[i] );
					
		  return valoresNot;		  
		 },
		
	 crearCompuertaOrFusion: function( A, B, separacionVertical ){
		  var inicioCableDeEntrada= new Array();
		  inicioCableDeEntrada.push( A.getPuntoConeccion() );
		  inicioCableDeEntrada.push( B.getPuntoConeccion() );
		  
		  var y= (A.getPuntoConeccion().y + B.getPuntoConeccion().y) /2 - (A.width/ 2);
		  var x= A.getPuntoSalida().x+ separacionVertical;
		  
		  return new Or( x, y, A.width, inicioCableDeEntrada, new Array(1,1) );
		 },
		 
	 mostrar: function(){
		  var cad="";
		  cad+= "#var: "+ this.numVariables+ ", #sum: "+ this.numSumandos;
		  return cad;
		 }	
		

	}





