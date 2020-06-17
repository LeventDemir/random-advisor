<template>
  <label class="switch">
    <input type="checkbox" :checked="checked" v-model="value" />
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      value: null
    };
  },
  beforeMount() {
    this.value = this.checked;
  },
  mounted() {
    this.$emit("input", this.value);
  },
  watch: {
    value(val) {
      this.$emit("input", val);
    },
    checked(val) {
      this.value = val;
    }
  }
};
</script>