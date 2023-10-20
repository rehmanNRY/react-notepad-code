const updateNote = async (newNote) => {
    const host = "http://localhost:5000";
    const url = `${host}/api/auth/addNote`;
    const authToken = localStorage.getItem("authToken");
    const bodyData = JSON.stringify({ newNote });
    const response = await fetch(url, {
        method: 'PUT',
        body: bodyData,
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken
        }
    });
    // eslint-disable-next-line
    const myJson = await response.json(); //extract JSON from the http response
    // if (myJson.success) {
    //     console.log("Note updated successfully");
    // }
    // else {
    //     console.log("Cannot update note some error occured")
    // }
};

export default updateNote;