import React, { useState } from 'react'
import HomeStore from '../Store/Home'
import { SendHorizontal, Upload, Images } from 'lucide-react';

const Chatiput = () => {
  const [msg, setMsg] = React.useState('')
  const { sendMessage, SelectedUser } = HomeStore();
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null)

  async function handleSend(e) {
    e.preventDefault();
    if (file) {
      await sendMessage({message:msg , reciverID:SelectedUser._id , image:file})
      setFile(null);
      setMsg('');
      setPreviewURL(null)
    } else {
      await sendMessage({message:msg , reciverID:SelectedUser._id})
      setFile(null);
      setMsg('');
      setPreviewURL(null)

    }
    
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className='flex relative items-center p-3 gap-3 justify-center'>
      {previewURL && <img src={previewURL} alt={file.name}className='h-24 w-24 shadow-lg absolute left-2 top-[-103px] bg-base-200  rounded-2xl' />}
      <label className="cursor-pointer flex items-center  bg-blue-500 text-white px-1 py-1 rounded-md shadow-md hover:bg-blue-600">
        <Images size={20} /> 
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
      <label className='flex flex-grow'>
        <input
          value={msg} onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend(e)
            }
          }}
          className='p-3 input input-bordered bg-[white]  overflow-scroll min-h-5 flex flex-grow rounded-2xl ' type="text" placeholder='Message' />
      </label>

      <button className='btn rounded-full' onClick={handleSend}><SendHorizontal size={20} /></button>
    </div>
  )
}

export default Chatiput
