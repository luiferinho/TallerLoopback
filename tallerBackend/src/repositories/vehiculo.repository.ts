import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {
  Vehiculo,
  VehiculoRelations,
  Propietario,
  Mecanico,
  RevisionNiveles,
  CambioRepuesto,
  Seguro,
} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {MecanicoRepository} from './mecanico.repository';
import {RevisionNivelesRepository} from './revision-niveles.repository';
import {CambioRepuestoRepository} from './cambio-repuesto.repository';
import {SeguroRepository} from './seguro.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {
  public readonly propietario: BelongsToAccessor<
    Propietario,
    typeof Vehiculo.prototype.id
  >;

  public readonly mecanico: BelongsToAccessor<
    Mecanico,
    typeof Vehiculo.prototype.id
  >;

  public readonly revisionNiveles: HasManyRepositoryFactory<
    RevisionNiveles,
    typeof Vehiculo.prototype.id
  >;

  public readonly cambioRepuestos: HasManyRepositoryFactory<
    CambioRepuesto,
    typeof Vehiculo.prototype.id
  >;

  public readonly seguros: HasManyRepositoryFactory<
    Seguro,
    typeof Vehiculo.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('PropietarioRepository')
    protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
    @repository.getter('MecanicoRepository')
    protected mecanicoRepositoryGetter: Getter<MecanicoRepository>,
    @repository.getter('RevisionNivelesRepository')
    protected revisionNivelesRepositoryGetter: Getter<RevisionNivelesRepository>,
    @repository.getter('CambioRepuestoRepository')
    protected cambioRepuestoRepositoryGetter: Getter<CambioRepuestoRepository>,
    @repository.getter('SeguroRepository')
    protected seguroRepositoryGetter: Getter<SeguroRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.seguros = this.createHasManyRepositoryFactoryFor(
      'seguros',
      seguroRepositoryGetter,
    );
    this.registerInclusionResolver('seguros', this.seguros.inclusionResolver);
    this.cambioRepuestos = this.createHasManyRepositoryFactoryFor(
      'cambioRepuestos',
      cambioRepuestoRepositoryGetter,
    );
    this.registerInclusionResolver(
      'cambioRepuestos',
      this.cambioRepuestos.inclusionResolver,
    );
    this.revisionNiveles = this.createHasManyRepositoryFactoryFor(
      'revisionNiveles',
      revisionNivelesRepositoryGetter,
    );
    this.registerInclusionResolver(
      'revisionNiveles',
      this.revisionNiveles.inclusionResolver,
    );
    this.mecanico = this.createBelongsToAccessorFor(
      'mecanico',
      mecanicoRepositoryGetter,
    );
    this.registerInclusionResolver('mecanico', this.mecanico.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor(
      'propietario',
      propietarioRepositoryGetter,
    );
    this.registerInclusionResolver(
      'propietario',
      this.propietario.inclusionResolver,
    );
  }
}
