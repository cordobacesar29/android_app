import Swal from 'sweetalert2'
import authAxiosIntance from "../httpConfig/authAxiosInstance";
import { IUserLoginModel } from "../models";

export const Authorize = async (
  values:IUserLoginModel
): Promise<any> => {
  try {
    const response = await authAxiosIntance.post(`/Auth/Login`, values);  
    return response.data;
  } catch (error:any) {
    const title= error?.response?.status>=400 || error?.response?.status<=500 ? 'Login Incorrecto' : 'Error'
    const message= error?.response?.status>=400 || error?.response?.status<=500 ? 'Usuario o contraseña incorrectos.' : 'Coumicarse con el administrador del sistema.'
    
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,      
    })    
    return error?.response?.status;
  }
};
