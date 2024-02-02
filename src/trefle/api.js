export {Api}

class Api {
    static token

    static baseUrl(){
        return 'http://localhost:4000/trefleAux';
    }

    static get timeout(){
        return 60 * 1000;
    }

    static async fetch(url, secure, init = {}){
        if (secure && Api.token){
            if (!init.headers){
                init.headers = {}
            }
            init.headers['Authorization'] = `bearer ${Api.token}`
        }

        const controller = new AbortController()
        init.signal = controller.signal
        const timer = setTimeout(() => controller.abort(), Api.timeout)

        try {
            const response = await fetch(url, init)
            const text = await response.text()
            const result = text ? (JSON).parse(text) : {}
            if (result.code){
                throw result
            }
            return result
        } catch (error) {
            if (error.code){
                throw error
            }
            if (error.name === "AbortError"){
                throw { 'code': 98, 'description': error.message.toLowerCase() }
            } else if(error.name === "TypeError"){
                    throw {'code': 99, 'description': error.message.toLowerCase()}
                }
        } finally {
            clearTimeout(timer)
        }
    }

    static async get(url, secure){
        return await Api.fetch(url, secure, {})
    }

    static async post(url, secure, data){
        return await Api.fetch(url, secure, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        })
    }

    static async put(url, secure, data){
        return await Api.fetch(url, secure, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        })
    }

    static async delete(url, secure){
        return await Api.fetch(url, secure, {
            method: 'DELETE'
        })
    }
}