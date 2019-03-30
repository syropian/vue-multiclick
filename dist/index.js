'use strict';

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var VueMulticlick = {
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
    itemClicked: function itemClicked(item) {
      var $event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
      var _this2 = this;

      var itemIndex = this.getItemIndex(item);
      var itemsToSelect = [];

      if (!this.selectedItems.length) {
        itemsToSelect = this.getItemsFromRange(0, itemIndex);
      } else {
        itemsToSelect = this.getItemsFromRange(this.lastSelectedIndex, itemIndex);
      }

      itemsToSelect.forEach(function (i) {
        return _this2.appendToSelection(i);
      });
    },
    getItemsFromRange: function getItemsFromRange() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var items = [];
      var low = Math.min(start, end);
      var high = Math.max(start, end);

      for (var i = low; i <= high; i++) {
        items.push(this.items[i]);
      }

      return items;
    },
    appendToSelection: function appendToSelection(item) {
      this.selectedItems = _toConsumableArray(new Set(this.selectedItems.concat([item])));
    },
    removeFromSelection: function removeFromSelection(item) {
      var _this3 = this;

      this.selectedItems = this.selectedItems.filter(function (i) {
        return i[_this3.uid] !== item[_this3.uid];
      });
    },
    getItemIndex: function getItemIndex(item) {
      var _this4 = this;

      return this.items.findIndex(function (i) {
        return i[_this4.uid] === item[_this4.uid];
      });
    },
    itemSelected: function itemSelected(item) {
      console.warn('The "itemSelected" method is deprecated in favour of "itemIsSelected" and will be removed in a future version.');
      return this.itemIsSelected(item);
    },
    itemIsSelected: function itemIsSelected(item) {
      var _this5 = this;

      return this.selectedItems.some(function (i) {
        return i[_this5.uid] === item[_this5.uid];
      });
    },
    selectAll: function selectAll() {
      this.selectedItems = this.items;
    },
    selectNone: function selectNone() {
      this.selectedItems = [];
    }
  },
  render: function render() {
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
      itemSelected: this.itemIsSelected,
      itemIsSelected: this.itemIsSelected,
      selectAll: this.selectAll,
      selectNone: this.selectNone
    });
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component(VueMulticlick.name, VueMulticlick);
}

module.exports = VueMulticlick;
