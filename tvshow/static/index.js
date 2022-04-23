const form = document.querySelector("#searchForm");
const h1 = document.querySelector("h1");
let div = document.querySelector("#tvShows");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = {
        params: {
            q: searchTerm
        }
    }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`,config);
    console.log(res.data)
    makeImages(res.data);
    form.elements.query.value = '';
})

const makeImages = function(shows) {
    removeImages();
    for(let result of shows){
        if(result.show.image){
            const img = document.createElement('IMG');
            const col = document.createElement('DIV');
            const title = document.createElement('H6');
            const anchor = document.createElement('A');
            anchor.href= "/show/"+result.show.externals.thetvdb
            title.innerHTML = result.show.name
            title.classList.add("title-text")
            col.classList.add("col-lg-4", "col-md-6", "col-sm-12", "image-col", "text-center")
            img.src= result.show.image.original;
            col.id = result.show.externals.imdb
            div.append(col);
            col.append(anchor)
            anchor.append(img)
            anchor.append(title)
            anchor.querySelectorAll('img').forEach((img) =>{
                img.classList.add("img-fluid", "p-4", "image")

            })
        }
  
    }
}
const removeImages = () =>
{
    div.querySelectorAll('*').forEach(n => n.remove());

}

function navMargin(){
    document.querySelector('#navbarSupportedContent').classList.toggle('nav-collapse-margin')
}