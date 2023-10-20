const fetchNote = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const host = "http://localhost:5000";
            const url = `${host}/api/auth/getNote`;
            const authToken = localStorage.getItem("authToken");

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            });

            if (response.ok) {
                const myJson = await response.json();
                if (myJson.userNote) {
                    const note = myJson.userNote;
                    resolve(note); // Resolve with the note data
                } else {
                    resolve("Note data not found");
                }
            } else {
                reject("Request failed with status: " + response.status);
            }
        } catch (error) {
            reject("Some error occurred: " + error);
        }
    });
};

export default fetchNote;