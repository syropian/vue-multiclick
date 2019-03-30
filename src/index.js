const VueMulticlick = {
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
      selectedItems: [],
      lastSelected: null
    }
  },
  computed: {
    selectedIndexes() {
      return this.selectedItems.map(item => this.items.indexOf(item))
    },
    lastSelectedIndex() {
      if (!this.lastSelected) {
        return -1
      } else {
        return this.getItemIndex(this.lastSelected)
      }
    }
  },
  watch: {
    selectedItems() {
      this.$emit('selected', this.selectedItems)
    }
  },
  methods: {
    itemClicked(item, $event = {}) {
      if (($event.metaKey || $event.ctrlKey) && !$event.shiftKey) {
        if (this.itemSelected(item)) {
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
    setSelectedItem(item) {
      this.selectedItems = [item]
    },
    setSelectedItems(items) {
      this.selectedItems = items
    },
    setSelectedItemsFromLastSelected(item) {
      const itemIndex = this.getItemIndex(item)
      let itemsToSelect = []

      if (!this.selectedItems.length) {
        itemsToSelect = this.getItemsFromRange(0, itemIndex)
      } else {
        itemsToSelect = this.getItemsFromRange(this.lastSelectedIndex, itemIndex)
      }
      itemsToSelect.forEach(i => this.appendToSelection(i))
    },
    getItemsFromRange(start = 0, end = 0) {
      const items = []
      const low = Math.min(start, end)
      const high = Math.max(start, end)
      for (let i = low; i <= high; i++) {
        items.push(this.items[i])
      }

      return items
    },
    appendToSelection(item) {
      this.selectedItems = [...new Set(this.selectedItems.concat([item]))]
    },
    removeFromSelection(item) {
      this.selectedItems = this.selectedItems.filter(i => i[this.uid] !== item[this.uid])
    },
    getItemIndex(item) {
      return this.items.findIndex(i => {
        return i[this.uid] === item[this.uid]
      })
    },
    itemSelected(item) {
      return this.selectedItems.some(i => i[this.uid] === item[this.uid])
    },
    selectAll() {
      this.selectedItems = this.items
    },
    selectNone() {
      this.selectedItems = []
    }
  },
  render() {
    return this.$scopedSlots.default({
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
      itemSelected: this.itemSelected,
      selectAll: this.selectAll,
      selectNone: this.selectNone
    })
  }
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component(VueMulticlick.name, VueMulticlick)
}

export default VueMulticlick
