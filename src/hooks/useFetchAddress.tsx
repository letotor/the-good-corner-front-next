import { useState, useEffect } from 'react'

const useAddressSearch = () => {
  const apiUrl = 'https://api-adresse.data.gouv.fr/search/'
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAddresses = (query) => {
    setLoading(true)

    // Construire l'URL de la requête
    const url = `${apiUrl}?q=${encodeURIComponent(query)}`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        if (data.features && data.features.length > 0) {
          const addressList = data.features.map(
            (feature) => feature.properties.label,
          )
          setAddresses(addressList)
        } else {
          setAddresses([])
        }
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
      })
  }

  return { addresses, loading, error, fetchAddresses }
}

export default useAddressSearch
