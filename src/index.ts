import Vue from "vue"
import { VNode } from "vue/types/vnode"

const VueMulticlick = Vue.extend({
  name: "vue-multiclick",
  props: {
    items: {
      type: Array,
      required: true
    },
    uid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedItems: [] as any,
      lastSelected: null as any
    }
  },
  computed: {
    selectedIndexes(): Array<any> {
      return this.selectedItems.map((item: any) => this.items.indexOf(item))
    },
    lastSelectedIndex(): number {
      if (!this.lastSelected) {
        return -1
      } else {
        return this.getItemIndex(this.lastSelected)
      }
    }
  },
  watch: {
    selectedItems() {
      this.$emit("selected", this.selectedItems)
    }
  },
  methods: {
    itemClicked(item: any, $event: KeyboardEvent) {
      if (($event.metaKey || $event.ctrlKey) && !$event.shiftKey) {
        if (this.itemIsSelected(item)) {
          this.removeFromSelection(item)
        } else {
          this.appendToSelection(item)
        }
      } else if ($event.shiftKey) {
        this.setSelectedItemsFromLastSelected(item)
      } else {
        this.setSelectedItem(item)
      }
      this.lastSelected = item
    },
    setSelectedItem(item: any) {
      this.selectedItems = [item]
    },
    setSelectedItems(items: any) {
      this.selectedItems = items
    },
    setSelectedItemsFromLastSelected(item: any) {
      const itemIndex = this.getItemIndex(item)
      let itemsToSelect = []

      if (!this.selectedItems.length) {
        itemsToSelect = this.getItemsFromRange(0, itemIndex)
      } else {
        itemsToSelect = this.getItemsFromRange(this.lastSelectedIndex, itemIndex)
      }
      itemsToSelect.forEach(i => this.appendToSelection(i))
    },
    getItemsFromRange(start: number = 0, end: number = 0): Array<any> {
      const items = []
      const low = Math.min(start, end)
      const high = Math.max(start, end)

      for (let i = low; i <= high; i++) {
        items.push(this.items[i])
      }

      return items
    },
    appendToSelection(item: any) {
      this.selectedItems = [...new Set(this.selectedItems.concat([item]))]
    },
    removeFromSelection(item: any) {
      this.selectedItems = this.selectedItems.filter((i: any) => i[this.uid] !== item[this.uid])
    },
    getItemIndex(item: any): number {
      return this.items.findIndex((i: any) => {
        return i[this.uid] === item[this.uid]
      })
    },
    itemSelected(item: any): boolean {
      console.warn(
        'The "itemSelected" method is deprecated in favour of "itemIsSelected" and will be removed in a future version.'
      )
      return this.itemIsSelected(item)
    },
    itemIsSelected(item: any): boolean {
      return this.selectedItems.some((i: any) => i[this.uid] === item[this.uid])
    },
    selectAll() {
      this.selectedItems = this.items
    },
    selectNone() {
      this.selectedItems = []
    }
  },
  render(h): VNode {
    const $children =
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        selectedItems: this.selectedItems,
        lastSelectedItem: this.lastSelected,
        selectedIndexes: this.selectedIndexes,
        lastSelectedIndex: this.lastSelectedIndex,
        itemClicked: this.itemClicked,
        setSelectedItem: this.setSelectedItem,
        setSelectedItems: this.setSelectedItems,
        setSelectedItemsFromLastSelected: this.setSelectedItemsFromLastSelected,
        appendToSelection: this.appendToSelection,
        removeFromSelection: this.removeFromSelection,
        getItemIndex: this.getItemIndex,
        getItemsFromRange: this.getItemsFromRange,
        itemSelected: this.itemIsSelected,
        itemIsSelected: this.itemIsSelected,
        selectAll: this.selectAll,
        selectNone: this.selectNone
      })

    return h("div", $children)
  }
})

export default VueMulticlick
