'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scChoicesCss = ":host {\n  display: block;\n}\n\n.choices {\n  container-type: inline-size;\n}\n.choices ::slotted(div) {\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--sc-choices-gap, 10px);\n}\n\n.choices:not(.choices--auto-width) ::slotted(div) {\n  margin: 0;\n  display: grid;\n  gap: var(--sc-choices-gap, 10px);\n}\n\n.breakpoint-lg ::slotted(div),\n.breakpoint-xl ::slotted(div) {\n  grid-template-columns: repeat(var(--columns, 1), 1fr);\n}\n\n.choices .choices__items {\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--sc-choices-gap, 10px);\n}\n\n.choices:not(.choices--auto-width) .choices__items {\n  display: grid;\n  gap: var(--sc-choices-gap, 10px);\n}\n\n.choices {\n  border: none;\n  padding: 0;\n  margin: 0;\n  min-width: 0;\n  margin: 0;\n}\n.choices .choices__label {\n  font-family: var(--sc-input-font-family);\n  font-size: var(--sc-input-font-size-medium);\n  font-weight: var(--sc-input-font-weight);\n  color: var(--sc-input-color);\n  padding: 0 var(--sc-spacing-xx-small);\n}\n\n.choices__items {\n  display: grid;\n  gap: var(--sc-choices-gap, 10px);\n  grid-auto-rows: 1fr;\n}\n\n.choices__items {\n  grid-template-columns: repeat(var(--columns, 1), 1fr);\n}\n\n@container (max-width: 419px) {\n  .choices__items {\n    grid-template-columns: repeat(1, 1fr);\n  }\n}";
const ScChoicesStyle0 = scChoicesCss;

let id = 0;
const ScChoices = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.inputId = `choices-${++id}`;
        this.helpId = `choices-help-text-${id}`;
        this.labelId = `choices-label-${id}`;
        this.label = '';
        this.size = 'medium';
        this.autoWidth = undefined;
        this.required = false;
        this.showLabel = true;
        this.help = '';
        this.hideLabel = false;
        this.columns = 1;
        this.errorMessage = '';
        this.width = undefined;
    }
    async triggerFocus() {
        this.el.focus();
    }
    componentDidLoad() {
        this.handleRequiredChange();
        this.handleResize();
    }
    handleRequiredChange() {
        const choices = [...this.el.querySelectorAll('sc-choice, sc-choice-container')];
        if (choices.length) {
            choices.forEach(choice => {
                choice.required = this.required;
            });
        }
    }
    handleResize() {
        // Only run if ResizeObserver is supported.
        if ('ResizeObserver' in window) {
            var ro = new window.ResizeObserver(entries => {
                entries.forEach(entry => {
                    this.width = entry.contentRect.width;
                });
            });
            ro.observe(this.el);
        }
    }
    render() {
        return (index.h("fieldset", { key: '1f45d91716bf2d4cd5f5dbf1c4ebb9a0266437fd', part: "base", class: {
                'choices': true,
                'choices--hide-label': this.hideLabel,
                'choices--auto-width': this.autoWidth,
                'breakpoint-sm': this.width < 384,
                'breakpoint-md': this.width >= 384 && this.width < 576,
                'breakpoint-lg': this.width >= 576 && this.width < 768,
                'breakpoint-xl': this.width >= 768,
            }, role: "radiogroup" }, index.h("sc-form-control", { key: '0a7293cd49ac57b7c10dd82203d4ce963ec5cdc1', exportparts: "label, help-text, form-control", size: this.size, required: this.required, label: this.label, showLabel: this.showLabel, help: this.help, inputId: this.inputId, helpId: this.helpId, labelId: this.labelId }, index.h("div", { key: '4c207ce6e3feea4f10cda243190fdeba2e5fa4b6', part: "choices", class: "choices__items" }, index.h("slot", { key: '8301a1cf8af01d4c73d996f303c6530311ca9177' })))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "required": ["handleRequiredChange"]
    }; }
};
ScChoices.style = ScChoicesStyle0;

exports.sc_choices = ScChoices;

//# sourceMappingURL=sc-choices.cjs.entry.js.map