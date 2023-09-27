import Layout from '@/components/Layout'
import React, { FormEvent, useState } from 'react'

import { AdCardProps } from '@/components/AdCard'
import useCategories from '@/hooks/useFetch'
import useFetchAddress from '@/hooks/useFetchAddress'
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

// title?: string | undefined;
// price?: number | undefined;
// picture?: string | undefined;
// location?: string | undefined;
// owner?: string | undefined;
// dateAtCreated?: Date | undefined;
// link?: string | undefined;
// category?: {
const NewAd = (): React.ReactNode => {
  // const [title, setTitle] = useState('Titre')
  // const [number, setNumber] = useState(0)
  // const [picture, setPicture] = useState('http://')
  // const [location, setLocation] = useState('Nantes')
  // const [owner, setOwner] = useState('Jean')
  const { categories, loading, error } = useCategories()

  const handleSubmitAd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.target)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries()) as unknown as AdFormData

    if ('categoryId' in data) {
      data.category = { id: Number(data.categoryId) }
      delete data.categoryId //
    }

    console.log(formData, data)
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
          <input className="text-field" id="title" type="text" value="title" />
        </div>
        <div>
          <label htmlFor="price"> Price </label>
          <input className="text-field" id="price" type="text" value={0} />
        </div>
        <div>
          <label htmlFor="picture">Image</label>
          <input
            className="text-field"
            id="picture"
            type="text"
            value={'http://'}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <AddressSearch />

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
