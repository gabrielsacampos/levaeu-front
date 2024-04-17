class StateManager {
    userContextId = 'uuid-luiza-santos'

    constructor(){
        this.state = {
            isLoading: true,
            data: [],
            errors: []
        }

        this.fetchData();
    }
    
    setLoading(loading){
        this.state.isLoading = loading;
    }
    
    
    async fetchData(){
        try{

            console.log('fetching data ☕️')
            const topcardsData = await this.fetchTopCardsData();
            this.state.data.push({key: "topcards", data: topcardsData})
            
            const rankingData = await this.fetchRankingData();
            this.state.data.push({key: "ranking", data: rankingData})
            
            const ratingsData = await this.fetchRatingsData();
            this.state.data.push({key: "ratings", data: ratingsData})
            
            const userData = await this.fetchUserData();
            this.state.data.push({key: "user", data: userData})

            const establishments = await this.fetchEstablishmentsData();
            this.state.data.push({key: "modal-rating", data: establishments})
            
            
            // Aplying a delay to simulate an external API request
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            window.pageData = this.state.data;
            document.dispatchEvent(new CustomEvent('allDataLoaded'));
            console.log('data fetched ✅')
            
            this.setLoading(false)
            console.log('building components ⚡️')

        }catch(error){
            console.error(error)
        }
    }


    async fetchRankingData(){
        try{
            return fetch('http://127.0.0.1:5000/users', {method: 'get' })
                .then(data => data.json())
        }catch(error){
            console.error(error)
        }
    }

    async fetchUserData(){
        try{
            return fetch(`http://127.0.0.1:5000/users/${this.userContextId}`, {method: 'get' })
                .then(data => data.json())
        }catch(error){
            console.error(error)
        }
    }

    async fetchTopCardsData(){
        try{
            return fetch('http://127.0.0.1:5000/establishments/topcards', {method: 'get' })
                .then(data => data.json())
        }catch(error){
            console.error(error)
        }
    }

    async fetchRatingsData(){
        try{
            return fetch('http://127.0.0.1:5000/ratings', {method: 'get' })
                .then(data => data.json())
        }catch(error){
            console.error(error)
        }
    }

    async fetchEstablishmentsData(){
        try{
            return fetch('http://127.0.0.1:5000/establishments', {method: 'get' })
                .then(data => data.json())
        }catch(error){
            console.error(error)
        }
    }

}    


new StateManager();

