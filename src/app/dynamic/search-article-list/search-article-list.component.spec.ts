import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArticleListComponent } from './search-article-list.component';

describe('SearchArticleListComponent', () => {
  let component: SearchArticleListComponent;
  let fixture: ComponentFixture<SearchArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchArticleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
