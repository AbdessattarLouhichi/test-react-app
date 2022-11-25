import React, {useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { v1 as uuidv1} from 'uuid';
import axios from 'axios';

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
  const [product, setProduct] = useState([{
                                          Product:'',
                                          Category: '',
                                          Description :'',
                                          Price:'',
                                          Quantity :''
  }]);
  
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
  

  const handleChange =(e )=>{
    setProduct({...product,
      id: uuidv1,
      [e.target.id] : e.target.value,
    }) 
   
  }

 
  
  const addProduct = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/products',{
                                Product: product.Name,
                                Category: product.Category,
                                Description :product.Description,
                                Price : product.Price,
                               Quantity : product.Quantity
    })
    .then(response =>{
      console.log(response.data)
      navigate ('/dashboard')
      })
    .catch(error =>{console.log(error.message)})
  }
  return (
    <div>
      <div className="container justify-content-center pt-5 "> 
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
           {/* Add Produt input form -*/}
            <form onSubmit={addProduct}>
              {/* Product Name input type text*/}
              <div className="form-group">
                <div className="d-flex justify-content-between mb-2">
                <label htmlFor="Name" className="font-weight-bold">Product</label>
                <Link to="/dashboard" className=" font-weight-bold text-dark "><i className="fa-solid fa-list-check me-3"></i>List of products</Link>
                </div>
                <input type="text" className="form-control" id="Name" onChange={handleChange} placeholder="Product Name"/>
              </div>
              {/* Product Description input textarea */}
              <div className="form-group my-3">
                <label htmlFor="Description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="Description" onChange={handleChange} rows="3"></textarea>
              </div>
              {/* Product Price input type number */}
              <div className="form-group my-3">
                <label htmlFor="Price" className="font-weight-bold">Price</label>
                <input type="number" className="form-control" id="Price" onChange={handleChange}/>
              </div>
              {/* Product Quantity input type number */}
              <div className="form-group my-3">
                <label htmlFor="Quantity" className="font-weight-bold">Quantity</label>
                <input type="number" className="form-control" id="Quantity" onChange={handleChange}/>
              </div>
              <div className='my-4'>
                <label htmlFor="Category" className="font-weight-bold">Category</label>
                <select name="Categories" id="Category" onChange={handleChange}>
                  {
                    loading ? 'loading' : post.map((item)=>
                    <option key={item.categoryName} >{item.categoryName}</option>
                    )
                  }
                  {error ? error : null}
                </select>
              </div>
            
              {/*Click button  to add product*/}
              <button  type="submit"  className="btn btn-dark   font-weight-bold">Add product</button>
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default AddProduct