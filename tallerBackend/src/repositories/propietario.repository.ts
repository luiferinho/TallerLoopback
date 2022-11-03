import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Vehi} from '../models';
import {VehiRepository} from './vehi.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly vehi: HasOneRepositoryFactory<Vehi, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiRepository') protected vehiRepositoryGetter: Getter<VehiRepository>,
  ) {
    super(Propietario, dataSource);
    this.vehi = this.createHasOneRepositoryFactoryFor('vehi', vehiRepositoryGetter);
    this.registerInclusionResolver('vehi', this.vehi.inclusionResolver);
  }
}
