import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStoriesListComponent } from './top-stories-list.component';

describe('TopStoriesListComponent', () => {
  let component: TopStoriesListComponent;
  let fixture: ComponentFixture<TopStoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
