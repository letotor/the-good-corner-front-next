import axios from 'axios'
import { useState, useEffect } from 'react'

interface Geometry {
  type: string
  coordinates: [number, number]
}

interface Properties {
  label: string
  score: number
  housenumber: string
  id: string
  name: string
  postcode: string
  citycode: string
  x: number
  y: number
  city: string
  district: string
  context: string
  type: string
  importance: number
  street: string
}

interface Feature {
  type: string
  geometry: Geometry
  properties: Properties
}

interface Filters {
  type: string
}

interface Response {
  type: string
  version: string
  features: Feature[]
  attribution: string
  licence: string
  query: string
  filters: Filters
  limit: number
}

const useAddressSearch = () => {
  const apiUrl = 'https://api-adresse.data.gouv.fr/search/'
  const [addresses, setAddresses] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAddresses = async (query: string) => {
    // Construire l'URL de la requête

    try {
      setLoading(true)
      const url = `${apiUrl}?q=${encodeURIComponent(query)}`
      const res = await axios<Response>(url)
      const data = res.data
      setLoading(false)
      if (data.features && data.features.length > 0) {
        const addressList = data.features.map(
          (feature) => feature.properties.label,
        )
        setAddresses(addressList)
      } else {
        setAddresses([])
      }
    } catch (error: any) {
      setLoading(false)
      setError(error)
    }
  }

  return { addresses, loading, error, fetchAddresses }
}

export default useAddressSearch
