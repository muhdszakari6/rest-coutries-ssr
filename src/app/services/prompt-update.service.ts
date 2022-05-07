import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {

  constructor(private updates: SwUpdate) {
    updates.unrecoverable.subscribe(event => {
      this.notifyUser(
        'An error occurred that we cannot recover from:\n' +
        event.reason +
        '\n\nPlease reload the page.'
      );
    });
  }

  notifyUser(msg: string) {
    console.log(msg)
  }

  promptServiceWorkerUpdate() {
    const updatesAvailable = this.updates.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      })));

    updatesAvailable.subscribe(event => {
      console.log("UPDATE AVAILABLE")
      if (promptUser(event)) {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}

function promptUser(event: { type: string; current: { hash: string; appData?: object | undefined; }; available: { hash: string; appData?: object | undefined; }; }) {
  return true
}

