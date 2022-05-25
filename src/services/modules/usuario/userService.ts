import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";

export const userService = async (values: string): Promise<string> => {
  try {
    const responseUser = await apiAxiosInstance.get(
      `/MasterData/GetUserNameByEmail?Email=${values}`
    );
    return responseUser.data;
  } catch (error: any) {
    throw new Error("error al obtener al usuario");
  }
};
