import { useEffect, useState } from 'react'
import axios from 'axios'
export type Category = { id: number; name: string }

const useCategories = () => {
  const BASE_URL = 'http://localhost:5000/api/category'
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getCategoriesFromAPI = async () => {
    try {
      const response = await axios.get(BASE_URL)
      const data = response.data
      setCategories(data)
      setLoading(false)
    } catch (err) {
      setError(
        'Erreur lors de la récupération des catégories depuis le serveur',
      )
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategoriesFromAPI()
  }, [])

  return { categories, loading, error }
}

export default useCategories
