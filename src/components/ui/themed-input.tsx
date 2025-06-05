import * as React from 'react';
import { cn } from '@/lib/utils'; // shadcn/ui에서 사용하는 classnames 유틸리티
import { Input } from './input';

const ThemedInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      className={cn(
        // 기본으로 적용할 스타일
        'dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500',
        // 외부에서 추가로 전달된 className (필요시 스타일 오버라이드 또는 추가 가능)
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
ThemedInput.displayName = 'ThemedInput';

export { ThemedInput };
