export const createRoom: (name: string) => Promise<{code: string}> = async (name) => {
    
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const data = {
        userId: name
    }

    const response = await fetch("https://paranoia-server.herokuapp.com/new-room", {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify(data)
    })

    if(response.status === 200) {
        const responseJSON = await response.json();
        return {code: responseJSON.data};

    } else {
        return {code: 'error'};
    }

}