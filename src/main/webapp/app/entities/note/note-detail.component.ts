import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Note } from './note.model';
import { NoteService } from './note.service';

@Component({
    selector: 'jhi-note-detail',
    templateUrl: './note-detail.component.html'
})
export class NoteDetailComponent implements OnInit, OnDestroy {

    note: Note;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private noteService: NoteService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['note']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotes();
    }

    load(id) {
        this.noteService.find(id).subscribe((note) => {
            this.note = note;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotes() {
        this.eventSubscriber = this.eventManager.subscribe('noteListModification', (response) => this.load(this.note.id));
    }
}
