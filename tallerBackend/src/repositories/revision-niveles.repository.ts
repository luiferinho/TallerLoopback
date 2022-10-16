import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RevisionNiveles, RevisionNivelesRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class RevisionNivelesRepository extends DefaultCrudRepository<
  RevisionNiveles,
  typeof RevisionNiveles.prototype.id,
  RevisionNivelesRelations
> {
  public readonly vehiculo: BelongsToAccessor<
    Vehiculo,
    typeof RevisionNiveles.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('VehiculoRepository')
    protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(RevisionNiveles, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor(
      'vehiculo',
      vehiculoRepositoryGetter,
    );
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
