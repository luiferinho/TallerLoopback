import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {JefeOperaciones, JefeOperacionesRelations} from '../models';

export class JefeOperacionesRepository extends DefaultCrudRepository<
  JefeOperaciones,
  typeof JefeOperaciones.prototype.id,
  JefeOperacionesRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(JefeOperaciones, dataSource);
  }
}
