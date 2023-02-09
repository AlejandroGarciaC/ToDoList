//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];
//Event listeners
eventListeners();
function eventListeners(){
    //Cuando el usuario agrega nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    //Cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];//Intenta encontrar el arreglo Tweets
        // en LS y si no lo encuentra asigna a tweets un arreglo vacio en vez de null\

        creaHTML();
    });
}

//Funciones

function agregarTweet(e){
    e.preventDefault();

    //Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet);

    //Validacion

    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return; //Evita que se ejecuten las siguientes lineas de codigo
    }
    const tweetObj = {
        id: Date.now(),
        tweet  // texto: tweet es igual a esto
    }

    //agregar al arreglo de tweets

    tweets = [...tweets,tweetObj];

    //Se crea HTML

    creaHTML();

    //Reiniciar el formulario
    formulario.reset();
}

//mostrar mensaje de error*****************
function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove(); //Elimina la alerta despues de 3 segundos
    }, 3000);
}

function creaHTML(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach(tweet =>{
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //Eliminar del doom
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');
            li.textContent = tweet.tweet;
            li.classList.add('elemento');
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}


//Agrega los tweets actuales a local Storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    creaHTML();
}