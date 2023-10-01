import styles from './AdCard.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { CategoryType } from '@/components/Category'
import { useEffect } from 'react'
export type AdCardType = {
  id: number
  title: string
  price: number
  picture: string
  location: string
  owner: string
  dateAtCreated: Date
  link: string
  category: CategoryType
}

export type AdCardProps = AdCardType & {
  onDelete?: () => void
}

const AdCard = ({
  title,
  picture,
  price,
  link,
  category,
  id,
  onDelete,
}: Partial<AdCardProps>): React.ReactNode => {
  async function handleClickRemoveAd() {
    const BASE_URL = 'http://localhost:5000/api'
    try {
      const response = await fetch(`${BASE_URL}/ads/${id}`, {
        method: 'DELETE',
      })

      if (response.status === 204) {
        console.log('Ad deleted successfully')
        if (onDelete) {
          onDelete()
        } else {
          console.log('Failed to delete ad')
          // Mettez ici le code que vous souhaitez exécuter en cas d'échec de la suppression
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'annonce depuis le serveur",
        error,
      )
    }
  }

  useEffect(() => {
    // deleteAdById(), [id]
  })

  return (
    <div style={{ height: 'auto' }} className={styles['ad-card-container']}>
      <Link className={styles['ad-card-link']} href={link}>
        <div className={`${styles['ad-car-img-category']}`}>
          {picture?.includes('http') && (
            <Image
              className={styles['ad-card-image']}
              src={picture}
              alt={title ?? 'noTitle'}
              // quality={100}
              width="200"
              height="200"
            />
          )}{' '}
          <div className={styles['ad-card-category']}>
            {category ? category.name : ''}
            {id}
          </div>
        </div>

        <div className={styles['ad-card-main']}>
          <div className={styles['ad-card-text']}>
            <div className={styles['ad-card-title']}>{title}</div>
            <div className={styles['ad-card-price']}>{price} €</div>
          </div>
        </div>
      </Link>
      <div className={`${styles['ad-card-button']} ${styles['btn-group']}`}>
        <button className={`${styles['button']} button-primary`}>Modify</button>
        {true && (
          <button
            className={`${styles['button']} button-primary`}
            onClick={handleClickRemoveAd}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default AdCard
