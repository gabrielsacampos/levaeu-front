

class RatingModal extends HTMLElement {
    key = "modal-rating"
    myUser = ''
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    
        this.render()
        document.addEventListener('allDataLoaded', () => {
            const ratings = window.pageData.find(data => data.key === this.key);
            const user = window.pageData.find(data => data.key === 'user');
            console.log(user.data.id)
            this.myUser = user.data;
            this.render(ratings.data)
        })
    }

    render(data) {

        
        if(!data){
            this.shadowRoot.innerHTML = `

                <link rel="stylesheet" href="./src/components/RatingModal/RatingModal.css" >

               <section class="skeleton"> 
               </section>
               `

                return;
        }


        this.shadowRoot.innerHTML = `

        <link rel="stylesheet" href="./src/components/RatingModal/RatingModal.css" >

        <section class="call-to-rating-container">
            <img src="./icons/taken.svg" alt="rocket" class="taken-icon" />
            <button  class="call-to-review-button">Deixe sua marca na comunidade!</button>
        </section>
            
        
        <dialog class="rating-dialog-root">
            <form class="form">
                <div class="title">Vamos lá,<br><span>nos conte conte foi sua experiência!</span></div>
                <select class="select " name="establishment" placeholder="establishment" required >
                    <option value="" disabled selected>Selecione o estabelecimento</option>
                    ${
                        data?
                        this.insertEstablishments(data):
                        ''
                    }
                </select>


                <input class="input " name="review" placeholder="E ai? Como foi?" type="text" required oninvalid="this.setCustomValidity('Você precisa escrever alguma coisa na sua avaliação 🫠')" oninput="this.setCustomValidity('')">

                </div>
                <div class="rating-box">
                    <span>Qual sua nota?</span>
                    <span  class="rate">
                        <i data-value="1" class="gg-bolt"></i>
                        <i data-value="2" class="gg-bolt"></i>
                        <i data-value="3" class="gg-bolt"></i>
                        <i data-value="4" class="gg-bolt"></i>
                        <i data-value="5" class="gg-bolt"></i>
                    </span>
                    <div class="missing-stars-error">
                        <i>👆</i>
                        <span>Não ta esquecendo de nada não?</span>
                    </div>
                </div>

            <div class="form-footer">
                <button class="button-confirm submit">Avaliar <i class="gg-bolt"></i> </button>  
                <button class="button-confirm load" disabled><i class="gg-spinner-two"></i> </button>  
                <button class="button-confirm cancel" type="button">Cancelar</button>  
            </div>
            </dialog>
            
            <div id="snackbar">
                <img src="./assets/pale-no-messages.png" alt="satelite" class="radio-message" />
                Propagando seu relato para o cosmos ✅
            </div>

            <div id="snackbar-error">
                <img src="./assets/saboteur.png" alt="cutting line" class="radio-message error" />
                Sabotaram nossa conexão! Tente novamente mais tarde.
            </div>
            `
            
            this.LoadScript()
        }
        
        // <div id="snackbar">Desculpe! Estamos fora do sinal de alcance. Tente novamente depois ✅</div>
    insertEstablishments(data){
        return data.map((establishment) => {
            return `<option value="${establishment.id}">${establishment.name}</option>`
        })
    }

    LoadScript(){
        this.openButtonHandler();
        this.closeButtonHandler();
        this.boltsClickHandler();
        this.submitButtonHandler();
    }

    boltsClickHandler(){
        const bolts = this.shadowRoot.querySelectorAll('.gg-bolt');
        let selectedValue = 0;
        
        bolts.forEach(bolt => {
            bolt.addEventListener('click', (event) => {
                selectedValue = event.target.getAttribute('data-value');
                this.shadowRoot.querySelector('.rate').setAttribute('data-value', selectedValue);
                
                bolts.forEach(bolt => {
                    const innerBoltValue = bolt.getAttribute('data-value')
                    if(!innerBoltValue){
                        return;
                    }else if(innerBoltValue <= selectedValue){
                        bolt.classList.add('selected-bolt');
                    }else{
                        bolt.classList.remove('selected-bolt');
                    }
                    
                })
            });
        });


      
    }

    openButtonHandler() {
        const openDialogBtn = this.shadowRoot.querySelector('.call-to-review-button');
        openDialogBtn.addEventListener('click', () => {
            this.shadowRoot.querySelector('.rating-dialog-root').showModal();
        });
    }

    closeButtonHandler() {
        const closeDialogBtn = this.shadowRoot.querySelector('.cancel');
        closeDialogBtn.addEventListener('click', (event) => {
            this.shadowRoot.querySelector('.rating-dialog-root').close();
            event.preventDefault(false);
            this.clearForm();
        });
    }

    async submitButtonHandler() {
        const submitDialogBtn = this.shadowRoot.querySelector('.button-confirm');
        submitDialogBtn.addEventListener('click', async (event) => {
            const establishmentId = this.shadowRoot.querySelector('.select').value;
            const review = this.shadowRoot.querySelector('.input').value;
            const stars = this.shadowRoot.querySelector('.rate').getAttribute('data-value');
            event.preventDefault(false);

                    
            
            if(!stars){
                this.shadowRoot.querySelector('.missing-stars-error').style.display = 'flex';
                return;
            }

            if(!establishmentId){
                this.shadowRoot.querySelector('.select').classList.add('missing');
                return;
            }
            
            if(!review){
                this.shadowRoot.querySelector('.input').classList.add('missing');
                return;
            }

            const data = {
                id_establishment: establishmentId,
                establishment_name: this.shadowRoot.querySelector('.select').selectedOptions[0].text,
                review: review,
                stars: stars,
                id_user: this.myUser.id,
                user_name: this.myUser.name,
                user_image_url: this.myUser.image_url,
                date: new Date()
            }
            

            await this.handlePost(data);
            this.clearForm()
            this.showSuccessToaster()

            window.newRating = data;
            document.dispatchEvent(new CustomEvent('ratingAdded'));
        }); 
    }


    showSuccessToaster(){
        const x = this.shadowRoot.getElementById("snackbar");
        x.className = "show";
        setTimeout(() => x.className = x.className.replace("show", ""), 3000);
    }

    showErrorToaster(){
        const x = this.shadowRoot.getElementById("snackbar-error");
        x.className = "show-error";
        setTimeout(() => x.className = x.className.replace("show-error", ""), 3000);
    }

    clearForm(){
         // remove error message
         this.shadowRoot.querySelector('.missing-stars-error').style.display = 'none';
                
         // reset bolts
         const bolts = this.shadowRoot.querySelectorAll('.gg-bolt')
         bolts.forEach(bolt => bolt.classList.remove('selected-bolt'));

         
         // close form
         this.shadowRoot.querySelector('.rating-dialog-root').close();
         
         
         // reset values
         const select = this.shadowRoot.querySelector('.select');
         select.classList.remove('missing');
         select.value = '';

         const textInput = this.shadowRoot.querySelector('.input');
         textInput.classList.remove('missing');
         textInput.value = '';


         // reset buttons
            const loadButton = this.shadowRoot.querySelector('.load');
            loadButton.style.display = 'none';

            const confirmButton = this.shadowRoot.querySelector('.submit');
            confirmButton.style.display = 'flex';
    }

    async handlePost(data){

        const loadButton = this.shadowRoot.querySelector('.load');
        loadButton.style.display = 'block';
        loadButton.style.opacity = 1;

        const confirmButton = this.shadowRoot.querySelector('.submit');
        confirmButton.style.display = 'none';

        try{
            await new Promise((resolve, reject) => { setTimeout(resolve, 2000)})
            const response = await fetch('http://127.0.0.1:5000/ratings', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
                .then(response => response.json())
            
        }catch(error){
            console.error('Error:', error);
            this.showErrorToaster();
            this.clearForm();
        }
    }


}

customElements.define('rating-modal', RatingModal);