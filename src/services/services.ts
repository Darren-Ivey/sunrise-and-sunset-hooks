type ResponseObj = {
    ok: boolean,
    status: number,
    [key: string]: any,
}

type Coordinates = {
    result: {
        latitude: string,
        longitude: string,
        [prop: string]: any;
    }
}

const catchError = (response: ResponseObj) => {
    if (!response.ok) {
        switch (response.status) {
            // Add more error codes as required
            case 404:
                throw new Error("NOT_FOUND");
            default:
                throw new Error("UNKNOWN_API_ERROR");
        }
    }
    return response;
};

export const fetchCoordinates = async (postcode: string) => {
    const res = await fetch(`https://api.postcodes.io/postcodes/${postcode}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'GET'
    })
    return catchError(res).json();
}