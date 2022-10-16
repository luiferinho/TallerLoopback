import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Seguro, SeguroRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class SeguroRepository extends DefaultCrudRepository<
  Seguro,
  typeof Seguro.prototype.id,
  SeguroRelations
> {
  public readonly vehiculo: BelongsToAccessor<
    Vehiculo,
    typeof Seguro.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('VehiculoRepository')
    protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Seguro, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor(
      'vehiculo',
      vehiculoRepositoryGetter,
    );
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
