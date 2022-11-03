import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehi, VehiRelations} from '../models';

export class VehiRepository extends DefaultCrudRepository<
  Vehi,
  typeof Vehi.prototype.Placa,
  VehiRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Vehi, dataSource);
  }
}
