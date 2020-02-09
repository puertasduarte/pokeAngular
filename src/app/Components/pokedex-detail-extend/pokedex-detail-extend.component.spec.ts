import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexDetailExtendComponent } from './pokedex-detail-extend.component';

describe('PokedexDetailExtendComponent', () => {
    let component: PokedexDetailExtendComponent;
    let fixture: ComponentFixture<PokedexDetailExtendComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PokedexDetailExtendComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PokedexDetailExtendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
