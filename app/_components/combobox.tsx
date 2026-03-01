import * as React from 'react';
import clsx from 'clsx';
import { Combobox } from '@base-ui/react/combobox';
import { X } from 'lucide-react';

export function Root(props: Combobox.Root.Props<any, any>) {
    return <Combobox.Root {...props} />;
};

export const Input = React.forwardRef<HTMLInputElement, Combobox.Input.Props>(function Input(
    { className, ...props }: Combobox.Input.Props,
    forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
    return (
        <Combobox.Input
            ref={forwardedRef}
            className={clsx(
                'h-10 w-64 rounded-md font-normal pl-3.5 text-base text-gray-900 bg-[canvas] focus:outline-none',
                className
            )}
            {...props}
        />
    );
});

export function Clear({ className, ...props }: Combobox.Clear.Props) {
    return (
        <Combobox.Clear
            className={clsx(
                'combobox-clear flex h-10 w-6 items-center justify-center rounded bg-transparent p-0',
                className,
            )}
            {...props}
        >
            <X className="size-4" />
        </Combobox.Clear>
    );
};

export function Chips({ className, ...props }: Combobox.Chips.Props) {
    return (
        <Combobox.Chips
            className={clsx(
                'flex flex-wrap items-center gap-0.5 rounded-md border border-gray-200 px-1.5 py-1 w-64 focus-within:outline focus-within:-outline-offset-1 focus-within:outline-blue-800 min-[500px]:w-88',
                className,
            )}
            {...props}
        />
    );
};

export function Chip({ className, ...props }: Combobox.Chip.Props) {
    return <Combobox.Chip className={clsx(
        'flex items-center gap-1 rounded-md bg-gray-100 px-1.5 py-[0.2rem] text-sm text-gray-900 outline-none cursor-default [@media(hover:hover)]:[data-highlighted]:bg-blue-800 [@media(hover:hover)]:[data-highlighted]:text-gray-50 focus-within:bg-blue-800 focus-within:text-gray-50'
    )} {...props} />;
};

export function Value({ ...props }: Combobox.Value.Props) {
    return <Combobox.Value {...props} />;
};

export function ChipRemove({ className, ...props }: Combobox.ChipRemove.Props) {
    return (
    <Combobox.ChipRemove
        className={clsx(
        'rounded-md p-1 text-inherit hover:bg-gray-200',
        className,
        )}
        aria-label="Remove"
        {...props}
    />);
}

export function Trigger({ className, ...props }: Combobox.Trigger.Props) {
    return (
        <Combobox.Trigger
            className={clsx(
                'flex h-10 w-6 items-center justify-center rounded bg-transparent p-0',
                className,
            )}
            {...props}
        />
    );
};

export function Portal(props: Combobox.Portal.Props) {
    return <Combobox.Portal {...props} />;
};

export function Positioner({ className, ...props }: Combobox.Positioner.Props) {
    return (
        <Combobox.Positioner className={clsx('outline-none', className)} sideOffset={4} {...props} />
    );
};

export function Popup({ className, ...props}: Combobox.Popup.Props) {
    return (
        <Combobox.Popup
            className={clsx(
                'w-(--anchor-width) max-h-92 max-w-(--available-width) origin-(--transform-origin) rounded-md bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-start-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 duration-100',
                className
            )}
            {...props}
        />
    );
};

export function Empty({ className, ...props }: Combobox.Empty.Props) {
    return (
        <Combobox.Empty
            className={clsx('p-4 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0', className)}
            {...props}
        />
    );
};

export function List({ className, ...props }: Combobox.List.Props) {
    return (
        <Combobox.List
            className={clsx(
                'outline-0 overflow-y-auto scroll-py-2 py-2 overscroll-contain max-h-[min(23rem,var(--available-height))] data-empty:p-0',
                className
            )}
            {...props}
        />
    );
};

export function Item({ className, ...props }: Combobox.Item.Props) {
    return (
        <Combobox.Item
            className={clsx(
                'grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-2 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900',
                className
            )}
            {...props}
        />
    );
};

export function ItemIndicator({ className, ...props }: Combobox.ItemIndicator.Props) {
    return <Combobox.ItemIndicator className={clsx('col-start-1', className)} {...props} />;
};
