class ProfileCard extends HTMLElement {
    key = "user"
    constructor(){
        super();
        this.attachShadow({mode: 'open'});

        this.render()
        document.addEventListener('allDataLoaded', () => {
            const user = window.pageData.find(data => data.key === this.key);
            this.render(user.data);   
        });
    }

    render(data){
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./src/components/ProfileCard/ProfileCard.css">
            ${data ? this.buildUi(data) : this.buildShadows()}
                
        `
    }

    buildUi(data){
        return `
        <div class="card">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="card-inner">
        <div class="avatar-box">
                 <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  alt="level-img" class="avatar-left" />
                 <img src="./icons/personas/alien.svg" alt="profile picture" class="avatar-rigth"/>
             </div>
             
             <div class="welcome-box">
                <p>Oi, <span class="name">${data.name}</span> !</p>
                 <h1 class="level-title">Seu nível atual é <span class="level-title-type">CURIOSO</span></h1>
             </div>
        
        </div>
    </div>
        `
    }

    buildShadows(){
        return `
                <div class="skeleton">
                    <div class="card-skeleton"></div>
                </div>
            `
    }
}


customElements.define('profile-card', ProfileCard)
