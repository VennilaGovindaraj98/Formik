import React  , {useState}from 'react'
import {Formik ,Form ,Field, ErrorMessage , FieldArray , FastField} from 'formik'
import * as YUP from 'yup'
import TextError from './TextError'


const initialValues = {
    name: '', 
    email: '',
    channel: '',
    comments: '',
    address: '', 
    social: {
       facebook: '',
       twitter: ''
    },
    phoneNumbers: ['' , ''],
    phNumbers: ['']
}

const savedValues = {
    name: 'vennila', 
    email: 'vennila@bitcot.com',
    channel: 'vennila',
    comments: 'vennila',
    address: 'vennila', 
    social: {
       facebook: '',
       twitter: ''
    },
    phoneNumbers: ['' , ''],
    phNumbers: ['']
}

const onSubmit = (values , onSubmitProps)=>{
    console.log ('Onsubmit value' ,values)  
    console.log(onSubmitProps , 'heheh test')
    // onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

const validationSchema =  YUP.object(
    {
        name: YUP.string().required('Required!'),
        email: YUP.string().email('Invalid Email Format').required('Required!'),
        channel: YUP.string().required('Required!')
    }

)


const validateComments = (comment)=>{
    let error;
    if(!comment) {
     error = 'Required'
    }
    return error
}

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




function YouTubeForm(){

    const [formValues , setFormValues] = useState(null)

    // console.log(ErrorMessage , 'Eroor messgae')
    // const formik = useFormik({ 
    //     initialValues,
    //     onSubmit, 
    //     validationSchema
    //     // validate

    // })
    // console.log('values' ,formik.values)
    // console.log( 'error', formik.errors)
    // console.log( 'touched', formik.touched)

    return (
     <Formik initialValues={ formValues || initialValues} validationSchema={validationSchema} onSubmit ={onSubmit} 
      validateOnChange= {false}
      validateOnBlur = {false} 
      enableReinitialize
      >

        {(formik)=>{
            console.log('formik props' , formik)
            return (<Form>
                <label htmlFor='name' > 
                 Name
                </label>
                <Field type = 'text'  id = 'name' name= 'name' 
                // onChange={formik.handleChange} 
                // onBlur={formik.handleBlur} 
                // value={formik.values.name}
                // {...formik.getFieldProps('name')}
                />
                <ErrorMessage name = 'name' component={TextError}/>
                 {/* { formik.touched.name && formik.errors.name? <div className='error'> {formik.errors.name}</div> : null} */}
                <label htmlFor='email' > Email </label>
                <Field type = 'text'  id = 'email' name= 'email'>
                </Field>
                 <ErrorMessage name='email'>
                    {
                         errorMessage=>
                                 <div className='error'> {errorMessage}</div>
                    }
                    
                 </ErrorMessage>
                {/* {formik.touched.email && formik.errors.email? <div className='error' > {formik.errors.email}</div> : null} */}
                <label htmlFor = 'channel'>Channel </label>
                <Field type = 'text' id = 'channel' name ='channel' placeholder= 'youTubeChannel'
                //   onChange={formik.handleChange} 
                //    onBlur={formik.handleBlur} 
                //    value={formik.values.channel}
                // {...formik.getFieldProps('channel')}
                   >
                </Field>
                <ErrorMessage name='channel' component={TextError}/>
                {/* {formik.touched.channel && formik.errors.channel? <div className='error'> {formik.errors.channel}</div> : null} */}
        
                <div className='form-control'>
                    <label htmlFor='comments'>Comments</label>
                    <Field as='textarea' id='comments' name='comments' validate ={validateComments} ></Field>
        
                </div>
        
                <ErrorMessage name='comments'/>
        
                <div className='form-control'>
                    <label htmlFor='address'>Address</label>
                    <FastField name = 'address'>
                        {
                            (props) =>{
                                const {field , form , meta} = props
                                // console.log(props , 'propspsps')
                                return  (
                                    <div> 
                                        <input type = 'text' id='address' {...field}/> 
                                        {meta.touched && meta.error ? <div>{meta.error} </div> : null}
                                    </div>
                                )
                                
                                
                                
                            }
                        }
                    </FastField>
        
                </div>
        
                {/* <div className='form-control'> 
                   <label htmlFor='facebook'>Facebook Profile</label>
                    <Field type = 'text' id='facebook' name ='social.facebook'></Field>
                </div>
        
                <div className='form-control'> 
                   <label htmlFor='twitter'>Twitter Profile</label>
                    <Field type = 'text' id='twitter' name ='social.twitter'></Field>
                </div>
                <div className='form-control'> 
                   <label htmlFor='primaryPhone'>Primary Phone</label>
                    <Field type = 'text' id='primaryPhone' name ='phoneNumbers[0]'></Field>
                </div> */}
                {/* <div className='form-control'> 
                   <label htmlFor='secondaryPhone'>Secondary Phone</label>
                    <Field type = 'text' id='secondaryPhone' name ='phoneNumbers[1]'></Field>
                </div> */}
                <div className='form-control'> 
                   {/* <label>List of Phone Numbers</label> */}
                   <FieldArray name='phNumbers'>
                    {
                        (fieldArrayProps)=>{
                            // console.log(fieldArrayProps , 'heeheh')
                            const {push , remove ,form} = fieldArrayProps
                            const {values} = form
                            const {phNumbers} = values
                            
                            console.log(form.errors , 'error meagagga  render')
                            // console.log(phNumbers.map((n ,index)=> {console.log(index , n)}))
                            // return (
                            // <div> {phNumbers.map((n , i )=>  <div key= {i}> 
                                
                            //     <Field name = {`phNumbers[${i}]`}/>
                            //     <button type='button' onClick={()=> remove(i)}> -- </button>
                            //     <button type='button' onClick={()=> push()}> ++</button>
                            //     </div>)}
                            //   {/* {phNumbers.map((n , index)=> {
                            //     // console.log(index , n)
                            //     //  <div key = {index}> </div>
                            //       <div key = {index}> 
        
                            //       </div>
                                
                            //     })} */}
                            // </div>
                            
                    
                            // )
                        }
                    }
        
                   </FieldArray>
        
                </div>
                 {/* <button onClick={()=> formik.validateField('comments')}> validate Comments</button>
                 <button onClick={()=> formik.validateForm()}> validate all </button>
                 <button onClick={()=> formik.setFieldTouched('comments')}> visit comments </button>
                 <button onClick={()=> formik.setTouched()}> visit all </button> */}
                 <button type = 'button' onClick={()=> setFormValues(savedValues)}>Load saved data</button>
                <button type ='submit'> Submit</button>
                {/* <button type = 'reset'>Reset</button> */}
                </Form>)

        }}

        
        
     </Formik>
    )

}

export default YouTubeForm