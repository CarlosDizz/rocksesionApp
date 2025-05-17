import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketQrPage } from './ticket-qr.page';

describe('TicketQrPage', () => {
  let component: TicketQrPage;
  let fixture: ComponentFixture<TicketQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
