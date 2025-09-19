'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scFlexCss = ":host{display:block;--spacing:var(--sc-spacing-small)}.flex{display:flex;gap:var(--sc-flex-column-gap, var(--spacing));justify-content:var(--sc-flex-space-between, space-between)}.justify-flex-start{justify-content:flex-start}.justify-flex-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-space-between{justify-content:space-between}.justify-space-around{justify-content:space-around}.justify-space-evenly{justify-content:space-evenly}.wrap-wrap{flex-wrap:wrap}.wrap-no-wrap{flex-wrap:no-wrap}.align-flex-start{align-items:flex-start}.align-flex-end{align-items:flex-end}.align-center{align-items:center}.align-baseline{align-items:baseline}.align-stretch{align-items:stretch}.direction-row{flex-direction:row}.direction-row-reverse{flex-direction:row-reverse}.direction-column{flex-direction:column}.direction-column-reverse{flex-direction:column-reverse}@media (max-width: 480px){.stack-mobile{flex-direction:column}}@media (max-width: 768px){.stack-tablet{flex-direction:column}}@media (max-width: 1180px){.stack-desktop{flex-direction:column}}";
const ScFlexStyle0 = scFlexCss;

const ScFlex = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.alignItems = undefined;
        this.justifyContent = undefined;
        this.flexDirection = undefined;
        this.columnGap = undefined;
        this.flexWrap = undefined;
        this.stack = undefined;
    }
    render() {
        return (index.h("div", { key: '62638cf081e9ebc8e3e3ca23f7acc5670bb64018', part: "base", class: {
                flex: true,
                ...(this.justifyContent ? { [`justify-${this.justifyContent}`]: true } : {}),
                ...(this.alignItems ? { [`align-${this.alignItems}`]: true } : {}),
                ...(this.flexDirection ? { [`direction-${this.flexDirection}`]: true } : {}),
                ...(this.columnGap ? { [`column-gap-${this.columnGap}`]: true } : {}),
                ...(this.flexWrap ? { [`wrap-${this.flexWrap}`]: true } : {}),
                ...(this.stack ? { [`stack-${this.stack}`]: true } : {}),
            } }, index.h("slot", { key: 'e1c21693297b15bd1bc82d5801ba42d0b78b380e' })));
    }
};
ScFlex.style = ScFlexStyle0;

exports.sc_flex = ScFlex;

//# sourceMappingURL=sc-flex.cjs.entry.js.map