import { Body, Controller, Get, ParseFloatPipe, Post, Query } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import type { IncidentCDto } from 'src/core/models/incident.model';
import { logger } from 'src/config/logger';

@Controller('incidents')
export class IncidentsController {

    constructor(private readonly IncidentService: IncidentsService){}

    @Get()
    async findAllIncidents(){
        console.log("[IncidentController] Recibiendo solicitud de findAllIncidents");
        const result = await this.IncidentService.findAll();
        return result;
    }

    @Get('search/radius')
    async findIncidentByRadius(
        @Query('lat',ParseFloatPipe) lat : number,
        @Query('lon',ParseFloatPipe) lon : number,
        @Query('radiusInMeters',ParseFloatPipe) radiusInMeters: number
    ){
        console.log(`[IncidentController] Buscando incidentes en un radio de: ${radiusInMeters}m`);
        const result = await this.IncidentService.findInRadius(lat, lon, radiusInMeters);
        return result;
    }

    @Post()
    async createIncident(@Body() incident: IncidentCDto){
        logger.info(`[IncidentController] Creando un nuevo incidente: ${incident.title}`);
        const result = this.IncidentService.createIncident(incident);
        logger.info(`[IncidentController] Incidente creado: ${incident.title}`);
        return result;
    }
}
