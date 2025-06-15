// ==UserScript==
// @name         RC Promocode Activator
// @version      0.5
// @description  Add Promocode at Header. Created by Choppa
// @match        https://rollercoin.com/*
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

const giftIconBase64 = `PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImljLzMyL3NlYXNvbl9zdG9yZSI+CjxwYXRoIGlkPSJWZWN0b3IgMTQ4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUuNDM3NSAxLjVWMi44MTI1SDQuMTI1VjUuNDM3NUg1LjQzNzVWNi43NUgyLjgxMjVWOC4wNjI1SDEuNVYxMy4zMTI1SDIuODEyNVYyMS4xODc1SDQuMTI1VjIyLjVIMTkuODc1VjIxLjE4NzVIMjEuMTg3NVYxMy4zMTI1SDIyLjVWOC4wNjI1SDIxLjE4NzVWNi43NUgxOC41NjI1VjUuNDM3NUgxOS44NzVWMi44MTI1SDE4LjU2MjVWMS41SDEzLjMxMjVWMi44MTI1SDEwLjY4NzVWMS41SDUuNDM3NVpNMTguNTYyNSA2Ljc1SDE0LjYyNVY4LjA2MjVIMTUuOTM3NVY5LjM3NUgxNy4yNVYxMC42ODc1SDE4LjU2MjVWOS4zNzVIMTkuODc1VjguMDYyNUgxOC41NjI1VjYuNzVaTTIxLjE4NzUgMTMuMzEyNVYxMkgxMy4zMTI1VjYuNzVIMTAuNjg3NVYxMkgyLjgxMjVWMTMuMzEyNUgxMC42ODc1VjIxLjE4NzVIMTMuMzEyNVYxMy4zMTI1SDIxLjE4NzVaTTUuNDM3NSA2Ljc1SDkuMzc1VjguMDYyNUg4LjA2MjVWOS4zNzVINi43NVYxMC42ODc1SDUuNDM3NVY5LjM3NUg0LjEyNVY4LjA2MjVINS40Mzc1VjYuNzVaTTYuNzUgNC4xMjVWMi44MTI1SDkuMzc1VjQuMTI1SDYuNzVaTTkuMzc1IDQuMTI1SDEwLjY4NzVWNS40Mzc1SDkuMzc1VjQuMTI1Wk0xNC42MjUgNC4xMjVWNS40Mzc1SDEzLjMxMjVWNC4xMjVIMTQuNjI1Wk0xNC42MjUgNC4xMjVWMi44MTI1SDE3LjI1VjQuMTI1SDE0LjYyNVoiIGZpbGw9IiNmZmYiLz4KPC9nPgo8L3N2Zz4K`
const promoActivationButton = `<div id="promo" class="wallet-link"><button type="button" style="height: 44px; width: 46px" class="roller-header-button small default wallet-button "><span class="shadow-3d"></span><div class="roller-button-text-wrapper"><div class="roller-button-img "><img src="data:image/svg+xml;base64,${giftIconBase64}" width="24" height="24" alt="icon"></div></div></button></div>`;
const modalContentForm = `<div style="display:flex; flex-direction: row; align-items: center; justify-content: center; column-gap: 20px; width: 100%;"><input id="promoInput" type="text" class="quantity-input form-control" placeholder="Enter Promocode" style="height: 50px; margin-top: 6px"><div id="hrefButton" class="wallet-link"><a href="" target="_blank"><button type="button" style="height: 44px; width: 126px" class="roller-header-button small default wallet-button "><span class="shadow-3d"></span><div class="roller-button-text-wrapper">Activate!</div></button></a></div></div>`;
const devider = `<span style="display: flex; width: 100%; height: 1px; margin: 30px 0 20px; background: rgb(255 255 255 / .5)"></span>`;
const choppaAdvertise = `<div style="display: flex; flex-direction: column; align-item: start;"><div style="display: flex; flex-direction: row; align-items: center;"><span style="margin-right: .5em; font-family: Roboto, sans-serif; font-size: 16px; font-weight: 700;">Activator by Choppa. Subscribe me:</span><div class="social-media-block"><span><a href="https://x.com/ChoppaCreator" target="_blank" rel="nofollow noopener noreferrer"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjggMEgyNy4yVjEuNkgzMC40VjMuMkgzMlY0LjhIMzMuNlY2LjRIMzUuMlY4SDM2LjhWOS42SDM4LjRWMTIuOEg0MFYyNy4ySDM4LjRWMzAuNEgzNi44VjMySDM1LjJWMzMuNkgzMy42VjM1LjJIMzJWMzYuOEgzMC40VjM4LjRIMjcuMlY0MEgxMi44VjM4LjRIOS42VjM2LjhIOFYzNS4ySDYuNFYzMy42SDQuOFYzMkgzLjJWMzAuNEgxLjZWMjcuMkgwVjEyLjhIMS42VjkuNkgzLjJWOEg0LjhWNi40SDYuNFY0LjhIOFYzLjJIOS42VjEuNkgxMi44VjBaIiBmaWxsPSIjMEEwQTBBIi8+CjxwYXRoIGQ9Ik0zLjIwMDEgMTIuODAwMUgxLjYwMDFWMjcuMjAwMUgzLjIwMDFWMzAuNDAwMUg0LjgwMDFWMzIuMDAwMUg2LjQwMDFWMzMuNjAwMUg4LjAwMDFWMzUuMjAwMUg5LjYwMDFWMzYuODAwMUgxMi44MDAxVjM4LjQwMDFIMjcuMjAwMVYzNi44MDAxSDMwLjQwMDFWMzUuMjAwMUgzMi4wMDAxVjMzLjYwMDFIMzMuNjAwMVYzMi4wMDAxSDM1LjIwMDFWMzAuNDAwMUgzNi44MDAxVjI3LjIwMDFIMzguNDAwMVYxMi44MDAxSDM2LjgwMDFWOS42MDAxSDM1LjIwMDFWOC4wMDAxSDMzLjYwMDFWNi40MDAxSDMyLjAwMDFWNC44MDAxSDMwLjQwMDFWMy4yMDAxSDI3LjIwMDFWMS42MDAxSDEyLjgwMDFWMy4yMDAxSDkuNjAwMVY0LjgwMDFIOC4wMDAxVjYuNDAwMUg2LjQwMDFWOC4wMDAxSDQuODAwMVY5LjYwMDFIMy4yMDAxVjEyLjgwMDFaIiBmaWxsPSIjNDc0NzQ3Ii8+CjxwYXRoIGQ9Ik0zLjIwMDEgMTIuODAwMUgxLjYwMDFWMjcuMjAwMUgzLjIwMDFWMzAuNDAwMUg0LjgwMDFWMzIuMDAwMUg2LjQwMDFWMzMuNjAwMUg4LjAwMDFWMzUuMjAwMUg5LjYwMDFWMzYuODAwMUgxMi44MDAxVjM4LjQwMDFIMjcuMjAwMVYzNi44MDAxSDMwLjQwMDFWMzUuMjAwMUgzMi4wMDAxVjMzLjYwMDFIMzMuNjAwMVYzMi4wMDAxSDM1LjIwMDFWMzAuNDAwMUgzNi44MDAxVjI3LjIwMDFIMzguNDAwMVYxMi44MDAxSDM2LjgwMDFWOS42MDAxSDM1LjIwMDFWOC4wMDAxSDMzLjYwMDFWNi40MDAxSDMyLjAwMDFWNC44MDAxSDMwLjQwMDFWMy4yMDAxSDI3LjIwMDFWMS42MDAxSDEyLjgwMDFWMy4yMDAxSDkuNjAwMVY0LjgwMDFIOC4wMDAxVjYuNDAwMUg2LjQwMDFWOC4wMDAxSDQuODAwMVY5LjYwMDFIMy4yMDAxVjEyLjgwMDFaIiBmaWxsPSIjNDc0NzQ3Ii8+CjxwYXRoIGQ9Ik0zLjIwMDIgMTIuOFYzMC40SDQuODAwMlYzMkg2LjQwMDJWMzMuNkg4LjAwMDJWMzUuMkg5LjYwMDJWMzYuOEgxMi44MDAyVjM4LjRIMjcuMjAwMlYzNi44SDMwLjQwMDJWMzUuMkgzMi4wMDAyVjMzLjZIMzMuNjAwMlYzMkgzNS4yMDAyVjMwLjRIMzYuODAwMlYyNy4ySDM4LjQwMDJWMTIuOEgzNi44MDAyVjkuNTk5OTVIMzUuMjAwMlY3Ljk5OTk1SDMyLjAwMDJWNi4zOTk5NUgzMC40MDAyVjQuNzk5OTVIMjcuMjAwMlYzLjE5OTk1SDEyLjgwMDJWNC43OTk5NUg5LjYwMDJWNi4zOTk5NUg4LjAwMDJWNy45OTk5NUg2LjQwMDJWOS41OTk5NUg0LjgwMDJWMTIuOEgzLjIwMDJaIiBmaWxsPSIjMUYxRjFGIi8+CjxwYXRoIGQ9Ik0zNi42IDI3SDM1VjMwLjJIMzMuNFYzMS44SDMxLjhWMzMuNEgzMC4yVjM1SDI3VjM2LjZIMTIuNlYzNUg5LjRWMzMuNEg3LjhWMzEuOEg2LjJWMzAuMkgzVjEyLjZINC42VjkuNEg2LjJWNy44SDcuOFY2LjJIOS40VjQuNkgxMi42VjNIMjdWNC42SDMwLjJWNi4ySDMxLjhWNy44SDM1VjkuNEgzNi42VjI3WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkuNjAwMSAyNy45OTk5VjI5LjU5OTlIMTIuODAwMVYyNy45OTk5SDE0LjQwMDFWMjYuMzk5OUgxNi4wMDAxVjI0Ljc5OTlIMTcuNjAwMVYyMy4xOTk5SDIwLjgwMDFWMjQuNzk5OUgyMi40MDAxVjI2LjM5OTlIMjQuMDAwMVYyNy45OTk5SDI1LjYwMDFWMjkuNTk5OUgzMC40MDAxVjI2LjM5OTlIMjguODAwMVYyNC43OTk5SDI3LjIwMDFWMjMuMTk5OUgyNS42MDAxVjIxLjU5OTlIMjQuMDAwMVYxOS45OTk5SDIyLjQwMDFWMTguMzk5OUgyNC4wMDAxVjE2Ljc5OTlIMjUuNjAwMVYxNS4xOTk5SDI3LjIwMDFWMTMuNTk5OUgyOC44MDAxVjExLjk5OTlIMzAuNDAwMVYxMC4zOTk5SDI3LjIwMDFWMTEuOTk5OUgyNS42MDAxVjEzLjU5OTlIMjQuMDAwMVYxNS4xOTk5SDIyLjQwMDFWMTYuNzk5OUgxOS4yMDAxVjE1LjE5OTlIMTcuNjAwMVYxMy41OTk5SDE2LjAwMDFWMTEuOTk5OUgxNC40MDAxVjEwLjM5OTlIOS42MDAxVjEzLjU5OTlIMTEuMjAwMVYxNS4xOTk5SDEyLjgwMDFWMTYuNzk5OUgxNC40MDAxVjE4LjM5OTlIMTYuMDAwMVYxOS45OTk5SDE3LjYwMDFWMjEuNTk5OUgxNi4wMDAxVjIzLjE5OTlIMTQuNDAwMVYyNC43OTk5SDEyLjgwMDFWMjYuMzk5OUgxMS4yMDAxVjI3Ljk5OTlIOS42MDAxWk0xNy42MDAxIDE5Ljk5OTlIMTkuMjAwMVYyMS41OTk5SDIwLjgwMDFWMjMuMTk5OUgyMi40MDAxVjI0Ljc5OTlIMjQuMDAwMVYyNi4zOTk5SDI1LjYwMDFWMjcuOTk5OUgyOC44MDAxVjI2LjM5OTlIMjcuMjAwMVYyNC43OTk5SDI1LjYwMDFWMjMuMTk5OUgyNC4wMDAxVjIxLjU5OTlIMjIuNDAwMVYxOS45OTk5SDIwLjgwMDFWMTguMzk5OUgxOS4yMDAxVjE2Ljc5OTlIMTcuNjAwMVYxNS4xOTk5SDE2LjAwMDFWMTMuNTk5OUgxNC40MDAxVjExLjk5OTlIMTEuMjAwMVYxMy41OTk5SDEyLjgwMDFWMTUuMTk5OUgxNC40MDAxVjE2Ljc5OTlIMTYuMDAwMVYxOC4zOTk5SDE3LjYwMDFWMTkuOTk5OVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" alt="twitter" width="40" height="40"></a></span><span><a href="https://www.youtube.com/@ChoppaTheCreator" target="_blank" rel="nofollow noopener noreferrer"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNSAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMEgxN1YxSDE5VjJIMjBWM0gyMVY0SDIyVjVIMjNWNkgyNFY4SDI1VjE3SDI0VjE5SDIzVjIwSDIyVjIxSDIxVjIySDIwVjIzSDE5VjI0SDE3VjI1SDhWMjRINlYyM0g1VjIySDRWMjFIM1YyMEgyVjE5SDFWMTdIMFY4SDFWNkgyVjVIM1Y0SDRWM0g1VjJINlYxSDhWMFoiIGZpbGw9IiNCQTI3MUIiLz4KPHBhdGggZD0iTTIgOEgxVjE3SDJWMTlIM1YyMEg0VjIxSDVWMjJINlYyM0g4VjI0SDE3VjIzSDE5VjIySDIwVjIxSDIxVjIwSDIyVjE5SDIzVjE3SDI0VjhIMjNWNkgyMlY1SDIxVjRIMjBWM0gxOVYySDE3VjFIOFYySDZWM0g1VjRINFY1SDNWNkgyVjhaIiBmaWxsPSIjRUE1MTRDIi8+CjxwYXRoIGQ9Ik0yIDhIMVYxN0gyVjE5SDNWMjBINFYyMUg1VjIySDZWMjNIOFYyNEgxN1YyM0gxOVYyMkgyMFYyMUgyMVYyMEgyMlYxOUgyM1YxN0gyNFY4SDIzVjZIMjJWNUgyMVY0SDIwVjNIMTlWMkgxN1YxSDhWMkg2VjNINVY0SDRWNUgzVjZIMlY4WiIgZmlsbD0iI0VBNTE0QyIvPgo8cGF0aCBkPSJNMiA4VjE5SDNWMjBINFYyMUg1VjIySDZWMjNIOFYyNEgxN1YyM0gxOVYyMkgyMFYyMUgyMVYyMEgyMlYxOUgyM1YxN0gyNFY4SDIzVjZIMjJWNUgyMFY0SDE5VjNIMTdWMkg4VjNINlY0SDVWNUg0VjZIM1Y4SDJaIiBmaWxsPSIjRDIyRDIwIi8+CjxwYXRoIGQ9Ik0yMyAxN0gyMlYxOUgyMVYyMEgyMFYyMUgxOVYyMkgxN1YyM0g4VjIySDZWMjFINVYyMEg0VjE5SDJWOEgzVjZINFY1SDVWNEg2VjNIOFYySDE3VjNIMTlWNEgyMFY1SDIyVjZIMjNWMTdaIiBmaWxsPSIjRTkzMzI0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNiAxOFYxN0g1VjE2SDRWOUg1VjhINlY3SDE5VjhIMjBWOUgyMVYxNkgyMFYxN0gxOVYxOEg2Wk0xMSAxNVYxMEgxMlYxMUgxNFYxMkgxNVYxM0gxNFYxNEgxMlYxNUgxMVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" alt="youtube" width="40" height="40"></a></span></div></div></div>`;
const modalWindow = `<div id="promoModal" tabindex="-1" style="position: relative; z-index: 1050; display: block;"><div class=""><div class="modal fade show" role="dialog" tabindex="-1" style="display: block;"><div class="modal-dialog events-widget-modal modal-dialog-centered" role="document"><div class="modal-content" style="position: relative; background: #2f3045; border: none; padding: 24px; border-radius: 4px;"><div class="events-widget-header modal-header" style="padding-left: 0; padding-top: 0; border: none;"><h3 class="events-widget-title" style="text-align: left; display: flex; align-items: center; font-family: Roboto, sans-serif; font-size: 20px; font-weight: 700; margin: 0;">Activate Promocode</h3><button class="close-menu-btn btn-default events-widget-close-btn" style="position: absolute; top: 12px;  right: 12px; padding: 0; color: #fff;  background-color: transparent; border: none; outline: none; cursor: pointer; z-index: 1;"><span><img src="https://productionassets.rollercoin.com/main-app/48d97962f072b48646a9b68ed26633e5/assets/img/BsmcD45-m1bUnCyq0JUAm.svg" width="16" height="16" alt="close_modal"></span></button></h5></div><div class="events-widget-list modal-body" style="padding: 0; min-height: auto;">${modalContentForm}${devider}${choppaAdvertise}</div></div></div></div><div class="modal-backdrop fade show"></div></div></div>`;

(function () {
    'use strict';

    let currentUrl = location.href;

    setInterval(() => {
        if (location.href !== currentUrl) {
            currentUrl = location.href;
            injectPromoButton();
        }
    }, 500);

    const initialObserver = new MutationObserver(() => {
        injectPromoButton();
    });
    initialObserver.observe(document.body, { childList: true, subtree: true });

    function injectPromoButton() {
        const wrapper = $('.right-block-main-menu');
        if (wrapper.length && !$('#promo').length) {
            wrapper.prepend(promoActivationButton);
            $("#promo").on("click", function () {
                $("body").append(modalWindow);
                activateCode();
                closePromoModal();
            });
        }
    }

    function activateCode() {
        const input = $("#promoInput");
        const button = $("#hrefButton").find("a");

        input.on("input", function () {
            const code = input.val().trim();
            const link = `https://rollercoin.com/sign-in?promocode=${encodeURIComponent(code)}`;
            button.attr("href", link);
        });
    }

    function closePromoModal() {
        $("#promoModal").find(".close-menu-btn").on("click", function () {
            $("#promoModal").remove();
        });
    }
})();

