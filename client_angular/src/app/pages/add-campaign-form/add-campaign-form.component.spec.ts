import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampaignFormComponent } from './add-campaign-form.component';

describe('AddCampaignFormComponent', () => {
  let component: AddCampaignFormComponent;
  let fixture: ComponentFixture<AddCampaignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCampaignFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCampaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
