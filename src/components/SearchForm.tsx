import { useEffect, useState } from "react";

export default function SearchForm() {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) return;

    fetch(
      `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
    );
  }, [searchText]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
