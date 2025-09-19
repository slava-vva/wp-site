import { r as registerInstance, h, F as Fragment, a as getElement } from './index-745b6bec.js';
import { a as apiFetch } from './fetch-8ecbbe53.js';
import { o as onFirstVisible } from './lazy-deb42890.js';
import { f as formatTaxDisplay } from './tax-a03623ca.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scOrderCss = ":host{display:block}.order__row{padding:var(--sc-spacing-large);display:grid;gap:var(--sc-spacing-small)}";
const ScOrderStyle0 = scOrderCss;

const ScOrder = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.orderId = undefined;
        this.customerIds = undefined;
        this.heading = undefined;
        this.order = undefined;
        this.purchases = undefined;
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
    }
    /** Only fetch if visible */
    componentDidLoad() {
        onFirstVisible(this.el, () => {
            this.fetchOrder();
            this.fetchDownloads();
        });
    }
    async fetchOrder() {
        try {
            this.loading = true;
            await this.getOrder();
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async fetchDownloads() {
        try {
            this.busy = true;
            this.purchases = (await apiFetch({
                path: addQueryArgs(`surecart/v1/purchases`, {
                    expand: ['product', 'product.downloads', 'download.media'],
                    order_ids: [this.orderId],
                    customer_ids: this.customerIds,
                    downloadable: true,
                }),
            }));
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get order */
    async getOrder() {
        this.order = (await apiFetch({
            path: addQueryArgs(`surecart/v1/orders/${this.orderId}`, {
                expand: [
                    'checkout',
                    'checkout.line_items',
                    'line_item.price',
                    'line_item.fees',
                    'line_item.variant',
                    'variant.image',
                    'price.product',
                    'checkout.manual_payment_method',
                    'checkout.payment_method',
                    'checkout.selected_shipping_choice',
                    'shipping_choice.shipping_method',
                    'payment_method.card',
                    'payment_method.payment_instrument',
                    'payment_method.paypal_account',
                    'payment_method.bank_account',
                    'checkout.discount',
                    'discount.promotion',
                    'checkout.charge',
                ],
            }),
        }));
    }
    renderLoading() {
        return (h("sc-flex", { flexDirection: "column", style: { gap: '1em' } }, h("sc-skeleton", { style: { width: '20%', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '60%', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '40%', display: 'inline-block' } })));
    }
    renderEmpty() {
        return h("sc-empty", { icon: "shopping-bag" }, wp.i18n.__('Order not found.', 'surecart'));
    }
    renderContent() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.loading) {
            return this.renderLoading();
        }
        if (!((_a = this.order) === null || _a === void 0 ? void 0 : _a.id)) {
            return this.renderEmpty();
        }
        const checkout = (_b = this.order) === null || _b === void 0 ? void 0 : _b.checkout;
        const shippingMethod = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.selected_shipping_choice) === null || _c === void 0 ? void 0 : _c.shipping_method;
        const shippingMethodName = shippingMethod === null || shippingMethod === void 0 ? void 0 : shippingMethod.name;
        return (h(Fragment, null, (((_d = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _d === void 0 ? void 0 : _d.data) || []).map(item => {
            var _a, _b, _c, _d, _e, _f, _g;
            return (h("sc-product-line-item", { key: item.id, image: item === null || item === void 0 ? void 0 : item.image, name: (_b = (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.name, price: (_c = item === null || item === void 0 ? void 0 : item.price) === null || _c === void 0 ? void 0 : _c.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, editable: false, removable: false, quantity: item.quantity, note: item === null || item === void 0 ? void 0 : item.display_note, amount: item.subtotal_display_amount, trial: (_d = item === null || item === void 0 ? void 0 : item.price) === null || _d === void 0 ? void 0 : _d.trial_text, interval: `${(_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.short_interval_text} ${(_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.short_interval_count_text}`, scratch: item === null || item === void 0 ? void 0 : item.scratch_display_amount, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display, fees: (_g = item === null || item === void 0 ? void 0 : item.fees) === null || _g === void 0 ? void 0 : _g.data }));
        }), (checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_amount) !== (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.trial_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.trial_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.discounts) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Discounts', 'surecart')), h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.discounts_display))), !!((_f = (_e = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _e === void 0 ? void 0 : _e.promotion) === null || _f === void 0 ? void 0 : _f.code) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Discount', 'surecart'), h("br", null), h("sc-tag", { type: "success" }, wp.i18n.__('Coupon:', 'surecart'), " ", (_h = (_g = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _g === void 0 ? void 0 : _g.promotion) === null || _h === void 0 ? void 0 :
            _h.code)), h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.discounts_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, `${wp.i18n.__('Shipping', 'surecart')} ${shippingMethodName ? `(${shippingMethodName})` : ''}`), h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.shipping_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.tax_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, `${formatTaxDisplay(checkout === null || checkout === void 0 ? void 0 : checkout.tax_label, (checkout === null || checkout === void 0 ? void 0 : checkout.tax_status) === 'estimated')} (${checkout === null || checkout === void 0 ? void 0 : checkout.tax_percent}%)`), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.tax_display_amount), !!(checkout === null || checkout === void 0 ? void 0 : checkout.tax_inclusive_amount) && h("span", { slot: "price-description" }, `(${wp.i18n.__('included', 'surecart')})`))), h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-x-small)' } }), h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { slot: "title" }, wp.i18n.__('Total', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.total_display_amount), h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency)), !!(checkout === null || checkout === void 0 ? void 0 : checkout.proration_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Proration', 'surecart')), h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.proration_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), h("span", { style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            }, slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.credited_balance_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Credited Balance', 'surecart')), h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.credited_balance_display_amount))), (checkout === null || checkout === void 0 ? void 0 : checkout.amount_due) !== (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) && (h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { slot: "title" }, wp.i18n.__('Amount Due', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount), h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency))), h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-x-small)' } }), !!(checkout === null || checkout === void 0 ? void 0 : checkout.paid_amount) && (h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { slot: "title" }, wp.i18n.__('Paid', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.paid_display_amount), h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.refunded_amount) && (h(Fragment, null, h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { slot: "description" }, wp.i18n.__('Refunded', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.refunded_display_amount)), h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { slot: "title" }, wp.i18n.__('Net Payment', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.net_paid_display_amount)))), (checkout === null || checkout === void 0 ? void 0 : checkout.tax_reverse_charged_amount) > 0 && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('*Tax to be paid on reverse charge basis', 'surecart'))))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const checkout = (_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.checkout;
        const manualPaymentMethod = checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method;
        return (h("sc-spacing", { key: '1ed0387135a58c11a0f7bc676cea482679b5ff50', style: { '--spacing': 'var(--sc-spacing-large)' } }, h("sc-dashboard-module", { key: '01a16a43371173828c54307d927fa2a7421218b1', error: this.error }, h("span", { key: 'b013ff814cfc746209d4fadc8c28be5fba33f0d6', slot: "heading" }, this.loading ? h("sc-skeleton", { style: { width: '120px' } }) : `#${(_b = this === null || this === void 0 ? void 0 : this.order) === null || _b === void 0 ? void 0 : _b.number}`), !this.loading && !(checkout === null || checkout === void 0 ? void 0 : checkout.live_mode) && (h("sc-tag", { key: 'a53f43b742ceb46ebf7f043a60657da3c8abd972', type: "warning", slot: "end" }, wp.i18n.__('Test Mode', 'surecart'))), !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name) && !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions) && (h("sc-order-manual-instructions", { key: 'e076692426ae4b1a53cd9f5172cd77995bf35ad7', manualPaymentTitle: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name, manualPaymentInstructions: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions })), h("sc-card", { key: '814a42fd92f2325627258b5eb64e5d1225800577', "no-padding": !this.loading }, this.loading ? (this.renderLoading()) : (h(Fragment, null, h("sc-stacked-list", null, h("sc-stacked-list-row", { style: { '--columns': '2' } }, h("div", null, wp.i18n.__('Order Status', 'surecart')), h("sc-order-status-badge", { status: (_c = this === null || this === void 0 ? void 0 : this.order) === null || _c === void 0 ? void 0 : _c.status })), h("sc-stacked-list-row", { style: { '--columns': '2' } }, h("div", null, wp.i18n.__('Date', 'surecart')), h("span", null, (_d = this.order) === null || _d === void 0 ? void 0 : _d.created_at_date)), h("sc-stacked-list-row", { style: { '--columns': '2' } }, h("div", null, wp.i18n.__('Payment Method', 'surecart')), h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method })), h("div", { class: "order__row" }, this.renderContent())))))), ((_e = this.order) === null || _e === void 0 ? void 0 : _e.statement_url) && (h("sc-button", { key: '8498333f4edcd8805d9ba7e12aa7328b9ed336f7', type: "primary", href: (_f = this.order) === null || _f === void 0 ? void 0 : _f.statement_url, target: "_blank" }, h("sc-icon", { key: '9101a53a87dc60085477b5398110c5822931b25c', name: "inbox", slot: "prefix" }), wp.i18n.__('Download Receipt/Invoice', 'surecart'))), !!((_g = this.purchases) === null || _g === void 0 ? void 0 : _g.length) && h("sc-purchase-downloads-list", { key: 'cdc6e99d9d0f5d788ab78984aeecb3f8fdf71c8e', heading: wp.i18n.__('Downloads', 'surecart'), purchases: this.purchases })));
    }
    get el() { return getElement(this); }
};
ScOrder.style = ScOrderStyle0;

export { ScOrder as sc_order };

//# sourceMappingURL=sc-order.entry.js.map