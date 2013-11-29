function permite(elEvento, permitidos) {
// Variables que definen los caracteres permitidos
var numeros = "01";
var caracteres = " abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
var numeros_caracteres = numeros + caracteres;
var teclas_especiales = [8, 37, 39, 46, 9];
// 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha, 9= TAB
// Seleccionar los caracteres a partir del parámetro de la función
switch(permitidos) {
case 'num':
permitidos = numeros;
break;
case 'car':
permitidos = caracteres;
break;
case 'num_car':
permitidos = numeros_caracteres;
break;
}
// Obtener la tecla pulsada
var evento = elEvento || window.event;
var codigoCaracter = evento.charCode || evento.keyCode;
var caracter = String.fromCharCode(codigoCaracter);
// Comprobar si la tecla pulsada es alguna de las teclas especiales
// (teclas de borrado y flechas horizontales)
var tecla_especial = false;
for(var i in teclas_especiales) {
if(codigoCaracter == teclas_especiales[i]) {
tecla_especial = true;
break;
}
}
// Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
// o si es una tecla especial
return permitidos.indexOf(caracter) != -1 || tecla_especial;
}

function generarTablaDeCombinaciones( ctnVariables ){
 var tabla= new Array();
 var totalCombinaciones= Math.pow( 2,  ctnVariables );
 //genera representacion decimal de las variables
 tabla.push( new Array() );
 tabla[0][0]= "#";
 for( var i= 0; i< totalCombinaciones; i++ ){
	  tabla[0].push( i );
	 }

 //genera nombres de las variables
 for( var i= 1; i<= ctnVariables; i++ ){
  tabla.push( new Array() );
  tabla[i][0]= String.fromCharCode(64+ i );
 }
 
 //genera los numeros binarios
 var ctnGrupos= totalCombinaciones, sw, cont;
 for( var i= 1; i<= ctnVariables; i++ ){
	 ctnGrupos/= 2;
	 sw= 0;
	 cont= 0;
	 for( var j= 0; j< totalCombinaciones; j++ ){
		  cont++;
		  tabla[i].push( sw );
		  if( cont== ctnGrupos ){
		   sw= ( sw== 0 ? 1: 0 );
		   cont= 0;
		  }
		 } 
 }
 
 return tabla;
 
}

function generarTablaHtmlDeCombinaciones( ctnVariables ){
 	 var tablaDeCombinaciones= generarTablaDeCombinaciones( ctnVariables );
	 var tablaHtml= document.createElement("table"), fila, titulo, dato, txtValorFuncion;
	 
	 tablaHtml.id= "tablaDeDatos";
	 
	 //crea los titulo de la tabla
	 fila= document.createElement("tr");
	 for( var i= 0; i< tablaDeCombinaciones.length; i++ ){
		  titulo= document.createElement("th");
		  titulo.appendChild( document.createTextNode( tablaDeCombinaciones[i][0] ));
		  fila.appendChild( titulo );
		 }
	 titulo= document.createElement("th");
     titulo.appendChild( document.createTextNode("f"));  //creamos el titulo de la funcion
	 fila.appendChild( titulo );
	 
     tablaHtml.appendChild( fila );  // adiciona la fila de titulos a la tabla
	 
	 //crea los datos de la tabla
	 var ctnFilasDeDatos= tablaDeCombinaciones[0].length- 1;
	 var ctnColumnas= tablaDeCombinaciones.length;
	 for( var j= 1; j<= ctnFilasDeDatos; j++ ){
		  fila= document.createElement("tr");
		  for( var i= 0; i< ctnColumnas; i++ ){
			   dato= document.createElement("td");
			   dato.appendChild( document.createTextNode( tablaDeCombinaciones[i][j] ));
			   fila.appendChild( dato );
			  }
		  tablaHtml.appendChild( fila ); 
		 }
	
	 //generamos la columna de entrada para los valores de la funcion
	  var ctnDeFilasDeTablaHtml= tablaHtml.childNodes.length;
	  for( var i= 1; i< ctnDeFilasDeTablaHtml; i++ ){
		   	dato= document.createElement("td");
			txtValorFuncion= document.createElement("input");
			txtValorFuncion.type= "text";
			txtValorFuncion.size= "2";
			txtValorFuncion.maxLength="1";
			txtValorFuncion.onkeypress= function( elEvento ){ return permite(elEvento, 'num')};
			txtValorFuncion.onclick= function(){ this.select(); };
			txtValorFuncion.style.textAlign= "right";
			txtValorFuncion.id= "txtValorFuncion" + (i-1);
			txtValorFuncion.value= 0;
			dato.appendChild( txtValorFuncion );
		    tablaHtml.childNodes[i].appendChild(dato);
		  }
     
	 return tablaHtml;

	}
	
function obtenerValoresFuncion( tabla ){
	 var arrayValoresFuncion= new Array(), txtValorFuncion;
	 var ctnFilas= tabla.childNodes.length;
	
	 for( var i= 1; i< ctnFilas; i++ ){
		    txtValorFuncion= tabla.childNodes[i].lastChild.childNodes[0];
		   	arrayValoresFuncion.push( txtValorFuncion.value );
	 }
	 
	 return arrayValoresFuncion;
	}