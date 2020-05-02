export function getAllData() {
    return getFetch(
        "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidents"
    );
}

export function insertData(param) {
    return getFetch(
        "https://https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/insertIncident",
        param
    );
}

// Used the Facade Design Pattern
export function getFetch(url, params = {}) {
    const queryString = Object.entries(params)
        .map((param) => {
            return `${param[1][0]} = ${param[1][1]}`;
        })
        .join("&");

    console.log("Query string::", `${url}?${queryString}`);

    return fetch(`${url}?${queryString}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then((response) => response.json());
}
