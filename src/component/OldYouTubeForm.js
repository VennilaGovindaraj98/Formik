import React from 'react'
import {Formik, useFormik} from 'formik'
import * as YUP from 'yup'

const initialValues = {
    name: '', 
    email: '',
    channel: ''
}

const onSubmit = (values)=>{
    console.log(values)  
}

const validationSchema =  YUP.object(
    {
        name: YUP.string().required('Required!'),
        email: YUP.string().email('Invalid Email Format').required('Required!'),
        channel: YUP.string().required('Required!')
    }

)

// const validate = (values) => {
//     console.log(values.email)
//     let errors = {}
//     if(!values.name){
//         errors.name = 'Required'
//     }
//     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
//         errors.email = 'Invalid email format'
//     }
//     if(!values.email){
//         errors.email = 'Required'
//     }
//     if(!values.channel){
//         errors.channel = 'Required'
//     }
//     return errors
// }




function OldYouTubeForm(){
    const formik = useFormik({ 
        initialValues,
        onSubmit, 
        validationSchema
        // validate

    })
    // console.log('values' ,formik.values)
    // console.log( 'error', formik.errors)
    // console.log( 'touched', formik.touched)

    return (
     <div>
        <form onSubmit = {formik.handleSubmit}>
        <label htmlFor='name' > 
         Name
        </label>
        <input type = 'text'  id = 'name' name= 'name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
         { formik.touched.name && formik.errors.name? <div className='error'> {formik.errors.name}</div> : null}
        <label htmlFor='email' > Email </label>
        <input type = 'text'  id = 'email' name= 'email'  onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.email}/>
        {formik.touched.email && formik.errors.email? <div className='error' > {formik.errors.email}</div> : null}
        <label htmlFor = 'channel'>Channel </label>
        <input type = 'text' id = 'channel' name ='channel'  onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.channel}>
        </input>
        {formik.touched.channel && formik.errors.channel? <div className='error'> {formik.errors.channel}</div> : null}
        <button type ='submit'> Submit</button>
        </form>
        
     </div>
    )

}

export default OldYouTubeForm