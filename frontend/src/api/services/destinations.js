export async function getDestinations(callback) {
    const response = await fetch("http://localhost:8000/");
    const destinations = await response.json();
    callback(destinations);
}

export async function getHotels(params, callback) {
    const response = await fetch(
        `http://localhost:8000/results/${params.get("dest_uid")}?checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&numRooms=${params.get("numRooms")}&guests=${Number(params.get("numAdults")) + Number(params.get("numChildren"))}&currency=${params.get("currency")}`
    );
    const hotels = await response.json();
    callback(hotels);
}

// check
export async function getHotel(params, callback) {
    const response = await fetch(
        `http://localhost:8000/results/hotel/${params.get("hotel_uid")}?dest_uid=${params.get("dest_uid")}&checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&numRooms=${params.get("numRooms")}&guests=${Number(params.get("numAdults")) + Number(params.get("numChildren"))}&currency=${params.get("currency")}`
    );
    const hotel = await response.json();
    callback(hotel);
}

export function postBooking(body) {
    return fetch("http://localhost:8000/booking", 
    {method: "POST",
     mode: "cors", 
     body: body, 
     headers: {"Content-type": "application/json;charset=UTF-8"}
    }).then(response => response.json().then(data => {
        return {
            "status": response.status,
            "booking_uid": data.booking_uid
        };
    }));
}