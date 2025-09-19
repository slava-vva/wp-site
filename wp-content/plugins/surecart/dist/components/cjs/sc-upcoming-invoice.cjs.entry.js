'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const fetch = require('./fetch-d644cebd.js');
const lazy = require('./lazy-2b509fa7.js');
const tax = require('./tax-a4582e73.js');
const price = require('./price-5b1afcfe.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');
require('./currency-71fce0f0.js');

const scUpcomingInvoiceCss = ":host{display:block;position:relative}.upcoming-invoice{display:grid;gap:var(--sc-spacing-large)}.upcoming-invoice>*{display:grid;gap:var(--sc-spacing-medium)}.new-plan{display:grid;gap:0.25em;color:var(--sc-input-label-color)}.new-plan__heading{font-weight:var(--sc-font-weight-bold)}";
const ScUpcomingInvoiceStyle0 = scUpcomingInvoiceCss;

const ScUpcomingInvoice = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.heading = undefined;
        this.successUrl = undefined;
        this.subscriptionId = undefined;
        this.priceId = undefined;
        this.variantId = undefined;
        this.quantity = undefined;
        this.discount = undefined;
        this.payment_method = undefined;
        this.quantityUpdatesEnabled = true;
        this.adHocAmount = undefined;
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
        this.price = undefined;
        this.invoice = undefined;
        this.couponError = undefined;
    }
    componentWillLoad() {
        lazy.onFirstVisible(this.el, () => {
            this.fetchItems();
        });
    }
    isFutureInvoice() {
        return this.invoice.start_at >= new Date().getTime() / 1000;
    }
    async fetchItems() {
        var _a, _b;
        try {
            this.loading = true;
            await Promise.all([this.getInvoice(), this.getPrice()]);
        }
        catch (e) {
            console.error(e);
            this.error = ((_b = (_a = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async getPrice() {
        if (!this.priceId)
            return;
        this.price = (await fetch.apiFetch({
            path: addQueryArgs.addQueryArgs(`surecart/v1/prices/${this.priceId}`, {
                expand: ['product'],
            }),
        }));
    }
    async getInvoice() {
        if (!this.subscriptionId)
            return;
        this.invoice = (await fetch.apiFetch({
            method: 'PATCH',
            path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId}/upcoming_period/`, {
                expand: [
                    'period.checkout',
                    'checkout.line_items',
                    'line_item.price',
                    'price.product',
                    'checkout.payment_method',
                    'checkout.manual_payment_method',
                    'checkout.discount',
                    'discount.promotion',
                    'discount.coupon',
                    'payment_method.card',
                    'payment_method.payment_instrument',
                    'payment_method.paypal_account',
                    'payment_method.bank_account',
                ],
            }),
            data: {
                price: this.priceId,
                variant: this.variantId,
                quantity: this.quantity,
                ...(this.adHocAmount ? { ad_hoc_amount: this.adHocAmount } : {}),
                ...(this.discount ? { discount: this.discount } : {}),
            },
        }));
        return this.invoice;
    }
    async applyCoupon(e) {
        try {
            this.couponError = '';
            this.busy = true;
            this.discount = {
                promotion_code: e.detail,
            };
            await this.getInvoice();
        }
        catch (e) {
            this.couponError = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    async updateQuantity(e) {
        try {
            this.error = '';
            this.busy = true;
            this.quantity = e.detail;
            await this.getInvoice();
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    async onSubmit() {
        try {
            this.error = '';
            this.busy = true;
            await fetch.apiFetch({
                path: `surecart/v1/subscriptions/${this.subscriptionId}`,
                method: 'PATCH',
                data: {
                    price: this.priceId,
                    quantity: this.quantity,
                    variant: this.variantId,
                    ...(this.adHocAmount ? { ad_hoc_amount: this.adHocAmount } : {}),
                    ...(this.discount ? { discount: this.discount } : {}),
                },
            });
            if (this.successUrl) {
                window.location.assign(this.successUrl);
            }
            else {
                this.busy = false;
            }
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
            this.busy = false;
        }
    }
    renderName(price$1) {
        if (typeof (price$1 === null || price$1 === void 0 ? void 0 : price$1.product) !== 'string') {
            return price.productNameWithPrice(price$1);
        }
        return wp.i18n.__('Plan', 'surecart');
    }
    renderRenewalText() {
        var _a;
        if (this.isFutureInvoice()) {
            return (index.h("div", null, wp.i18n.__("You'll be switched to this plan", 'surecart'), ' ', index.h("strong", null, wp.i18n.__('at the end of your billing cycle on', 'surecart'), " ", (_a = this.invoice) === null || _a === void 0 ? void 0 :
                _a.start_at_date)));
        }
        return (index.h("div", null, wp.i18n.__("You'll be switched to this plan", 'surecart'), " ", index.h("strong", null, wp.i18n.__('immediately', 'surecart'))));
    }
    renderEmpty() {
        return index.h("slot", { name: "empty" }, wp.i18n.__('Something went wrong.', 'surecart'));
    }
    renderLoading() {
        return (index.h("div", null, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '40%' } })));
    }
    renderContent() {
        var _a;
        if (this.loading) {
            return this.renderLoading();
        }
        if (!((_a = this.invoice) === null || _a === void 0 ? void 0 : _a.checkout)) {
            return this.renderEmpty();
        }
        const checkout = this.invoice.checkout;
        return (index.h("div", { class: "new-plan" }, index.h("div", { class: "new-plan__heading" }, this.renderName(this.price)), index.h("div", null, index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_display_amount)), index.h("div", { style: { fontSize: 'var(--sc-font-size-small)' } }, this.renderRenewalText())));
    }
    renderSummary() {
        var _a, _b;
        if (this.loading) {
            return this.renderLoading();
        }
        if (!this.invoice) {
            return this.renderEmpty();
        }
        const checkout = (_a = this.invoice) === null || _a === void 0 ? void 0 : _a.checkout;
        const manualPaymentMethod = (checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment) ? checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method : null;
        return (index.h(index.Fragment, null, (_b = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _b === void 0 ? void 0 :
            _b.data.map(item => {
                var _a, _b, _c, _d, _e, _f, _g;
                return (index.h("sc-product-line-item", { image: (_b = (_a = item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.line_item_image, name: (_d = (_c = item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name, price: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, editable: this.quantityUpdatesEnabled, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display, removable: false, note: item === null || item === void 0 ? void 0 : item.display_note, quantity: item === null || item === void 0 ? void 0 : item.quantity, amount: item === null || item === void 0 ? void 0 : item.subtotal_display_amount, interval: `${(_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.short_interval_text} ${(_g = item === null || item === void 0 ? void 0 : item.price) === null || _g === void 0 ? void 0 : _g.short_interval_count_text}`, onScUpdateQuantity: e => this.updateQuantity(e) }));
            }), index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_display_amount)), !!checkout.proration_amount && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Proration Credit', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.proration_display_amount))), !!checkout.applied_balance_amount && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_display_amount))), !!checkout.trial_amount && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.trial_display_amount))), index.h("sc-coupon-form", { discount: checkout === null || checkout === void 0 ? void 0 : checkout.discount, discountsDisplayAmount: checkout === null || checkout === void 0 ? void 0 : checkout.discounts_display_amount, label: wp.i18n.__('Add Coupon Code', 'surecart'), onScApplyCoupon: e => this.applyCoupon(e), error: this.couponError, collapsed: true, buttonText: wp.i18n.__('Add Coupon Code', 'surecart') }), !!checkout.tax_amount && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, tax.formatTaxDisplay(checkout === null || checkout === void 0 ? void 0 : checkout.tax_label)), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.tax_display_amount))), index.h("sc-divider", { style: { '--spacing': '0' } }), index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Payment', 'surecart')), index.h("a", { href: addQueryArgs.addQueryArgs(window.location.href, {
                action: 'payment',
            }), slot: "price-description" }, index.h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em' } }, !!manualPaymentMethod && index.h("sc-manual-payment-method", { paymentMethod: manualPaymentMethod }), !manualPaymentMethod && index.h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method }), index.h("sc-icon", { name: "edit-3" })))), index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { slot: "title" }, wp.i18n.__('Total Due', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount), index.h("span", { slot: "currency" }, checkout.currency))));
    }
    render() {
        return (index.h("div", { key: '09697865e7e285780c42f83740d7a893ecb6e8ee', class: "upcoming-invoice" }, this.error && (index.h("sc-alert", { key: '475b921df287561f21343a333b6830edd677bf31', open: !!this.error, type: "danger" }, index.h("span", { key: '7fe5b338fca35e90bf45165ee7f7fc96f12b3737', slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), index.h(index.Fragment, { key: '7c6a8a97d4c6193f57bfd5c8c8b066a44424d474' }, index.h("sc-dashboard-module", { key: '807d399f70d5738a9358a0a552e75367f5133fed', heading: wp.i18n.__('New Plan', 'surecart'), class: "plan-preview", error: this.error }, index.h("sc-card", { key: 'bc88eccdc88a909931695fd5ba91359121c71f41' }, this.renderContent())), index.h("sc-dashboard-module", { key: '529a623506e4bf87c4129ebb8a55426495d850e7', heading: wp.i18n.__('Summary', 'surecart'), class: "plan-summary" }, index.h("sc-form", { key: 'c56fe845e39ed4fbcba5a277b7f1d06e9899c9b7', onScFormSubmit: () => this.onSubmit() }, index.h("sc-card", { key: 'dce0c0ebbc116b2f6452a24ff6521127887ab1c5' }, this.renderSummary()), index.h("sc-button", { key: 'd2401d6e106c894f2e2ae6c00701f999c1a2fa02', type: "primary", full: true, submit: true, loading: this.loading || this.busy, disabled: this.loading || this.busy }, wp.i18n.__('Confirm', 'surecart')))), index.h("sc-text", { key: 'e84437dd4b37ee7a48aad86e2a72acbdfd5ef46e', style: { '--text-align': 'center', '--font-size': 'var(--sc-font-size-small)', '--line-height': 'var(--sc-line-height-normal)' } }, index.h("slot", { key: '64219d518e328b5eca6e5485ab27d6ac4646a691', name: "terms" }))), this.busy && index.h("sc-block-ui", { key: '97d124b2f4bcd66546d38f89ca1af67c7c42abc3' })));
    }
    get el() { return index.getElement(this); }
};
ScUpcomingInvoice.style = ScUpcomingInvoiceStyle0;

exports.sc_upcoming_invoice = ScUpcomingInvoice;

//# sourceMappingURL=sc-upcoming-invoice.cjs.entry.js.map