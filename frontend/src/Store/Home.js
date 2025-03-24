import { create } from 'zustand'
import axiosInstance from '../Config/axious';
import toast from 'react-hot-toast';
import socket from '../Config/Socket';
import { useAuthStore } from './Zustand';
import { Check, Cookie } from 'lucide-react';


const HomeStore = create((set, get) => ({
    isSearching: false,
    Searcheduser: [],
    isAddingContact: false,
    users: [],
    isGettingMsgs: false,
    AllMessages: [],
    SelectedUser: [],
    openModal: false,
    myself: [],
    isUserOnline:[],
    openChatboxHideSide:false,

    setopenChatboxHideSide: () => {
        set((state) => ({ openChatboxHideSide: !state.openChatboxHideSide }));
    },
    


    search: async (data) => {
        set({ isSearching: true });

        try {
            const response = await axiosInstance.post('/user/searchUser', { email: data })
            console.log(response.data)
            set({ Searcheduser: Array.isArray(response.data) ? response.data : [response.data], isSearching: false });
        } catch (error) {
            toast.error('Failed to search users');
            console.error('Error while searching users', error)
        } finally {
            set({ isSearching: false })

        }
    },

    addUsertoContact: async (data) => {
        set({ isAddingContact: true })
        try {
            const response = await axiosInstance.post('/auth/addContact', { id: data });
            toast.success('User Added to Contacts');
            // console.log(response.data)
            set({ Searcheduser: [] });
            set({ isAddingContact: false })
            set({ users: [...response.data.contact] })
        } catch (error) {
            toast.error('Failed to add user to contacts');
            console.error('Error while adding user to contacts', error)
            set({ isAddingContact: false })

        } finally {
            set({ isAddingContact: false })
        }


    },

    getMyContacts: async () => {
        try {
            const response = await axiosInstance.get('/user/allusers');
            set({ users: response.data })
        } catch (error) {
        return error
        }
    },

    getAllMessages: async (id) => {
        if (id) {
            set({ isGettingMsgs: true })
            set({ openModal: true, })
        } else {
            set({ openModal: false, })
            return
        }

        try {
            const responst = await axiosInstance.get(`/user/${id}`)
            set({ isGettingMsgs: false })
            set({ AllMessages: Array.isArray(responst.data[0]) ? responst.data[0] : [] });
            set({ SelectedUser: responst.data[1] })
            set({ myself: responst.data[2] });
        } catch (error) {
            toast.error('Failed to get messages');
            console.error('Error while getting messages', error)
            set({ isGettingMsgs: false })

        } finally {
            set({ isGettingMsgs: false })


        }

    },


    sendMessage: async (data) => {
        try {
            const formData = new FormData();
            formData.append("message", data.message);
            formData.append("reciverID", data.reciverID);
            if (data.image) {
                formData.append("image", data.image);
            }


            const response = await axiosInstance.post('/user/sendmessage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Message sent');
            const message = response.data[0]
            set((state) => ({
                AllMessages: [...(state.AllMessages || []), ...(Array.isArray(response.data) ? response.data : [response.data])]
            }));

            socket.emit('sendMessage', message)
        ;
              
      

        } catch (error) {
            console.error('Error while sending message', error)
        }

    },

    ListenforOnlineUsers: async (params) => {
        socket.on('updateOnlineStatus', ({userId, status})=>{
            set((state) => ({
                isUserOnline: {...state.isUserOnline, [userId]:  status}
            }))
        })
        
    }

}))

 // Use getState() outside React components

socket.on("recievemsg", (message) => {
    const { authUser } = useAuthStore.getState();
   
    if (message.receiver === authUser._id) {
    HomeStore.setState((state) => ({
        AllMessages: [...(state.AllMessages || []), message]
    }));
} else{
    console.log('this msg is not for me ' , authUser , message)
}
});



export default HomeStore