import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import HotelCard from "./HotelCard";

const mockData = [
  {
    name: "Shangri-La Hotel Singapore",
    stars: 5,
    tags: [
      { id: "1", text: "Hotel" },
      { id: "2", text: "Popular" },
      { id: "3", text: "Family Friendly" }
    ],
    address: "22 Orange Grove Road",
    score: "Excellent Score",
    rating: 97,
    minPrice: 268,
    img:
      "https://ak-d.tripcdn.com/images/20020z000000mttx77BD6_R_550_412_R5_Q70_D.jpg"
  }
];

function Hotels() {
  let [state, setState] = React.useState({
    items: mockData
  });

  function fetchMoreData() {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs

    setTimeout(() => {
      setState({
        items: state.items.concat([
          {
            name: "Shangri-La Hotel Singapore",
            stars: 5,
            tags: [
              { id: "1", text: "Hotel" },
              { id: "2", text: "Popular" },
              { id: "3", text: "Family Friendly" }
            ],
            address: "22 Orange Grove Road",
            score: "Excellent Score",
            rating: 97,
            minPrice: 268,
            img:
              "https://ak-d.tripcdn.com/images/20020z000000mttx77BD6_R_550_412_R5_Q70_D.jpg"
          }
        ])
      });
    }, 100000);
  }

  return (
    <div>
      <h1>Hotels</h1>
      <hr />
      <div id="scrollableDiv" style={{ height: 800, width:500, overflow: "auto" }}>
        <InfiniteScroll
          dataLength={state.items.length}
          next={fetchMoreData()}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {state.items.map((entry) => (
            <div>
              <HotelCard
                name={entry.name}
                stars={entry.stars}
                rating={entry.rating}
                price={entry.minPrice}
                address={entry.address}
                tags={entry.tags}
                score={entry.score}
                img={entry.img}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Hotels;
