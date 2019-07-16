import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent, ISession } from '../shared';

@Component({
  templateUrl: './event-details.component.html',
  styles: [
    `
      .container {
        padding: 0px 20px;
      }
      .event-image {
        height: 100px;
      }

      button:focus {
        border: none;
        outline: none;
      }
    `
  ]
})
export class EventDetailsComponent implements OnInit {
  filterBy = 'all';
  sortBy = 'votes';
  addMode: boolean;
  event: IEvent;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.event = this.eventService.getEvent(
      Number(this.route.snapshot.params.id)
    );
    console.log(this.event);
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelNewSession(event) {
    console.log(event);
    this.addMode = false;
  }
}
