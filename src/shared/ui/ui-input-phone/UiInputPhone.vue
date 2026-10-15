<template>
  <label class="ui-input-phone">
    <span v-if="error || label" class="ui-input-phone__label" :class="{ 'ui-input-phone__label--error': error }">
      {{ error || label }}
    </span>
    <span class="ui-input-phone__field" :class="{ 'ui-input-phone__field--focused': focused }">
      <UiIcon v-if="icon" :name="icon" size="20" class="ui-input-phone__icon" />
      <input
        ref="inputRef"
        class="ui-input-phone__input"
        :value="modelValue"
        :placeholder="placeholder"
        inputmode="tel"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="focused = false"
      />
      <button
        v-if="clearable && modelValue"
        class="ui-input-phone__clear"
        type="button"
        tabindex="-1"
        @mousedown.prevent
        @click.stop="clear"
      >
        <UiIcon name="close" size="24" />
      </button>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { UiIcon } from "../ui-icon";

interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  clearable?: boolean;
  error?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  placeholder: "",
  icon: "phone",
  clearable: true,
  error: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const MAX_DIGITS = 10;
const DIGITS_PATTERN = [3, 3, 2, 2];

const inputRef = ref<HTMLInputElement | null>(null);
const focused = ref(false);

function extractDigits(value: string): { digits: string; hasCountryCode: boolean } {
  let digits = value.replace(/\D/g, "");
  const hasCountryCode = /^[78]/.test(digits);

  if (hasCountryCode) {
    digits = digits.slice(1);
  }

  return { digits: digits.slice(0, MAX_DIGITS), hasCountryCode };
}

function formatPhone(value: string): string {
  const { digits, hasCountryCode } = extractDigits(value);
  if (digits === "") {
    return hasCountryCode ? "+7" : "";
  }

  let formatted = "+7";
  let offset = 0;

  for (const groupSize of DIGITS_PATTERN) {
    if (digits.length <= offset) {
      break;
    }

    formatted += " " + digits.slice(offset, offset + groupSize);
    offset += groupSize;
  }

  return formatted;
}

function countDigitsBefore(value: string, caret: number): number {
  return value.slice(0, caret).replace(/\D/g, "").length;
}

function caretAfterDigit(value: string, digitIndex: number): number {
  if (digitIndex === 0) {
    return value.startsWith("+7 ") ? 3 : value.length;
  }

  let seen = 0;
  for (let i = 0; i < value.length; i += 1) {
    if (/\d/.test(value[i]!)) {
      seen += 1;
      if (seen === digitIndex) {
        return i + 1;
      }
    }
  }

  return value.length;
}

function getUserDigitIndices(value: string): number[] {
  const indices: number[] = [];
  for (let i = 3; i < value.length; i += 1) {
    if (/\d/.test(value[i]!)) {
      indices.push(i);
    }
  }

  return indices;
}

function snapCaret(value: string, caret: number): number {
  const digitIndices = getUserDigitIndices(value);
  if (digitIndices.length === 0) {
    return value.length;
  }

  let best = value.length;
  let bestDistance = Math.abs(best - caret);

  for (const index of digitIndices) {
    for (const candidate of [index, index + 1]) {
      const distance = Math.abs(candidate - caret);
      if (distance < bestDistance) {
        best = candidate;
        bestDistance = distance;
      }
    }
  }

  return best;
}

function handleFocus(event: FocusEvent) {
  focused.value = true;

  const input = event.target as HTMLInputElement;
  const { value } = input;
  let caret = input.selectionStart ?? value.length;
  if (caret === 0 && value !== "") {
    caret = value.length;
  }

  const snapped = snapCaret(value, caret);
  input.setSelectionRange(snapped, snapped);
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const { selectionStart } = target;
  const raw = target.value;

  const formatted = formatPhone(raw);
  target.value = formatted;
  emit("update:modelValue", formatted);

  const digitsBeforeCaret = countDigitsBefore(raw, selectionStart ?? raw.length);
  const prefixDigitsOld = raw.startsWith("+7") ? 1 : 0;
  const prefixDigitsNew = formatted.startsWith("+7") ? 1 : 0;
  const targetDigitIndex = digitsBeforeCaret - prefixDigitsOld + prefixDigitsNew;

  const caret = caretAfterDigit(formatted, targetDigitIndex);
  target.setSelectionRange(caret, caret);
}

function deleteDigits(
  value: string,
  from: number,
  to: number,
  caretStart: number
): { formatted: string; caret: number } {
  let raw = "";
  let removed = false;
  let removedBeforeCaret = 0;

  for (let i = 0; i < value.length; i += 1) {
    const isDigit = /\d/.test(value[i]!);
    const isRemoved = i >= from && i < to && isDigit && i !== 1;

    if (isRemoved) {
      removed = true;
      if (i < caretStart) {
        removedBeforeCaret += 1;
      }
      continue;
    }

    raw += value[i]!;
  }

  if (!removed) {
    return { formatted: value, caret: caretStart };
  }

  const formatted = formatPhone(raw);
  const targetDigitIndex = countDigitsBefore(value, caretStart) - removedBeforeCaret;

  return { formatted, caret: caretAfterDigit(formatted, targetDigitIndex) };
}

function applyDeletion(input: HTMLInputElement, value: string, from: number, to: number, caretStart: number) {
  const { formatted, caret } = deleteDigits(value, from, to, caretStart);

  if (formatted === value) {
    input.setSelectionRange(caret, caret);
    return;
  }

  input.value = formatted;
  emit("update:modelValue", formatted);
  input.setSelectionRange(caret, caret);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Backspace") {
    event.preventDefault();
    handleBackspace(event);
  } else if (event.key === "Delete") {
    event.preventDefault();
    handleDelete(event);
  }
}

function handleBackspace(event: KeyboardEvent) {
  const input = event.currentTarget as HTMLInputElement;
  const { value, selectionStart, selectionEnd } = input;
  if (value === "") {
    return;
  }

  const start = selectionStart ?? value.length;
  const end = selectionEnd ?? value.length;

  if (start !== end) {
    applyDeletion(input, value, start, end, start);
    return;
  }

  let digitIndex = -1;
  for (let i = start - 1; i >= 0; i -= 1) {
    if (/\d/.test(value[i]!)) {
      digitIndex = i;
      break;
    }
  }

  if (digitIndex <= 1) {
    return;
  }

  applyDeletion(input, value, digitIndex, digitIndex + 1, start);
}

function handleDelete(event: KeyboardEvent) {
  const input = event.currentTarget as HTMLInputElement;
  const { value, selectionStart, selectionEnd } = input;
  if (value === "") {
    return;
  }

  const start = selectionStart ?? value.length;
  const end = selectionEnd ?? value.length;

  if (start !== end) {
    applyDeletion(input, value, start, end, start);
    return;
  }

  let digitIndex = -1;
  for (let i = start; i < value.length; i += 1) {
    if (/\d/.test(value[i]!)) {
      digitIndex = i;
      break;
    }
  }

  if (digitIndex <= 1) {
    return;
  }

  applyDeletion(input, value, digitIndex, digitIndex + 1, start);
}

function clear() {
  emit("update:modelValue", "");
  inputRef.value?.focus();
}
</script>

<style lang="scss" scoped>
.ui-input-phone {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &__label {
    font-size: 11px;
    line-height: 16px;
    color: var(--color-text-muted);

    &--error {
      color: var(--color-danger);
    }
  }

  &__field {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 48px;
    padding-inline: 12px;
    background-color: var(--color-gray-bg);
    border-radius: var(--radius-md);
    transition: box-shadow var(--transition-fast);

    &--focused {
      box-shadow: inset 0 0 0 1.5px var(--color-text-muted);
    }
  }

  &__icon {
    color: var(--color-text-muted);
  }

  &__input {
    flex-grow: 1;
    min-width: 0;
    border: none;
    background: none;
    outline: none;
    font-size: 16px;
    color: var(--color-black);

    &::placeholder {
      color: var(--color-text-muted);
    }
  }

  &__clear {
    display: flex;
    color: var(--color-text-muted);
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-black);
    }
  }
}
</style>
