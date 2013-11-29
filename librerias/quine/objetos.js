///****************** CLASE MINTERMINO ******************//////////////////
 function Mintermino( n, binario, numUnos ){
	  this.decimal= n;
	  this.binario= binario;
	  this.numUnos= numUnos;
	 }
 
 Mintermino.prototype= {
	  mostrar: function(){
		   var cad= "";
		   cad= this.decimal+" - ";
		   for( var i= 0; i< this.binario.length; i++ )
		    cad+= this.binario[i]+" ";
		       cad+= " - "+ this.numUnos;
		   return cad;
		  }
	 }
	 
///****************** CLASE FILA ******************//////////////////
function Fila( mintermino, binario ){
 this.mintermino= mintermino;
 this.combinado= false;
 this.binario= binario;
}

Fila.prototype={
 obtCantidadUnos: function(){
  var cant_unos= 0;
  for( var i= 0; i< this.binario.length; i++ )
	  if( this.binario[i] == 1 )
	   cant_unos++;
  return cant_unos;
 },

 esIgual: function( B ){
  var fila_res= null;

  if( binario= this.binario.sonIgualesBinarios( B.binario ) ){
   fila_res= new Fila( this.mintermino.fusionarMinterminos(B.mintermino), binario );
   this.combinado= true;
   B.combinado= true;
   }
  return fila_res;
 },
 
 sonEquivalentes: function( f ){
	 for( var i= 0; i< this.binario.length; i++ )
	  if( this.binario[i]!= f.binario[i] )
	   return false;
	  return true;
	 },
 
 ////////pa salvar////////
 mostrar:function(){
	 var cad="";
   for( var i= 0; i< this.mintermino.length; i++ )
    cad+= "-"+this.mintermino[i]
   cad+= "|"+this.combinado+"|";
   for( var i= 0; i< this.binario.length; i++ )
    cad+= this.binario[i];
   return cad;
 }
 
};
//***************************************************************//

///******************* CLASE NIVEL *******************************//

function Nivel(){
	this.fila= new Array();
	}
Nivel.prototype={
	obtCantidadUnos: function(){
		 return this.fila[0].obtCantidadUnos();
		},

	adiUltimo: function( f ){
		 this.fila.push( f );
		},
		
	esVacia: function(){
		 return ( this.fila.length== 0? true: false );
		},
	
	combinar: function( N ){
		 var nivelCombinadoResultado= new Nivel();
		 
		 for( var i= 0; i< this.fila.length; i++ ){
			 for( var j= 0; j< N.fila.length; j++ ){
				  if( fila_combinado= this.fila[i].esIgual( N.fila[j] ) )
				   nivelCombinadoResultado.adiUltimo( fila_combinado );
				 }
			}
			
		 return nivelCombinadoResultado;
		},
		
	cargarPrimosEn: function( Primos ){
		for( var i= 0; i< this.fila.length; i++ )
		 if( this.fila[i].combinado== false )
		  Primos.push( this.fila[i] );
		},
	
	borrarRepetidos: function(){
		var nivelResultado= new Nivel();
		
		for( var i= 0; i< this.fila.length; i++ ){
			 var aux_fila= this.fila[i];
			 if( !nivelResultado.fila.some( function( v, c, obj ){ return v.sonEquivalentes(aux_fila); }, aux_fila ) )
			  nivelResultado.adiUltimo( this.fila[i] );
			}
			
		 return nivelResultado;
		},
		
 	 mostrar: function(){
		 var cad="";
		 for( var i= 0; i< this.fila.length; i++ ){
		    cad+= this.fila[i].mostrar()+"<br>";
			 }
			 return cad;
		 }
	};
	
	
//***************************************************************//

///******************* CLASE Conjunto *******************************//

function Conjunto(){
	 this.nivel= new Array();
	}
	
Conjunto.prototype= {
	esVacia: function(){
		 return ( this.nivel.length== 0? true: false );
		},
		
	adiUltimo: function( N ){
		 this.nivel.push(N);
		},
		
	operar: function(){
		 var conjuntoCombinado= new Conjunto();

		 for( var i= 0; i< this.nivel.length- 1; i++ ){
			 if( this.nivel[i].obtCantidadUnos()+1 == this.nivel[i+1].obtCantidadUnos()){
				  var nivelCombinadoResultado= this.nivel[i].combinar( this.nivel[i+1] );
				  if( !nivelCombinadoResultado.esVacia() ){
					nivelCombinadoResultado= nivelCombinadoResultado.borrarRepetidos();  
				    conjuntoCombinado.adiUltimo( nivelCombinadoResultado );
				  }
				 }
			 }
			 
	     return conjuntoCombinado;
		},
	 cargarPrimosEn: function( Primos ){
///		 var Primos= new Nivel();  //aca Primos son referencias a los primos, debe ser una copia
		 
		 for(var i=0; i<this.nivel.length; i++){
			 this.nivel[i].cargarPrimosEn( Primos );
		 	}
			
		 },
	 
	 mostrar: function(){
		 var cad="";
		 for(var i=0; i<this.nivel.length; i++){
			 cad+=this.nivel[i].mostrar()+"-------------<br>"
			 }
			 return cad;
		 }
	};
	
	
///******************* CLASE  QUINE-McCLUSKEY*******************************//

function Quine( valoresFuncion, numeroVariables ){
     this.conjunto_base= new Conjunto();// los mintermios expresados en decimal y binario con numero de unos en orden
	 this.minterminos= new Array(); // los minterminos expresados en decimal
	 
	 this.implicantesPrimos= new Array();
	 this.implicantesFinales= new Array();
	 
	 this.formarNivelesOrdenados( valoresFuncion, numeroVariables );
	}

Quine.prototype={
	simplificar: function(){
		 this.obtImplicantesPrimos();
   	     this.analizarImplicantesPrimos();
		 
		 var funcionResultado= new Array();
		 for( var i= 0; i< this.implicantesFinales.length; i++ ){
			  funcionResultado.push( this.implicantesFinales[i].binario );
			 }
		 return funcionResultado;
		},
	
	obtenerDecimalBinarioMinterminos: function ( A, cantidadDigitos ){
	  var arrayMinterminos= new Array();
	 
	  for( var i= 0; i< A.length; i++ ){
		   if( A[i]== 1 ){
			    var mintermino= new Mintermino();
			    mintermino.decimal= i;
				mintermino.binario= i.representacionBinaria(cantidadDigitos);
				arrayMinterminos.push(mintermino);
			   }
		  }
	  return arrayMinterminos;
	 },
	//aca se obttiene los minterminos en decimal y se genera el conjunto de minterminos ordenados por numero de unos
	formarNivelesOrdenados: function ( valoresFuncion, numeroDeVariables ){
	 
	  var minterminoDecimalBinario= this.obtenerDecimalBinarioMinterminos( valoresFuncion, numeroDeVariables );
	  
	  for( var i= 0; i< minterminoDecimalBinario.length; i++ )
	    minterminoDecimalBinario[i].numUnos= minterminoDecimalBinario[i].binario.obtCantidadUnos();
	   
	  minterminoDecimalBinario.sort(comparacionMinterminosNumUnos)  
	   
	  var nivel= new Nivel();
	  var numDelNivel= minterminoDecimalBinario[0].numUnos;
	  
	  for( var i= 0; i< minterminoDecimalBinario.length; i++ ){
		   if( minterminoDecimalBinario[i].numUnos== numDelNivel ){
			    var mintermino= new Array();
				mintermino.push(minterminoDecimalBinario[i].decimal);
				nivel.adiUltimo( new Fila(mintermino, minterminoDecimalBinario[i].binario));
			   }
			else{
				 this.conjunto_base.adiUltimo( nivel );
				 nivel= new Nivel();
				 numDelNivel= minterminoDecimalBinario[i].numUnos;
				 var mintermino= new Array();
				 mintermino.push(minterminoDecimalBinario[i].decimal);
				 nivel.adiUltimo( new Fila(mintermino, minterminoDecimalBinario[i].binario));
				}
		  }
		  
		   this.conjunto_base.adiUltimo( nivel );
		   
		   //obtenemos todos los minterminos en sus representaciones decimales y las almacenamos en 'this.minterminos'
		    for(var i=0; i<this.conjunto_base.nivel.length; i++){
			 var nivel= this.conjunto_base.nivel[i];
			 for(var j=0; j<nivel.fila.length; j++){
				 this.minterminos.push(nivel.fila[j].mintermino[0]);
				 }
			 }
			this.minterminos.sort(comparacionNumeros);
	 },
		
	obtImplicantesPrimos: function(){
		var Primos= new Nivel();
	    var conjunto_aux= null;
		var i=1;
		
		while( !this.conjunto_base.esVacia() ){
         	// $("#pan"+(++i)).html(this.conjunto_base.mostrar());		///no 	           
			 
			 conjunto_aux= this.conjunto_base.operar();

			// $("#pan"+(++i)).html(this.conjunto_base.mostrar());	///no 

			 this.conjunto_base.cargarPrimosEn( this.implicantesPrimos );
			 this.conjunto_base= conjunto_aux;
			}
			
		//$("#pan"+(++i)).html(this.implicantesPrimos.mostrarPrimos()); //no
		
		},
	
	analizarImplicantesPrimos: function(){
		//crea matriz de implicantesprimos X mintermons
		var matriz= new Matriz( this.implicantesPrimos.length, this.minterminos.length, 0);			
		//ya tenemos que 'matriz' es una matriz de tantos implicantes primos que hay X tantos minterminos existentes
		
		//ahohra llenamos los minterminos a los que hacen los implicantes primos 
		for( var i= 0; i< this.implicantesPrimos.length; i++){
			var filaImplicantePrimo=  this.implicantesPrimos[i];
			for( var j= 0; j< filaImplicantePrimo.mintermino.length; j++ ){
				 var posicion= this.minterminos.indexOf( filaImplicantePrimo.mintermino[j]);
   			     matriz.matriz[i][posicion]= 1;
				}
			}
		
		//creamos el vector que señalara aquella filas que cuyo uno de sus unos es el unico uno en alguna columna
		var vectorSenaladorImplicantesPrimos= new Matriz( 1, this.implicantesPrimos.length, 0);	
		
		//creamos matriz que senalara a los implicantes escenciales y sobre el cual se analizara 
		var matrizConImplicantesEscenciales= new Matriz();	
		
		//analizamos que filas cuyos elementos seran el unico que esta en alguna columna, tales filas las adicionamos a otra matriz
		for( var j= 0; j< matriz.numColumnas; j++ ){
			 var posicion= matriz.existeUnUnoEnColumna(j);
			 if( posicion!= -1 ){
				matrizConImplicantesEscenciales.matriz[posicion]= matriz.matriz[posicion];
				vectorSenaladorImplicantesPrimos.matriz[0][posicion]= 1;
			 }
			}

       //analizamos matriz con implicantes primos escenciales y analizamos las columnas con al menos un uno

       //creamos el vector que señalara que columnas de la matriz con implicantes primos escenciales tiene al menos un uno
	   var vectorSenaladorMinterminos= new Matriz( 1, this.minterminos.length, 0);	

	   for( var i in  matrizConImplicantesEscenciales.matriz ){
		    for( var j in matrizConImplicantesEscenciales.matriz[i] )
			 if( matrizConImplicantesEscenciales.cantUnosEnColumna(j)>= 1 ) 
			  vectorSenaladorMinterminos.matriz[0][j]= 1;
 		    break;
		   }
		   
		//verificamos si todas las columnas de matriz con implicantes primos escenciales tienen al menos un uno
		if( vectorSenaladorMinterminos.cantUnosEnFila(0)== this.minterminos.length ){
			 //adicionamos los implicantes escenciales a los implicantes finales
			 for( var i in  matrizConImplicantesEscenciales.matriz )
			  this.implicantesFinales.push( this.implicantesPrimos[i] );
			}
		else{
			 var implicantesNoEscencialesXMinterminos= new Matriz();
			 for( var j= 0; j< vectorSenaladorImplicantesPrimos.numColumnas; j++ ){
				  if( vectorSenaladorImplicantesPrimos.matriz[0][j]== 0 )
				   implicantesNoEscencialesXMinterminos.matriz[j]= {};
				 }
				 
			 for( var j= 0; j< vectorSenaladorMinterminos.numColumnas; j++ ){
				  if( vectorSenaladorMinterminos.matriz[0][j]== 0 ){
		  			   for( var i in implicantesNoEscencialesXMinterminos.matriz ){
						    //marca en la matriz NoEscencialesXMinterminosNoMarcados;
						    implicantesNoEscencialesXMinterminos.matriz[i][j]= matriz.matriz[i][j];
						   }
					  }

				 }
				 
			 //hasta aca ya tenemos construido implicantesNoEscencialesXMinterminos ahora toca analizar sobre esta matriz las inclusiones
			 var vectorReduccion= implicantesNoEscencialesXMinterminos.analizarInclusiones();
			 
			 //adicionamos a implicantes finales los implicantes escenciales obtenidos anteriormente y los implicantes reducidos

			 //adicionando implicantes escenciales
			 for( var i in  matrizConImplicantesEscenciales.matriz )
			   this.implicantesFinales.push( this.implicantesPrimos[i] );

			 //adicionando implicantes reducidos
			 
			 for( var i= 0; i< vectorReduccion.length; i++ )
			  this.implicantesFinales.push( this.implicantesPrimos[ vectorReduccion[i] ] );
			  
			// $("#pan_4").html(implicantesNoEscencialesXMinterminos.mostrar());
			// $("#pan_5").html(vectorReduccion.mostrarVectorPuro());
			}
/*
		$("#pan_0").html(matriz.mostrar());
		$("#pan_1").html(vectorSenaladorImplicantesPrimos.mostrar());
		$("#pan_2").html(matrizConImplicantesEscenciales.mostrar());
		$("#pan_3").html(vectorSenaladorMinterminos.mostrar());
		$("#pan_6").html(this.implicantesFinales.mostrarPrimos());*/

		}
	 
	}
	

