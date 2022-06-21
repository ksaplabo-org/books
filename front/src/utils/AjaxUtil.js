// Ajax通信ライブラリ
import axios from 'axios';

export function getAllSapBooks() {

    const url = '/api/book';

    return axios.get(url , {
            params: {}
        }
    );

}

export function rentalBooks(title, userName) {

    const url = '/api/book/rental';

    return axios.put(url , {
                title: title ,
                userName: userName
        }
    );
}

export function returnBooks(title) {

    const url = '/api/book/return';

    return axios.put(url , {
                title: title 
        }
    );
}

// takada
export function searchBooks(keyword) {
    // search url : google books api.
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + keyword.replace(' ','+');
    return axios.get(url);
}

export function addBook(title ,isbn ,description ,imgUrl){

    const url ='/api/book';

    return axios.post(url , {
                title: title ,
                isbn: isbn ,
                description: description ,
                imgUrl: imgUrl 
        }
    );
}

export function deleteBook(title){

    const url = '/api/book/' + title;

    return axios.delete(url);
}

export function getAllUser() {
    const url = '/api/user';

    return axios.get(url);
}

export function postCreateUser(userModel) {
    const url = '/api/user'

    return axios.post(url, {
        "userId": userModel.userId,
        "userName": userModel.userName,
        "password": userModel.password,
        "gender": userModel.gender,
        "userAuth": userModel.userAuth
    })
}