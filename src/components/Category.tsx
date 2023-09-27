import Link from 'next/link'
import Image from 'next/image'
import styles from './Category.module.css'
import React from 'react'

export type Category = { id: number; name: string }

export const Category = (category: Category): React.ReactNode => {
  return (
    <Link
      href={`/${category.id}/ads`} // Assurez-vous de remplacer "slug" par la propriété appropriée de votre objet de catégorie
      className={styles['category-navigation-link']}
    >
      {category.name}
    </Link>
  )
}
