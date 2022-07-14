export async function getDestinations(callback) {
    const response = await fetch("http://localhost:8000/");
    const destinations = await response.json();
    callback(destinations);
}

export async function getHotels(params, callback) {
    const response = await fetch(
        `http://localhost:8000/results/${params.get("dest_uid")}?checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&guests=${params.get("guests")}&currency=${params.get("currency")}`
    );
    const hotels = await response.json();
    callback(hotels);
}

// check
export async function getHotel(params, callback) {
    const response = await fetch(
        `http://localhost:8000/results/${params.get("dest_uid")}?${params.get("hotel_uid")}?checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&guests=${params.get("guests")}&currency=${params.get("currency")}`
    );
    const hotel = await response.json();
    callback(hotel);
}