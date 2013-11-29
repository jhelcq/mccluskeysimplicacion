Array.prototype.sonIgualesBinarios = function(  vecB ){
 var sonIguales= true;
 var vectorResultado= null;
 
 for( var i=0; i< this.length; i++ )
 {
  if( this[i] != '0' )
   if( this[i]!= vecB[i] ){
    sonIguales= false;
    break;
   }
 }
 
 if( sonIguales ){
	 vectorResultado= this.concat(); //copia a los elementos de this a vectorResultado
	 for( var i=0; i< this.length; i++ )
	 {
	   if( this[i]!= vecB[i] ){
		vectorResultado[i]= 'x';
		break;
	   }
	 }
  }
 
 return vectorResultado;
}

Array.prototype.fusionarMinterminos= function( v ){
 var vectorResultado= this.concat();
 for( var i= 0; i< v.length; i++ )
 {
  if( vectorResultado.indexOf( v[i] ) == -1 )
   vectorResultado.push( v[i] );
 }
 vectorResultado.sort(comparacionNumeros);
 return vectorResultado;
 
}


//***********************************************

Array.prototype.eliminarRepetidos= function(){
	 var vectorResultado= new Array();
	 
	 for( var i= 0; i< this.length; i++ ){
		  var obj= this[i];		  
		  var seEncuentra= vectorResultado.some( function( valor, clave, objeto ){ return sonIguales( valor, obj ); }, obj );
		  if( !seEncuentra )
		   vectorResultado.push(obj);
		 }
		 
	 return vectorResultado;
}

Array.prototype.insertarVerificarInclusion= function( A ){
	 var encontroLugar= false;
	 
	 for( var i= 0; i< this.length; i++ ){
		  var B= this[i];
		  if( estaIncluido( A, B ) || estaIncluido( B, A ) ){
			   encontroLugar= true;
			   if( estaIncluido( B, A ) ){
				   this[i]= A;
				   }
			  }
		 }
	 if( !encontroLugar ){
		 this.push(A);
		 }	 
}

Array.prototype.mostrarVectorPuro= function(){
		 var cad="";
		 for( var i= 0; i< this.length; i++ ){
		    cad+= this[i]+" ";
			 }
			 return cad;
}

Array.prototype.llenar= function( val ){
		 for( var i= 0; i< this.length; i++ )
		  this[i]= val;
}

Array.prototype.mostrar= function(){
		 var cad="";
		 for( var i= 0; i< this.length; i++ ){
			 var mat= new Matriz();
			 mat.matriz= this[i];
		    cad+= mat.mostrar()+"<br>";
			 }
			 return cad;
}

Array.prototype.obtCantidadUnos= function(){
  var cant_unos= 0;
  for( var i= 0; i< this.length; i++ )
	  if( this[i] == 1 )
	   cant_unos++;
  return cant_unos;
 }

function getPrimerClave( A ) {
	 for( a in A ){
		  return a;
		 }	
	}

function sonIguales( A, B){
	 var claveA= null;
	 var claveB= null;
	 
	 for( a in A ){
		  claveA= a;
		  break;
		 }
	 for( b in B ){
		  claveB= b;
		  break;
		 }
	 
	 return (claveA== claveB);
	}

function estaIncluido( A, B ){
	 var estaIncluido= true;
	 var vectorA= null;
	 var vectorB= null;
	 
	 for( a in A ){
		  vectorA= A[a];
		  break;
		 }
	 for( b in B ){
		  vectorB= B[b];
		  break;
		 }
	 
	 
	 for( i in vectorA )
	  {
		  if( vectorA[i] == 1 ){
			  if( vectorA[i] != vectorB[i] ){
			   estaIncluido= false;			  
			   break;
			  }
		  }
	  }
		  
	  return estaIncluido;		  
	}

//***************************************************



Array.prototype.mostrarPrimos= function(){
		 var cad="";
		 for( var i= 0; i< this.length; i++ ){
		    cad+= this[i].mostrar()+"<br>";
			 }
			 return cad;
}


function comparacionNumeros(x,y){
 if( x== y)
  return 0;
 else
  if( x< y )
   return -1;
  else
   return 1;
}

function comparacionMinterminosNumUnos(x,y){
 if( x.numUnos== y.numUnos)
  return 0;
 else{
	  if( x.numUnos< y.numUnos )
	   return -1;
	  else 
	   return 1;
	 }
}