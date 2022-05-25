import { Drivers, Storage } from "@ionic/storage";

export class StorageInstance {
  private static instance: Storage;

  private constructor() {}

  public static getInstance(): Storage {
    if (!StorageInstance.instance) {
      const name = "synagro";
      StorageInstance.instance = new Storage({
        name,
        driverOrder: [Drivers.LocalStorage],
      });
      StorageInstance.instance.create();
    }
    return StorageInstance.instance;
  }

  public static async getStorage(key: string): Promise<any> {
    return await StorageInstance.getInstance().get(key);
  }
  public static async setStorage(key: string, value: any) {
    await StorageInstance.getInstance().set(key, value);
  }
  public static async removeStorage(key: string) {
    await StorageInstance.getInstance().remove(key);
  }
}
