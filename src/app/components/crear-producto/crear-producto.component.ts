import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/productos';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  registroFrom: FormGroup;
  titulo = 'crear registro';
  id: string | null;
  constructor(private fb:FormBuilder,  private router: Router, private toastr: ToastrService, private _productoService: ProductoService, private aRouter: ActivatedRoute){

    this.registroFrom = this.fb.group({
      cliente: ['',Validators.required],
      animal: ['',Validators.required],
      raza:['',Validators.required],
      sexo:['', Validators.required],
      nacimiento: ['',Validators.required],
      direccion: ['',Validators.required],
      telefono: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarRegistro(){
    console.log(this.registroFrom);

    console.log(this.registroFrom.get('cliente')?.value)

    const CLIENTE: Producto  = {
      cliente: this.registroFrom.get('cliente')?.value,
      animal: this.registroFrom.get('animal')?.value,
      raza: this.registroFrom.get('raza')?.value,
      sexo: this.registroFrom.get('sexo')?.value,
      nacimiento: this.registroFrom.get('nacimiento')?.value,
      direccion: this.registroFrom.get('direccion')?.value,
      telefono: this.registroFrom.get('telefono')?.value,
    }

    if (this.id !==null) {
      //editar registro
      this._productoService.editarProducto(this.id, CLIENTE).subscribe(data =>{
      this.toastr.info('El registro fue actualizado con exitoso!', 'Registro Actualizado!');
      this.router.navigate(['/'])
      },error => {
        console.log(error);
          this.registroFrom.reset();
        })
    }else{
      //agregar producto
      console.log(CLIENTE);
      this._productoService.guardarProducto(CLIENTE).subscribe(data => {
      this.toastr.success('El registro de adopción fue exitoso!', 'Registrado!');
      this.router.navigate(['/'])
    },error => {
    console.log(error);
      this.registroFrom.reset();
    })

    }


  }
  esEditar(){
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.registroFrom.setValue({
          cliente: data.cliente,
          animal: data.animal,
          raza: data.raza,
          sexo: data.sexo,
          nacimiento: data.nacimiento,
          direccion: data.direccion,
          telefono: data.telefono

        })
      })
    }
  }

}
