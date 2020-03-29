import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailhandlerComponent } from './emailhandler.component';

describe('EmailhandlerComponent', () => {
  let component: EmailhandlerComponent;
  let fixture: ComponentFixture<EmailhandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailhandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailhandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
