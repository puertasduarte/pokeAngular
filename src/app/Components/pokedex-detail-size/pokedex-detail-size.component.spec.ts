import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexDetailSizeComponent } from './pokedex-detail-size.component';

describe('PokedexDetailSizeComponent', () => {
    let component: PokedexDetailSizeComponent;
    let fixture: ComponentFixture<PokedexDetailSizeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PokedexDetailSizeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PokedexDetailSizeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
