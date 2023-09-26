import styles from './AdCard.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Category } from '@/components/Category'

// export type AdCardProps = {
//   title: string
//   imgUrl: string
//   price: number
//   link: string
//   category?: Category
// }
export type AdCardProps = {
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

const AdCard = ({
  title,
  picture,
  price,
  link,
  category,
}: Partial<AdCardProps>): React.ReactNode => {
  const handleClick = () => {
    console.log('test')
  }

  return (
    <div className={styles['ad-card-container']}>
      <Link className={styles['ad-card-link']} href={`ad/${category?.id}`}>
        {picture?.includes('http') && (
          <Image
            className={styles['ad-card-image']}
            src={picture}
            alt={title ?? 'noTitle'}
            quality={100}
            width="200"
            height="200"
          />
        )}
        <div className={styles['ad-card-main']}>
          <div className={styles['ad-card-text']}>
            <div className={styles['ad-card-title']}>{title}</div>
            <div className={styles['ad-card-price']}>{price} €</div>
          </div>
          <div className={styles['ad-card-category']}>
            {category ? category.name : ''}
          </div>
        </div>
      </Link>
      {/* <button onClick={handleClick}>Add</button> */}
    </div>
  )
}

export default AdCard
