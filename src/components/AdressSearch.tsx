import React, { useState } from 'react'
import useAddressSearch from '@/hooks/useFetchAddress' // Importez le hook personnalisé
import Select from 'react-select'

function AddressSearch() {
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { addresses, loading, error, fetchAddresses } = useAddressSearch()

  const handleInputChange = (newValue) => {
    setSearchQuery(newValue)
    fetchAddresses(newValue) // Envoyer une requête à l'API à chaque changement de texte
  }

  const options = addresses.map((address, index) => ({
    value: index,
    label: address,
  }))

  const handleChange = (selectedOption) => {
    setSelectedAddress(selectedOption)
  }

  return (
    <div>
      <Select
        value={selectedAddress}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        isSearchable
        isClearable
        placeholder="Sélectionnez ou entrez une adresse"
      />
      {/* {loading && <p>Chargement en cours...</p>} */}
    </div>
  )
}

export default AddressSearch
