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

    let requestUrl = "";
    const queryString = Object.entries(params)
        .map((param) => {
            return `${param[1][0]}=${param[1][1]}`;
        })
        .join("&");

    if (options && options.method !== "GET") {
        requestUrl = url;
    } else {
        requestUrl = `${url}?${queryString}`;
    }

    const response = await fetch(requestUrl, {
        ...defaultOption,
        ...options
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
}
