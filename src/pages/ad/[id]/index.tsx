import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import AdCard, { AdCardProps } from '@/components/AdCard' // Assurez-vous d'importer correctement le composant AdCard
import { useEffect, useState } from 'react'
import axios from 'axios'
import AdCardDetail from '@/components/AdCardDetail'

export default function AdCardDetailId(props: any) {
  const router = useRouter()
  const { id } = router.query // Accédez au paramètre 'id' de l'URL

  return (
    <Layout title="AdDetailDetail">
      {id && <AdCardDetail id={Number(id)} />}
    </Layout>
  )
}
