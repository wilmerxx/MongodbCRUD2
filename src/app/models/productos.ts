export class Producto{
  _id?: number;
  cliente: string;
  animal: string;
  raza: string;
  sexo: string;
  nacimiento: string;
  direccion: string;
  telefono: string;

  constructor(cliente: string, animal:string,raza:string,sexo:string,nacimiento:string, direccion:string, telefono:string){
    this.cliente = cliente;
    this.animal = animal;
    this.raza = raza;
    this.sexo = sexo;
    this.nacimiento = nacimiento;
    this.direccion = direccion;
    this.telefono = telefono;
  }

}
