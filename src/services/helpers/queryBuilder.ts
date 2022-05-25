import { IFilter } from "../../repositories/IFilter";

export const selectQuery = (tableName: string, filters?: IFilter[]): string => {
    let query: string;
    if (tableName) {
        query = `SELECT * FROM ${tableName}`;
    } else {
        throw new Error(`Invalid table`);
    }

    if (filters) {
        query = `${query} WHERE`;

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            
            query = i !== (filters.length - 1)
                ? `${query} ${filter.column} ${filter.symbol || "="} ${filter.value} AND`
                : `${query} ${filter.column} ${filter.symbol || "="} ${filter.value}`;
        }
    }
    return query;
}

export const insertQuery = (config: any): string => {
    let query: string;
    if (config.table) {
        query = `INSERT INTO ${config.table}`;
    } else {
        throw new Error(`The table name cannot be empty`);
    }

    if (config.columns) {
        query = `${query} (${config.columns})`;
    }

    if (config.values && config.values.length > 0) {
        query = `${query} VALUES`;

        for (let i = 0; i < config.values.length; i++) {
            query = i !== (config.values.length - 1) ? `${query} ${config.values[i]},` : `${query} ${config.values[i]}`;
        }
    }

    return query;
}

export const updateQuery = (tableName: string, columns: IFilter[], filters?: IFilter[]): string => {
    let query: string;
    if (tableName) {
        query = `UPDATE ${tableName}`;
    } else {
        throw new Error(`Invalid table`);
    }

    if (columns) {
        query = `${query} SET`;

        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            query = i !== (columns.length - 1)
                ? `${query} ${column.column} = ${column.value} ,`
                : `${query} ${column.column} = ${column.value}`;
        }
    }

    if (filters) {
        query = `${query} WHERE`;

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            query = i !== (filters.length - 1)
                ? `${query} ${filter.column} = ${filter.value} AND`
                : `${query} ${filter.column} = ${filter.value}`;
        }
    }
    return query;
}

export const deleteQuery = (tableName: string, filters?: IFilter[]): string => {
    let query: string;
    if (tableName) {
        query = `DELETE FROM ${tableName}`;
    } else {
        throw new Error(`The table name cannot be empty`);
    }

    if (filters) {
        query = `${query} WHERE`;

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            query = i !== (filters.length - 1)
                ? `${query} ${filter.column} = ${filter.value} AND`
                : `${query} ${filter.column} = ${filter.value}`;
        }
    }

    return query;
}