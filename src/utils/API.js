import axios from 'axios';

const URL = process.env.REACT_APP_API_BASE_URL+"/ticketing/";

export let GetMethod = async (URI) =>{
     let getResponse = await axios.get(URL+URI);
     return getResponse?.data;
}


export let PostMethod = async (URI,data) =>{
    let postResponse = await axios.post(URL+URI,data);
    return postResponse?.data;
}

export let PutMethod = async (URI,data) =>{
    let putResponse = await axios.put(URL+URI,data);
    return putResponse?.data;
}


export let DeleteMethod = async (URI) =>{
    let deleteResponse = await axios.delete(URL+URI);
    return deleteResponse;
}