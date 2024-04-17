

const dateFormatter = new Intl.DateTimeFormat('pt-BR')
class RatingsList extends HTMLElement {
    key = "ratings"
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.render()
        document.addEventListener('allDataLoaded', () => {
            const ratings = window.pageData.find(data => data.key === this.key);
            this.render(ratings.data)
        })

        document.addEventListener('ratingAdded', () => {
            const newRating = window.newRating
            const ratings = window.pageData.find(data => data.key === this.key);
            ratings.data.unshift(newRating)
            this.render(ratings.data)
        })
    }

    render(data) {
        this.shadowRoot.innerHTML = `
        <section id="rating-list" class="ratings-container">
        <link rel="stylesheet" href="./src/components/RatingsList/RatingsList.css">
            <ul class="ratings-list-root">
                ${
                    data ?
                   this.buildUi(data):
                    this.buildShadows()

                }
            </ul>
        </section>
        `
    }

    buildUi(data) {
        return data.map(rating => {
            console.log(rating)
            return `
                <li class="ratings-list-item">
                    <div class="rating-user-box-info">
                        <div class="avatar-box">
                            <img src="${rating.user_image_url}"  alt="level-img" class="avatar-left" loading="lazy />
                            <img src="${rating.user_image_url}" alt="profile picture" class="avatar-rigth"/>
                        </div>
                        <div class="user-info">       
                            <h1 class="rating-list-user-name">${rating.user_name}</h1>
                            <p class="rating-timestamp">${dateFormatter.format(new Date(rating.date))} </p>
                        </div>
                    </div>   
                    <div class="review-box">
                        <p class="rating-list-item-review"> "${rating.review}"</p>
                        <div class="footer-info">
                            <span>${rating.establishment_name}</span>
                            <span>${rating.stars} ⚡️</span>
                        </div>
                    </div>
                    
                </li>`
        }).join('')
    }

    buildShadows() {
        return  Array.from({length: 7}).map(() => {
           return `
                <ul class="list-root skeleton">
                    <li class="list-item-skeleton">
                        <div class="first-box-skeleton">
                            <div class="avatar-skeleton"></div>
                            <div>
                                <div class="user-name-skeleton"></div>
                                <div class="timestamp-skeleton"></div>
                            </div>
                        </div>

                        <div class="review-box-skeleton">
                            <div class="review-row-skeleton"></div>
                            <div class="review-row-skeleton"></div>
                            <div class="review-row-skeleton"></div>
                        </div>
                    </li>
                </ul>
            `

        }).join('')
        
        
    }

}


customElements.define('ratings-list', RatingsList)