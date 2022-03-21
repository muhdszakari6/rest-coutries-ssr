import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import * as lozad_ from 'lozad'
const lozad = lozad_

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CountryCardComponent implements OnInit {

  @Input() country: Country | undefined

  constructor() { }

  ngOnInit(): void {
    this.observeImagesWithLozad()
  }


  /**
  * Lazy loads images using lozad library
  */
  observeImagesWithLozad() {
    const observer = lozad();
    observer.observe();
  }


}
