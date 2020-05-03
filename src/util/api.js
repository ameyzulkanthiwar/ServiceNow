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

export function getDataByState(state) {
    const options = {
        method: "GET"
    };
    return getFetch(
        "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidentsByState",
        state,
        options
    );
}

// Used the Facade Design Pattern
export async function getFetch(url, params = {}, options = {}) {
    const defaultOption = {
        method: "GET",
        headers: { "Content-Type": "application/json", Accept: "application/json" }
    };

    if (options && options.method !== "GET") {
        return await fetch(`${url}`, {
            ...defaultOption,
            ...options
        })
            .then((response) => response.json())
            .catch((error) => {
                console.log("error", error);
            });
    }

    //  method is GET
    const queryString = Object.entries(params)
        .map((param) => {
            return `${param[1][0]}=${param[1][1]}`;
        })
        .join("&");
    return await fetch(`${url}?${queryString}`, {
        ...defaultOption
    }).then((response) => response.json());
}
