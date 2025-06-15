import axios from "axios";
const api=axios.create({
  baseURL:"https://jsonplaceholder.typicode.com",
});
//for the axios.
export  const getData=()=>{
  return api.get("/posts");
}
//for the reactquery.
// export const getDataForQuery = async (pageNumber) => {
//   try {
//     const res = await api.get(`/posts?_start=${pageNumber}&limit=3`);
//     return res.status === 200 ? res.data : [];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };
export const getDataForQuery = async (pageNumber, limit = 3) => {
  try {
    const offset = pageNumber * limit;
    const res = await api.get(`/posts?_start=${offset}&_limit=${limit}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};






//data for the FetchIndividual.
export const getDataForIndi=async({queryKey})=>{
  try{ 
     const [,id]=queryKey;
     const res=await api.get(`/posts/${id}`);
     return res.status===200?res.data:[];
  }catch(error){
  if (error.response?.status === 404) {
      throw new Error(`Post with ID ${id} not found.`);
  }
  throw error;
}
};