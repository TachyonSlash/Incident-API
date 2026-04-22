import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentEntity } from 'src/core/entities/incident.entity';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports:[
      EmailModule, 
      TypeOrmModule.forFeature([IncidentEntity]),
      CacheModule
    ],
  controllers: [IncidentsController],
  providers: [IncidentsService]
})
export class IncidentsModule {}
