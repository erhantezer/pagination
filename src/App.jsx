import { useEffect } from "react";
import { useState } from "react"


function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  const getFetch = () => {
    setLoading(true)
    try {
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getFetch()
  }, []);


  if (loading) {
    console.log("hello")
  }

  return (
    <>
      <section>

      </section>
    </>
  )
}

export default App
