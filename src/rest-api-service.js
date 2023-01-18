const backEndUrl = "http://127.0.0.1:8080";

export class API {

    static async sendLikeChange(movieId, userId){

        //var data = JSON.stringify({name: droneName, command: _command, alt: alt});
    
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

    static async sendQuery(valueOfMovieID, valueOfFeature, userID){
        
        var queryName;

  

        switch (valueOfFeature) {
            case "Language":   queryName="similarByLanguage" ;
            break
            case "Production Company": queryName="similarByCompany";
            break
            // case "Title": ;
            default: queryName= null;
        }
        
        try {
            const resp = await fetch(backEndUrl+`movies/query?query_name=${queryName}&user_id=${userID}&input=${valueOfMovieID}`, {
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




}