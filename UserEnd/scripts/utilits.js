let response = async (path, type, data) => {
let resposnse
    if (type == "POST") {
         resposnse = await fetch(path, {
            method: type,
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json()
        }).catch(err => {
            console.log(err)
        })
    }
    else if (type == "GET") {
       resposnse = await  fetch(path + data).then(res => {
            return res
        }).then(res=>{
            return res.json()
        }).catch(err => {
            console.log(err)
        })
    }
    return resposnse;

}

let handleResponse = (response, url) => {
    if (response.success) {
        window.location.replace(url)
    }
    else if (response.error) {
        // handle the error
    }
}

export { response, handleResponse }