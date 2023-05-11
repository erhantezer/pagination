import { useEffect } from "react";
import { useState } from "react"


function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [veri, setVeri] = useState([]);
  const [followers, setFollowers] = useState([]);

  const url = 'https://api.github.com/users/erhantezer/followers?per_page=100';

  useEffect(() => {
    if (loading) return
    setFollowers(veri[page])
  }, [loading, page]);

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
          return follow.slice(start, start + itemsPerPage)
        })
        return newFollowers
      }

      setVeri(paginate(data))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getFetch()
  }, []);

  const prevPage = () => {
    setPage((oldPage) => {
      let newPage = oldPage - 1
      if (newPage < 0) {
        return followers.length - 1
      }
      return newPage;
    })
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let newPage = oldPage + 1;
      if (newPage > followers.length - 1) {
        newPage = 0;
      }
      return newPage
    })
  }

  const handlePage = (index) => {
    setPage(index)
  }

  return (
    <>
      <main>
        <div className="section-title">
          <h1>{loading ? 'loading...' : 'pagination'}</h1>
          <div className="underline"></div>
        </div>
        <section className="followers">
          <div className="container">
            {followers?.map((follower, i) => {
              const { avatar_url, html_url, login } = follower;
              return (
                <article key={i} className='card'>
                  <img src={avatar_url} alt={login} />
                  <h4>${login}</h4>
                  <a href={html_url} className='btn'>
                    view profile
                  </a>
                </article>
              )
            })}
          </div>

          {!loading && (
            <>
              <div className="btn-container">
                <button className="prev-btn" onClick={prevPage}>
                  prev
                </button>
                {veri?.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`page-btn ${index === page ? 'active-btn' : null}`}
                      onClick={() => handlePage(index)}
                    >
                      {index + 1}
                    </button>
                  )
                })}
                <button className="next-btn" onClick={nextPage}>
                  next
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  )
}

export default App
