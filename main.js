let tache = document.querySelector("#tacheInput");
let personne = document.querySelector("#personneInput");
let btn = document.querySelector("#ajouterBtn");
let tab = document.querySelector("#tache tbody")


btn.addEventListener("click", () => {
   
    
    tab.innerHTML+=`<tr><td>${tache.value}</td><td>${personne.value}</td><td><button>Supprimez</button> <button>Modifiez</button></td></tr>`;
   
    
})

tab.addEventListener('click', (en) => {
    
    if (en.target.textContent === "Supprimez") {
        let tr = en.target.parentNode.parentNode;
        tr.remove();
        
    } else if (en.target.textContent === "Modifiez") {
        let tr_modif = en.target.parentNode.parentNode;
        console.log(tr_modif);
        

        tr_modif.children[0].textContent = prompt(tr_modif.textContent, tr_modif.children[0].textContent);
        tr_modif.children[1].textContent = prompt(tr_modif.textContent, tr_modif.children[1].textContent);

    }

    
    
})

