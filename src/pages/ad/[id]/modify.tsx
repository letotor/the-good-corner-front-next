import React from 'react'
import styles from '@/components/AdCardDetail.module.css'

import AdCard, { AdCardProps } from '@/components/AdCard' // Assurez-vous d'importer correctement le composant AdCard
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

type AdProps = {
  id: number
}
const AdModify = (): React.ReactNode => {
  const router = useRouter()
  const id = router.query.id
  const BASE_URL = `http://localhost:5000/api/ads/${id}`

  const [ad, setAd] = useState<Partial<AdCardProps>>()
  const getAdByIdFromAPI = async () => {
    try {
      const response = await axios.get(BASE_URL)
      const data = response.data

      setAd(data)
    } catch {
      console.error('error lors de la recuperation des Ads from server')
    }
  }

  useEffect(() => {
    console.log(ad)
  }, [ad])

  useEffect(() => {
    console.log('id change')
    getAdByIdFromAPI()
  }, [id])
  return (
    <div className={styles['card-detail-container']}>
      <div className={styles['card-detail-header']}>
        <div className={styles['card-detail-title']}>
          <input>
            Detail : {ad?.title} - {ad?.price}€
          </input>
        </div>

        <div className={styles['btn-group']}>
          {' '}
          <button className={`button ${styles['btn']}`}>Modifier</button>
          <button className={`button ${styles['btn']}`}>Supprimer</button>
        </div>
      </div>
      <main>
        <div>
          <input>{ad?.location}</input>
          <input>{ad?.owner}</input>
          <div>publiée le : {ad?.dateAtCreated?.toString()}</div>
        </div>
        <div className={styles['card-detail-main']}>
          {ad?.picture?.includes('http') && (
            <img
              className={styles['card-image']}
              src={ad.picture}
              alt={ad.title ?? 'noTitle'}
              quality={100}
              width="auto"
            />
          )}

          <input className={styles['ad-card-description']}>
            {' '}
            sdfmlsdkfmlsdkfmlsdkfmlsdkf
          </input>
        </div>
      </main>
    </div>
  )
}

export default AdModify
