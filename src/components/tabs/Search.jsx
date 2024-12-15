import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Retrieve searches from localStorage
    const storedSearches = JSON.parse(localStorage.getItem("searches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleClose = () => {
    navigate(window.location.pathname, { replace: true });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 3) {
      const firstSearch = recentSearches[0] || "";

      // Check if the current search matches the start of the first item
      if (firstSearch.startsWith(value.slice(0, -1))) {
        const updatedSearches = recentSearches.filter(
          (item) => item !== firstSearch
        );
        updatedSearches.unshift(value); // Add the new search at the top
        setRecentSearches(updatedSearches);
        localStorage.setItem("searches", JSON.stringify(updatedSearches));
      } else if (!recentSearches.includes(value)) {
        // If the search is not in the list, add it
        const updatedSearches = [value, ...recentSearches];
        setRecentSearches(updatedSearches);
        localStorage.setItem("searches", JSON.stringify(updatedSearches));
      }
    }
  };

  const handleClear = () => {
    setRecentSearches([]);
    localStorage.removeItem("searches");
  };

  const handleDelete = (searchToDelete) => {
    const updatedSearches = recentSearches.filter(
      (search) => search !== searchToDelete
    );
    setRecentSearches(updatedSearches);
    localStorage.setItem("searches", JSON.stringify(updatedSearches));
  };

  return (
    <>
      <div
        className="bg-[rgba(0,0,0,0.7)] max-md:hidden cursor-pointer backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-[99] overflow-y-auto flex flex-col gap-2 items-center"
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-primary overflow-hidden flex mt-[100px] cursor-default text-white rounded-full w-[90%] max-w-[1000px] h-fit animate-fadeUp relative"
        >
          <div className="bg-secondry w-8 flex items-center justify-center pl-3">
            <FaSearch />
          </div>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            className="w-full p-2.5 outline-none bg-secondry"
            placeholder="Search for a game"
          />
          <div
            onClick={() => setSearch("")}
            className="bg-secondry w-8 flex items-center justify-center pr-3 cursor-pointer"
          >
            <IoMdClose />
          </div>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-secondry cursor-default text-white rounded flex-col w-[90%] max-w-[1000px] mt-4 px-4 py-5 animate-fadeUp relative"
        >
          <h1 className="py-5 text-center text-zinc-300">
            Search requires at least 3 characters.
          </h1>

          {recentSearches.length > 0 && (
            <>
              <div className="mt-4 text-zinc-300 flex items-center justify-between px-4">
                <h1>Recent Searches</h1>
                <button onClick={handleClear} className="text-red-500">
                  Clear All{" "}
                  {recentSearches.length > 0 && `(${recentSearches.length})`}
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 px-4 items-center">
                {recentSearches.map((searchItem, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleDelete(searchItem);
                      setSearch(searchItem);
                    }}
                    className="bg-primary text-sm rounded-full px-3 py-1 flex items-center"
                  >
                    <span className="text-white">{searchItem}</span>
                    <IoMdClose
                      className="ml-2 cursor-pointer text-white"
                      onClick={() => handleDelete(searchItem)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
