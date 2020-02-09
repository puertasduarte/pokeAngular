import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal-header',
    templateUrl: './modal-header.component.html',
    styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {
    @Input() dataHeader: any;
    @Output() closeModalEvent = new EventEmitter<object>();

    constructor() {}

    ngOnInit() {}

    closeModal() {
        this.closeModalEvent.emit();
    }
}
