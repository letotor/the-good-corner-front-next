import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '@/components/Layout'
import { Category } from '@/components/Category'
import useCategories from '@/hooks/useFetch'
import AddressSearch from '@/components/AdressSearch'
type AdFormData = {
  title?: string
  description?: string
  price?: number
  category?: { id: number }
  location?: string
  picture?: string
  owner?: string
}
const BASE_URL = 'http://localhost:5000/api'
const NewAd = (): React.ReactNode => {
  const [dataForm, setDataForm] = useState<AdFormData>({
    title: '',
    description: undefined,
    price: undefined,
    category: { id: 1 },
    location: undefined,
    picture: undefined,
    owner: undefined,
  })
  const { categories, loading, error: errorCategories } = useCategories()

  const [selectedResultAdress, setSelectedResultAdress] = useState('')
  const [error, setError] = useState<
    | 'title'
    | 'description'
    | 'category'
    | 'location'
    | 'picture'
    | 'owner'
    | 'price'
    | undefined
  >()
  const [isSend, setIsSend] = useState(false)
  const router = useRouter()

  function resetForm() {
    setSelectedResultAdress('')
    setDataForm({
      // title: '',
      // description: '',
      // price: 0,
      // category: { id: 1 },
      // location: '',
      // picture: '',
      // owner: '',
    })
    setSelectedResultAdress('')
  }

  function checkForm(): boolean {
    let hasError = false

    if (
      !dataForm.description ||
      (dataForm.description.length < 2 && dataForm.description.length > 512)
    ) {
      setError('description')
      hasError = true
    }
    if (typeof dataForm.price !== 'number' || dataForm.price <= 0) {
      setError('price')
      hasError = true
    }
    if (
      !dataForm.location ||
      dataForm.location.length > 120 ||
      dataForm.location.length < 2
    ) {
      setError('location')
      hasError = true
    }
    if (!dataForm.picture) {
      setError('picture')
      hasError = true
    }
    if (
      !dataForm.category ||
      typeof dataForm.category.id !== 'number' ||
      dataForm.category.id < 1
    ) {
      setError('category')
      hasError = true
    }

    if (
      !dataForm.owner ||
      (dataForm.owner.length < 2 && dataForm.owner.length > 30)
    ) {
      setError('owner')
      hasError = true
    }
    console.log('test', dataForm.title ? true : false)
    if (
      !dataForm.title ||
      dataForm.title.length > 20 ||
      dataForm.title.length < 2
    ) {
      setError('title')
      hasError = true
    }
    if (hasError) {
      return false
    } else {
      setError(undefined)
      setIsSend(true)
      return true
    }
  }

  const handleSubmitAd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.target)

    try {
      console.log('check', dataForm, checkForm())
      if (checkForm()) {
        const result = await axios.post(`${BASE_URL}/ads`, dataForm)
        if (result.status == 201) {
          resetForm()
          router.push('/')
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
    }
  }
  const handleAddressSelect = (selectedOption: string) => {
    setSelectedResultAdress(selectedOption)
  }

  useEffect(() => {
    console.debug(dataForm, loading, categories, error)
    setError(undefined)
  }, [dataForm])

  useEffect(
    () =>
      setDataForm({
        ...dataForm,
        location: selectedResultAdress,
      }),
    [selectedResultAdress],
  )

  useEffect(
    () =>
      setDataForm({
        ...dataForm,
      }),
    [categories],
  )

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
            onChange={(e) =>
              setDataForm({ ...dataForm, title: e.target.value })
            }
            value={dataForm.title}
            name="title"
          />
        </div>
        <div className="">
          <label htmlFor="description">Description </label>
          <textarea
            className="text-field"
            id="description"
            maxLength={150}
            onChange={(e) =>
              setDataForm({
                ...dataForm,
                description: e.target.value,
              })
            }
            style={{
              width: '100%',
              height: '100px',
              resize: 'vertical',
            }}
            value={dataForm.description}
            name="title"
          />
        </div>
        <div>
          <label htmlFor="price"> Price </label>
          <input
            className="text-field"
            id="price"
            type="text"
            onChange={(e) =>
              setDataForm({
                ...dataForm,
                price: Number.isNaN(Number(e.target.value))
                  ? 0
                  : Number(e.target.value),
              })
            }
            value={Number.isNaN(dataForm.price) ? 0 : dataForm.price}
          />
        </div>
        <div>
          <label htmlFor="picture">Image</label>
          <input
            className="text-field"
            id="picture"
            name="picture"
            type="text"
            onChange={(e) =>
              setDataForm({ ...dataForm, picture: e.target.value })
            }
            value={dataForm.picture}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <AddressSearch onAddressSelect={handleAddressSelect} />
        </div>
        <div>
          <label htmlFor="owner">Name</label>
          <input
            className="text-field"
            id="owner"
            type="text"
            name="owner"
            onChange={(e) =>
              setDataForm({ ...dataForm, owner: e.target.value })
            }
            value={dataForm.owner}
          />
        </div>
        <div>
          <label htmlFor="categoryId">Choisir une catégorie :</label>
          <select
            id="categoryId"
            name="categoryId"
            onChange={(e) =>
              setDataForm({
                ...dataForm,
                category: { id: Number(e.target.value) },
              })
            }
            value={dataForm.category?.id || 1}
          >
            {!errorCategories &&
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
        {error && (
          <p style={{ fontSize: '12px', color: 'red' }}>error on {error}</p>
        )}
        <button className="button  button-primary" type="submit">
          {' '}
          Envoyer
        </button>
      </form>
    </Layout>
  )
}
export default NewAd
