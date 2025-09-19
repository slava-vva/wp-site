'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scColumnCss = ":host{display:block}::slotted(:not(.wp-block-spacer):not(:last-child):not(.is-empty):not(style)){margin-bottom:var(--sc-form-row-spacing, 0.75em)}::slotted(:not(.wp-block-spacer):not(:last-child):not(.is-empty):not(style):not(.is-layout-flex)){display:block}";
const ScColumnStyle0 = scColumnCss;

const ScColumn = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: 'd4722b6849c848678d390784ff601059f75b7f07' }, index.h("slot", { key: 'ed4d4578eba66c9f88a9c2e6c8cd3894cd33318e' })));
    }
};
ScColumn.style = ScColumnStyle0;

const scColumnsCss = ".sc-columns{display:flex;box-sizing:border-box;gap:var(--sc-column-spacing, var(--sc-spacing-xxxx-large));margin-left:auto;margin-right:auto;width:100%;flex-wrap:wrap !important;align-items:initial !important;}@media (min-width: 782px){.sc-columns{flex-wrap:nowrap !important}}.sc-columns.are-vertically-aligned-top{align-items:flex-start}.sc-columns.are-vertically-aligned-center{align-items:center}.sc-columns.are-vertically-aligned-bottom{align-items:flex-end}@media (max-width: 781px){.sc-columns:not(.is-not-stacked-on-mobile).is-full-height>sc-column{padding:30px !important}}.sc-columns:not(.is-not-stacked-on-mobile)>sc-column{max-width:none}@media (max-width: 781px){.sc-columns:not(.is-not-stacked-on-mobile)>sc-column{flex-basis:100% !important}}@media (min-width: 782px){.sc-columns:not(.is-not-stacked-on-mobile)>sc-column{flex-basis:0;flex-grow:1}.sc-columns:not(.is-not-stacked-on-mobile)>sc-column[style*=flex-basis]{flex-grow:0}}.sc-columns.is-not-stacked-on-mobile{flex-wrap:nowrap !important}.sc-columns.is-not-stacked-on-mobile>sc-column{flex-basis:0;flex-grow:1}.sc-columns.is-not-stacked-on-mobile>sc-column[style*=flex-basis]{flex-grow:0}@media (min-width: 782px){.sc-columns.is-full-height{min-height:100vh !important}}@media (max-width: 782px){.sc-columns.is-reversed-on-mobile{flex-direction:column-reverse}}sc-column{flex-grow:1;min-width:0;word-break:break-word;overflow-wrap:break-word;}sc-column.is-vertically-aligned-top{align-self:flex-start}sc-column.is-vertically-aligned-center{align-self:center}sc-column.is-vertically-aligned-bottom{align-self:flex-end}sc-column.is-vertically-aligned-top,sc-column.is-vertically-aligned-center,sc-column.is-vertically-aligned-bottom{width:100%}@media (min-width: 782px){sc-column.is-layout-constrained>:where(:not(.alignleft):not(.alignright):not(.alignfull)){max-width:var(--sc-column-content-width) !important}sc-column.is-layout-constrained.is-horizontally-aligned-right>:where(:not(.alignleft):not(.alignright):not(.alignfull)){margin-left:auto !important;margin-right:0 !important}sc-column.is-layout-constrained.is-horizontally-aligned-left>:where(:not(.alignleft):not(.alignright):not(.alignfull)){margin-right:auto !important;margin-left:0 !important}}@media (min-width: 782px){sc-column.is-sticky{position:sticky !important;align-self:flex-start;top:0}}";
const ScColumnsStyle0 = scColumnsCss;

const ScColumns = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.verticalAlignment = undefined;
        this.isStackedOnMobile = undefined;
        this.isFullHeight = undefined;
        this.isReversedOnMobile = undefined;
    }
    render() {
        return (index.h(index.Host, { key: '3f93ca2ecd6afeb5ee1193be4f4b4dd4a2279328', class: {
                'sc-columns': true,
                [`are-vertically-aligned-${this.verticalAlignment}`]: !!this.verticalAlignment,
                'is-not-stacked-on-mobile': !this.isStackedOnMobile,
                'is-full-height': !!this.isFullHeight,
                'is-reversed-on-mobile': !!this.isReversedOnMobile,
            } }, index.h("slot", { key: '9d3d62cf3dec8d8179f9e8f2502378254f6a8c95' })));
    }
};
ScColumns.style = ScColumnsStyle0;

exports.sc_column = ScColumn;
exports.sc_columns = ScColumns;

//# sourceMappingURL=sc-column_2.cjs.entry.js.map