import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gifs } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'wPhOxP6SLbRY3bHuzFquZIJb4G22hHEy';
  private _historial :string[] = [];

  public resultados: Gifs[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
     this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
     this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []; 
  }

  busqueda( query:string ){

    query = query.trim().toLowerCase();

    if( !this._historial.includes( query ) ) {

      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial) );
      

    }

    let url:string = `https://api.giphy.com/v1/gifs/search?api_key=wPhOxP6SLbRY3bHuzFquZIJb4G22hHEy&q=${query}&limit=10`; 

    this.http.get<SearchGifsResponse>(url)
              .subscribe( resp => {
                console.log( resp.data );
                this.resultados = resp.data;
                localStorage.setItem('resultados', JSON.stringify(this.resultados));
              })
  }

}
