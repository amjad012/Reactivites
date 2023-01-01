import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity, ActivityFormValues } from '../models/activity';
import { Photo, Profile } from '../models/profile';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep=(delay: number) => {
    return new Promise((resolve) =>{
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL='http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})


axios.interceptors.response.use(async response =>{
   
        await sleep(1000);
        return response;
    
},(error:AxiosError)=>{
    const {data,status,config} = error.response!;
    
    switch(status){
        case 400:
            toast.error('bad request');         
            break;    
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found')
            break;
        case 500:
            toast.error('server error');            
           break;
        }
    return Promise.reject(error) 
}
)
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get:<T>(url:string) => axios.get<T>(url).then(responseBody),
    post:<T>(url:string, body :{}) => axios.post<T>(url,body).then(responseBody),
    put:<T>(url:string, body:{}) => axios.put<T>(url,body).then(responseBody),
    del:<T>(url:string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details:(id:string) => requests.get<Activity>(`/activities/${id}`),
    create:(activity:ActivityFormValues)=> requests.post<void>('/activities',activity),
    update:(activity:ActivityFormValues)=> requests.put<void>(`/activities/${activity.id}`,activity),
    delete:(id:string) => requests.del<void>(`/activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})
}
const Account = {
    current:() => requests.get<User>('/account'),
    login:(user: UserFormValues) => requests.post<User>('/account/login', user),
    register:(user:UserFormValues) => requests.post<User>('/account/register',user)
}

const Profiles = {
    get:(username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto:(file: Blob) => { // for upload photo method
        let formData = new FormData();
        formData.append('File',file);
        return axios.post<Photo>('photos', formData, {
            headers:{'Content-type' : 'multipart/form-data'}
        })
    },
    setMainPhoto:(id:string) => requests.post(`/photos/${id}/setMain`,{}),// set a photo to be main photo in user profile
    deletePhoto: (id:string) => requests.del(`/photos/${id}`), // for delete photo from user profile
    updateProfile:(profile:Partial<Profile>) => requests.put(`/profiles`, profile), // for update profile details
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {})//to update the following
  
}

const agent = {
    Activities,
    Account,
    Profiles
}

export default agent;