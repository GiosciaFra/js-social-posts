// Descrizione
// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
// Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post. 
// Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
// id del post, numero progressivo da 1 a n
// nome autore,
// foto autore,
// data in formato americano (mm-gg-yyyy),
// testo del post,
// immagine (non tutti i post devono avere una immagine),
// numero di likes.
// Non è necessario creare date casuali Per le immagini va bene 
// utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
// Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo
//  il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// BONUS
// Formattare le date in formato italiano (gg/mm/aaaa)
// Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali 
// dell'utente (es. Luca Formicola > LF).
// Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare 
// il contatore e cambiare il colore del bottone.
// Consigli del giorno:
// Ragioniamo come sempre a step. Prima scriviamo nei commenti la logica in italiano e poi traduciamo
//  in codice. console.log() è nostro amico. Quando un pezzo di codice funziona, 
//  chiediamoci se possiamo scomporlo in funzioni più piccole.




const posts = [
    {
        id: 1,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=171",
        author: {
            name: "Phil Mangione",
            image: "https://unsplash.it/300/300?image=15"
        },
        likes: 80,
        created: "2021-06-25"
    },
    {
        id: 2,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=112",
        author: {
            name: "Sofia Perlari",
            image: "https://unsplash.it/300/300?image=10"
        },
        likes: 120,
        created: "2021-09-03"
    },
    {
        id: 3,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=234",
        author: {
            name: "Chiara Passaro",
            image: "https://unsplash.it/300/300?image=20"
        },
        likes: 78,
        created: "2021-05-15"
    },
    {
        id: 4,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=24",
        author: {
            name: "Luca Formicola",
            image: ""
        },
        likes: 56,
        created: "2021-04-03"
    },
    {
        id: 5,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=534",
        author: {
            name: "Alessandro Sainato",
            image: "https://unsplash.it/300/300?image=29"
        },
        likes: 95,
        created: "2021-03-05"
    },
];
// console.log(posts)

const containerEl = document.querySelector('#container');

// memorizzo ID dei post apprezzati
const likedPosts = [];

// Funzione per aggiornare il contatore dei "Mi Piace" 
// e gestire il clic sul pulsante "Mi Piace"
function handleLikeClick(post, likeButtonEl, likeCounterEl) {
    const postId = post.id;
    const isLiked = likedPosts.includes(postId);

    if (!isLiked) {


        likeButtonEl.classList.add('like-button--liked');

        // incremento il contatore dei "Mi Piace"
        const likeCount = parseInt(likeCounterEl.textContent, 10) + 1;
        likeCounterEl.textContent = likeCount;

        // salvo l'ID del post nell'array dei post apprezzati
        likedPosts.push(postId);
    } else {
        // Se il post ha già il 'mi piace', decremento il contatore e cambio il colore del bottone
        likeButtonEl.classList.remove('like-button--liked');

        // decremento il contatore dei 'mi piace'
        const likeCount = parseInt(likeCounterEl.textContent, 10) - 1;
        likeCounterEl.textContent = likeCount;

        // trovo l'indice del post nell'array 
        const indexToRemove = likedPosts.indexOf(postId);

        // rimuovo l'id del post nell'array con .splice 
        likedPosts.splice(indexToRemove, 1);
    }
}

//creo la funzione per formattare la data in formato italiano(gg/mm/aaaa)
function formatDate(dateString) {
    const detail = { day: '2-digit', month: ' 2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT');
}

posts.forEach((post) => {

    // creo i post
    const newPost = document.createElement('div');
    newPost.classList.add('post');

    newPost.innerHTML = `
    <div class="post">
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                <img class="profile-pic" src=${post.author.image} alt=" ${post.author.name}">                    
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author"> ${post.author.name} </div>
                <div class="post-meta__time">${post.created}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${post.content}</div>
    <div class="post__image">
        <img src=${post.media} alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="#" data-postid="${post.id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
            </div>
        </div> 
    </div>            
    `;

    // Aggiungo la data formattata al post
    const formattedDate = formatDate(post.created);
    const postMetaTimeEl = newPost.querySelector('.post-meta__time');
    postMetaTimeEl.textContent = formattedDate;

    // 'appendo' i post alla pagina
    containerEl.append(newPost);

    // Seleziono il bottone 'mi piace' e il contatore dei 'mi piace' per il post corrente
    const likeButtonEl = newPost.querySelector('.js-like-button');
    const likeCounterEl = newPost.querySelector('.js-likes-counter');

    // console.log(likeButtonEl, likeCounterEl);

    const fallBackEl = newPost.querySelector('.profile-pic');
    
    if (post.author.image) {
        // se l'user ha l'immagine allora la prende con src
        fallBackEl.src = post.author.image;
    } else {   
        // altrimenti se l'immagine del profilo è assente, aggiungiamo il fallback

        // estraggo le iniziali del nome dell'user
        // utilizzo .split per dividere il nome completo dell'user in singole parole
        // utilizzo .map per estrarre la prima lettera di ogni parola
        // infine utilizzo .join per combinare le due iniziale
        const initials = post.author.name.split(' ').map(word => word[0].toUpperCase()).join('');

        fallBackEl.classList.add('profile-pic-default');
        // attraverso questo servizio che fornisce un'immagine temporanea di fallback, agli user senza
        // la foto profilo, verranno visualizzate le iniziale del nome 
        fallBackEl.src = `https://via.placeholder.com/100/0CD977/FFFFFF/?text=${initials}`;
    
        
    }


    likeButtonEl.addEventListener('click', (event) => {
        // con questo prevengo il comportamento di default (prima a ogni click sul mi piace,
        // la pagina tornava su da sola)
        event.preventDefault();

        // Utilizzo la funzione handleLikeClick per gestire il clic sul pulsante "Mi Piace"

        handleLikeClick(post, likeButtonEl, likeCounterEl);
        });


    });







