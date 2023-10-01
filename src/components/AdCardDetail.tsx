import React from 'react'
import styles from './AdCardDetail.module.css'
import AdCard, { AdCardProps } from '@/components/AdCard' // Assurez-vous d'importer correctement le composant AdCard
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

type AdProps = {
  id: number
}
const AdCardDetail = (props: AdProps): React.ReactNode => {
  const id = props.id
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
          <h1>
            Detail : {ad?.title} - {ad?.price}€
          </h1>
        </div>

        <div className={styles['btn-group']}>
          <Link href={`/ad/${id}/modify`} className={`button ${styles['btn']}`}>
            Modifier
          </Link>

          <button className={`button ${styles['btn']}`}>Supprimer</button>
        </div>
      </div>
      <main>
        <div>
          <div>{ad?.location}</div>
          <div>{ad?.owner}</div>
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

          <div className={styles['ad-card-description']}>
            {' '}
            sdfmlsdkfmlsdkfmlsdkfmlsdkf
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdCardDetail
