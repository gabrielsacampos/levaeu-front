
class Topcards extends HTMLElement {
    key = "topcards"
    cssPath = "./src/components/Topcards/Topcards.css"
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.render()
        document.addEventListener('allDataLoaded', () => {
            const topcardsData = window.pageData.find(data => data.key === this.key);
            this.render(topcardsData.data);
        });
        
        
        
    }

    render (data) {
        if(!data){         
            this.shadowRoot.innerHTML = `
            <link  rel="stylesheet" href="./src/components/Topcards/Topcards.css">
                <div class="skeleton-container">
                    <div class="skeleton"></div>
                    <div class="skeleton"></div>
                    <div class="skeleton"></div>
                    <div class="skeleton"></div>
                </div>
            `;
            return;        
        }
    
        this.shadowRoot.innerHTML = `
            <link id="topcards" rel="stylesheet" href="./src/components/Topcards/Topcards.css">
            <div class="topcards-container">
                <div class="topcards-root">
                    ${this.buildUi(data)}
                </div>
            </div>
        `;
    }
    

    buildUi(data){
        return data.map((item) => {
                const {tag: badge, description, name, ratings_avg: ratingsAvg, image_url} = item;
                console.log(ratingsAvg.toFixed(2))
                const badgeName = this.translateBadge(badge)
                return `
                    <div class="card" type="button" id="#${name}-card">
                        <img src=${image_url} class="card-establishment-img" loading="lazy" />
                        <div class="card-establishment">
                            <h1 class="card-establishment-title">${name}</h1>
                            <div class="card-rating">
                                <span>⚡️${ratingsAvg.toFixed(1)}</span>
                            </div>
                        </div>
                        <span class="card-badge-${badge}">${badgeName}</span>
                    </div>`;
        }).join('')
    }

    buildShadows(){
        
        
    }

    translateBadge(badge){
        switch(badge){
            case "advertising":
                return "Recomendado";
            case "popular":
                return "Popular 🚀";
            default:
                return "";
        }
    }


}


customElements.define('top-cards', Topcards)

