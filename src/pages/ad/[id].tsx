import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import AdCard from '@/components/AdCard' // Assurez-vous d'importer correctement le composant AdCard

export default function AdCardDetail(props: any) {
  const router = useRouter()
  const { id } = router.query // Accédez au paramètre 'id' de l'URL

  return (
    <Layout title="AdDetail">
      <h1>Detail Ad</h1>
      <AdCard imgUrl="" link={`/ad/${id}`} title="test" price={0} />
    </Layout>
  )
}
