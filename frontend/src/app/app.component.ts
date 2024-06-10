import { Component, Injector, INJECTOR } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TUI_EDITOR_DEFAULT_EXTENSIONS,
  TUI_EDITOR_EXTENSIONS,
} from '@tinkoff/tui-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ApolloModule,
    HttpClientModule,
    PostComponent,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    {
      provide: TUI_EDITOR_EXTENSIONS,
      deps: [INJECTOR],
      useFactory: (injector: Injector) => [
        ...TUI_EDITOR_DEFAULT_EXTENSIONS,
        import('@tinkoff/tui-editor/extensions/image-editor').then(
          ({ tuiCreateImageEditorExtension }) =>
            tuiCreateImageEditorExtension({ injector }),
        ),
      ],
    },
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
