type Response = {
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
    [key: string]: any;
}

const catchError = (response: Response) => {
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

export const fetchCoordinates = (postcode: string): Promise<Coordinates> =>
    fetch(`https://api.postcodes.io/postcodes/${postcode}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'GET'
    })
        .then((res) => catchError(res))
        .then(res => res.json());