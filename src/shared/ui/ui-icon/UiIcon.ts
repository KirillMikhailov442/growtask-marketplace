import { defineComponent, h } from "vue";

const modules = import.meta.glob<string>("../icons/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

const stripSvgTag = (markup: string) => markup.replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

const toCamelCase = (name: string) => name.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());

const icons: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, markup]) => {
    const name = toCamelCase(path.replace(/^..\/icons\//, "").replace(/\.svg$/, ""));

    return [name, stripSvgTag(markup)];
  })
);

export default defineComponent({
  name: "UiIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "24",
    },
  },
  setup(props) {
    return () =>
      h("svg", {
        class: ["ui-icon", `ui-icon--${props.size}`],
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.8,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        innerHTML: icons[props.name] ?? "",
      });
  },
});
