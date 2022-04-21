import {API} from "../../backend";
import { emptyCart } from "../../core/helper/cartHelper";


export const signup = user => {
    return fetch(`${API}user/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const signin = user => {
    const formData = new FormData();

    for (const name in formData){
        formData.append(name, user[name])
    }

    return fetch(`${API}/user/login`, {
        method: "POST",
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
        
    }
};

export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
        // TODO: compare JWT with database json token
    }else{
        return false;
    }
};

export const signout = next => {
    const userId = isAuthenticated() && isAuthenticated().user.id;

    if (typeof window !== undefined) {
        localStorage.removeItem("jwt");
        emptyCart(() => {});
        // next();

        return fetch(`${API}user/logout/${userId}`, {
            method: "GET"
        })
        .then(response => {
            console.log("Signout success")
            next();
        })
        .catch(err => console.log(err));
        
    }
};