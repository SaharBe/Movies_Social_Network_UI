const API_URL = 'http://localhost:8080/Movies'

class UserServiceFetch{
    getUsers(){
        return fetch(API_URL).then((res => res.json()));
    }
}

export default new UserServiceFetch();