'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib = require('tslib');
var Vue = _interopDefault(require('vue'));

var VueMulticlick = Vue.extend({
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
  data: function data() {
    return {
      selectedItems: [],
      lastSelected: null
    };
  },
  computed: {
    selectedIndexes: function selectedIndexes() {
      var _this = this;

      return this.selectedItems.map(function (item) {
        return _this.items.indexOf(item);
      });
    },
    lastSelectedIndex: function lastSelectedIndex() {
      if (!this.lastSelected) {
        return -1;
      } else {
        return this.getItemIndex(this.lastSelected);
      }
    }
  },
  watch: {
    selectedItems: function selectedItems() {
      this.$emit("selected", this.selectedItems);
    }
  },
  methods: {
    itemClicked: function itemClicked(item, $event) {
      if (($event.metaKey || $event.ctrlKey) && !$event.shiftKey) {
        if (this.itemIsSelected(item)) {
          this.removeFromSelection(item);
        } else {
          this.appendToSelection(item);
        }
      } else if ($event.shiftKey) {
        this.setSelectedItemsFromLastSelected(item);
      } else {
        this.setSelectedItem(item);
      }

      this.lastSelected = item;
    },
    setSelectedItem: function setSelectedItem(item) {
      this.selectedItems = [item];
    },
    setSelectedItems: function setSelectedItems(items) {
      this.selectedItems = items;
    },
    setSelectedItemsFromLastSelected: function setSelectedItemsFromLastSelected(item) {
      var _this = this;

      var itemIndex = this.getItemIndex(item);
      var itemsToSelect = [];

      if (!this.selectedItems.length) {
        itemsToSelect = this.getItemsFromRange(0, itemIndex);
      } else {
        itemsToSelect = this.getItemsFromRange(this.lastSelectedIndex, itemIndex);
      }

      itemsToSelect.forEach(function (i) {
        return _this.appendToSelection(i);
      });
    },
    getItemsFromRange: function getItemsFromRange(start, end) {
      if (start === void 0) {
        start = 0;
      }

      if (end === void 0) {
        end = 0;
      }

      var items = [];
      var low = Math.min(start, end);
      var high = Math.max(start, end);

      for (var i = low; i <= high; i++) {
        items.push(this.items[i]);
      }

      return items;
    },
    appendToSelection: function appendToSelection(item) {
      this.selectedItems = tslib.__spread(new Set(this.selectedItems.concat([item])));
    },
    removeFromSelection: function removeFromSelection(item) {
      var _this = this;

      this.selectedItems = this.selectedItems.filter(function (i) {
        return i[_this.uid] !== item[_this.uid];
      });
    },
    getItemIndex: function getItemIndex(item) {
      var _this = this;

      return this.items.findIndex(function (i) {
        return i[_this.uid] === item[_this.uid];
      });
    },
    itemSelected: function itemSelected(item) {
      console.warn('The "itemSelected" method is deprecated in favour of "itemIsSelected" and will be removed in a future version.');
      return this.itemIsSelected(item);
    },
    itemIsSelected: function itemIsSelected(item) {
      var _this = this;

      return this.selectedItems.some(function (i) {
        return i[_this.uid] === item[_this.uid];
      });
    },
    selectAll: function selectAll() {
      this.selectedItems = this.items;
    },
    selectNone: function selectNone() {
      this.selectedItems = [];
    }
  },
  render: function render(h) {
    var $children = this.$scopedSlots["default"] && this.$scopedSlots["default"]({
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
    });
    return h("div", $children);
  }
});

module.exports = VueMulticlick;
