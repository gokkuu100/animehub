function displayANimes(){
let url = 'http://localhost:3000/animes'
  fetch(url)
  .then(res => res.json())
  .then(animes =>{
    let mainDisplay = document.querySelector('#mainDisplay')
    for (let anime of animes){
    mainDisplay.innerHTML += `
    <ul>
  <a href ="merch.html" id="aniPoster"><img src =${anime.poster}></a>
    <h2>${anime.title}</h2>
    <p>Released :${anime.release_date}</p>
    <p>Rating :${anime.rating}</p>
    <p>Episodes :${anime.episodes}</p>

    </ul>
    `
  let aniPoster = document.getElementById('aniPoster')
  aniPoster.addEventListener('click',function(e){
    e.preventDefault()
    displayMerch(anime.id)
  })

}})
}
displayANimes();

function displayMerch(id){
  fetch(" http://localhost:3000/merchandise/"+id)
  .then(res => res.json())
  .then(data =>{
    let merchDisplay = document.querySelector('#mainDisplay')
    for (let item of data){
      merchDisplay.innerHTML += `
      <ul>
    <h2>${item.product_name}</h2>
    <img src =${item.image}>
    <p>Description :${item.product_description}</p>
    <p>Price :${item.price}</p>
    <p>Category : <a href="#">${item.product_type}</a></p>
    </ul>`
    }
  })
}