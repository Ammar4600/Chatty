import React from 'react'

const MessageSkelton = () => {
    return (
        <div className='flex flex-col  w-full  gap-20 flex-grow p-3 mt-5'>
            <div className="flex h-12 p-5 w-full flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-28"></div>
                    </div>
                </div>

            </div>
            <div className="flex h-12 p-5 w-full flex-col gap-4 items-end">
                <div className="flex flex-row-reverse items-center gap-4">
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-28"></div>
                    </div>
                </div>

            </div>
            <div className="flex h-12 p-5 w-full flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-28"></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MessageSkelton
