import { SHA512, enc } from "crypto-js";

export async function getDestinations(callback) {
  const response = await fetch("https://localhost:8000/");
  const destinations = await response.json();
  callback(destinations);
}

export async function getHotels(params, callback) {
  const response = await fetch(
    `https://localhost:8000/results/${params.get(
      "dest_uid"
    )}?checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get(
      "checkOutDate"
    )}&numRooms=${params.get("numRooms")}&guests=${
      Number(params.get("numAdults")) + Number(params.get("numChildren"))
    }&currency=${params.get("currency")}`
  );
  const hotels = await response.json();
  callback(hotels);
}

// check
export async function getHotel(params, callback) {
  const response = await fetch(
    `https://localhost:8000/results/hotel/${params.get(
      "hotel_uid"
    )}?dest_uid=${params.get("dest_uid")}&checkInDate=${params.get(
      "checkInDate"
    )}&checkOutDate=${params.get("checkOutDate")}&numRooms=${params.get(
      "numRooms"
    )}&guests=${
      Number(params.get("numAdults")) + Number(params.get("numChildren"))
    }&currency=${params.get("currency")}`
  );
  const hotel = await response.json();
  callback(hotel);
}

export function postBooking(body) {
  return fetch("https://localhost:8000/booking", {
    method: "POST",
    mode: "cors",
    body: body,
    headers: { "Content-type": "application/json;charset=UTF-8" },
  }).then((response) =>
    response.json().then((data) => {
      return {
        status: response.status,
        booking_uid: data.booking_uid,
      };
    })
  );
}

export async function getBooking(params, callback) {
  const response = await fetch(
    `https://localhost:8000/summary/${params.get("booking_uid")}`
  );
  const booking = await response.json();
  callback(booking);
}

export function postRegister(body) {
  return fetch("https://localhost:8000/register", {
    method: "POST",
    mode: "cors",
    body: body,
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) =>
      response.json().then((data) => {
        console.log(data.user);
        return {
          status: response.status,
          valid: data.valid,
          token: data.token,
          user: data.user,
        };
      })
    )
    .catch((error) => {
      return { status: -1 };
    });
}

export function postLogin(body) {
  return fetch("https://localhost:8000/login", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ type: "query", username: body.username }),
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) =>
      response.json().then((data) => {
        return fetch("https://localhost:8000/login", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            type: "login",
            username: body.username,
            passwordHash: SHA512(body.password + data.salt).toString(
              enc.Base64
            ),
          }),
          headers: { "Content-type": "application/json;charset=UTF-8" },
        })
          .then((response) =>
            response.json().then((data) => {
              return {
                status: response.status,
                valid: data.valid,
                token: data.token,
                user: data.user,
              };
            })
          )
          .catch((error) => {
            return { status: -1 };
          });
      })
    )
    .catch((error) => {
      return { status: -1 };
    });
}

export function postLogout(body) {
  return fetch("https://localhost:8000/logout", {
    method: "POST",
    mode: "cors",
    body: body,
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) =>
      response.json().then((data) => {
        return {
          status: response.status,
          valid: data.valid,
        };
      })
    )
    .catch((error) => {
      return { status: -1 };
    });
}
