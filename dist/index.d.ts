import Vue from "vue";
declare const VueMulticlick: import("vue").VueConstructor<{
    selectedItems: any;
    lastSelected: any;
} & {
    itemClicked(item: any, $event: KeyboardEvent): void;
    setSelectedItem(item: any): void;
    setSelectedItems(items: any): void;
    setSelectedItemsFromLastSelected(item: any): void;
    getItemsFromRange(start?: number, end?: number): any[];
    appendToSelection(item: any): void;
    removeFromSelection(item: any): void;
    getItemIndex(item: any): number;
    itemSelected(item: any): boolean;
    itemIsSelected(item: any): boolean;
    selectAll(): void;
    selectNone(): void;
} & {
    selectedIndexes: any[];
    lastSelectedIndex: number;
} & {
    items: unknown[];
    uid: string;
} & Vue>;
export default VueMulticlick;
