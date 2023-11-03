import { AdCardProps } from './AdCard'
import AdCard from './AdCard'
import styles from './RecentAds.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const RecentAds = (): React.ReactNode => {
  // const ads: AdCardProps[] = [
  //   {
  //     imgUrl: '/images/table.webp',
  //     link: '/ads/table',
  //     price: 120,
  //     title: 'Table',
  //     category: { id: 1, name: 'Ameublement' },
  //   },
  //   {
  //     imgUrl: '/images/dame-jeanne.webp',
  //     link: '/ads/dame-jeanne',
  //     price: 75,
  //     category: { id: 2, name: 'Décoration' },
  //     title: 'Dame Jeanne',
  //   },
  //   {
  //     imgUrl: '/images/bougie.webp',
  //     link: '/ads/bougie',
  //     price: 5,
  //     category: { id: 3, name: 'Décoration' },
  //     title: 'Bougie',
  //   },
  //   {
  //     imgUrl: '/images/porte-magazine.webp',
  //     link: '/ads/porte-magazine',
  //     price: 15,
  //     category: { id: 4, name: 'Ameublement' },
  //     title: 'Porte magazine',
  //   },
  //   {
  //     imgUrl: '/images/vaisselier.webp',
  //     link: '/ads/vaisselier',
  //     price: 200,
  //     category: { id: 5, name: 'Décoration' },
  //     title: 'Vaisselier',
  //   },
  //   {
  //     imgUrl: '/images/vide-poche.webp',
  //     link: '/ads/vide-poche',
  //     price: 10,
  //     category: { id: 6, name: 'Décoration' },
  //     title: 'Botte',
  //   },
  // ]

  // type AdAPIBack = {
  //   id: number
  //   title: string
  //   price: number
  //   picture: string
  //   location: string
  //   owner: string
  //   dateAtCreated: Date
  //   category: { id: number; name: string }
  // }

  const BASE_URL = 'http://localhost:5000/api/ads'
  const [total, setTotal] = useState(0)

  const addPrice = (price: number) => {
    const totalPrice = total + price
    setTotal(totalPrice)
  }

  const [ads, setAds] = useState<Partial<AdCardProps>[]>()

  // const getAdsFromAPI = async () => {
  //   try {
  //     const response = await axios.get(BASE_URL)
  //     const data = response.data

  //     setAds(data)
  //   } catch {
  //     console.error('error lors de la recuperation des Ads from server')
  //   }
  // }
  function refreshAds() {
   // getAdsFromAPI()
  }

  useEffect(() => {
    console.log(total)
  }, [total])

  useEffect(() => {
    //getAdsFromAPI()
  }, [])

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <div>Somme totale : {total == 0 ? '' : total} </div>
      <section className={styles['recent-ads']}>
        {ads?.map((ad) => (
          <div className="d-flex flex-col" key={ad.id}>
            {/* <pre>{JSON.stringify(ad, 0, null)}</pre> */}

            <AdCard
              title={ad.title}
              category={ad.category}
              location={ad.location}
              picture={ad.picture}
              link={`/ad/${ad.id}`}
              price={ad.price}
              id={ad.id}
              owner={ad.owner}
              dateAtCreated={ad.dateAtCreated}
              onDelete={refreshAds}
            />
            <div
              className="d-flex"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {/* <button */}
              {/*   style={{ */}
              {/*     width: '45%', */}
              {/*   }} */}
              {/*   id="selected" */}
              {/*   className={`button ${styles['button']} my-1 rainbow-text`} */}
              {/*   onClick={() => ad.price && addPrice(ad.price)} */}
              {/* > */}
              {/*   <span className="rainbow-text">Add price to total</span> */}
              {/* </button> */}
              {/* <button */}
              {/*   id="deleteAds" */}
              {/*   className={`button ${styles['button']} my-1 rainbow-text`} */}
              {/*   style={{ */}
              {/*     width: '45%', */}
              {/*   }} */}
              {/* > */}
              {/*   {' '} */}
              {/*   Supprimer{' '} */}
              {/* </button> */}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
export default RecentAds
