"use strict";


window.onload = function() {

go.addEventListener('click',time,false);                //pour lancer le traçage des ondes
dephasageneg.addEventListener('click',dephneg,false);   //pour dephaser en negatif la première onde
dephasagepos.addEventListener('click',dephpos,false);   //pour dephaser en positif le premièr onde
dephasageneg2.addEventListener('click',dephneg2,false); //pour dephaser en negatif la deuxieme onde
dephasagepos2.addEventListener('click',dephpos2,false); //pour dephaser en positif la deuxieme onde
stopit.addEventListener('click',arret,false);

function f(x){
	return eval(document.getElementById("f_x").value);       //evaluation de la fonction pour la premiere onde
}

function fbis(x){
	return eval(document.getElementById("f_xbis").value);    //evaluation de la fonction pour la deuxieme onde
}

function sin(x){                         //pour tracer un sinus
	return Math.sin(x);
}

function cos(x){                         //pour tracer un cosinus
return Math.cos(x);}

var deph=0;                  //initialisation pour les variables de dephasage pour la premiere et la deuxieme onde
var deph2=0;

 
function dephneg(){            //baisser de Pi/5 le dephasage pour la premiere onde
	deph=deph-Math.PI/5;

}

function dephpos(){            //augmenter de Pi/5 le dephasage pour la premiere onde
	deph=deph+Math.PI/5;

}

function dephneg2(){          //baisser de Pi/5 le dephasage pour la deuxieme onde
	deph2=deph2-Math.PI/5;

}

function dephpos2(){          //augmenter de Pi/5 le dephasage pour la deuxieme onde
	deph2=deph2+Math.PI/5;

}

function arret(){            //Provoque l'arret de mouvement de tous les tracés d'onde
	alert("Pause");             
	clearInterval(times);

}



var abs=0;          // variable initialisee a zero qui va permettre de donner l'impression de mouvement des ondes


var times=null;       //initialisation a null la variable times qui permet de repeter a un intervalle precis les traçages.   


function time(){      //la fonction qui permet de lancer plusieurs fois les traçages des ondes
     if (times!= null){clearInterval(times);}             
	 times=setInterval(draw,50);}


var canvas = document.getElementById("canvas");    //initialisation canvas
var ctx = canvas.getContext('2d');           
var dx = canvas.width;
var dy = canvas.height;







function repere1(){            //fonction traçage du repere pour la premiere onde

  ctx.beginPath();//On démarre un nouveau tracé
  ctx.moveTo(dx, (dy/6)-5); // trace axe des abscisses
  ctx.lineTo(0,(dy/6)-5); // première droite
  ctx.moveTo(0 , 0 );
  ctx.lineTo( 0 , dy); // trace les ordonnees
  ctx.lineWidth = 2; // épaisseur du trait
  ctx.stroke();}



function repere2(){          //fonction tracage du repere de la deuxieme onde

  ctx.beginPath();
  ctx.moveTo(dx, (3*dy/6)-33); 
  ctx.lineTo(0,(3*dy/6)-33); 
  ctx.moveTo(0 , 0 );
  ctx.lineTo( 0 , dy); 
  ctx.lineWidth = 2; 
  ctx.stroke();}



function repere3(){     //fonction traçage du repere pour la somme des deux ondes


  ctx.beginPath();
  ctx.moveTo(dx, (5*dy/6)-39); 
  ctx.lineTo(0,(5*dy/6)-39); 
  ctx.moveTo(0 , 0 );
  ctx.lineTo( 0 , dy); 
  ctx.lineWidth = 2; 
  ctx.stroke();}


// le tracage du repere pour les 3 ondes aurait pu se faire dans la meme fonction, mais on a prefere le faire en 3 fois pour plus de lisibilite.  

repere1();            //tracage des 3 reperes au chargement de la page
repere2();
repere3();


function draw(){         //tracage des 3 ondes
  abs=abs+0.05;
  ctx.clearRect(0,0,dx,dy);

  repere1();
  repere2();              //retracage des repere a chaque fois que draw est relance pour permettre a l'onde de se deplacer
  repere3();


  var k = document.getElementById("amplitude").value;             //variable de l amplitude pour la premiere fonction
  var t1 = document.getElementById("periode").value;              //variable de la periode pour la premiere fonction
  var r = document.getElementById("amplitude2").value;            //variable de l amplitude pour la deuxieme fonction  
  var t2 = document.getElementById("periode2").value;             //variable de la periode pour la deuxieme fonction


 
  for( var i= -dx ; i < dx ; i+=0.01 ){ 


	 var x = dx/2 +t1*i;                                             //tracage de la premiere onde
	 var y = dy/6 - (k*f(2*Math.PI*(i-abs-Math.PI*deph))) -6; 
	 ctx.fillStyle='red';
	 ctx.fillRect( x , y , 3 ,3 ); 



	 var x2 = dx/2 + t2*i; 
	 var y2 = 3*dy/6 - (r*fbis(2*Math.PI*(i-abs-Math.PI*deph2)))-34;  //tracage de la deuxieme onde
	 ctx.fillStyle='blue';
	 ctx.fillRect( x2 , y2 , 3 ,3 ); 



	 var x3 = (x+x2)/2;
	 var y3 = (y+y2)+dy/6;                                             //tracage de la somme des deux ondes
	 ctx.fillStyle='purple';
	 ctx.fillRect( x3 , y3 , 3 ,3 ); 



}

}

}





 




   
   

