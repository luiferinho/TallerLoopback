import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Propietario} from '../models';
import {PropietarioRepository} from '../repositories';
import {Llaves} from '../config/llaves';
const generador= require("password-generator");
const cryptoJS=require("crypto-js");
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository

  ) {}

  /*
   * Add service methods here
   */
  GenerarClave(){
    let clave = generador(8,false);
    return clave;
  }

  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;

  }

  IdentificarPersona (usuario:string, clave:string){
    try{
      let p= this.propietarioRepository.findOne({where:{Correo:usuario, clave:clave }});
      if (p!= null){
        return p;
      }
      return false;
    }catch{
      return false;
    }

  }

  GenerarTokenJWT(propietario: Propietario){
    let token = jwt.sign( {
      data : {
        id: propietario.id,
        correo: propietario.Correo,
        nombres: propietario.Nombre + " "+ propietario.Apellidos,

      }
   },
    Llaves.claveJWT );
    return token;

  }
  ValidarTokenJWT(token: string){
    try{
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;

    }catch{
      return false;
    }
  }
}
