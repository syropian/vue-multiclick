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
      return this.getSelectedItemIndex(this.lastSelected)
    }
  },
  methods: {
    itemClicked(item, $event = {}) {
      if (($event.metaKey || $event.ctrlKey) && !$event.shiftKey) {
        if (this.itemIsDuplicate(item)) {
          this.removeFromSelection(item)
        } else {
          this.appendToSelection(item)
        }
      } else if ($event.shiftKey) {
        this.setSelectedItems(item)
      } else {
        this.setSelectedItem(item)
      }
      this.lastSelected = item
    },
    setSelectedItem(item) {
      this.selectedItems = [item]
    },
    setSelectedItems(item) {
      const itemIndex = this.getSelectedItemIndex(item)

      if (!this.selectedItems.length) {
        for (let i = 0; i <= itemIndex; i++) {
          this.appendToSelection(this.items[i])
        }
      } else {
        if (itemIndex >= this.lastSelectedIndex) {
          for (let i = this.lastSelectedIndex; i <= itemIndex; i++) {
            this.appendToSelection(this.items[i])
          }
        } else {
          for (let i = itemIndex; i <= this.lastSelectedIndex; i++) {
            this.appendToSelection(this.items[i])
          }
        }
      }
    },
    appendToSelection(item) {
      this.selectedItems = [...new Set(this.selectedItems.concat([item]))]
    },
    removeFromSelection(item) {
      this.selectedItems = this.selectedItems.filter(i => i[this.uid] !== item[this.uid])
    },
    getSelectedItemIndex(item) {
      return this.items.findIndex(i => {
        return i[this.uid] === item[this.uid]
      })
    },
    itemIsDuplicate(item) {
      return this.selectedItems.map(i => i[this.uid]).includes(item[this.uid])
    },
    selectAll() {
      this.selectedItems = this.items
    },
    deselectAll() {
      this.selectedItems = []
    }
  },
  render() {
    return this.$scopedSlots.default({
      selectedItems: this.selectedItems,
      selectedIndexes: this.selectedIndexes,
      itemClicked: this.itemClicked
    })
  }
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component(VueMulticlick.name, VueMulticlick)
}

export default VueMulticlick
