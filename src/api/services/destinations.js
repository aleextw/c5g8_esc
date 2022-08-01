import { SHA512, enc } from "crypto-js";
import { config } from "../../config";

export async function getDestinations(callback) {
  const response = await fetch(`${config.apiURL}`);
  const destinations = await response.json();
  callback(destinations);
}

export async function getHotels(params, callback) {
  const response = await fetch(
    `${config.apiURL}/results/${params.get(
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
    `${config.apiURL}/results/hotel/${params.get(
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
  return fetch(`${config.apiURL}/booking`, {
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
    `${config.apiURL}/summary/${params.get("booking_uid")}`
  );
  const booking = await response.json();
  callback(booking);
}

export function postRegister(body) {
  return fetch(`${config.apiURL}/register`, {
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
  return fetch(`${config.apiURL}/login`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ type: "query", username: body.username }),
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) =>
      response.json().then((data) => {
        return fetch(`${config.apiURL}/login`, {
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
  return fetch(`${config.apiURL}/logout`, {
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

export function getUserBookings(body) {
  return fetch(`${config.apiURL}/summary`, {
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
          bookings: data.bookings,
        };
      })
    )
    .catch((error) => {
      return { status: -1 };
    });
}

export function getUserData(body, callback) {
  fetch(`${config.apiURL}/profile`, {
    method: "POST",
    mode: "cors",
    body: body,
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) =>
      response.json().then((data) => {
        console.log(data);
        callback({
          status: response.status,
          valid: data.valid,
          user: data.user,
        });
      })
    )
    .catch((error) => {
      callback({ status: -1 });
    });
}

export function postDeleteAccount(body) {
  return fetch(`${config.apiURL}/profile/delete`, {
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
