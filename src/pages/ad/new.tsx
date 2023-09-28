import Layout from '@/components/Layout'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import useCategories from '@/hooks/useFetch'
import { Category } from '@/components/Category'
import AddressSearch from '@/components/AdressSearch'
type AdFormData = {
  title: string
  description: string
  price: number
  category: { id: number }
  location?: string
  picture?: string
  owner?: string
}
const BASE_URL = 'http://localhost:5000/api'
const NewAd = (): React.ReactNode => {
  // const [title, setTitle] = useState('Titre')
  // const [number, setNumber] = useState(0)
  // const [picture, setPicture] = useState('http://')
  // const [location, setLocation] = useState('Nantes')
  // const [owner, setOwner] = useState('Jean')
  const { categories, loading, error: errorCategories } = useCategories()
  const [selectedResultAdress, setSelectedResultAdress] = useState('')
  const [error, setError] = useState<
    'title' | 'description' | 'location' | 'picture' | 'owner' | 'price'
  >()
  const [isSend, setIsSend] = useState(false)
  const router = useRouter()
  const handleSubmitAd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.target)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries()) as unknown as AdFormData

    if ('categoryId' in data) {
      data.category = { id: Number(data.categoryId) }
      delete data.categoryId //
    }
    data.price = Number(data.price)
    console.log(form, formData, data)
    console.debug('result adress', selectedResultAdress)
    // controle ici des champs
    try {
      const result = await axios.post(`${BASE_URL}/ads`, data)
      if ('id' in result.data) {
        form.reset()
        setIsSend(true)
        router.push('/')
        // redirect to /ads/result.data.id router.push('/nouvelle-page');
      }
    } catch (e) {
      console.error(e)
    } finally {
      router.push('/')
    }
  }
  const handleAddressSelect = (selectedOption: string) => {
    setSelectedResultAdress(selectedOption)
  }
  return (
    <Layout title="post Ad">
      <h1
        style={{ textAlign: 'center' }}
        className="ad my-1"
      >{`Soumettre une Annonce`}</h1>

      <form className="form-ad flex-col" onSubmit={handleSubmitAd}>
        <div className="">
          <label htmlFor="title">Title </label>
          <input
            className="text-field"
            id="title"
            type="text"
            value={'velo de ville'}
            name="title"
          />
        </div>
        <div>
          <label htmlFor="price"> Price </label>
          <input className="text-field" id="price" type="text" value={60} />
        </div>
        <div>
          <label htmlFor="picture">Image</label>
          <input
            className="text-field"
            id="picture"
            name="image"
            type="text"
            value={
              'https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F08%2F05%2F10%2F27%2Fiphone-410311_640.jpg&w=256&q=100'
            }
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <AddressSearch onAddressSelect={handleAddressSelect} />
          {/* <input */}
          {/*   className="text-field" */}
          {/*   id="location" */}
          {/*   type="text" */}
          {/*   value={'ANntes'} */}
          {/*   placeholder="OU se situe le bien" */}
          {/* /> */}
        </div>
        <div>
          <label htmlFor="owner">Name</label>
          <input
            className="text-field"
            id="owner"
            type="text"
            name="image"
            value={'jean '}
          />
        </div>
        <div>
          <label htmlFor="categoryId">Choisir une catégorie :</label>
          <select id="categoryId" name="categoryId">
            {!error &&
              !loading &&
              categories.map((cat: Category) => (
                <>
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                </>
              ))}
          </select>
        </div>

        <button className="button  button-primary" type="submit">
          {' '}
          Envoyer
        </button>
      </form>
    </Layout>
  )
}
export default NewAd
