import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import styles from '@/components/AdCard.module.css'
import AdCard, { AdCardProps } from '@/components/AdCard' // Assurez-vous d'importer correctement le composant AdCard
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function AdCardDetail(props: any) {
  const router = useRouter()
  const { id } = router.query // Accédez au paramètre 'id' de l'URL
  const BASE_URL = `http://localhost:5000/api/ads/${id}`

  console.debug('id', id)
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
    <Layout title="AdDetail">
      <h1>
        Detail : {ad?.title} - {ad?.price}€
      </h1>
      {ad?.picture?.includes('http') && (
        <Image
          className={styles['ad-card-image']}
          src={ad.picture}
          alt={ad.title ?? 'noTitle'}
          quality={100}
          width="200"
          height="400"
        />
      )}
      <div>{ad?.location}</div>
      <div>{ad?.owner}</div>
      <div>publiée le : {ad?.dateAtCreated?.toString()}</div>
    </Layout>
  )
}
