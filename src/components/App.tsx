import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async function () {
      const res = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const data = await res.json();
      setJobItems(data.jobItems);
      // console.log(data.jobItems);
    };

    fetchData();
  }, [searchText]);

  return (
    <>
      <Background />

      <Header searchText={searchText} setSearchText={setSearchText} />

      <Container jobItems={jobItems} />

      <Footer />
    </>
  );
}

export default App;
