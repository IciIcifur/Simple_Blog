import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { appConfig } from '../app.config';
import { AppComponent } from '../app.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent],
      providers: [appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty form should be invalid', () => {
    const fixture = TestBed.createComponent(PostComponent);
    fixture.detectChanges();
    const formValidation = fixture.componentInstance.newPostForm.valid;
    const formValueExists =
      fixture.componentInstance.newPostForm.value.content === '' ||
      fixture.componentInstance.newPostForm.value.title === '';

    expect(!formValidation && formValueExists).toBeTruthy();
  });
});
