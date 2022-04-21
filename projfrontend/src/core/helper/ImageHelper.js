import React from 'react'

 const ImageHelper = ({product}) => {
    const imageurl = product ? product.image 
    : `https://campnesher.org/wp-content/uploads/sites/7/2020/09/Under-Construction-Sign.png` 

  return (
    <div className='rounded border border-success p-2'>
        <img src={imageurl} 
        style={{maxheight:"80%", maxwidth:"80%"}}
        className='card-img-top rounded'
        alt=""/>

    </div>
  )
}

export default ImageHelper;