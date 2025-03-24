import {create} from 'zustand'
import axiosInstance from '../Config/axious'
import toast from 'react-hot-toast';
import socket from '../Config/Socket';
import HomeStore from './Home';





 const useAuthStore = create((set)=>({
    authUser:false,
    isCheckingAuth:true,
    isSigningup:false,
    isLogingin:false,
    isUploading:false,
    isAboutUPdating:false,
    theme: localStorage.getItem('theme') || 'synthwave',
    userstatus:{},


   checkauth:async () => {
    
        try {
            const response = await axiosInstance.get('/auth/check')
             const user = await response.data
             set({ authUser: user, isCheckingAuth: false, isLogedin: true });
             socket.connect();
             socket.emit("registerUser", user._id);
             
        
        } catch (error) {
            set({ isCheckingAuth: false });
       
        } finally{
            set({ isCheckingAuth: false });
        }
    },

    createAccount: async (data)=>{
      
        set({isSigningup: true})
     
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            const User = response.data.user;
            toast.success('Account Created Succesfully');
            set({isSigningup: false , isCheckingAuth: false})
            set({ authUser:User, isCheckingAuth: false, isLogedin: true });
            socket.connect();
            socket.emit("registerUser", User._id);
        
        } catch (error) {
        
            console.error('Error while creating account', error)
            toast.error('Failed to Create Account');

        }finally{
            set({isSigningup: false , isCheckingAuth: false})
            
        }
    },

    loginAccount: async (data) => {
        set({isLogingin: true})
        try {
            const response = await axiosInstance.post('/auth/login', data);
            const User = await response.data.user;
            set({authUser: User, isLogingin: false , isCheckingAuth: false})
            socket.connect();
            socket.emit("registerUser", User._id);
            toast.success('Login Succefully');
        } catch (error) {
            console.error('Error while logging in', error)
            toast.error('Failed to login');
            
        }finally{
            set({isLogingin: false , isCheckingAuth: false})


        }
        
    },

    uploadProfilepic: async (data) => {
    set({isUploading:true})
    const formData = new FormData();
    formData.append("profilePic", data);
    try {
        const response = await axiosInstance.post('/auth/update-profile-pic', formData ,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        toast.success('Profile Pic Updated Succesfully');
        set({isUploading: false})

        
    } catch (error) {
        console.error('Error while uploading profile pic', error)
        toast.error('Failed to Update Profile Pic');
    }finally{
        set({ isUploading: false }); 
    }
   },

   updataAbout : async (data)=>{
    set({isAboutUPdating:true,})
    try {
        console.log(data)
        const response = await axiosInstance.post('/auth/update-about', {about: data});
        toast.success('About Updated Succesfully');
        set({isAboutUPdating: false})
        
    } catch (error) {
        console.error('Error while updating about', error)
        toast.error('Failed to Update About');
        
    }finally{
        set({isAboutUPdating: false})
    }

   },

   setTheme: async (data) => {
    set({theme:data})   
    localStorage.setItem('theme', data);
    
   },
   
   logout: async () => {
    try {
        await axiosInstance.post('/auth/logout');
        toast.success('Logout Succesfully');
        set({ 
            authUser: false, 
            isCheckingAuth:false,
            isSigningup:false,
            isLogingin:false,
            isUploading:false,
            isAboutUPdating:false,
           
        });
        // put false to everything



        socket.disconnect();
       return true
     

    } catch (error) {
        console.error('Error while logging out', error)
        toast.error('Failed to logout');
    } finally{
        set({ isCheckingAuth: false });
    }
    
   },
   
  
}))
      socket.on("lastseen",  async ({ userId, lastSeen }) => {
        useAuthStore.setState((state) => ({
            userstatus: {
                ...state.userstatus, // Keep existing statuses
                [userId]: lastSeen // Update the specific user's last seen
            } 
        }));
        HomeStore.setState((state) => ({
            isUserOnline: {...state.isUserOnline, [userId]:  false }  // Update the user status in the state
        }));
        // console.log('state after lastseen', useAuthStore.getState(
        //     (state) => state.userstatus  // This will return the updated state.userstatus
        // ))
     
      })

export {useAuthStore}