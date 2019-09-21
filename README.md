# Vue-Multiclick

[![Actions Status](https://github.com/syropian/vue-multiclick/workflows/Tests/badge.svg)](https://github.com/syropian/vue-multiclick/actions)

> A renderless Vue component for managing list item selection state.

## Install

```
$ npm install vue-multiclick --save
```

**or** include the UMD build, hosted by [unpkg](https://unpkg.com) in a `<script>` tag.

```js
<script src="//unpkg.com/vue-multiclick" />
```

## Usage

Import and register the component.

```js
import VueMulticlick from 'vue-multiclick'

export default {
  ...
  components: {
    VueMulticlick
  }
}
```

In your template, wrap a single element in the `VueMulticlick` component. You must pass an array of objects to the `items` prop, as well as `uid` prop, which is the key in your item objects that makes them unique.

```html
<div>
  <VueMulticlick :items="items" uid="id">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </VueMulticlick>
</div>
```

## Setting selection states

The easiest way to set item selection states is through the `itemClicked` method. This method will automatically pick up on any necessary event modifiers (such as the `meta`/`ctrl` or `shift` key being pressed), and sets the selection items appropriately.

```html
<div>
  <VueMulticlick :items="items" uid="id" v-slot="{ itemClicked }">
    <ul>
      <li v-for="item in items" :key="item.id" @click="itemClicked">{{ item.name }}</li>
    </ul>
  </VueMulticlick>
</div>
```

## Retrieving selection states

Of course just setting selection states is often not enough, and you'll want to visually change elements that are currently selected. You can use the `itemIsSelected` function to check if a given item is currently selected.

```html
<div>
  <VueMulticlick :items="items" uid="id" v-slot="{ itemClicked, itemIsSelected }">
    <ul>
      <li v-for="item in items" :key="item.id" :class="{ 'is-selected': itemIsSelected(item) }" @click="itemClicked">
        {{ item.name }}
      </li>
    </ul>
  </VueMulticlick>
</div>
<style>
  .is-selected {
    background-color: blue;
    color: #fff;
  }
</style>
```

## Available properties

| Name                | Description                                  | Return Type |
| ------------------- | -------------------------------------------- | ----------- |
| `selectedItems`     | Returns all currently selected items.        | Array       |
| `selectedIndexes`   | Returns the indexes of all selected items    | Array       |
| `lastSelectedItem`  | Returns the last selected item.              | Object      |
| `lastSelectedIndex` | Returns the index of the last selected item. | Number      |

## Available methods

| Name                               | Description                                                          | Params                                        | Return Type |
| ---------------------------------- | -------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `itemClicked`                      | Sets the selection state based on the event modifiers if they exist. | **item**: Object<br />**event**: Object<br /> | null        |
| `setSelectedItem`                  | Sets the current selection to a single item.                         | **item**: Object                              | null        |
| `setSelectedItems`                 | Sets the current selection to the items passed in.                   | **items**: Array                              | null        |
| `appendToSelection`                | Pushes an item to the selection list                                 | **item**: Object                              | null        |
| `removeFromSelection`              | Removes an item from the selection list.                             | **item**: Object                              | null        |
| `getItemIndex`                     | Returns the index of a given item                                    | **item**: Object                              | Number      |
| `itemIsSelected`                   | Returns whether the given item is currently selected or not.         | **item**: Object                              | Boolean     |
| `selectAll`                        | Pushes all items to the selection list.                              | N/A                                           | null        |
| `selectNone`                       | Removes all items from the selection list.                           | N/A                                           | null        |
| `getItemsFromRange`                | Retrieves all items between a given range.                           | **start**: Number<br />**end**: Number<br />  | Array       |
| `setSelectedItemsFromLastSelected` | Sets the selected items to a range based off the last selected item  | **item**: Object                              | null        |

## Development

```bash
# To run the example
$ npm run example

# To run the tests
$ npm test

# To publish the dist file
$ npm run build
```

## License

MIT © [Collin Henderson](https://github.com/syropian)
