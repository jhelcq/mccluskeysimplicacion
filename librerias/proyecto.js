// JavaScript Document
function Proyecto( ctx ){
	 this.numeroVariables= -1;
	 this.simboloDeVariables= null;
	}

Proyecto.prototype= {
	 setNumeroVariables: function( nv ){
		  this.numeroVariables= nv;
          this.simboloDeVariables= new Array();
		  for( var i= 0; i< this.numeroVariables; i++ )
			   this.simboloDeVariables.push( String.fromCharCode( 65+ i ) );
		 },
		 
	 generarFuncionYGrafico: function( valoresFuncion, contenedorDeFuncion, contenedorDeDibujo ){
		  var quine= new Quine( valoresFuncion, this.numeroVariables );
		  var funcionPura= quine.simplificar();
		  var simboloFuncion= this.generarSimboloFuncion( funcionPura );
		  
		  $("#"+contenedorDeFuncion).text( simboloFuncion );
		  
		 
		  var circuito= new Circuito( funcionPura, 2 );
		  circuito.pintar( 1, 1, contenedorDeDibujo );
		  //pinta las variables en el canvas
/*		  var cadena= this.concatenarSimboloDeVariables();
  		  contenedorDeDibujo.save();
		  contenedorDeDibujo.scale(0.7,0.7);
		  contenedorDeDibujo.font = '0.5px Arial';
  		  contenedorDeDibujo.fillText(cadena, 0.2, 1.2);
		  contenedorDeDibujo.restore();*/
		  $("#simboloVariables").html(this.concatenarSimboloDeVariables());
		},
		 
	 generarSimboloFuncion: function( funcionPura ){
		  var simboloFuncion="f( ";
		  //creamos f(A,B,C,..)= 
		  for( var i= 0; i< this.simboloDeVariables.length- 1; i++ )
			   simboloFuncion+= this.simboloDeVariables[i]+", ";
		  simboloFuncion+= this.simboloDeVariables[ this.simboloDeVariables.length-1 ]+" )= ";
		
		  for( var i= 0; i< funcionPura.length- 1; i++ ){
			   simboloFuncion+= this.generarSimboloDelTermino( funcionPura[i] )+ " + ";
			  }
		  simboloFuncion+= this.generarSimboloDelTermino( funcionPura[ funcionPura.length- 1 ] );
		  
		  return simboloFuncion; 
		 },
		 
	 generarSimboloDelTermino: function( terminoPuro ){
		  var simboloTermino="", caracter;
		  
		  for( var i= 0; i< terminoPuro.length; i++ ){
			   caracter="";
			   switch( terminoPuro[i]){
				    case 1: caracter= this.simboloDeVariables[i]; break;
					case 0: caracter= this.simboloDeVariables[i]+ String.fromCharCode( "'".charCodeAt(0) ); break;
				   }
			   simboloTermino+= caracter;
			  }
		  
		  return simboloTermino;
		 },
		 
	 concatenarSimboloDeVariables: function(){
		  var resul="";
		  for( var i= 0; i< this.simboloDeVariables.length; i++ )
		    resul+= " "+this.simboloDeVariables[i];
		  return resul;
		 }
		
	};