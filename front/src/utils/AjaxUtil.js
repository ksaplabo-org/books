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

    const url = '/api/book';

    return axios.post(url , {
            "isbn": isbn,
            "book_id": isbn,
            "title": title,
            "description": description,
            "imgUrl": imgUrl
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

export function postUser(userModel) {
    const url = '/api/user'

    return axios.post(url, {
        "userId": userModel.userId,
        "userName": userModel.userName,
        "password": userModel.password,
        "gender": userModel.gender,
        "userAuth": userModel.userAuth
    })
}

export function putUser(userModel) {
    const url = '/api/user';
    
    return axios.put(url, {
        "userId": userModel.userId,
        "userName": userModel.userName,
        "password": userModel.password,
        "gender": userModel.gender,
        "userAuth": userModel.userAuth
    })
}

export function deleteUser(userId) {

    const url = '/api/user/' + userId;

    return axios.delete(url);
}

export function getAllBook() {
    
    const url = '/api/book';

    return axios.get(url , {
            params: {}
        }
    );
}

export function getLendingAllBook(userName) {
    const url = '/api/book/' + userName;
    return axios.get(url);
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