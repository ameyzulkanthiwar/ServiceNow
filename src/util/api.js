export function getAllData() {
    return getFetch(
        "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidents"
    );
}

export async function insertData(param) {
    const options = {
        method: "POST",
        body: JSON.stringify(param)
    };
    return await getFetch(
        "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/insertIncident",
        {},
        options
    );
}

// Used the Facade Design Pattern
export function getFetch(url, params = {}, options = {}) {
    const defaultOption = {
        method: "GET",
        headers: { "Content-Type": "application/json", Accept: "application/json" }
    };

    return fetch(`${url}`, {
        ...defaultOption,
        ...options
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log("error", error);
        });
}
