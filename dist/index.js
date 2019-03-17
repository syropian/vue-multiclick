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
      return this.getSelectedItemIndex(this.lastSelected);
    }
  },
  methods: {
    itemClicked: function itemClicked(item) {
      var $event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (($event.metaKey || $event.ctrlKey) && !$event.shiftKey) {
        if (this.itemIsDuplicate(item)) {
          this.removeFromSelection(item);
        } else {
          this.appendToSelection(item);
        }
      } else if ($event.shiftKey) {
        this.setSelectedItems(item);
      } else {
        this.setSelectedItem(item);
      }

      this.lastSelected = item;
    },
    setSelectedItem: function setSelectedItem(item) {
      this.selectedItems = [item];
    },
    setSelectedItems: function setSelectedItems(item) {
      var itemIndex = this.getSelectedItemIndex(item);

      if (!this.selectedItems.length) {
        for (var i = 0; i <= itemIndex; i++) {
          this.appendToSelection(this.items[i]);
        }
      } else {
        if (itemIndex >= this.lastSelectedIndex) {
          for (var _i = this.lastSelectedIndex; _i <= itemIndex; _i++) {
            this.appendToSelection(this.items[_i]);
          }
        } else {
          for (var _i2 = itemIndex; _i2 <= this.lastSelectedIndex; _i2++) {
            this.appendToSelection(this.items[_i2]);
          }
        }
      }
    },
    appendToSelection: function appendToSelection(item) {
      this.selectedItems = _toConsumableArray(new Set(this.selectedItems.concat([item])));
    },
    removeFromSelection: function removeFromSelection(item) {
      var _this2 = this;

      this.selectedItems = this.selectedItems.filter(function (i) {
        return i[_this2.uid] !== item[_this2.uid];
      });
    },
    getSelectedItemIndex: function getSelectedItemIndex(item) {
      var _this3 = this;

      return this.items.findIndex(function (i) {
        return i[_this3.uid] === item[_this3.uid];
      });
    },
    itemIsDuplicate: function itemIsDuplicate(item) {
      var _this4 = this;

      return this.selectedItems.map(function (i) {
        return i[_this4.uid];
      }).includes(item[this.uid]);
    },
    selectAll: function selectAll() {
      this.selectedItems = this.items;
    },
    deselectAll: function deselectAll() {
      this.selectedItems = [];
    }
  },
  render: function render() {
    return this.$scopedSlots.default({
      selectedItems: this.selectedItems,
      selectedIndexes: this.selectedIndexes,
      itemClicked: this.itemClicked
    });
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component(VueMulticlick.name, VueMulticlick);
}

module.exports = VueMulticlick;
