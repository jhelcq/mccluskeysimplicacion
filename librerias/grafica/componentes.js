function Compuerta(){
	
	}

Compuerta.prototype={
	 getPuntoSalida: function(){
		  return new ParOrdenado(this.x+ this.width, this.y+ this.height/2 );
		 },

	 getPuntoConeccion: function(){
		  return this.cableDeSalida.fin;
	
		 },
		 
	 pintar: function( ctx, color ){
		  this.pintarCablesDeEntrada(  ctx, color );
		  this.pintarCuerpo(  ctx, color  );
		  this.pintarCableDeSalida(  ctx, color );
		 },
	
	 pintarCablesDeEntrada: function(  ctx, color ){
		  for( var i= 0; i< this.numEntradas; i++ )
		   this.cableDeEntrada[i].pintar(  ctx, color  );
		 },
		 
	 pintarCableDeSalida: function(  ctx, color ){
		  this.cableDeSalida.pintar(  ctx, color );
		 },
	
 	 mostrar: function(){
		  var cad="";
		  cad+= "x: "+this.x+", y: "+this.y+"</br>";
		  cad+= "width: "+this.width+", height: "+this.height+ ", #entradas: "+ this.numEntradas+"</br>";
		  for( var i= 0; i< this.numEntradas-1 ; i++ )
		    cad+= this.cableDeEntrada[i].mostrar()+"</br>";
		   cad+= this.cableDeEntrada[i].mostrar();
		   cad+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		   cad+= this.cableDeSalida.mostrar();
		  return cad;
 		 }
	}


/*****************************************************
				        CLASE    AND
******************************************************/
		
function And( x1, y1, w1, arrayNot, inicioCableDeEntrada, finCableSalida ){
 this.x= x1;
 this.y= y1;
 this.width= w1;
 this.height= w1;
 this.numEntradas= inicioCableDeEntrada.length;
 this.cableDeEntrada= new Array();
 this.cableDeSalida= null;
 
 var x= this.x;
 var cons= this.height/ (this.numEntradas+ 1);
 
 for( var i= 0; i< this.numEntradas; i++ ){
	  var y= this.y+ cons* (i+ 1);
	  if( inicioCableDeEntrada[i].y== -1 )
	   inicioCableDeEntrada[i].y= y;
	  this.cableDeEntrada.push( new Cable( inicioCableDeEntrada[i], new ParOrdenado(x, y), arrayNot[i], cons*0.45 ) );  
	 }

 if( typeof(finCableSalida)== "undefined" )
	   this.cableDeSalida= new Cable( this.getPuntoSalida(), new ParOrdenado(this.x+ 3* this.width/ 2, this.y+ this.height/2 ) );
 else
	  this.cableDeSalida= new Cable( this.getPuntoSalida(), finCableDeSalida );
	 
}

for( funcion in Compuerta.prototype){ 
     And.prototype[funcion]= Compuerta.prototype[funcion];
	}

And.prototype.pintarCuerpo= function( ctx, color ){
	 ctx.strokeStyle=color;
	 ctx.beginPath();
	 ctx.moveTo( this.x, this.y );
	 ctx.lineTo( this.x, this.y+ this.height );
	 ctx.lineTo( this.x+ (this.width/ 2), this.y+ this.height );
	 ctx.arc( this.x+ (this.width/ 2), this.y+ (this.height*0.5), (this.width* 0.5), Math.PI*(0.5), -Math.PI*(0.5),true);
	 ctx.closePath();
	 ctx.stroke();
	}
	
/*****************************************************
				        CLASE    OR
******************************************************/
	
function Or( x1, y1, w1, inicioCableDeEntrada, arrayNot){
 this.x= x1;
 this.y= y1;
 this.width= w1;
 this.height= w1;
 this.numEntradas= inicioCableDeEntrada.length;
 this.cableDeEntrada= new Array();
 this.cableDeSalida= null;
 
 var x= this.x+ (this.width/2);
 var cons= this.height/ (this.numEntradas+ 1);
 
 for( var i= 0; i< this.numEntradas; i++ ){
	  var y= this.y+ cons* (i+ 1);
	  if( inicioCableDeEntrada[i].y== -1 )
	   inicioCableDeEntrada[i].y= y;
	  this.cableDeEntrada.push( new Cable( inicioCableDeEntrada[i], new ParOrdenado(x, y), arrayNot[i], cons*0.45 ) );  
	 }
 
 if( typeof(finCableSalida)== "undefined" )
	   this.cableDeSalida= new Cable( this.getPuntoSalida(), new ParOrdenado(this.x+ 3* this.width/ 2, this.y+ this.height/2 ) );
 else
	  this.cableDeSalida= new Cable( this.getPuntoSalida(), finCableDeSalida );
	 
}

for( funcion in Compuerta.prototype){ 
     Or.prototype[funcion]= Compuerta.prototype[funcion];
	}

Or.prototype.pintarCuerpo= function( ctx, color ){
	 ctx.beginPath();
	 
	 // borramos las lineas de entrada sobresalientes para que no entre al cuerpo del 'Or'
	 ctx.fillStyle= "#fff";
	 ctx.moveTo( this.x, this.y+ this.height );
 	 ctx.arc( this.x, this.y+ (this.height*0.5), (this.width* 0.5), Math.PI*(0.5), -Math.PI*(0.5),true);
	 ctx.lineTo(this.x+ this.width/ 2, this.y );
 	 ctx.lineTo(this.x+ this.width/ 2, this.y+ this.height );
	 ctx.closePath();
	 ctx.fill();
	 
	 ctx.beginPath();
  	 ctx.strokeStyle=color;
 	 ctx.moveTo( this.x, this.y+ this.height );
 	 ctx.arc( this.x, this.y+ (this.height*0.5), (this.width* 0.5), Math.PI*(0.5), -Math.PI*(0.5),true);
	 ctx.quadraticCurveTo( this.x+ this.width, this.y , this.getPuntoSalida().x, this.getPuntoSalida().y );
	 ctx.quadraticCurveTo( this.x+ this.width, this.y+ this.height , this.x, this.y+ this.height );
	 ctx.stroke();

	}