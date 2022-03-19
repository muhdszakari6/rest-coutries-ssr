import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HeaderComponent {

  @Output() toggleThemeEvent = new EventEmitter()
  @Input() isDarkTheme: boolean | undefined

  constructor() { }


  toggleTheme() {
    this.toggleThemeEvent.emit()
  }

}
