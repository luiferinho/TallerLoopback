import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Repuesto, RepuestoRelations, CambioRepuesto} from '../models';
import {CambioRepuestoRepository} from './cambio-repuesto.repository';

export class RepuestoRepository extends DefaultCrudRepository<
  Repuesto,
  typeof Repuesto.prototype.id,
  RepuestoRelations
> {
  public readonly cambioRepuesto: BelongsToAccessor<
    CambioRepuesto,
    typeof Repuesto.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('CambioRepuestoRepository')
    protected cambioRepuestoRepositoryGetter: Getter<CambioRepuestoRepository>,
  ) {
    super(Repuesto, dataSource);
    this.cambioRepuesto = this.createBelongsToAccessorFor(
      'cambioRepuesto',
      cambioRepuestoRepositoryGetter,
    );
    this.registerInclusionResolver(
      'cambioRepuesto',
      this.cambioRepuesto.inclusionResolver,
    );
  }
}
