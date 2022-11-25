import React, {useState,useEffect} from 'react';
import {Link, useNavigate,useParams} from 'react-router-dom';
import { v1 as uuidv1} from 'uuid';
import axios from 'axios';

function UpdateProduct() {

  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
  const [data, setData] = useState([{
    Product:'',
    Category: '',
    Description :'',
    Price:'',
    Quantity :''
}]);

useEffect(() => {
   
    const getData = async () => {
      
       await axios.get('http://localhost:3000/products/' + id)
      .then(res=> {setData(res.data); console.log(res.data)}
      )
      .catch(error => {console.log(error);})
    };
  getData();
 
  }, [id]);
    
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
    }
                          
    )
  }, [])

const handleChange = (e)=>{
 
    setData({...data,
      id: uuidv1,
      [e.target.id]: e.target.value
    })
    console.log(data)
  }

 
  const updateData = async(e)=>{
      console.log(data)
    e.preventDefault();
    
    await axios.put('http://localhost:3000/products/' +id, 
    {
      Product: data.Product,
      Category: data.Category,
      Description :data.Description,
      Price : data.Price,
      Quantity : data.Quantity
    }
    )
    .then(response =>{
      console.log(response)
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
            <form onSubmit={updateData}>
              {/* Product Name input type text*/}
              <div className="form-group">
                <div className="d-flex justify-content-between mb-2">
                <label htmlFor="productName" className="font-weight-bold">Product</label>
                <Link to="/dashboard" className=" font-weight-bold text-dark "><i className="fa-solid fa-list-check me-3"></i>List of products</Link>
                </div>
                <input type="text" className="form-control" id="Product"  value={data.Product} onChange={handleChange}/>
              </div>
              {/* Product Description input textarea */}
              <div className="form-group my-3">
                <label htmlFor="Description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="Description" value={data.Description} onChange={handleChange} rows="3"></textarea>
              </div>
              {/* Product Price input type number */}
              <div className="form-group my-3">
                <label htmlFor="price" className="font-weight-bold">Price</label>
                <input type="number"  className="form-control" id="Price" value={data.Price} onChange={handleChange}/>
              </div>
              {/* Product Quantity input type number */}
              <div className="form-group my-3">
                <label htmlFor="Quantity" className="font-weight-bold">Quantity</label>
                <input type="number" className="form-control" id="Quantity" value={data.Quantity} onChange={handleChange}/>
              </div>
              <div className='my-4'>
                <label htmlFor="Category" className="font-weight-bold">Category</label>
                <select name="Categories" id="Category" value={data.Category}  onChange={handleChange}>
                  {
                    loading ? 'loading' : post.map((item)=>
                    <option key={item.categoryName} >{item.categoryName}</option>
                    )
                  }
                  {error ? error : null}
                </select>
              </div>
          
              {/*Click button  to add product*/}
              <div className=' '>
              <button  type="submit"   className="btn  btn-dark  font-weight-bold">Update Product</button>
              </div>
              
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default UpdateProduct