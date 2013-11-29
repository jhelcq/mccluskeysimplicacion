// JavaScript Document
function Matriz( nf, nc, valor ){
	 this.matriz= {};
	 if( typeof( nf ) != "undefined" ){
		  this.numFilas= nf;
		  this.numColumnas= nc;		 
		  this.llenar( valor );
		 }
	 
/*	 						 $("#pan").html("entro");
	 this.matriz= new Array();
	 this.crearllenar(valor);*/

	}

Matriz.prototype= {
	llenar: function( valor ){
		
		for( var i=0 ; i< this.numFilas; i++ ){
			 this.matriz[i]= {};
			 for( var j=0 ; j< this.numColumnas; j++ )
				 this.matriz[i][j]= valor;
		}
		
	},
	
	mostrar: function(){
		
	     var cad="--";
		 for( var i in this.matriz ){
			for( var titCol in this.matriz[i] )
			  cad+= titCol+" ";
			break;
		 }
         cad+= "<br>";
		 
		 for( var i in this.matriz ){
			  cad+= i+ " ";
			  for( var j in this.matriz[i] )
		  			  cad+= this.matriz[i][j]+"&nbsp;&nbsp;";		  
	 		  cad+= " <br>";
		 }
		 
	     return cad;
	},
	
    cantUnosEnColumna: function( columna ){
		
		 var cant= 0;
		 for( var i in this.matriz ){
 		   if(  this.matriz[i][columna]== 1 )
			 cant++;
		 }
		 
		 return cant;
		},
		
	existeUnUnoEnColumna: function( columna ){
		
		var posicion= -1;
		if( this.cantUnosEnColumna(columna)== 1 ){
	  		 for( var i=0 ; i< this.numFilas; i++ ){
 			   if(  this.matriz[i][columna]== 1 ){
				 posicion= i;
				 break;
			   }
			 }
		}
		
 		 return posicion;
		},
		
	cantUnosEnFila: function( fila ){
		 var cant= 0;
		 for( var j in this.matriz[fila] ){
 		   if(  this.matriz[fila][j]== 1 )
			 cant++;
		 }
		 
		 return cant;
		},
		
	analizarInclusiones: function(){
		 var vectorAuxReduccion= new Array();
		 var vectorResultado= new Array();
	 	 for( i in this.matriz ){
			  var A= {};
			  A[i]= this.matriz[i];
			  vectorAuxReduccion.insertarVerificarInclusion( A );
			 }
			 
		 //antes de cargar los indices de los objetos de vectorAuxReduccion filtramos los elementos repetidos de tal vector
		 vectorAuxReduccion= vectorAuxReduccion.eliminarRepetidos();	 
		 
		 for( var i= 0; i< vectorAuxReduccion.length; i++ ){
			  vectorResultado.push( getPrimerClave( vectorAuxReduccion[i] ) );
			 }
		 
		 return vectorResultado;
		}
		
}