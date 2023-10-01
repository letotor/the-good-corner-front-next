import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '@/components/AdCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import AdCard from '@/components/AdCard'
const Ads = () => {
  type AdCardProps = {
    id: number
    title: string
    price: number
    picture: string
    location: string
    owner: string
    dateAtCreated: Date
    link?: string
    category: { id: number; name: string }
  }

  const router = useRouter()
  const [adsByCategory, setAdsByCategory] = useState<Partial<AdCardProps>[]>()
  const BASE_URL = `http://localhost:5000/api/ads/`

  const getAdsByIdFromAPI = async (categoryIdFilter: number) => {
    try {
      const response = await axios.get(BASE_URL)
      const data = response.data

      setAdsByCategory(
        data.filter(
          (elt: Partial<AdCardProps>) => elt.category!.id == categoryIdFilter,
        ),
      )
    } catch {
      console.error('error lors de la recuperation des Ads from server')
    }
  }

  useEffect(() => {
    console.log(adsByCategory)
  }, [adsByCategory])

  useEffect(() => {
    console.log('id change')
    getAdsByIdFromAPI(Number(router.query.categoryId))
  }, [router.query.categoryId])
  return (
    <Layout title={'category Ads'}>
      <Link className="link-button " href="/">
        <button className=" my-1 button button-primary">Home</button>
      </Link>

      <h1 className={styles['ad-card-category']}>
        Category : {adsByCategory && adsByCategory[0]?.category?.name}
      </h1>
      {/* <div>{JSON.stringify(adsByCategory, 0, 2)}</div> */}
      {adsByCategory?.map((ads) => (
        <>
        <AdCard/>
          {/* <div>{ads?.title}</div>

          <div className={styles['ad-card-container']}>
            {ads.picture?.includes('http') && (
              <Image
                style={{ maxWidth: '200px' }}
                className={styles['ad-card-image']}
                src={ads.picture}
                alt={ads.title ?? 'noTitle'}
                quality={100}
                width="100"
                height="200"
              />
            )}
            <div className={styles['ad-card-main']}>
              <div className={styles['ad-card-text']}>
                <div className={styles['ad-card-title']}>{ads.owner}</div>
                <div className={styles['ad-card-title']}>{ads.title}</div>
                <div className={styles['ad-card-price']}>{ads.price} €</div>
              </div>
            </div>
          </div> */}
        </>
      ))}
    </Layout>
  )
}

export default Ads
