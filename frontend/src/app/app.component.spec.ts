import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {appConfig} from "./app.config";
import {importProvidersFrom} from "@angular/core";
import {Apollo} from "apollo-angular";
import {ApolloProvider} from "@apollo/client";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [appConfig.providers]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(
      AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'frontend' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'ОтДуши',
    );
  });
});
