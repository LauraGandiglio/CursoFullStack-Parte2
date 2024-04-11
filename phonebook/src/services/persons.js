import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
};

const create = (personObject) => {
  const request = axios.post(baseURL, personObject)
  return request.then(response => response.data)
};

const update = (id, personObject)=>{
  const request = axios.put(`${baseURL}/${id}`, personObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  axios.delete(`${baseURL}/${id}`)
.then(response => {
  console.log(`Deleted post with ID ${id}`);
})

}

export default {getAll,create, remove,update}