import axios from 'axios';

class ProjectService {
  constructor() {
    this.instance = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/project`,
        withCredentials: true    
    })
  }

  fetchProjects = () => {
    return this.instance.get('/')
    .then(res => {

      let arrData = Object.keys(res.data).map(key => {
        return res.data[key];
      })

      console.log(arrData)
      console.log(res.data)

      return Promise.resolve(arrData)
    })
    .catch(error => console.error(error))
  }

  createProject = (project) => {
    return this.instance.post('/new', project)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  deleteProject = (projectId) => {
    return this.instance.delete(`/${projectId}`)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }
}

export default ProjectService