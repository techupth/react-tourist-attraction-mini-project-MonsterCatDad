import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import link from "./assets/link-solid.svg";


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [copy, setCopy] = useState(false);

  const getDataAttraction = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${searchInput}`
    );
    setSearchResult(result.data.data);
    console.log(result);
  }

   useEffect(() => {
     getDataAttraction();
   }, [searchInput]);

  const clickInput = (string) => {
    if (searchInput) {
      setSearchInput(searchInput + " " + string);
    } else {
      setSearchInput(string);
    }
   }

   const toggle = () => {
    setShowFullDescription(!showFullDescription);
   }

  const delay = (delayTime) => {
    return new Promise(resolve => setTimeout(resolve, delayTime));
  };

  const onCopy = async() => {
    setCopy(true)
    await delay(3000);
    setCopy(false)
  }

  return (
    <main className="flex flex-col justify-center items-center m-20 font-[mitr]">
      <h1 className="text-5xl text-blue-500 font-bold">เที่ยวไหนดี</h1>
      <div className="flex flex-col w-8/12 my-8">
        <label htmlFor="input-massage">ค้นหาที่เที่ยว</label>
        <input
          className="text-center my-2 border border-b-zinc-500 outline-none"
          id="input-massage"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน"
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          value={searchInput}
        />
      </div>
      <ul className="flex flex-col h-fit gap-8">
        {searchResult.map((trips, index) => {
          return (
            <li
              key={index}
              className="flex gap-8 max-md:flex-col"
            >
              <div>
                <img
                  className="h-60 w-[500px] rounded-3xl"
                  src={trips.photos[0]}
                  alt="Photo Loading"
                />
              </div>
              <div className="flex flex-col h-fit w-full relative">
                <a
                  className="text-xl font-bold"
                  href={trips.url}
                  target="_blank"
                >
                  {trips.title}
                </a>
                <p>
                  {trips.description.slice(0, 100)}
                  {showFullDescription && trips.description.slice(100)}
                  <button onClick={(index) => {
                    toggle(index);
                  }}>...</button>
                </p>
                <a
                  className=" text-blue-500 underline"
                  href={trips.url}
                  target="_blank"
                >
                  อ่านต่อ
                </a>
                <div className="flex gap-2">
                  หมวด
                  {trips.tags.map((tag, index) => {
                    if (index === trips.tags.length - 1) {
                      return (
                        <p key={index}>
                          <span>และ </span>
                          <button
                            className="underline"
                            onClick={() => {
                              clickInput(tag);
                            }}
                          >
                            {tag}
                          </button>
                        </p>
                      );
                    } else {
                      return (
                        <p key={index}>
                          <button
                            className="underline"
                            onClick={() => {
                              clickInput(tag);
                            }}
                          >
                            {tag}
                          </button>
                        </p>
                      );
                    }
                  })}
                </div>
                <div className="flex">
                  {trips.photos.map((item, index) => {
                    if (index !== 0) {
                      return (
                        <img
                          key={index}
                          className="h-24 w-24 rounded-xl m-3 "
                          src={item}
                          alt="Photo Loading"
                        />
                      );
                    }
                  })}
                </div>
                <button
                  className="flex justify-center items-center h-16 w-16 border border-blue-500 rounded-full absolute right-36 bottom-0 max-lg:border-none max-lg:left-96"
                  onClick={() => {
                    navigator.clipboard.writeText(trips.url).then(onCopy);
                  }}
                >
                  <img src={link} alt="logo" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {copy && (
        <div className="sticky bottom-0">
          <span className="text-md text-black">
            Copy to clipboard successfully!
          </span>
        </div>
      )}
    </main>
  );
}

export default App;
