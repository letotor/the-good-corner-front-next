import Link from 'next/link'
import Image from 'next/image'
import styles from './Category.module.css'
import React from 'react'

export type Category = { id: number; name: string }

export const Category = (category: Category): React.ReactNode => {
  const categories = [
    {
      id: 1,
      name: 'Ameublement',
    },
    {
      id: 2,
      name: 'Électroménager',
    },
    {
      id: 3,
      name: 'Photographie',
    },
    {
      id: 4,
      name: 'Informatique',
    },
    {
      id: 5,
      name: 'Téléphonie',
    },
    {
      id: 6,
      name: 'Vélos',
    },
    {
      id: 7,
      name: 'Véhicules',
    },
    {
      id: 8,
      name: 'Sport',
    },
    {
      id: 9,
      name: 'Habillement',
    },
    {
      id: 10,
      name: 'Bébé',
    },
    {
      id: 11,
      name: 'Outillage',
    },
    {
      id: 12,
      name: 'Services',
    },
    {
      id: 13,
      name: 'Vacances',
    },
  ]

  return (
    <nav className={styles['category-navifation']}>
      {categories?.map((category, index) => (
        <React.Fragment key={category.id}>
          <Link
            href={`/ad/${category.id}`} // Assurez-vous de remplacer "slug" par la propriété appropriée de votre objet de catégorie
            className={styles['category-navigation-link']}
          >
            {category.name}
          </Link>
          {index < categories.length - 1 && ' • '}
        </React.Fragment>
      ))}
    </nav>
  )
}
