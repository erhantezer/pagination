import { useEffect } from "react";
import { useState } from "react"


function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';
  const getFetch = async () => {
    setLoading(true)
    try {
      const res = await fetch(url);
      const data = await res.json();

      //! yeni bir dizi oluşturmak 10 arlı 10 adet dizi oluşturma fonksiyonu
      const paginate = (follow) => {
        const itemsPerPage = 10;
        const numberOfPages = Math.ceil(follow.length / itemsPerPage);

        
        const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
          const start = index * itemsPerPage
          return
        })
      }

      setFollowers(data)
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
