import { IncidentType } from "../enums/incident-type.enum";

export interface IncidentCDto {
    lat: number;
    lon: number;
    title: string;
    description: string;
    type: IncidentType;
}