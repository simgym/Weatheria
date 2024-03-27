import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import StartingPage from "./components/StartingPage";
import FetchingData from "./components/FetchingData";
import DropdownMenuHolder from "./components/DropdownMenu";
import { searchActions } from "./store/searchInputValue";

import "./App.css";

function App() {
  const [location, setLocation] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchLocation, setSearchLocation] = useState<string>("");

  const appClassName = useAppSelector((state) => state.weather.appClassName);
  const searchInput = useAppSelector((state) => state.searchInput.search);

  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if ((event.target as Element).closest(".dropdown") === null) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  useEffect(() => {
    if (searchInput && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [searchInput]);

  const locationHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      let target = event.target as HTMLInputElement;
      setLocation(target.value);
      setIsActive(true);
      setIsDropdownOpen(false);
    }
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(event.target.value);
    dispatch(searchActions.updateSearch(event.target.value));
    setIsDropdownOpen(true);
  };

  return (
    <>
      <div className={appClassName}>
        <input
          ref={inputRef}
          type="text"
          id="location"
          placeholder="Search"
          className="search-bar"
          onKeyDown={locationHandler}
          onChange={searchHandler}
          value={searchInput}
        />
        {isDropdownOpen && searchLocation && (
          <DropdownMenuHolder search={searchLocation} />
        )}
        {isActive ? <FetchingData location={location} /> : <StartingPage />}
      </div>
    </>
  );
}

export default App;
