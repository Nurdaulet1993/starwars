import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterToolbarComponent } from './character-toolbar.component';

describe('CharacterToolbarComponent', () => {
  let component: CharacterToolbarComponent;
  let fixture: ComponentFixture<CharacterToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
