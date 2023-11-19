import React from 'react'
import Button from 'react-bootstrap/Button';
import {useNavigate,useParams} from 'react-router-dom'
import {Formik,Field,Form} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useEffect,useState} from 'react';

function AddTravelDestination() {

  let [initialValues,setInitialValues] = useState({
    name:"",
    detail:"",
    coverimage:"",
    latitude:"",
    longitude:""
 })
  let [isValid,setIsValid] = useState(false)
  let navigate = useNavigate()
  let {id} = useParams()
  console.log(id)
  let UserSchema = yup.object().shape({
   name: yup.string().min(3, 'Too Short!').max(15, 'Too Long!').required('Required'),
   detail: yup.string().min(11, 'Too Short!').max(400, 'Too Long!').required('Required'),
   latitude: yup.string(),
   longitude: yup.string()
  })

//save data for new users
  let saveData = async(values)=>{
    try {
      let res = await axios.post('https://www.melivecode.com/api/attractions',values)
      if(res.status ===201)
      {
        navigate('/all-users')
      }
    } catch (error) {
      console.log(error)
    }
  }

//uptate Data
let updateData = async(values)=>{
  try {
    let res = await axios.put(`https://www.melivecode.com/api/attractions/${id}`,values)
    if(res.status ===200)
    {
      navigate('/all-users')
    }
  } catch (error) {
    console.log(error)
  }
}  

//prepapulate the data for edit funtionality
  let getData = async()=>{
    try {
        let res = await axios.get(`https://www.melivecode.com/api/attractions/${id}`)
        console.log(res.data);
        setInitialValues(res.data)
        setIsValid(true)

    } catch (error) {
        console.log(error)
    }
}

//will be triggered only if we are here for edit functionality based on params.id
useEffect(()=>{
    if(id)
    {
      getData()
    }
    else
    {
      setIsValid(true)
    }
},[])

  return <>
    <div className='container-fluid'>

   {isValid?<Formik 
   initialValues={initialValues}

  validationSchema={UserSchema}

  onSubmit={async(values) =>{
     if(id)
     {
      updateData(values)
     }
     else
     {
      saveData(values)
     }
  
  }}
  >
    {({ errors, touched }) => (
         <Form>
            <div className="form-group">
                <label htmlFor="firstName">Name</label>
                <Field name="name" className="form-control" type="text" placeholder="Name"/>
                {errors.name && touched.name ? (
                <div style={{color:"red"}}>{errors.name}</div>
                ) : null}
            </div> 
            <div className="form-group">
                <label htmlFor="firstName">Detail</label>
                <Field name="detail" className="form-control" type="text" placeholder="Detail"/>
                {errors.detail && touched.detail ? (
                <div style={{color:"red"}}>{errors.detail}</div>
                ) : null}
            </div> 
            <div className="form-group">
                <label htmlFor="firstName">Image URL</label>
                <Field name="coverimage" className="form-control" type="text" placeholder="URL"/>
                {errors.coverimage && touched.coverimage ? (
                <div style={{color:"red"}}>{errors.coverimage}</div>
                ) : null}
            </div>
            <div className="form-group">
                <label htmlFor="firstName">Latitude</label>
                <Field name="latitude" className="form-control" type="text" placeholder="latitude"/>
                {errors.latitude && touched.latitude ? (
                <div style={{color:"red"}}>{errors.latitude}</div>
                ) : null}
            </div>
            <div className="form-group">
                <label htmlFor="firstName">Longitude</label>
                <Field name="longitude" className="form-control" type="text" placeholder="longitude"/>
                {errors.longitude && touched.longitude ? (
                <div style={{color:"red"}}>{errors.longitude}</div>
                ) : null}
            </div>
            
         <Button type="submit" variant='primary'>Submit</Button>
         </Form>
       )}
   </Formik>:<div style={{"textAlign":"center"}}>Loading...</div>}
    </div>
  </>
}

export default AddTravelDestination;