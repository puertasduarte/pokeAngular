import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    AfterViewInit,
} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
    @Input() content: any;

    @Output() closeModalEvent = new EventEmitter<object>();

    // Data objects for childs
    public dataHeader;
    public dataBody;
    public dataFooter;

    // Properties for modal size, by default 50% of window size
    public inputHeight = '50%';
    public inputWidth = '50%';

    constructor() {}

    ngOnInit() {
        this.inputHeight = this.content.size[0] + '%';
        this.inputWidth = this.content.size[1] + '%';

        this.dataHeader = this.content.header;
        this.dataBody = this.content.body;
    }

    closeModal() {
        this.closeModalEvent.emit();
    }
}
