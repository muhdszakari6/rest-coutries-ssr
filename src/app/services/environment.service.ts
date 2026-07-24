import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  base_url: string = '';
  api_key: string = '';

}
