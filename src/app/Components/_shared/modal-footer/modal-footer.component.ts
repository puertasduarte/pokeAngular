import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal-footer',
    templateUrl: './modal-footer.component.html',
    styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent implements OnInit {
    @Output() closeModalEvent = new EventEmitter<object>();
    constructor() {}

    ngOnInit() {}

    closeModal() {
        this.closeModalEvent.emit();
    }
}
