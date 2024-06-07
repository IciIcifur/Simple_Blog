import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PostService } from './post.service';
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiFormatDatePipeModule,
  TuiHintModule,
} from '@taiga-ui/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule, TuiIslandModule } from '@taiga-ui/kit';
import {
  TUI_EDITOR_DEFAULT_EXTENSIONS,
  TUI_EDITOR_EXTENSIONS,
  TuiEditorModule,
  TuiEditorOptions,
  tuiEditorOptionsProvider,
  TuiEditorSocketModule,
  TuiEditorTool,
} from '@tinkoff/tui-editor';
import { AsyncPipe, NgForOf } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';
import {
  CreatePostInput,
  EditPostById,
  EditPostInput,
  PostType,
} from '../graphql-client';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

const CUSTOM_EDITOR_OPTIONS: Partial<TuiEditorOptions> = {
  colors: new Map([
    // b&w
    ['Белый', 'rgba(255, 255, 255)'],
    ['Светло-серый #0', 'rgba(223, 223, 223)'],
    ['Светло-серый #1', 'rgba(191, 191, 191)'],
    ['Светло-серый #2', 'rgba(159, 159, 159)'],
    ['Серый', 'rgba(127, 127, 127)'],
    ['Тёмно-серый', 'rgba(95, 95, 95)'],
    ['Светло-дымчатый', 'rgba(63, 63, 63)'],
    ['Дымчатый', 'rgba(31, 31, 31)'],
    ['Черный', 'rgba(0, 0, 0)'],
    // blue-grey palette
    ['Серо-голубой #0', '#cfd8dc'],
    ['Серо-голубой #1', '#b0bec5'],
    ['Серо-голубой #2', '#90a4ae'],
    ['Серо-голубой #3', '#78909c'],
    ['Серо-голубой #4', '#607d8b'],
    ['Серо-голубой #5', '#546e7a'],
    ['Серо-голубой #6', '#455a64'],
    ['Серо-голубой #7', '#37474f'],
    ['Серо-голубой #8', '#263238'],
    // beige palette
    ['Айвори', '#fffbf7'],
    ['Светло-кремовый', '#fff6ec'],
    ['Кремовый', '#ffefdd'],
    ['Темно-кремовый', '#ffead3'],
    ['Бежевый', '#f0dbbb'],
    ['Темно-бежевый', '#ddc0a5'],
    ['Светло-коричневый', '#bd9a7e'],
    ['Коричневый', '#816955'],
    ['Тёмно-коричневый', '#543f2f'],
    // pink
    ['Малиновый', '#d32353'],
    ['Светло-малиновый', '#ff879d'],
    ['Нежный малиновый', '#ffd1d9'],
    // red
    ['Коралловый', '#ff9e91'],
    ['Светло-красный', '#ff3c3c'],
    ['Красный', '#d90202'],
    // orange
    ['Оранжевый', '#da5400'],
    ['Мандариновый', '#ff7b00'],
    ['Светло-оранжевый', '#ffa269'],
    // yellow
    ['Светло-жёлтый', '#ffe5a5'],
    ['Жёлтый', '#ffdc2c'],
    ['Тёмно-желтый', '#d09500'],
    // green
    ['Тёмно-зелёный', '#56682c'],
    ['Зелёный', '#d1ff67'],
    ['Салатовый', '#edffc6'],
    // mint
    ['Светло-мятный', '#c8ffe0'],
    ['Мятный', '#8dffcd'],
    ['Морская волна', '#3c896d'],
    // cyan
    ['Бирюзовый', '#07beb8'],
    ['Циан', '#75fffb'],
    ['Светло-бирюзовый', '#c4fff9'],
    // blue
    ['Светло-голубой', '#b3ecff'],
    ['Голубой', '#00bbff'],
    ['Синий', '#0075ff'],
    // ultramarine
    ['Тёмно-синий', '#000298'],
    ['Ультрамарин', '#000fff'],
    ['Светло-синий', '#6792ff'],
    // violet
    ['Светло-фиолетовый', '#e1c8ff'],
    ['Фиолетовый', '#7b36d7'],
    ['Тёмно-фиолетовый', '#45009d'],
    // purple
    ['Маджента', '#8229a4'],
    ['Сиреневый', '#ae68c2'],
    ['Светло-сиреневый', '#f7d1ff'],
    // barbie pink
    ['Светло-розовый', '#ffd3ef'],
    ['Розовый', '#ff89c2'],
    ['Насыщенный розовый', '#ec4f8f'],
  ]),

  fontOptions: () =>
    [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96].map((size) => ({
      px: size,
      name: `${size}`,
      ngStyle: { 'font-size': '1rem' },
    })),
};

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    TuiButtonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiEditorModule,
    TuiEditorSocketModule,
    AsyncPipe,
    NgForOf,
    TuiIslandModule,
    TuiFormatDatePipeModule,
    TuiHintModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: TUI_EDITOR_DEFAULT_EXTENSIONS,
    },
    tuiEditorOptionsProvider(CUSTOM_EDITOR_OPTIONS),
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.less',
})
export class PostComponent implements OnInit {
  selectedPost$ = this.postFacade.selectedPost$;
  allPosts$: Observable<PostType[]> = this.postFacade.allPosts$;

  newPostForm = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    content: new FormControl<string>('', Validators.required),
  });

  async ngOnInit() {
    this.selectedPost$.subscribe((post) => {
      if (post) {
        this.newPostForm.controls.title.setValue(post.title);
        this.newPostForm.controls.content.setValue(post.content);
      }
    });
  }

  async createPost() {
    (await firstValueFrom(this.selectedPost$))
      ? await this.postFacade.editPost(this.newPostForm.value as EditPostInput)
      : await this.postFacade.createPost(
          this.newPostForm.value as CreatePostInput,
        );
    this.newPostForm.reset();
  }

  async deletePost(id: string) {
    await this.postFacade.deletePost(id);
  }

  async editPost(id: string) {
    this.postFacade.selectPost(id);
  }

  constructor(
    private apollo: Apollo,
    protected postFacade: PostService,
  ) {}

  readonly tools: TuiEditorTool[] = [
    TuiEditorTool.Undo,
    TuiEditorTool.Align,
    TuiEditorTool.Bold,
    TuiEditorTool.Color,
    TuiEditorTool.HR,
    TuiEditorTool.Hilite,
    TuiEditorTool.Italic,
    TuiEditorTool.Link,
    TuiEditorTool.List,
    TuiEditorTool.Size,
    TuiEditorTool.Strikethrough,
    TuiEditorTool.Underline,
    TuiEditorTool.Quote,
    TuiEditorTool.Tex,
    TuiEditorTool.Clear,
  ];
  protected readonly PostService = PostService;
}
