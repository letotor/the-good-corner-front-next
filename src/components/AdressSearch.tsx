import React, { useState, useEffect } from 'react'
import useAddressSearch from '@/hooks/useFetchAddress' // Importez le hook personnalisé
import Select from 'react-select'

function AddressSearch({ onAddressSelect }) {
  const [selectedAddress, setSelectedAddress] = useState<string>()
  const [searchQuery, setSearchQuery] = useState('')
  const { addresses, loading, error, fetchAddresses } = useAddressSearch()

  const handleInputChange = (newValue: string) => {
    setSearchQuery(newValue)
    fetchAddresses(newValue) // Envoyer une requête à l'API à chaque changement de texte
  }

  const options = addresses.map((address, index) => ({
    value: index,
    label: address,
  }))

  const handleChange = (selectedOption) => {
    setSelectedAddress(selectedOption)
    if (selectedOption?.label !== '') {
      onAddressSelect(selectedOption?.label)
    }
  }

  return (
    <div>
      <Select
        value={selectedAddress}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          background: 'black',
          colors: {
            ...theme.colors,
            text: ` var(--vp-c-brand-darker)`,
            primary25: ` var(--vp-c-brand-darker)`,
            primary: ` var(--vp-c-brand-darker)`,
          },
        })}
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
