import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import * as lozad_ from 'lozad'
import { isPlatformBrowser } from '@angular/common';
const lozad = lozad_

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CountryCardComponent implements OnInit {

  @Input() country: Country | undefined

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    isPlatformBrowser(this.platformId) ? this.observeImagesWithLozad() : null
  }


  /**
  * Lazy loads images using lozad library
  */
  observeImagesWithLozad() {
    const observer = lozad();
    observer.observe();
  }


}
