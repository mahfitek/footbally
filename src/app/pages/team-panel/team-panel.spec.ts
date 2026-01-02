import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamPanelComponent } from './team-panel';

describe('TeamPanelComponent', () => {
  let component: TeamPanelComponent;
  let fixture: ComponentFixture<TeamPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
