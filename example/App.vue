<template>
  <div class="container">
    <div>
      Number of items selected: {{ numSelected }}
      <br /><br />
    </div>

    <VueMulticlick
      :items="items"
      uid="id"
      @selected="selectedItems = $event"
      v-slot="{
        itemClicked,
        itemIsSelected
      }"
    >
      <ul>
        <li
          v-for="item in items"
          :key="item.name"
          :class="{ selected: itemIsSelected(item) }"
          @click="itemClicked(item, $event)"
        >
          {{ item.name }}
        </li>
      </ul>
    </VueMulticlick>
  </div>
</template>
<script>
import VueMulticlick from "../src";
export default {
  components: {
    VueMulticlick
  },
  data() {
    return {
      selectedItems: [],
      items: [
        { name: "A", id: 1 },
        { name: "B", id: 2 },
        { name: "C", id: 3 },
        { name: "D", id: 4 },
        { name: "E", id: 5 },
        { name: "F", id: 6 },
        { name: "G", id: 7 },
        { name: "H", id: 8 },
        { name: "I", id: 9 },
        { name: "J", id: 10 }
      ]
    };
  },
  computed: {
    numSelected() {
      return this.selectedItems.length
    }
  }
};
</script>
<style>
.container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-width: 300px;
  width: 100%;
  margin: 50px auto;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  border: 1px solid #ececec;
}

li {
  cursor: pointer;
  border-bottom: 1px solid #ececec;
  padding: 8px 16px;
  user-select: none;
}

li:nth-child(odd) {
  background-color: #f5f5f5;
}

li:last-of-type {
  border-bottom: none;
}

li.selected {
  background-color: #0069D9;
  color: #fff;
}
</style>

