class Sidebar extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});

        this.render()
        this.addEventListener('allDataLoaded', () => {
            const data = window.pageData
            console.log(data)
            this.render(data)
        })

    }


    render(data){

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./src/components/Sidebar/Sidebar.css"> 
            <aside class="sidebar-container">
                <div class="logo-box">
                    <img src="./assets/logo.png"  class="logo"/>
                </div>
                        
                <ranking-list class="ranking-list-box"></ranking-list>       
                    
                <profile-card></profile-card>       
                
                <div class="footer">
                <p>
                    Proundly made in <img class="flag" src="./assets/pernambuco.png" /> with ☕️ and 💜
                </p>
                <p>
                ⚡️ Powered by <a href="https://nebulafy.dev" target="_blank">Nebulafy</a>
                </p>
        
                </div>
             </aside> 
        `
    }

}

customElements.define('side-bar', Sidebar)



