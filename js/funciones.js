var audio_stop=false;
var indice_media=0;
var my_media = null;
var my_media_arr=Array();
var mediaTimer = null;

function loadHome()
{
	window.location.href="index_sesion.html";
}
function loadService()
{
	var vuelo=$.trim(document.getElementById("num_vuelo").value);
	var destino=$.trim(document.getElementById("destino").value);
	var puerta=$.trim(document.getElementById("puerta").value);
	var ruta=$.trim(document.getElementById("ruta").value);
	var embarque=$.trim(document.getElementById("embarque").value);
	var saludo=$.trim(document.getElementById("saludo").value);
	var bus=$.trim(document.getElementById("bus").value);
	var msg="";
	var paso=true;
	if(vuelo=="" || puerta=="")
	{
		msg="Todos los campos son obligatorios<br>";
		paso=false;
	}
	if(!$.isNumeric(vuelo))
	{
		msg +="Vuelo debe ser num&eacute;rico<br>";
		paso=false;
	}
	if(paso)
	{
	$.mobile.loading( 'show', {
				text: 'Cargando...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
	$("#principal_home").load("http://www.chilemap.cl/lanProyect/home.php", 
					{vuelo:vuelo,destino:destino, puerta:puerta, ruta:ruta,embarque:embarque,saludo:saludo,bus:bus} 
						,function(){	
							$.mobile.loading( 'hide');	
							$('#principal_home').trigger('create');	
							loadSequence(vuelo);
							
							
						}
		);
	}else
		{
			openPopstatic(msg,0);
		}
	
}
function loadSequence(vuelo)
{
	$.mobile.loading( 'show', {
				text: 'Cargando...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
	$("#centro_div").load("http://www.chilemap.cl/lanProyect/botones.php", 
					{vuelo:vuelo} 
						,function(){	
							$.mobile.loading( 'hide');	
							
							
						}
		);
}
function loadSecuenciaBoton(vuelo)
{

	$.mobile.loading( 'show', {
				text: 'Cargando...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
	$("#centro_div").load("http://www.chilemap.cl/lanProyect/text.php", 
					{vuelo:vuelo} 
						,function(){	
							$.mobile.loading( 'hide');	
							
							
						}
		);
}


        // Play audio
        //
function playAudio(src) {
        	
            // Create Media object from src
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();

            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
            
        }

        // Pause audio
        //
        function pauseAudio() {
        	audio_stop=true;
            if (my_media) {
                my_media.pause();
            }
        }

        // Stop audio
        //
        function stopAudio() {
        	audio_stop=true;
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        }

        // onSuccess Callback
        //
        function onSuccess() {
        	
            //console.log("playAudio():Audio Success");
            
        }

        // onError Callback
        //
        function onError(error) {
           /* alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');*/
        }

        // Set audio position
        //
        function setAudioPosition(position) {
           // document.getElementById('audio_position').innerHTML = position;
        }
        function onStatus(st)
        {
        	
        	/*
        	Media.MEDIA_NONE = 0;
					Media.MEDIA_STARTING = 1;
					Media.MEDIA_RUNNING = 2;
					Media.MEDIA_PAUSED = 3;
					Media.MEDIA_STOPPED = 4;
        	*/
        	
        	if(st==4 && !audio_stop)
        	{        		
        		//alert("duration:"+my_media_arr[indice_media].getDuration());
        		indice_media++;
        		//alert("indice: "+indice_media);
        		if(indice_media < my_media_arr.length)
        		{
        			my_media= new Media( my_media_arr[indice_media], onSuccess, onError,onStatus);            
        			my_media.play();
        		}
        	}
        }
         function playAudioBienvenida(vuelo) 
         {
						vuelo_arr=vuelo.split(",");         	
        		indice_media=0;
        		audio_stop=false;
            // Create Media object from src
       			my_media_arr=Array();
            my_media_arr[0] = "http://www.chilemap.cl/lanProyect/voces/bienvenida.mp3";  
            for(i=0;i < vuelo_arr.length;i++)
            {          
            	
            	var b=i+1;
            
            	my_media_arr[b] = "http://www.chilemap.cl/lanProyect/voces/"+vuelo_arr[i]+".mp3";
          	}
            my_media_arr[vuelo_arr.length+1] = "http://www.chilemap.cl/lanProyect/voces/bienvenida2.mp3";
            my_media= new Media( my_media_arr[0], onSuccess, onError,onStatus);     
            my_media.play(); 
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            //console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }      
            /*alert(my_media.getDuration());
            alert(my_media2.getDuration());
            alert(my_media3.getDuration());*/
           /* my_media2 = new Media("http://www.chilemap.cl/lanProyect/voces/uno.mp3", onSuccess, onError);
            my_media2.play();
            my_media3 = new Media("http://www.chilemap.cl/lanProyect/voces/bienvenida2.mp3", onSuccess, onError);
            my_media3.play();*/

            // Play audio
            
					}
function goHome()
{
	window.location.href="index_sesion.html";
}        
function exit()
{
	window.location.href="index.html";
}     

function loadAjustes(vuelo,destino, puerta, ruta, embarque,bus,saludo)
{
	
	$.mobile.loading( 'show', {
				text: 'Cargando...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
	$("#centro_div").load("http://www.chilemap.cl/lanProyect/ajustes.php", 
					{vuelo:vuelo,destino:destino, puerta:puerta, ruta:ruta,embarque:embarque,saludo:saludo,bus:bus} 
						,function(){	
							$.mobile.loading( 'hide');	
							$('#centro_div').trigger('create');	
							
							
							
						}
		);
	
	
}
function saveService(vuelo,destino)
{
		var puerta=document.getElementById("puerta").value;
		var ruta=document.getElementById("ruta").value;
		var embarque=document.getElementById("embarque").value;
		var saludo=document.getElementById("saludo").value;
		var bus=document.getElementById("bus").value;
	$.mobile.loading( 'show', {
				text: 'Cargando...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
	$("#principal_home").load("http://www.chilemap.cl/lanProyect/home.php", 
					{vuelo:vuelo,destino:destino, puerta:puerta, ruta:ruta,embarque:embarque,saludo:saludo,bus:bus} 
						,function(){	
							$.mobile.loading( 'hide');	
							$('#principal_home').trigger('create');	
							loadSequence(vuelo);
							openPopstatic("Datos modificados",3000);
														
							
						}
		);
}
function openPopstatic(contenido,tiempo)
{
	$("#cont_static").html(contenido);
	$("#myPopup_static").popup("open");
	
	if(tiempo>0)
	{
		setTimeout(function() {

       $("#myPopup_static").popup("close");

    }, tiempo);
  }
}