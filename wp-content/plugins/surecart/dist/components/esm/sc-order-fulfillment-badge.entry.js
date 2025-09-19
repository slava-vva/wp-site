import { r as registerInstance, h } from './index-745b6bec.js';

const scOrderFulfillmentBadgeCss = ":host{display:inline-block}";
const ScOrderFulfillmentBadgeStyle0 = scOrderFulfillmentBadgeCss;

const status = {
    unfulfilled: wp.i18n.__('Unfulfilled', 'surecart'),
    fulfilled: wp.i18n.__('Fulfilled', 'surecart'),
    on_hold: wp.i18n.__('On Hold', 'surecart'),
    scheduled: wp.i18n.__('Scheduled', 'surecart'),
    partially_fulfilled: wp.i18n.__('Partially Fulfilled', 'surecart'),
};
const type = {
    unfulfilled: 'warning',
    fulfilled: 'success',
    on_hold: 'warning',
    scheduled: 'default',
    partially_fulfilled: 'warning',
};
const ScOrderFulFillmentBadge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.status = undefined;
        this.size = 'medium';
        this.pill = false;
        this.clearable = false;
    }
    render() {
        return (h("sc-tag", { key: 'a26527eb27196789bf8ba9371ae02f0b396faefe', type: type === null || type === void 0 ? void 0 : type[this === null || this === void 0 ? void 0 : this.status], pill: this.pill }, (status === null || status === void 0 ? void 0 : status[this.status]) || this.status));
    }
};
ScOrderFulFillmentBadge.style = ScOrderFulfillmentBadgeStyle0;

export { ScOrderFulFillmentBadge as sc_order_fulfillment_badge };

//# sourceMappingURL=sc-order-fulfillment-badge.entry.js.map