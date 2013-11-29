//obtiene la represenmtacion binaria de un numero con la cantidad de digitos determinada por 'tam'
Number.prototype.representacionBinaria= function( tam ){ 
	 var binario= new Array( tam );
	 binario.llenar( 0 );
	 
	 var D= this, c, r;
	 var pos= binario.length;
	 
	 do{
		 c= Math.floor(D/ 2);
		 r= D% 2;
		 binario[--pos]= r;
		 D= c;
		 
	 }while( D!= 0 );
	 
	 return binario;
	 
	}


 

 
 