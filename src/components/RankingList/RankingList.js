class RankingList extends HTMLElement {
    key = "ranking"
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });

        this.render();
        document.addEventListener('allDataLoaded', () => {
            const ranking = window.pageData.find(data => data.key === this.key);
            this.render(ranking.data)
        })


    }

    render(data) {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./src/components/RankingList/RankingList.css">
        <div id="ranking-list" class="ranking-list-container">
                    <h2 class="ranking-list-title${data? "" : "-skeleton"}">Destaques da semana</h2>
                    <ul class="users-ranking-list-root${data? "" : "-skeleton"}"">
                    ${
                        data?
                        this.buildUi(data)
                        :
                        ` <div class="list-header-skeleton"></div>` +
                        this.buildShadows()
                    }
                    </ul>
                    </div>
                    `
    }
                
    buildUi(data){
  
        return data.map((user, index) => {
            return `
                    <li class="user-ranking-item">
                        <div>
                        <span class="ranking-position">${index +1 }</span>
                        <span class="user-ranking-item-name">${user.name}</span>
                        </div>
                        <div class="user-ranking-item-info">
                        <img class="user-ranking-item-avatar" src="./icons/personas/${user.category_name}.svg">
                        <div class="user-ranking-item-score">${user.week_score}</div>
                        </div>
                        </li>`
                    }).join('')
                }
                
    buildShadows(){
        return Array.from({length: 8}).map(() => {
            return `
               
                <li class="user-ranking-item-shadow">
                    <div>
                        <span class="ranking-position"></span>
                        <span class="user-ranking-item-name"></span>
                    </div>
                    <div class="user-ranking-item-info">
                        <img class="user-ranking-item-avatar" src="">
                        <div class="user-ranking-item-score"></div>
                    </div>
                </li>`
        }).join('')
    }
}


customElements.define('ranking-list', RankingList)