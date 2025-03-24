import React, { useEffect, useState } from 'react'
import { UserPen, Dot, UserPlus, X, MessageSquareText } from 'lucide-react';
import HomeStore from '../Store/Home';

const HomeSide = () => {
    const [addContactPanel, setaddContactPannel] = useState(false);
    const [email, setemail] = useState('')
    const { isSearching, Searcheduser,AllMessages, search,getAllMessages,isGettingMsgs, users, addUsertoContact, getMyContacts  ,isUserOnline , ListenforOnlineUsers , openChatboxHideSide , setopenChatboxHideSide} = HomeStore()
    const [Id, setId] = useState()
    

    useEffect(()=>{
        ListenforOnlineUsers()

    },[])
    useEffect(() => {
        getMyContacts()
    }, [users, addContactPanel])

    async function handleSearch() {
        await search(email)
    }
    async function handleaddtoContact(id) {
        await addUsertoContact(id);
    }
    async function HandleOpenUserChat(e) {
     await getAllMessages(e._id)
     setopenChatboxHideSide();
    }

    return (
        <div className={` ${openChatboxHideSide ? 'hidden' : 'block'} lg:block flex  flex-col w-full  h-full relative lg:w-md   rounded-l-2xl border-r-1 border-b-base-content/40 `}>
            <div className=' flex flex-col justify-center p-7 gap-5 border-b-1 border-b-base-content/40'>
                <div onClick={() => { setaddContactPannel(true) }} className='flex gap-4 items-center justify-center p-2 rounded-2xl transition-all duration-500 hover:bg-base-content/10 cursor-pointer'>
                    <UserPen size={30} />
                    <h1 className='text-xl  text-base-content'> Add Contacts</h1>
                </div>
                <div className='flex  gap-3 items-center justify-center'>
                    <MessageSquareText />
                    <h1 className='text-xl text-primary'>Chats</h1>
                
                </div>
            </div>

            <div className='list flex flex-col  items-center overflow-y-scroll h-full'>
                {
                    users.map((e, idx) => {
                        return (
                            <div key={idx} onClick={()=> HandleOpenUserChat(e)} className=' flex w-full p-4 gap-4 items-center transition-all duration-500 hover:bg-base-content/20 border-b-secondary border-b-1 cursor-pointer'>
                                <img src={e.profilePic || 'user.png'} className='w-13 rounded-xl' alt="" />
                                <div>
                                    <h1 className='text-primary'>{e.fullname}</h1>
                                    <p className='text-base-content'>{
                                         isUserOnline[e._id] ?
                                         'Online' : 'Offline' 
                                        }</p>

                                </div>

                            </div>

                        )
                    })
                }

            </div>
            <div className={`h-full z-30  w-full  absolute bg-base-200 text-accent flex flex-col items-center overflow-hidden transition-all duration-500 ${addContactPanel ? 'top-0 right-0 z-40' : 'top-0 right-800'}`}>
                <X size={40} className=' p-2   transition-all duration-300 absolute top-4 left-4 cursor-pointer  hover:bg-secondary hover:text-white rounded-full' onClick={() => { setaddContactPannel(false) }} />
                <input onChange={(e) => { setemail(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch()
                        }
                    }}
                    value={email}
                    type="email"
                    placeholder='Search Friends using email'
                    className=' input w-[90%] mt-18 p-2 rounded-md border-1 border-accent text-base-content' />
                <div className='list flex flex-col  items-center overflow-y-scroll h-full w-full'>

                    {
                        isSearching ?
                            <p className='pt-3  text-md'>Searching...</p> :
                            Searcheduser.map((e, idx) => {
                                return (<div key={idx} className='flex card bg-base-200  justify-between w-full p-4 gap-2 items-center border-b-1 border-base-300/20 transition-all duration-500 hover:bg-base-content/20 '>
                                    <div className='flex gap-10  items-center'>
                                    <img src={e.profilePic} className='w-13 h-13 rounded-xl' alt="" />
                                        <div className='flex flex-col items-center'>
                                            <h1 className='  w-full font-bold text-primary '>{e.fullname}</h1>
                                            <p className='font-bold text-base-content '>offline</p>
                                        </div>
                                        {
                                            users.some((elem) => { return elem._id === e._id; }) ?
                                            <div className='flex gap-2 items-end bg-base-200/10 cursor-pointer rounded-md p-2'>
                                        
                                            <span  className='font-semibold text-[15px] btn btn-success'> Added</span>
                                            </div>
                                                 :
                                                <div onClick={() => { handleaddtoContact(e._id) }} className='flex gap-2 items-center bg-base-200/10 cursor-pointer rounded-md p-2'>
                                                    <UserPlus />
                                                    <span className='font-semibold btn btn-primary text-[15px]'> Add</span>
                                                </div>

                                        }

                                    </div>

                                </div>)
                            })
                    }

                </div>

            </div>

        </div>
    )
}

export default HomeSide
