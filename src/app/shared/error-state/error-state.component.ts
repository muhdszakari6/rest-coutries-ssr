import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ErrorStateComponent {

  @Output() retry = new EventEmitter()
  @Input() msg = ''

  constructor() { }


  emitRetry() {
    this.retry.emit();
  }


}
