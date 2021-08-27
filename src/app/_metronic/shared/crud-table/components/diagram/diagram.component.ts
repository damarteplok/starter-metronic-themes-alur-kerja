import {
    AfterContentInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    ViewChild,
    SimpleChanges,
    EventEmitter
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {map, switchMap, tap} from 'rxjs/operators';

import * as BpmnJS from 'bpmn-js/dist/bpmn-viewer.production.min.js';
import * as BpmnViewer from 'bpmn-js/dist/bpmn-viewer.production.min.js';

import { from, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-diagram',
    template: `<div #ref class="diagram-container"></div>`,
    styles: [
        `
          .diagram-container {
            height: 100%;
            width: 100%;
          }
        `
    ]
})
export class DiagramComponent implements AfterContentInit, OnChanges, OnDestroy {
    private bpmnJS: BpmnJS;

    @ViewChild('ref', { static: true }) private el: ElementRef;
    @Output() private importDone: EventEmitter<any> = new EventEmitter();

    @Input() private url: string;

    constructor(private http: HttpClient) {

        this.bpmnJS = new BpmnJS();

        this.bpmnJS.on('import.done', ({ error }) => {
            if (!error) {
                this.bpmnJS.get('canvas').zoom('fit-viewport');
            }
        });
    }

    ngAfterContentInit(): void {
        this.bpmnJS.attachTo(this.el.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.url) {
            this.loadUrl(changes.url.currentValue);
        }
    }

    ngOnDestroy(): void {
        this.bpmnJS.destroy();
    }

    /**
     * Load diagram from URL and emit completion event
     */
    loadUrl(url: string): Subscription {

        return (
            this.http.get(url, { responseType: 'text' }).pipe(
                switchMap((xml: string) => this.importDiagram(xml)),
                map(result => result.warnings),
            ).subscribe(
                (warnings) => {
                    this.importDone.emit({
                        type: 'success',
                        warnings
                    });
                },
                (err) => {
                    this.importDone.emit({
                        type: 'error',
                        error: err
                    });
                }
            )
        );
    }

    private importDiagram(xml: string): Observable<{warnings: Array<any>}> {
        return from(this.bpmnJS.importXML(xml) as Promise<{warnings: Array<any>}>);
    }
}
