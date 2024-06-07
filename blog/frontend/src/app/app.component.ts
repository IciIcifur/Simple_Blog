import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ApolloModule, HttpClientModule, PostComponent],
  providers: [],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
