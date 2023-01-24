const backEndUrl = "http://127.0.0.1:8080";

export class API {

    static async sendLikeChange(movieId, userId){

        try {
            const resp = await fetch(backEndUrl+`/change-like?user_id=${userId}&movie_id=${movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            return await resp.json();
        } catch (error) {
            return console.log(error);
        }
    }

    static async createNewUser(uname, pass){

        var data = JSON.stringify({user_name: uname, password: pass});

        try {
            const resp = await fetch(backEndUrl+"/create-user", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: data
            });
            return await resp.json();
        } catch (error) {
            console.log(error);
            return 404;
            
        }
    }

    static async sendQuery(queryName, userID, input){
        

        try {
            const resp = await fetch(backEndUrl+`movies/query-like?query_name=${queryName}&user_id=${userID}&input=${input}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await resp.json();
        } catch (error) {
            return console.log(error);
        }
    }


    static async sendUserData(uname,pass){

        var data = JSON.stringify({user_name: uname, password: pass});
    
        try {
            const resp = await fetch(backEndUrl+"/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data
                
            })
            //console.log(resp.json());
            return await resp.json();
        } catch (error) {
            return console.log("sahar");
        }
    }




}