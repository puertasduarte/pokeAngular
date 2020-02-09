import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-modal-body',
    templateUrl: './modal-body.component.html',
    styleUrls: ['./modal-body.component.scss'],
})
export class ModalBodyComponent implements OnInit {
    @Input() dataBody: any;
    constructor() {}

    ngOnInit() {}
}
