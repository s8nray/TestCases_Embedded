import axios from 'axios';
var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};

class RestServices {

    constructor() {
        this.state = {}
    }

    
   

    async triggerTestCases(caseId) {
        return new Promise(async (resolve, reject) => {
            axios.get(`http://localhost:5000/triggerTestCase/${caseId}`)
                .then(res => {
                    resolve(res)
                    
                }, error => {
                    reject(error)
                });
        });
    }

    async success(name) {
        return new Promise(async (resolve, reject) => {
            axios.get(`http://localhost:5000/success/${name}`)
                .then(res => {
                    resolve(res)
                    console.log(res)
                }, error => {
                    reject(error)
                });
        });
    }

    
    async sendingData() {
        return new Promise(async (resolve, reject) => {
            axios.get("http://127.0.0.1:5000")
                .then(res => {
                    resolve(res)
                    console.log(res)
                }, error => {
                    reject(error)
                });
        });
    }

    

    async getUserTypes(id) {
        return new Promise(async (resolve, reject) => {
            axios.get(`http://localhost:4000/api/users/getUserTypes/${id}`)
                .then(res => {
                    resolve(res)
                }, error => {
                    reject(error)
                });
        });
    }

    async sendTestCases(){
        const dummyData =  [{'a':2,'b': {'c':'as','f':"True"},'d':7,}]
        
        return(
        axios.post("http://localhost:5000/triggerTestCase/",JSON.stringify({dummyData}))
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        } )
        )
    }
}

export default RestServices;