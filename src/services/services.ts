// @flow

const catchError = (response: any) => {
    if (!response.ok) {
        switch (response.status) {
            case 401:
                throw { error: "UNAUTHENTICATED" };
            case 404:
                throw { error: "NOT_FOUND" };
            default:
                throw { error: "UNKNOWN_API_ERROR" };
        }
    }
    return response;
};

const getOptions = {
    headers: {
        "Content-Type": "application/json"
    },
    method: 'GET'
};

export const fetchCoordinates = (postcode: string) =>
    fetch(`https://api.postcodes.io/postcodes/${ postcode }`, getOptions)
        .then((res) => catchError(res))
        .then(res => res.json());