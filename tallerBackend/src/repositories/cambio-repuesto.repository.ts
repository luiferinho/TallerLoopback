import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {
  CambioRepuesto,
  CambioRepuestoRelations,
  Vehiculo,
  Repuesto,
} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {RepuestoRepository} from './repuesto.repository';

export class CambioRepuestoRepository extends DefaultCrudRepository<
  CambioRepuesto,
  typeof CambioRepuesto.prototype.id,
  CambioRepuestoRelations
> {
  public readonly vehiculo: BelongsToAccessor<
    Vehiculo,
    typeof CambioRepuesto.prototype.id
  >;

  public readonly repuestos: HasManyRepositoryFactory<
    Repuesto,
    typeof CambioRepuesto.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('VehiculoRepository')
    protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
    @repository.getter('RepuestoRepository')
    protected repuestoRepositoryGetter: Getter<RepuestoRepository>,
  ) {
    super(CambioRepuesto, dataSource);
    this.repuestos = this.createHasManyRepositoryFactoryFor(
      'repuestos',
      repuestoRepositoryGetter,
    );
    this.registerInclusionResolver(
      'repuestos',
      this.repuestos.inclusionResolver,
    );
    this.vehiculo = this.createBelongsToAccessorFor(
      'vehiculo',
      vehiculoRepositoryGetter,
    );
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
