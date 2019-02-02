import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFindComponent } from './article-find.component';

describe('ArticleFindComponent', () => {
  let component: ArticleFindComponent;
  let fixture: ComponentFixture<ArticleFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
