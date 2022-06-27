import { Fab } from "@mui/material"
import { useEffect, useState } from "react"
import { Add as AddIcon } from '@mui/icons-material'
import { useFormik } from "formik"
import { number, object, string } from "yup"
import axios from "axios"
import { useQueryClient } from 'react-query'
import api from "../../api"
import CardDialog from "./CardDialog"

export default function AddCardButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [image, setImage] = useState(null)

    const queryClient = useQueryClient()

    const open = () => setIsOpen(!isOpen)



    const formik = useFormik({
      initialValues: {
        name: "",
        sex: "",
        birthDate: "",
        description: "",
        price: "",
      },
      onSubmit: handleSubmit,
      validationSchema: object().shape({
        name: string().required('name is required'),
        sex: string().required('Choose the right variant'),
        birthDate: string().required("Plese, write the date in mm/dd/yyyy format"),
        description: string().max(400),
        price: number().min(5000).required('Price is required'),
      }),
      validateOnMount: true,
  })

  async function handleSubmit (values){
    formik.setSubmitting(true)
    const {name, sex, birthDate, description, price} = values
    const birthDateInSeconds = Date.parse(`${birthDate}`)

    const { data } = await api.post(`/targets`, {name, sex, birthDate: `${birthDateInSeconds}`, description, price})

    const resource = 'target'
    const formData = new FormData()
    formData.append('image', image)
    const { data: imageUrl } = await axios.post(
      'https://server.kemalkalandarov.lol/api/images',
      formData,
      { params: { resource, id: data.id } }, 
    )

    await api.put(`/targets/${data.id}`, { imageUrl })
    formik.setSubmitting(false)
    queryClient.invalidateQueries('cards')
    setIsOpen(false)
    formik.resetForm()
  }

  const [imagePreview, setImagePreview] = useState('')
  useEffect(() => {
    const reader = new FileReader()
    reader.onload = e => setImagePreview(e.target.result)

    if (image) {
      reader.readAsDataURL(image)
    }
    return () => {
      reader.onload = undefined
    }
  }, [image])
  
    return (
      <>
        <Fab
          color="secondary"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={open}
        >
          <AddIcon/>
        </Fab>
        <CardDialog
          open={isOpen}
          onClose={() => {
            setIsOpen(false)
            formik.resetForm()
          }}
          title="Add card"
          formik={formik}
          setImage={setImage}
        />
      </>
    )
  }