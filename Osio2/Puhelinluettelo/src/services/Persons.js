import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (inputID) => {
  const request = axios.delete(baseUrl + "/" + inputID);
  return request.then((response) => response.data);
};

export default { getAllPersons, createPerson, deletePerson };
