fetch("http://localhost:3000/api/teddies")
//Gestion d'erreur
    .then (gestionErreurs)
    .catch (function(error){
    //console.log(error)
        const erreurMessage = document.getElementById("erreurServeur")
        const erreurMessagePre = document.createElement("div")
        erreurMessagePre.classList.add("modal-dialog", "modal-dialog-centered")
        const erreurMessageText = `
            <div class="modal-content border-danger">
                <div class="modal-header">
                    <h5 class="modal-title text-danger">Erreur !</h5>
                    <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>-->
                </div>
                <div class="modal-body" id="typeErreur">
                    Le serveur a rencontré une erreur !<br>
                    <code>${error}</code><br>
                    Essayer de recharger la page ou revenir plus tard.<br>
                    Nous faisons notre possible pour remédier à ce problème.
                </div>
                <div class="modal-footer">
                    <a href="basket.html" class="btn btn-block btn-danger">Recharger la page</a>
                </div>
            </div>`
        erreurMessagePre.innerHTML = erreurMessageText
        erreurMessage.appendChild(erreurMessagePre)
    $('#erreurServeur').modal('show')
    })

//Construction lien panier avec compteur et tooltip
const teddyBasket = JSON.parse(localStorage.getItem('adoptionTeddies'))
const teddyBasketCount = document.getElementById("teddyBasketCount")
const teddyBasketLink = document.createElement("a")
teddyBasketLink.classList.add("nav-link", "text-primary", "h5")
teddyBasketLink.setAttribute("href", "basket.html")
if (teddyBasket){
    const teddyBasketText = `Panier <span class="badge badge-pill badge-dark text-light">${teddyBasket.length}</span>`
    teddyBasketLink.innerHTML = teddyBasketText
    teddyBasketCount.appendChild(teddyBasketLink)
}else{
    const teddyBasketText = `Panier <span class="badge badge-pill badge-dark text-light">0</span>`
    teddyBasketLink.innerHTML = teddyBasketText
    teddyBasketCount.appendChild(teddyBasketLink)
}
//Fonction Gestion Erreurs
function gestionErreurs(messageErreur) {
    if (!messageErreur.ok) {
        throw Error(messageErreur.statusText);
    }
    return messageErreur;
}
    //Construction H2 au nom du teddy
    const teddyName = document.getElementById("teddyH2Count")
    const h2Name = document.createElement("h2")
    h2Name.classList.add("h1", "text-center", "text-primary")
    if (teddyBasket){
        if (teddyBasket.length > 1) {
            const h2Text = `Vous avez choisi ${teddyBasket.length} oursons.`
            h2Name.innerHTML = h2Text
            teddyName.appendChild(h2Name)
            ConstrusctionDuPanier()
        } else if (teddyBasket.length == 1) {
            const h2Text = `Vous avez choisi ${teddyBasket.length} ourson.`
            h2Name.innerHTML = h2Text
            teddyName.appendChild(h2Name)
            ConstrusctionDuPanier()
        }
    } else {
        const h2Text = `Vous n'avez pas choisi d'ourson.`
        h2Name.innerHTML = h2Text
        teddyName.appendChild(h2Name)
        //Construction d'un panier vide...
        const teddyBasketNone = document.getElementById("teddiesBasketList")
        const divTeddyItemNone = document.createElement("div")
        divTeddyItemNone.classList.add("row", "p-0", "m-0", "align-items-center")
        const teddyBasketNoneContent = `
            <div class="col">
            <p class="text-center">Votre panier est tristement vide ...</p>
            <a href="index.html" class="btn btn-primary btn-block stretched-link">revenir à l'accueil</a>
            </div>`
        divTeddyItemNone.innerHTML = teddyBasketNoneContent
        teddyBasketNone.appendChild(divTeddyItemNone)
    }
    //Construction du panier
    function ConstrusctionDuPanier(){
        i = 0
        teddyTotalBasket = 0
        const teddyBasketItem = document.getElementById("teddiesBasketList")
        teddyBasket.forEach(teddyItem => {
            const divTeddyItem = document.createElement("div")
            divTeddyItem.classList.add("row", "p-0", "m-1", "bg-light", "justify-content-between", "align-items-center")
            //console.log(teddyItem[i])
            const teddyBasketItemContent = `            
                    <div class="col-2 p-1 d-none d-sm-block"><img src="${teddyItem.teddyImageUrl}" alt="${teddyItem.teddyName}" class="w-100 m-1"></div>
                    <div class="col-5 col-md-4 p-1">1x ${teddyItem.teddyName}</div>
                    <div class="col-4 col-md-3 p-1">${teddyItem.teddyColor}</div>
                    <div class="col-2  p-1">${teddyItem.teddyPrice} €</div>
                    <div class="col-1  p-1 RemoveBtn" id="${i}">
                        <button type="button" class="close text-danger" aria-label="Supprimer">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
            divTeddyItem.innerHTML = teddyBasketItemContent
            teddyBasketItem.appendChild(divTeddyItem)
            i++
            teddyTotalBasket= teddyTotalBasket + teddyItem.teddyPrice   
        })
        //Afficher le total du panier
        const teddyBasketTotal = document.getElementById("teddiesBasketTotal")
            const divTeddyBasketTotal = document.createElement("div")
            divTeddyBasketTotal.classList.add("row", "p-0", "m-1", "align-items-center")
            const teddyBaskettotalContent = `
                    <div class="col-6 p-0 m-0">pour un total de </div>
                    <div class="col-6 p-0 m-0 text-right">${teddyTotalBasket}.00 €</div>`
            divTeddyBasketTotal.innerHTML = teddyBaskettotalContent
            teddyBasketTotal.appendChild(divTeddyBasketTotal)
        //Bouton du panier pour valider ou vider
            const divTeddyBasketButtons = document.createElement("div")
            divTeddyBasketButtons.classList.add("row", "p-0", "m-1", "mt-3", "w-100", "justify-content-between", "flex-column", "flex-md-row")
            divTeddyBasketButtons.setAttribute("id", ConfirmDeleteBasket)
            const teddyBasketButtonContent = `
                    <div class="col-sm-12 col-md-6 p-1"><a href="#" class="btn btn-success btn-block" id="ValiderAdoption">Valider les adoptions</a></div>
                    <div class="col-sm-12 col-md-6 p-1"><a href="#" class="btn btn-danger btn-block" id="SupprimerAdoption">Annuler les adoptions</a></div>`
            divTeddyBasketButtons.innerHTML = teddyBasketButtonContent
            teddyBasketTotal.appendChild(divTeddyBasketButtons)
        //Afficher la demander "Vider le panier"
        const DeleteBasket = document.getElementById("SupprimerAdoption")
        DeleteBasket.addEventListener("click", function (event) {
                event.preventDefault()
                $('#EmptyBasket').modal('show')      
        })
        //Confirmer et vider le panier
        const ConfirmEmptyBasket = document.getElementById("ConfirmDeleteBasket")
        ConfirmEmptyBasket.addEventListener("click", function (event) {
                event.preventDefault()
                localStorage.removeItem('adoptionTeddies') 
                window.location.href ="basket.html"
        }) 
    //Supprimer un seul Teddy
    // on récupére l'article associé au bouton poubelle
    const RemoveBtn = document.getElementsByClassName('RemoveBtn')
    for (let i = 0; i < RemoveBtn.length; i++) {
        //Afficher la demander "Supprimer le Teddy"
        RemoveBtn[i].addEventListener('click', function (event) {
            event.preventDefault()
            const DeleteId = this.closest('.RemoveBtn').id
            $('#DeleteTeddy').modal('show')
            const ConfirmDeleteTeddy = document.getElementById("ConfirmDeleteTeddy")
            ConfirmDeleteTeddy.addEventListener("click", function (event) {
                //on supprime l'article du localStorage
                teddyBasket.splice(DeleteId, 1)
                // //on réécris le nouveau localstorage
                localStorage.setItem('adoptionTeddies', JSON.stringify(teddyBasket))
                JSON.parse(localStorage.getItem('adoptionTeddies'))
                // //on alerte et redirige
                // //alert('Cet article a bien été supprimé !')
                window.location.href = "basket.html"
            })
        })
    }
    //Création du formulaire pour passer commande
    //Afficher la modal du formulaire
    const ValiderAdoption = document.getElementById("ValiderAdoption")
    ValiderAdoption.addEventListener("click", function (event) {
            event.preventDefault()
            $('#FormCommand').modal('show')      
    })
    // Verification validité prénom, nom, ville
    function valideDivers(value) { return /^[A-Z-a-z\s]{3,40}$/.test(value)}
    // Verification validité adresse
    function valideAdresse(value) { return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)}
    // Verification validité mail
    function valideEmail(value) { return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)}
    // Vérification de la validité du nom
    const nom = document.getElementById("formNom")
    nom.addEventListener("change", function (event) {
        if (valideDivers(nom.value)) {
        } else {
            // alert( "Erreur de nom!")
            event.preventDefault()
        }
    })
    // Vérification de la validité du prenom
    const prenom = document.getElementById("formPrenom")
    prenom.addEventListener("change", function (event) {
        if (valideDivers(prenom.value)) {
        } else {
            // alert( "Erreur de prénom!")
            event.preventDefault()    
        }
    });
    // Vérification de la validité de l'adresse
    const adresse = document.getElementById("formAdresse")
    adresse.addEventListener("change", function (event) {
        if (valideAdresse(adresse.value)){
        } else {
            // alert( "Erreur d'adresse!")
            event.preventDefault()
        }
    });
    // Vérification de la validité de la ville
    const ville = document.getElementById("formVille")
    ville.addEventListener("change", function (event) {
        if (valideDivers(ville.value)) {
        } else {
            // alert( "Erreur de ville!")
            event.preventDefault()
        }
    });
    // Vérification de la validité du mail
    const email = document.getElementById("formEmail")
    email.addEventListener("change", function (event) {
        if (valideEmail(email.value)){
        } else {
            // alert( "Erreur d'email!")
            event.preventDefault()
        }
    });
    //Si tout est correctement rempli alors on passe à la commande
    const ValidateCommand = document.getElementById("ValiderCommande")
    ValidateCommand.addEventListener("click", function (event) {
        event.preventDefault();
        if(     valideDivers(nom.value) && 
                valideDivers(prenom.value) && 
                valideAdresse(adresse.value) && 
                valideDivers(ville.value) && 
                valideEmail(email.value)){    
            //on créer un total
            localStorage.setItem('montantCommande', teddyTotalBasket);
            const montantCommande = localStorage.getItem('montantCommande');
            //console.log(montantCommande);
            //on crée un contact
            const contact = {
                lastName: nom.value,
                firstName: prenom.value,
                address: adresse.value,
                city: ville.value,
                email: email.value
            }
            //console.log(contact);
            //on crée la liste
            const products = [];
            for (storedTeddy of teddyBasket) {
                const productsId = storedTeddy.teddyId;
                products.push((productsId));
            }
            //console.log(products);
            //on rassemble le tout
            const infosCommande = {contact, products }
            // on envoie
            const envoieCommande = async function (numeroCommande){
                try {
                    const retourServeur = await fetch("http://localhost:3000/api/teddies/order", {
                        method: "POST",
                        body: JSON.stringify(numeroCommande),
                        headers: {"Content-Type": "application/json"}
                    })
                    if(retourServeur.ok) {
                        const numeroCommande = await retourServeur.json()
                        //console.log(numeroCommande.orderId)
                        localStorage.setItem("numeroCommande", numeroCommande.orderId)
                        window.location = "confirm.html"
                        localStorage.removeItem("adoptionTeddies")
                    } else {
                        event.preventDefault()
                        //console.log('Retour du serveur : ', retourServeur.status)
                        //alert('Erreur rencontrée : ' + retourServeur.status)
                        const erreurMessage = document.getElementById("erreurServeur")
                        const erreurMessagePre = document.createElement("div")
                        erreurMessagePre.classList.add("modal-dialog", "modal-dialog-centered")
                        const erreurMessageText = `
                            <div class="modal-content border-danger">
                                <div class="modal-header">
                                    <h5 class="modal-title text-danger">Erreur !</h5>
                                    <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>-->
                                </div>
                                <div class="modal-body" id="typeErreur">
                                    Le serveur a rencontré une erreur !<br>
                                    <code>${retourServeur.status}</code><br>
                                    Essayer de recharger la page ou revenir plus tard.<br>
                                    Nous faisons notre possible pour remédier à ce problème.
                                </div>
                                <div class="modal-footer">
                                    <a href="basket.html" class="btn btn-block btn-danger">Recharger la page</a>
                                </div>
                            </div>`
                        erreurMessagePre.innerHTML = erreurMessageText
                        erreurMessage.appendChild(erreurMessagePre)
                        $('#erreurServeur').modal('show')
                    } 
                } catch (error) {
                    //alert("Erreur : " + error)
                    const erreurMessage = document.getElementById("erreurServeur")
                    const erreurMessagePre = document.createElement("div")
                    erreurMessagePre.classList.add("modal-dialog", "modal-dialog-centered")
                    const erreurMessageText = `
                        <div class="modal-content border-danger">
                            <div class="modal-header">
                                <h5 class="modal-title text-danger">Erreur !</h5>
                                <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>-->
                            </div>
                            <div class="modal-body" id="typeErreur">
                                Le serveur a rencontré une erreur !<br>
                                <code>${error}</code><br>
                                Essayer de recharger la page ou revenir plus tard.<br>
                                Nous faisons notre possible pour remédier à ce problème.
                            </div>
                            <div class="modal-footer">
                                <a href="basket.html" class="btn btn-block btn-danger">Recharger la page</a>
                            </div>
                        </div>`
                    erreurMessagePre.innerHTML = erreurMessageText
                    erreurMessage.appendChild(erreurMessagePre)
                    $('#erreurServeur').modal('show')
                } 
            }
            envoieCommande(infosCommande)
        }else{
            //console.log('Commande non envoyé')   
            //modal erreur
            $('#erreurFormulaire').modal('show') 
        }
    })
}