import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteBlogComponent } from './favourite-blog.component';

describe('FavouriteBlogComponent', () => {
  let component: FavouriteBlogComponent;
  let fixture: ComponentFixture<FavouriteBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
