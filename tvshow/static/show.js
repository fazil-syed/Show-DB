let poster = document.querySelector('.poster')
let content = document.querySelector('.info')
window.onload = async ()=>{
    addPoster()
    addAbout()
    addCast()
}
const apiCall =async ()=>{
    const searchId = document.querySelector('.show-id').id;
    const config = {
        params: {
            thetvdb: searchId
        }
    }
    const res = await axios.get(`https://api.tvmaze.com/lookup/shows`,config);
    console.log(res.data)
    return res.data
}

async function apiCallCast(){
    const searchId = await apiCall();
    const res = await axios.get(`https://api.tvmaze.com/shows/${searchId.id}/cast`);
    console.log(res.data)
    return res.data
}
const addPoster =async ()=>{
    show = apiCall()
    show = await apiCall()
    const img = document.createElement('IMG');
    const title = document.createElement('H2');
    img.src= show.image.original;
    title.innerText = show.name
    title.classList.add("show-text")
    img.classList.add("img-fluid", "p-4", "show-img","mx-auto")
    poster.classList.add("show-poster", "text-center","my-2")
    poster.append(img)
    poster.append(title)
    
}
const addAbout = async()=>{
    removeContent()
    show = await apiCall()
    const p = document.createElement('div');
    p.classList.add("about-section")
    p.innerHTML = show.summary
    p.firstChild.classList.add("blockquote", "summary")
    content.append(p)
}

async function addCast(){
    removeContent()
    show = await apiCallCast();
    const div = document.createElement("DIV");
    const head = document.createElement("DIV")
    const row = document.createElement("DIV");
    head.innerHTML= "<h2>Cast</h2>"
    head.classList.add("text-center")
    div.append(head)
    div.classList.add("container","cast-section")
    row.classList.add("row","casts")
    for(let result of show){
        if(result.person.image){
            const img = document.createElement('IMG');
            const col = document.createElement('DIV');
            const name = document.createElement('H6');
            name.innerHTML = result.person.name
            name.classList.add("name")
            col.classList.add("col-lg-4", "col-md-6", "col-sm-12", "image-col","text-center")
            img.src= result.person.image.medium;
            col.append(img)
            col.append(name)
            row.append(col);
            col.querySelectorAll('img').forEach((img) =>{
                img.classList.add("img-fluid", "p-4", "image")

            })
        }
    }
    div.append(row)
    content.append(div)
}
const removeContent =()=>{
    while (content.firstChild)
    content.removeChild(content.firstChild)
}