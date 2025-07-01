import classNames from 'classnames'
import { useFormik } from 'formik'
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'
import { PiWebhooksLogo } from "react-icons/pi";
import * as yup from "yup"
import { toast } from 'react-toastify'
import { useAddAdminProductMutation, useDeleteAdminProductMutation, useLazyGetAdminProductQuery, useUpdateAdminProductMutation } from '../redux/adminProduct'
import { useSelector } from 'react-redux'

const Admin = () => {
    const [imgprint, setImgprint] = useState()
    const [backimg, setBackimg] = useState()
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [Category, setCategory] = useState('')
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [addProduct,{isLoading:addLoading,isSuccess:addSuccess}] = useAddAdminProductMutation()
    const [getProducts, { data, getSuccess, isError, error,isLoading }] = useLazyGetAdminProductQuery()
    const [deleteProduct,{isLoading:deleteLoading,isSuccess:deleteSuccess}] = useDeleteAdminProductMutation()
    const [updateProduct,{isLoading:updatedLoading,isSuccess:updateSuccess}]=useUpdateAdminProductMutation()
    const [imgopacity, setImgopacity] = useState(false)
    const [handleedit, setHandleedit] = useState({})
    const [temimg, setTemimg] = useState()
    
    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            desc: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            price: yup.string().required("Enter Price"),
            desc: yup.string().required("Enter Description"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            fd.append("name", values.name);
            fd.append("price", values.price);
            fd.append("desc", values.desc);
            fd.append("img", backimg);
            fd.append("size", size);
            fd.append("color", color);
            fd.append("category", Category);

            addProduct(fd).then(() => {
                // Reset Formik form
                resetForm();
                // Clear the additional states
                setColor('');
                setSize('');
                setCategory('');
                setBackimg(null);
                setImgprint(null);
                window.my_modal_3.close()
                // toast.success("Product added successfully!");
            }).catch(() => {
                toast.error("Failed to add product!");
            });
        },
    });

    const edtinputs = e => {
        if (e.target.type === "file") {
            setHandleedit({ ...handleedit, [e.target.name]: e.target.files[0] })
            setTemimg({ newHero: URL.createObjectURL(e.target.files[0]) })
        } else {
            setHandleedit({ ...handleedit, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        getProducts({ selecter: "admin" })
    }, [getProducts])
    console.log(handleedit);

    useEffect(()=>{
        if (addSuccess) {
            toast.success("Product Add Success")
        }else if(updateSuccess){
            toast.success("Update Product Success")
        }else if(deleteSuccess){
            toast.warning("Delete Product Success")
        }else if (addLoading){
             window.my_modal_3.close()
        }

    },[addSuccess,updateSuccess,deleteSuccess,addLoading])

    return (
        <>
            <div className='text-end p-8 dark:bg-black'>
                <button className="btn btn-primary" onClick={() => window.my_modal_3.showModal()}>+ Add Products</button>
            </div>

            <dialog id="my_modal_3" className="modal">
                <form onSubmit={e => { formik.handleSubmit(); e.preventDefault(); }} className="modal-box">
                    <button type='button' onClick={() => window.my_modal_3.close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className='mt-6'>
                        <label htmlFor="">Enter Name</label>
                        <input type="text" placeholder="Enter Product Name" className={`input-md input mt-2 input-bordered w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-green-600'}`} {...formik.getFieldProps("name")} />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="">Enter Product Price </label>
                        <input type="number" min={1} placeholder="Enter Product Price" className={`input-md input mt-2 input-bordered w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${formik.touched.price && formik.errors.price ? 'border-red-500' : 'border-green-600'}`} {...formik.getFieldProps("price")} />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="">Enter Description</label>
                        <input type="text" placeholder="Enter Description" className={`input-md input mt-2 input-bordered w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${formik.touched.desc && formik.errors.desc ? 'border-red-500' : 'border-green-600'}`} {...formik.getFieldProps("desc")} />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="">Choose Color</label>
                        <select value={color} name="color" onChange={e => setColor(e.target.value)} className="mt-2 border-green-600 border-2 select select-bordered w-full">
                            <option value="" disabled>Select Color</option>
                            <option value="White">WHITE</option>
                            <option value="Black">BLACK</option>
                            <option value="Gray">GRAY</option>
                            <option value="Blue">BLUE</option>
                            <option value="Brown">BROWN</option>
                            <option value="Green">GREEN</option>
                            <option value="Pink">PINK</option>
                            <option value="Red">RED</option>
                            <option value="Purple">PURPLE</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="">Choose Size</label>
                        <select value={size} name="size" onChange={e => setSize(e.target.value)} className="mt-2 border-green-600 border-2 select select-bordered w-full">
                            <option value="" disabled>Select Size</option>
                            <option value="L">L</option>
                            <option value="X">X</option>
                            <option value="M">M</option>
                            <option value="S">S</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="">Choose Category</label>
                        <select value={Category} name="category" onChange={e => setCategory(e.target.value)} className="mt-2 border-green-600 border-2 select select-bordered w-full">
                            <option value="" disabled>Select Category</option>
                            <option value="Man">Man</option>
                            <option value="Women">Women</option>
                            <option value="Kid">Kid</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <input type="file" onChange={e => { setImgprint(URL.createObjectURL(e.target.files[0])); setBackimg(e.target.files[0]) }} className='w-full mt-3' />
                            <img src={imgprint} className='w-52' alt="" />
                        </div>
                    </div>
                    <button type='submit' className="btn btn-primary my-3 w-full">Submit</button>
                </form>
            </dialog>

            <div className="dark:bg-gray-700 dark:text-white">
                <div className="overflow-x-auto">
                    <table className="table table-sm py-0 border-2">
                        <thead className="border-2 dark:text-white">
                            <tr>
                                <th className='text-xl p-0'>Name</th>
                                <th className='text-xl p-0'>Img</th>
                                <th className='text-xl p-0'>Price</th>
                                <th className='text-xl p-0'>Color</th>
                                <th className='text-xl p-0'>Size</th>
                                <th className='text-xl p-0'>Description</th>
                                <th className='text-xl p-0'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map(item => (
                                <tr key={item.id} className='border-2 dark:bg-gray-600 dark:text-white'>
                                    <td className='p-0 text-2xl mt-12 flex items-center'>
                                        <div className='md:w-[50%]'>
                                            <p>{item.name}</p>
                                        </div>
                                    </td>
                                    <td className='p-0 w-44'>
                                        <img src={item.img} className='' alt="" />
                                    </td>
                                    <td className='p-0'>
                                        <p>{item.price}</p>
                                    </td>
                                    <td className='p-0'>
                                        <p>{item.color}</p>
                                    </td>
                                    <td className='p-0 flex gap-2'>
                                        {item.size}
                                    </td>
                                    <td className='p-0 w-40'>
                                        <p>{item.desc}</p>
                                    </td>
                                    <td className='p-0'>
                                        <button className="btn text-white me-3 bg-yellow-400 hover:bg-yellow-500" onClick={() => (window.my_edit_3.showModal(), setHandleedit(item))}>Edit</button>
                                        <button className="btn text-white bg-red-500 hover:bg-red-700" onClick={() => deleteProduct(item)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

{/* Edit Data */}
            {/* <dialog id="my_edit_3" className="modal mix-blend-normal  ">
                {handleedit && handleedit.name && (
                    <div className="modal-box ">
                        <button onClick={() => window.my_edit_3.close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <div className='mt-6'>
                            <label htmlFor="">Enter Name</label>
                            <input value={handleedit.name} onChange={edtinputs} name='name' type="text" placeholder="Enter Product Name" className={`input-md input mt-2 input-bordered w-full border-2 rounded-md`} />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="">Enter Product Price </label>
                            <input value={handleedit.price} onChange={edtinputs} name='price' type="text" placeholder="Enter Product Price" className={`input-md input mt-2 input-bordered w-full border-2 rounded-md`} />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="">Enter Description</label>
                            <input value={handleedit.desc} onChange={edtinputs} name='desc' type="text" placeholder="Enter Description" className={`input-md input mt-2 input-bordered w-full border-2 rounded-md`} />
                        </div>
                          <div className='mt-2'>
                        <label htmlFor="">Choose Color</label>
                        <select value={handleedit.color} name="color" onChange={e => setHandleedit(e.target.value)} className="mt-2 border-green-600 border-2 select select-bordered w-full">
                            <option value="" disabled>Select Color</option>
                            <option value="White">WHITE</option>
                            <option value="Black">BLACK</option>
                            <option value="Gray">GRAY</option>
                            <option value="Blue">BLUE</option>
                            <option value="Brown">BROWN</option>
                            <option value="Green">GREEN</option>
                            <option value="Pink">PINK</option>
                            <option value="Red">RED</option>
                            <option value="Purple">PURPLE</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="">Choose Size</label>
                        <select value={handleedit.size} name="size" onChange={e => setHandleedit(e.target.value)} className="mt-2 border-green-600 border-2 select select-bordered w-full">
                            <option value="" disabled>Select Size</option>
                            <option value="L">L</option>
                            <option value="X">X</option>
                            <option value="M">M</option>
                            <option value="S">S</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="">Choose Category</label>
                        <select value={handleedit.Category} name="category" onChange={e => setHandleedit(e.target.value)} className="mt-2 border-green-600 border-2 select select-bordered w-full">
                            <option value="" disabled>Select Category</option>
                            <option value="Man">Man</option>
                            <option value="Women">Women</option>
                            <option value="Kid">Kid</option>
                        </select>
                    </div>
                        <div>
                            <div className='flex'>
                                {imgopacity ? (
                                    <img src={handleedit.img} className='w-48 h-40' alt="" />
                                ) : (
                                    <>
                                        <img src={temimg && temimg.newHero} alt="" />
                                        <input type='file' name='newHero' onChange={edtinputs} className='mt-3' />
                                        <button onClick={() => setImgopacity(true)} className="btn bg-red-400 hover:bg-red-600 mt-16 btn-sm">Cancel</button>
                                    </>
                                )}
                                {imgopacity && (
                                    <button onClick={() => setImgopacity(false)} className="btn bg-red-400 hover:bg-red-600 mt-16 btn-sm">Remove</button>
                                )}
                            </div>
                        </div>
                        <button onClick={() => updateProduct(handleedit)} type='submit' className="btn btn-primary">Submit</button>
                    </div>
                )}
            </dialog> */}

            <dialog id="my_edit_3" className="modal mix-blend-normal">
  {handleedit && handleedit && (
    <div className="modal-box">
      <button onClick={() => window.my_edit_3.close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

      {/* Name */}
      <div className='mt-6'>
        <label>Enter Name</label>
        <input
          value={handleedit.name}
          onChange={edtinputs}
          name='name'
          type="text"
          placeholder="Enter Product Name"
          className="input-md input mt-2 input-bordered w-full border-2 rounded-md"
        />
      </div>

      {/* Price */}
      <div className='mt-2'>
        <label>Enter Product Price</label>
        <input
          value={handleedit.price}
          onChange={edtinputs}
          name='price'
          type="text"
          placeholder="Enter Product Price"
          className="input-md input mt-2 input-bordered w-full border-2 rounded-md"
        />
      </div>

      {/* Description */}
      <div className='mt-2'>
        <label>Enter Description</label>
        <input
          value={handleedit.desc}
          onChange={edtinputs}
          name='desc'
          type="text"
          placeholder="Enter Description"
          className="input-md input mt-2 input-bordered w-full border-2 rounded-md"
        />
      </div>

      {/* Color */}
      <div className='mt-2'>
        <label>Choose Color</label>
        <select
          value={handleedit.color}
          name="color"
          onChange={edtinputs}
          className="mt-2 border-green-600 border-2 select select-bordered w-full"
        >
          <option value="" disabled>Select Color</option>
          <option value="White">WHITE</option>
          <option value="Black">BLACK</option>
          <option value="Gray">GRAY</option>
          <option value="Blue">BLUE</option>
          <option value="Brown">BROWN</option>
          <option value="Green">GREEN</option>
          <option value="Pink">PINK</option>
          <option value="Red">RED</option>
          <option value="Purple">PURPLE</option>
        </select>
      </div>

      {/* Size */}
      <div className='mt-2'>
        <label>Choose Size</label>
        <select
          value={handleedit.size}
          name="size"
          onChange={edtinputs}
          className="mt-2 border-green-600 border-2 select select-bordered w-full"
        >
          <option value="" disabled>Select Size</option>
          <option value="L">L</option>
          <option value="X">X</option>
          <option value="M">M</option>
          <option value="S">S</option>
          <option value="XL">XL</option>
        </select>
      </div>

      {/* Category */}
      <div className='mt-2'>
        <label>Choose Category</label>
        <select
          value={handleedit.category}
          name="category"
          onChange={edtinputs}
          className="mt-2 border-green-600 border-2 select select-bordered w-full"
        >
          <option value="" disabled>Select Category</option>
          <option value="Man">Man</option>
          <option value="Women">Women</option>
          <option value="Kid">Kid</option>
        </select>
      </div>

      {/* Image Update */}
      <div className='mt-2'>
        <div className='flex gap-3 items-center'>
          {imgopacity ? (
            <>
              <img src={temimg&&temimg.newHero} className='w-48 h-40 object-cover' alt="" />
                <button onClick={() => setImgopacity(false)} className="btn bg-red-400  hover:bg-red-600 mt-16 btn-sm">Cancel</button>
              <input type='file' name='newHero' onChange={edtinputs} className='mt-3' />
            </>
          ) : (
              <>
              <img src={handleedit.img} className='w-48 h-40 object-cover' alt="" />
              <button onClick={() => setImgopacity(true)} className="btn bg-red-400 hover:bg-red-600 mt-16 btn-sm">Remove</button>
            </>
          )}
        </div>
      </div>

      {/* Submit */}
      <button onClick={() => updateProduct(handleedit)} type='submit' className="btn btn-primary mt-4">Submit</button>
    </div>
  )}
</dialog>

{/* Page Loading Code */}

    {(deleteLoading || updatedLoading||isLoading||addLoading) && (
  <div className="fixed inset-0 z-50 flex flex-col justify-center items-center backdrop-blur-sm bg-white/50">
    <motion.div
      animate={{ rotate: [0, 90, 180, 270, 360] }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }}
    >
      <PiWebhooksLogo className="text-8xl text-blue-600" />
    </motion.div>

    <div className="flex items-center justify-center my-4">
      <p className="mr-2 text-xl font-medium text-gray-800">Loading</p>
      <span className="loading loading-dots loading-md"></span>
    </div>
  </div>
)}

        </>
    )
}

export default Admin
