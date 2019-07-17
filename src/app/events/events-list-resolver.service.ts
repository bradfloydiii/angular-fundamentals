import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from './shared/event.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EventsListResolverService implements Resolve<any> {
  constructor(private eventService: EventService) {}
  resolve() {
    // pipe serves to return the actual Observable then we can use the Observable's map function
    return this.eventService.getEvents();
  }
}
