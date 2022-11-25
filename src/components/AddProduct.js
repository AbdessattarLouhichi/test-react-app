import React, {useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
//import { v1 as uuidv1} from 'uuid';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
 
 useEffect(() => {
    axios.get('http://localhost:3000/categories')
    .then(res=>{
              setLoading(false)
              setPost(res.data)
              setError('')
            }      
    )
    .catch(error =>{
      setLoading(false)
      setPost({})
      setError({error: error.message})
    })
  }, [])
  
  const addProduct = (values)=>{
    
    axios.post('http://localhost:3000/products',values)
    .then(response =>{
      console.log(response.data)
      navigate ('/dashboard')
      })
    .catch(error =>{console.log(error.message)})
  }

  const initialValues ={
    Name: '',
    Category:'',
    Description:'',
    Price:'',
    Quantity: '', 
  }

  const validationSchema = Yup.object({
    Name: Yup.string()
      .required('Required!'),
    Description: Yup.string()
    .required('required!'),
    Price: Yup.number()
    .required('required!'),
    Quantity: Yup.number()
    .required('required!'),
    Category: Yup.string()
    .required('required!'),
  })

  return (
    <div>
      <div className="container justify-content-center pt-5 "> 
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
           {/* Add Produt input form -*/}
          <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={addProduct}>
                {formik => {
              return(
            <Form>
              {/* Product Name input type text*/}
              <div className="form-group">
                <div className="d-flex justify-content-between mb-2">
                <label htmlFor="Name" className="font-weight-bold">Product</label>
                <Link to="/dashboard" className=" font-weight-bold text-dark "><i className="fa-solid fa-list-check me-3"></i>List of products</Link>
                </div>
                <Field type="text" className="form-control" id="Name" name='Name' placeholder="Product Name"/>
                <ErrorMessage name='Name' component={'div'} className="text-danger"/>
              </div>
              {/* Product Description input textarea */}
              <div className="form-group my-3">
                <label htmlFor="Description" className="font-weight-bold">Description</label>
                <Field as="textarea" className="form-control" id="Description" name='Description'  rows="3"/>
                <ErrorMessage name='Description' component={'div'} className="text-danger"/>
              </div>
              {/* Product Price input type number */}
              <div className="form-group my-3">
                <label htmlFor="Price" className="font-weight-bold">Price</label>
                <Field type="number" className="form-control" id="Price" name='Price'/>
                <ErrorMessage name='Price' component={'div'} className="text-danger"/>
              </div>
              {/* Product Quantity input type number */}
              <div className="form-group my-3">
                <label htmlFor="Quantity" className="font-weight-bold">Quantity</label>
                <Field type="number" className="form-control" id="Quantity" name='Quantity' />
                <ErrorMessage name='Quantity' component={'div'} className="text-danger"/>
              </div>
              <div className='my-4'>
                <label htmlFor="Category" className="font-weight-bold">Category</label>
                <Field as="select" name="Category" id="Category" >
                  {
                    loading ? 'loading' : post.map((item)=>
                    <option key={item.categoryName} >{item.categoryName}</option>
                    )
                  }
                  {error ? error : null}
                </Field>
              </div>
            
              {/*Click button  to add product*/}
              <button  type="submit"  className="btn btn-dark   font-weight-bold" disabled={!formik.isValid || formik.isSubmitting}>Add product</button>
            </Form>
            )}}
          </Formik>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default AddProduct