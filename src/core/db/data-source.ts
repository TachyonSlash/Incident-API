import { envs } from "src/config/envs";
import { DataSourceOptions, DataSource } from "typeorm";
import { IncidentEntity } from "../entities/incident.entity";


export const dataSourceOptions : DataSourceOptions = {
    host: envs.DB_HOST,
    database: envs.DB_NAME,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    port: envs.DB_PORT,
    type: 'postgres',
    entities: [IncidentEntity],
    synchronize: false,
    migrations: ["dist/core/db/migrations/*"] // El lugar donde se encuentran mis migraciones pero en JS
}

export const dataSource = new DataSource(dataSourceOptions);