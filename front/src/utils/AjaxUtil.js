// Ajax通信ライブラリ
import axios from 'axios';

export function getAllSapBooks() {

    const url = '/api/book';

    return axios.get(url , {
            params: {}
        }
    );

}

export function getInformation() {
    const url = '/api/information';
    return axios.get(url);
}

export function searchBooks(keyword) {
    // search url : google books api.
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + keyword.replace(' ','+');
    return axios.get(url);
}

export function addBook(addBookModel){

    const url = '/api/book';

    return axios.post(url , {
            "isbn": addBookModel.isbn,
            "book_id": addBookModel.book_id,
            "title": addBookModel.title,
            "description": addBookModel.description,
            "img_url": addBookModel.img_url
        }
    );
}

export function deleteBook(title){
    const url = '/api/book/' + title;

    return axios.delete(url);
}

export function getAllUser() {
    const url = '/api/users';

    return axios.get(url);
}

export function getUser(searchWord=undefined, auth=undefined) {
    const url = '/api/users';
    const params = {
        searchWord: searchWord,
        auth: auth
    };
    
    return axios.get(url, {params: params});
}

export function getUserFindByIncludeIdOrName(searchWord) {
    const url = '/api/users/search/' + searchWord;
    return axios.get(url);

}

export function getUserFindById(userId) {
    const url = '/api/users/' + userId;

    return axios.get(url);
}

export function postUser(userModel) {
    const url = '/api/users'

    return axios.post(url, {
        "userId": userModel.userId,
        "userName": userModel.userName,
        "password": userModel.password,
        "gender": userModel.gender,
        "auth": userModel.auth,
        "address": userModel.address
    })
}

export function putUser(userModel) {
    const url = '/api/users';
    
    return axios.put(url, {
        "userId": userModel.userId,
        "userName": userModel.userName,
        "password": userModel.password,
        "gender": userModel.gender,
        "auth": userModel.auth,
        "address": userModel.address
    })
}

export function deleteUser(userId) {
    const url = '/api/users/' + userId;

    return axios.delete(url);
}

export function postLending(lendModel) {
    const url = '/api/lending'

    return axios.post(url, {
        "isbn": lendModel.isbn,
        "book_id": lendModel.book_id,
        "lending_user_id": lendModel.lending_user_id,
        "rental_date": lendModel.rental_date,
        "return_plan_date": lendModel.return_plan_date,
        "managed_user_id": lendModel.managed_user_id
    })
}

export function deleteLending(lendModel) {
    const url = '/api/lending'
    return axios.request({
        method: 'delete',
        url: url,
        data: {
            "isbn": lendModel.isbn,
            "book_id": lendModel.book_id,
            "lending_user_id": lendModel.lending_user_id
        }
    })
}

export function searchLendingBooks(userId) {
    const url = '/api/lending/' + userId;
    
    return axios.get(url);

}

export function getAllSearchBooks(searchWord) {
    const url = '/api/book/search/' + searchWord;
    return axios.get(url);

}

export function alreadyLending(alreadyModel) {
    const url = '/api/lending/already'
    return axios.post(url, {
        "isbn": alreadyModel.isbn,
        "lending_user_id": alreadyModel.lending_user_id
    })
}

export function getAllStudent() {
    const url = '/api/students';

    return axios.get(url);
}
