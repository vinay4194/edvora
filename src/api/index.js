import axios from 'axios'

export const getRidesData = async () => {
  try {
    const data = await axios.get(`https://assessment.api.vweb.app/rides`)
    return data
  } catch (error) {
    console.log(error)
  }
}
export const getUserData = async () => {
  try {
    const userData = await axios.get(`https://assessment.api.vweb.app/user`)
    return userData
  } catch (error) {
    console.log(error)
  }
}
