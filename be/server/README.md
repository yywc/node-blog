声明合并

当需要给第三方库的类型声明文件里面的类添加方法声明时，可以如下操作（已 seneca 为例）

```ts
import 'seneca';

declare module 'seneca' {
  export interface Instance {
    actAsync(): void;
  }
}
```