import { CONSTANTS } from "../../constants/constants";
import { Repository } from "../../../repositories/Repository";
import { GenericSyncsModel } from "./GenericSyncsModel";

export class GenericSyncsService {
    public static async getLastFromDb(): Promise<GenericSyncsModel> {
        try {
            const genericSyncs = await Repository.get(CONSTANTS.TABLES.GENERIC_SYNCS);

            let genericSync: GenericSyncsModel = {
                id: 0,
                fecha: ""
            };

            if (!genericSyncs.values) return genericSync;

            genericSync = genericSyncs.values.sort((a, b) => { return new Date(b.fecha).getTime() - new Date(a.fecha).getTime(); })[0];

            return genericSync;
        } catch (error) {
            throw error;
        }
    }

    public static async save(fecha: string): Promise<void> {
        try {
            const genericSync: GenericSyncsModel = {
                fecha: fecha
            }
            await Repository.save(genericSync, CONSTANTS.TABLES.GENERIC_SYNCS);
        } catch (error) {
            throw error;
        }
    }
}
