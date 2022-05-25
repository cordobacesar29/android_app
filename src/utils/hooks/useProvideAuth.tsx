import { useEffect, useState } from "react";
import { IUserLoggedModel, IUserLoginModel } from "../models";
import { Authorize } from "../services/auth.service";
import { StorageInstance } from "../../config/createStorage";
import apiAxiosInstance from "../httpConfig/apiAxiosInstance";
import { userService } from "../../services/modules/usuario/userService";

let initialState: IUserLoggedModel = {
  token: "",
  logged: false,
  companyId: "",
  email: "",
  userName: "",
};

export const useProvideAuth = () => {
  const [user, setUser] = useState<IUserLoggedModel>(initialState);
  const [isPending, setIsPending] = useState<boolean>(false); // request pending

  useEffect(() => {
    const createStorage = async () => {
      const store = await StorageInstance.getInstance();
      if (!!store) {
        const userStorage: IUserLoggedModel = await StorageInstance.getStorage(
          "user"
        );
        if (userStorage) {
          setUser(userStorage);
        }
      }
    };
    createStorage();
  }, []);

  const signin = async (values: IUserLoginModel): Promise<number> => {
    const valuesForm = {
      email: values.email,
      password: values.password,
    };
    const response = await Authorize(values);
    if (response?.data) {
      const userData: IUserLoggedModel = {
        token: response.data.token,
        logged: true,
        companyId: response.data.companyId,
        email: values.email,
        userName: "",
      };
      await apiAxiosInstConfiguration(userData);
      const userInfo = await userService(values.email);
      userData.userName = userInfo;
      setUser(userData);
      await StorageInstance.setStorage("user", userData);
      return 200;
    } else {
      return 400;
    }
  };

  const logOut = async () => {
    try {
      await StorageInstance.removeStorage("user");
      setUser(initialState);
      return 200;
    } catch (error) {
      return 400;
    }
  };

  return { user, signin, isPending, setIsPending, logOut };
};

export const apiAxiosInstConfiguration = async (
  userModel: IUserLoggedModel | undefined = undefined
) => {
  const user = !!userModel
    ? userModel
    : await StorageInstance.getStorage("user");

  if (user) {
    apiAxiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;
    apiAxiosInstance.defaults.headers.common["CompanyId"] = `${user.companyId}`;
    apiAxiosInstance.defaults.headers.common["Email"] = `${user.email}`;
  }
};
