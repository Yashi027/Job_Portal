import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'

const AddJob = () => {

    const [title,setTitle] = useState('')
    const [location, setLocation] = useState('Banglore')
    const [category, setCategory] = useState('Programming')
    const [level, setLevel] = useState('Beginner level')
    const [salary,setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current,{
                theme:'snow'
            })
        }
    },[])

  return (
    <form className='container flex flex-col gap-3 p-4 w-full items-start'>
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input type="text" placeholder='Type here' 
        onChange={e => setTitle(e.target.value)} value={title}
        className='w-full max-w-lg px-3 py-2 border-2 border-gray-200' required/>
      </div>

      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div ref={editorRef}>

        </div>
      </div>

      <div className='flex w-full flex-col sm:flex-row gap-2 sm:gap-8'>
        <div>
            <p className='mb-2'>Job Category</p>
            <select className='w-full border-2 border-gray-300 rounded px-3 py-2' onChange={e => setCategory(e.target.value)}>
                {JobCategories.map((category,index) => (
                    <option value={category} key={index}>{category}</option>
                ))}
            </select>
        </div>

        <div>
            <p className='mb-2'>Job Location</p>
            <select className='w-full border-2 border-gray-300 rounded px-3 py-2' onChange={e => setLocation(e.target.value)}>
                {JobLocations.map((location,index) => (
                    <option value={location} key={index}>{location}</option>
                ))}
            </select>
        </div>

        <div>
            <p className='mb-2'>Job Level</p>
            <select className='w-full border-2 border-gray-300 rounded px-3 py-2' onChange={e => setLevel(e.target.value)}>
                <option value="Beginner level">Beginner level</option>
                <option value="Intermediate level">Intermediate level</option>
                <option value="Senior level">Senior level</option>
            </select>
        </div>
      </div>
      <div>
        <p className='mb-2'>Job Salary</p>
        <input className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' min={0} onChange={e => setSalary(e.target.value)} type="number" placeholder='25000' />
      </div>
      <button className='mt-4 py-3 w-28 bg-black text-white rounded'>Add</button>
    </form>
  )
}

export default AddJob
