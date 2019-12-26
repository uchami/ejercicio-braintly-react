export const toggleFavs = (peli, favs) => {
    
    let newFavs;

    if(favs && favs.some(f => f.imdbID === peli.imdbID)){
        //is erasing
        newFavs = favs.filter(f => f.imdbID !== peli.imdbID);
    } else {
        //is adding
        newFavs = favs.concat([peli]);
    }

    localStorage.setItem("favs", JSON.stringify(newFavs));
    return newFavs;
}