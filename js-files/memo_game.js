let cards[];
fetch("/.vscode/cards.json")
.then((res)=>res.json)
.then((data)=>{
   cards=[...data,...data]
   mixcards();
})
function mixcards(){
    let currentIndex=cards.length,randomIndex;
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [cards[currentIndex], cards[randomIndex]] = [
          cards[randomIndex], cards[currentIndex]];
      }
}
