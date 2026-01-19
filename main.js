let tache = document.querySelector("#tacheInput");
let taches = [];
let personne = document.querySelector("#personneInput");
let btn = document.querySelector("#ajouterBtn");
let tab = document.querySelector("#tache tbody");
let statut = document.querySelector("#statut");

// =========================
// Sauvegarde des tâches
// =========================
function sauvegarderTaches() {
    let toutesLesTaches = []; // tableau temporaire pour stocker les infos de chaque ligne

    // parcourir chaque ligne du tableau
    tab.querySelectorAll("tr").forEach(tr => {
        toutesLesTaches.push({
            tache: tr.children[0].textContent,
            personne: tr.children[1].textContent,
            statut: tr.children[2].querySelector("button").textContent
        });
    });

    // stocker le tableau en JSON dans localStorage
    localStorage.setItem("taches", JSON.stringify(toutesLesTaches));
}

// =========================
// Chargement des tâches depuis le storage
// =========================
function chargerTaches() {
    let tachesStockees = localStorage.getItem("taches");
    if (tachesStockees) {
        tachesStockees = JSON.parse(tachesStockees);
        tachesStockees.forEach(t => {
            tab.innerHTML += `<tr class="${t.statut === "Fait" ? "fait" : "afaire"}">
                <td>${t.tache}</td>
                <td>${t.personne}</td>
                <td><button>${t.statut}</button></td>
                <td><button>Supprimez</button> <button>Modifiez</button></td>
            </tr>`;
        });
    }
}

// Appel au chargement de la page
chargerTaches();

// =========================
// Ajout dans le tableau
// =========================
btn.addEventListener("click", () => {
    tab.innerHTML += `<tr class="afaire">
        <td>${tache.value}</td>
        <td>${personne.value}</td>
        <td><button>À faire</button></td>
        <td><button>Supprimez</button> <button>Modifiez</button></td>
    </tr>`;
    sauvegarderTaches();
});

// =========================
// Événements sur les boutons
// =========================
tab.addEventListener('click', (en) => {
    if (en.target.textContent === "Supprimez") {
        let tr = en.target.parentNode.parentNode;
        tr.remove();
        sauvegarderTaches();

    } else if (en.target.textContent === "Modifiez") {
        let tr_modif = en.target.parentNode.parentNode;
        tr_modif.children[0].textContent = prompt(tr_modif.textContent, tr_modif.children[0].textContent);
        tr_modif.children[1].textContent = prompt(tr_modif.textContent, tr_modif.children[1].textContent);
        sauvegarderTaches();

    } else if (en.target.textContent === "À faire") {
        en.target.textContent = "Fait";
        let tr = en.target.closest("tr");
        tr.className = "fait";
        sauvegarderTaches();

    } else if (en.target.textContent === "Fait") {
        en.target.textContent = "À faire";
        let tr = en.target.closest("tr");
        tr.className = "afaire";
        sauvegarderTaches();
    }
});
